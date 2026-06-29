import React, { useEffect, useRef, useState } from 'react';

export type ButtonRippleEffect = 'outer' | 'inner' | 'particles';

interface ButtonRipple {
  id: number;
  x: number;
  y: number;
  particles: ButtonRippleParticle[];
}

interface ButtonRippleParticle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  delay: number;
  duration: number;
  color?: string;
}

interface UseButtonRippleOptions {
  enabled?: boolean;
  disabled?: boolean;
  effects?: ButtonRippleEffect | ButtonRippleEffect[];
  particleColors?: string | string[];
  particleCount?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const normalizeButtonRippleOpacity = (value: number) => `${clamp(value, 0, 1)}`;

const normalizeButtonRippleEffects = (effects: ButtonRippleEffect | ButtonRippleEffect[] | undefined): ButtonRippleEffect[] => {
  if (!effects) return ['outer'];
  return [...new Set(Array.isArray(effects) ? effects : [effects])];
};

const normalizeButtonRippleParticleColors = (colors: string | string[] | undefined) => {
  if (!colors) return [];
  return (Array.isArray(colors) ? colors : [colors]).filter(Boolean);
};

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

const getRippleParticleColor = (colors: string[]) => {
  if (colors.length === 0) return undefined;
  return colors[Math.floor(Math.random() * colors.length)];
};

const getParticleCount = (width: number, customCount?: number) => {
  if (customCount !== undefined) return clamp(Math.round(customCount), 0, 80);
  const baseCount = clamp(Math.round(width / 7), 14, 48);
  return clamp(Math.round(baseCount * randomBetween(0.9, 1.1)), 12, 54);
};

const createRippleParticles = (rect: DOMRect, colors: string[], customCount?: number): ButtonRippleParticle[] => {
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);
  const perimeter = (width + height) * 2;
  const count = getParticleCount(width, customCount);

  return Array.from({ length: count }, () => {
    const edgeOffset = Math.random() * perimeter;
    let x = 0;
    let y = 0;
    let normalX = 0;
    let normalY = 0;
    let tangentX = 0;
    let tangentY = 0;

    if (edgeOffset < width) {
      x = edgeOffset;
      normalY = -1;
      tangentX = 1;
    } else if (edgeOffset < width + height) {
      x = width;
      y = edgeOffset - width;
      normalX = 1;
      tangentY = 1;
    } else if (edgeOffset < width * 2 + height) {
      x = width - (edgeOffset - width - height);
      y = height;
      normalY = 1;
      tangentX = 1;
    } else {
      y = height - (edgeOffset - width * 2 - height);
      normalX = -1;
      tangentY = 1;
    }

    const outwardDistance = randomBetween(20, 42);
    const tangentDrift = randomBetween(-18, 18);

    return {
      x,
      y,
      translateX: normalX * outwardDistance + tangentX * tangentDrift,
      translateY: normalY * outwardDistance + tangentY * tangentDrift,
      size: randomBetween(3.5, 7),
      delay: randomBetween(0, 90),
      duration: randomBetween(620, 820),
      color: getRippleParticleColor(colors),
    };
  });
};

export const useButtonRipple = ({ enabled = true, disabled = false, effects, particleColors, particleCount }: UseButtonRippleOptions) => {
  const [ripples, setRipples] = useState<ButtonRipple[]>([]);
  const rippleIdRef = useRef(0);
  const rippleTimeoutsRef = useRef<number[]>([]);
  const activeRippleEffects = normalizeButtonRippleEffects(effects);
  const activeRippleParticleColors = normalizeButtonRippleParticleColors(particleColors);

  useEffect(() => {
    return () => {
      rippleTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      rippleTimeoutsRef.current = [];
    };
  }, []);

  const triggerButtonRippleAt = (target: HTMLElement, point?: { clientX: number; clientY: number }) => {
    if (!enabled || disabled || activeRippleEffects.length === 0) return;

    const rect = target.getBoundingClientRect();
    const clientX = point?.clientX ?? rect.left + rect.width / 2;
    const clientY = point?.clientY ?? rect.top + rect.height / 2;
    const rippleItem = {
      id: rippleIdRef.current + 1,
      x: clientX - rect.left,
      y: clientY - rect.top,
      particles: activeRippleEffects.includes('particles') ? createRippleParticles(rect, activeRippleParticleColors, particleCount) : [],
    };

    rippleIdRef.current = rippleItem.id;
    setRipples((current) => [...current, rippleItem]);
    const timeoutId = window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== rippleItem.id));
      rippleTimeoutsRef.current = rippleTimeoutsRef.current.filter((item) => item !== timeoutId);
    }, 760);
    rippleTimeoutsRef.current.push(timeoutId);
  };

  const triggerButtonRipple = (event: React.MouseEvent<HTMLElement>) => {
    triggerButtonRippleAt(event.currentTarget, { clientX: event.clientX, clientY: event.clientY });
  };

  return {
    activeRippleEffects,
    ripples,
    triggerButtonRipple,
    triggerButtonRippleAt,
  };
};

export const renderButtonRipples = (ripples: ButtonRipple[], activeRippleEffects: ButtonRippleEffect[]) =>
  ripples.map((rippleItem) => (
    <React.Fragment key={rippleItem.id}>
      {activeRippleEffects.includes('outer') && <span className="cinna-button__ripple cinna-button__ripple--outer" aria-hidden="true" />}
      {activeRippleEffects.includes('inner') && (
        <span
          className="cinna-button__ripple cinna-button__ripple--inner"
          aria-hidden="true"
          style={{ left: rippleItem.x, top: rippleItem.y }}
        />
      )}
      {activeRippleEffects.includes('particles') &&
        rippleItem.particles.map((particle, index) => (
          <span
            key={`${rippleItem.id}-${index}`}
            className="cinna-button__ripple-particle"
            aria-hidden="true"
            style={
              {
                left: particle.x,
                top: particle.y,
                '--button-particle-x': `${particle.translateX}px`,
                '--button-particle-y': `${particle.translateY}px`,
                '--button-particle-size': `${particle.size}px`,
                '--button-particle-delay': `${particle.delay}ms`,
                '--button-particle-duration': `${particle.duration}ms`,
                ...(particle.color ? { '--button-particle-color': particle.color } : null),
              } as React.CSSProperties
            }
          />
        ))}
    </React.Fragment>
  ));
