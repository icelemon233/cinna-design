# Motion

Motion should feel like light clouds, frosting, and soft pastry rather than mechanical panels.

## Durations

- Fast: 120ms
- Base: 180ms
- Slow: 280ms
- Float loop: 2800ms to 4200ms

## Easing

```text
Standard: cubic-bezier(0.2, 0, 0, 1)
Press:    cubic-bezier(0.34, 1.56, 0.64, 1)
Float:    ease-in-out
```

## Rules

1. Pressed controls move down by 1-2px and reduce shadow.
2. Hover lift must be subtle: 1-3px, never jumpy.
3. Loading motion should loop smoothly and respect `prefers-reduced-motion`.
4. Modal and popover motion should settle, not bounce aggressively.
