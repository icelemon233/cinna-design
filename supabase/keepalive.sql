create or replace function public.keepalive_ping()
returns timestamptz
language sql
security definer
set search_path = public
as $$
  select now();
$$;

grant execute on function public.keepalive_ping() to anon, authenticated;
