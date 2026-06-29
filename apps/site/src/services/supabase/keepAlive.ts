import { isSupabaseConfigured, supabase } from './client';

const DEFAULT_KEEPALIVE_RPC = 'keepalive_ping';
const MIN_RANDOM_DELAY_MS = 60 * 1000;
const TIMER_MAX_DELAY_MS = 2_147_483_647;
const LOCK_TTL_MS = 2 * 60 * 1000;
const STORAGE_PREFIX = 'cinna-design:supabase-keepalive';
const SCHEDULE_KEY = `${STORAGE_PREFIX}:schedule`;
const LAST_ATTEMPT_DAY_KEY = `${STORAGE_PREFIX}:last-attempt-day`;
const LAST_ATTEMPT_AT_KEY = `${STORAGE_PREFIX}:last-attempt-at`;
const LOCK_KEY = `${STORAGE_PREFIX}:lock`;

type KeepAliveSchedule = {
  day: string;
  scheduledAt: number;
};

type KeepAliveLock = {
  token: string;
  expiresAt: number;
};

let hasStarted = false;
let timerId: number | undefined;
let memorySchedule: KeepAliveSchedule | null = null;
let memoryLastAttemptDay = '';

function getEnvFlag(value: string | undefined, defaultValue: boolean): boolean {
  if (!value) return defaultValue;
  return !['0', 'false', 'off', 'no'].includes(value.trim().toLowerCase());
}

function getStorage(): Storage | null {
  try {
    const storage = window.localStorage;
    const probeKey = `${STORAGE_PREFIX}:probe`;
    storage.setItem(probeKey, '1');
    storage.removeItem(probeKey);
    return storage;
  } catch {
    return null;
  }
}

function readJson<T>(storage: Storage, key: string): T | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(storage: Storage, key: string, value: unknown): void {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is best effort only; the timer can still run for the current tab.
  }
}

function formatLocalDay(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function startOfLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function startOfNextLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
}

function isValidSchedule(schedule: KeepAliveSchedule | null, day: string, dayStart: number, dayEnd: number): schedule is KeepAliveSchedule {
  return (
    Boolean(schedule) &&
    schedule?.day === day &&
    Number.isFinite(schedule.scheduledAt) &&
    schedule.scheduledAt >= dayStart &&
    schedule.scheduledAt < dayEnd
  );
}

function createSchedule(targetDay: Date, now: Date): KeepAliveSchedule {
  const nowMs = now.getTime();
  const day = formatLocalDay(targetDay);
  const dayStart = startOfLocalDay(targetDay);
  const dayEnd = startOfNextLocalDay(targetDay);
  const earliest = formatLocalDay(now) === day ? Math.min(Math.max(nowMs + MIN_RANDOM_DELAY_MS, dayStart), dayEnd - 1) : dayStart;
  const windowMs = Math.max(dayEnd - earliest, 1);

  return {
    day,
    scheduledAt: earliest + Math.floor(Math.random() * windowMs),
  };
}

function readLastAttemptDay(storage: Storage | null): string {
  if (!storage) return memoryLastAttemptDay;
  return storage.getItem(LAST_ATTEMPT_DAY_KEY) || '';
}

function writeLastAttempt(storage: Storage | null, day: string, attemptedAt: Date): void {
  memoryLastAttemptDay = day;

  if (!storage) return;
  try {
    storage.setItem(LAST_ATTEMPT_DAY_KEY, day);
    storage.setItem(LAST_ATTEMPT_AT_KEY, attemptedAt.toISOString());
  } catch {
    // Ignore quota or privacy-mode storage failures.
  }
}

function readSchedule(storage: Storage | null): KeepAliveSchedule | null {
  if (!storage) return memorySchedule;
  return readJson<KeepAliveSchedule>(storage, SCHEDULE_KEY);
}

function writeSchedule(storage: Storage | null, schedule: KeepAliveSchedule): void {
  memorySchedule = schedule;
  if (storage) writeJson(storage, SCHEDULE_KEY, schedule);
}

