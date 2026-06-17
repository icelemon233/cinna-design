export const cinnaColors = {
  primary: '#A8DFF1',
  primaryHover: '#BDEAF7',
  primaryActive: '#73C4E0',
  primaryDeep: '#3D8EAA',
  background: '#FFF8EE',
  surface: '#FFFCF6',
  surfaceBlue: '#F0FAFE',
  text: '#46332A',
  textSecondary: '#7A665B',
  border: '#E6D6C4',
  butter: '#F6C96D',
  strawberry: '#EA8A98',
  pistachio: '#9BCB8E',
  lavender: '#B9A7EA',
} as const;

export const cinnaRadii = {
  sm: '12px',
  md: '16px',
  lg: '24px',
  pill: '999px',
} as const;

export const cinnaMotion = {
  fast: '120ms',
  base: '180ms',
  slow: '280ms',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  press: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const cinnaTokens = {
  colors: cinnaColors,
  radii: cinnaRadii,
  motion: cinnaMotion,
} as const;

export type CinnaTokens = typeof cinnaTokens;
export type CinnaColorName = keyof typeof cinnaColors;