function getOrCreateSchedule(storage: Storage | null, now: Date): KeepAliveSchedule {
  const today = formatLocalDay(now);
  const lastAttemptDay = readLastAttemptDay(storage);
  const targetDayDate = lastAttemptDay === today ? new Date(startOfNextLocalDay(now)) : now;
  const targetDay = formatLocalDay(targetDayDate);
  const dayStart = startOfLocalDay(targetDayDate);
  const dayEnd = startOfNextLocalDay(targetDayDate);
  const storedSchedule = readSchedule(storage);

  if (isValidSchedule(storedSchedule, targetDay, dayStart, dayEnd)) {
    return storedSchedule;
  }

  const schedule = createSchedule(targetDayDate, now);
  writeSchedule(storage, schedule);
  return schedule;
}

function createLockToken(): string {
  return window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

function acquireExecutionLock(storage: Storage | null, nowMs: number): string | null {
  if (!storage) return createLockToken();

  const currentLock = readJson<KeepAliveLock>(storage, LOCK_KEY);
  if (currentLock && currentLock.expiresAt > nowMs) return null;

  const token = createLockToken();
  writeJson(storage, LOCK_KEY, {
    token,
    expiresAt: nowMs + LOCK_TTL_MS,
  });

  return readJson<KeepAliveLock>(storage, LOCK_KEY)?.token === token ? token : null;
}

function releaseExecutionLock(storage: Storage | null, token: string): void {
  if (!storage) return;

  const currentLock = readJson<KeepAliveLock>(storage, LOCK_KEY);
  if (currentLock?.token !== token) return;

  try {
    storage.removeItem(LOCK_KEY);
  } catch {
    // Best effort only.
  }
}

async function pingDatabase(): Promise<void> {
  if (!supabase) return;

  const configuredRpc = import.meta.env.VITE_SUPABASE_KEEPALIVE_RPC?.trim();
  const configuredTable = import.meta.env.VITE_SUPABASE_KEEPALIVE_TABLE?.trim();
  const rpcName = configuredRpc || (configuredTable ? '' : DEFAULT_KEEPALIVE_RPC);

  if (rpcName) {
    const { error } = await supabase.rpc(rpcName);
    if (error) throw error;
    return;
  }

  if (configuredTable) {
    const { error } = await supabase.from(configuredTable).select('*', { head: true, count: 'exact' }).limit(1);
    if (error) throw error;
  }
}

function scheduleNext(storage: Storage | null): void {
  if (timerId) window.clearTimeout(timerId);

  const schedule = getOrCreateSchedule(storage, new Date());
  const delay = Math.max(0, Math.min(schedule.scheduledAt - Date.now(), TIMER_MAX_DELAY_MS));
  timerId = window.setTimeout(() => {
    void runDueKeepAlive();
  }, delay);
}

async function runDueKeepAlive(): Promise<void> {
  const storage = getStorage();
  const now = new Date();
  const schedule = getOrCreateSchedule(storage, now);

  if (schedule.scheduledAt > now.getTime()) {
    scheduleNext(storage);
    return;
  }

  if (readLastAttemptDay(storage) === schedule.day) {
    scheduleNext(storage);
    return;
  }

  const lockToken = acquireExecutionLock(storage, now.getTime());
  if (!lockToken) {
    scheduleNext(storage);
    return;
  }

  try {
    await pingDatabase();
  } catch {
    // A keepalive failure should never disturb the documentation site.
  } finally {
    writeLastAttempt(storage, schedule.day, new Date());
    releaseExecutionLock(storage, lockToken);
    scheduleNext(storage);
  }
}

export function startSupabaseKeepAlive(): void {
  if (hasStarted || typeof window === 'undefined') return;
  hasStarted = true;

  const enabled = getEnvFlag(import.meta.env.VITE_SUPABASE_KEEPALIVE_ENABLED, true);
  if (!enabled || !isSupabaseConfigured) return;

  const storage = getStorage();
  scheduleNext(storage);

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      void runDueKeepAlive();
    }
  });

  window.addEventListener('online', () => {
    void runDueKeepAlive();
  });
}
