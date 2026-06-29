import type React from 'react';
import type { ButtonRippleEffect, ButtonShape, ButtonSize, ButtonThemeName, ButtonVariant } from '@cinna-design/react';

export type SiteLanguage = 'zh' | 'en';
export type DocsNavSortMode = 'default' | 'az' | 'za';
export type DocsNavCategoryId = 'general' | 'layout' | 'navigation' | 'data-entry' | 'data-display' | 'feedback' | 'overlay';

export type ExampleCopy = {
  title: string;
  description: string;
  codeToggle: string;
};

export type ComponentDocExample = {
  id: string;
  zh: ExampleCopy;
  en: ExampleCopy;
  code: string;
  render: () => React.ReactNode;
  surfaceClassName?: string;
};

export type ComponentDocConfig = {
  examples: ComponentDocExample[];
};

export type ButtonExample = {
  id: string;
  zh: ExampleCopy;
  en: ExampleCopy;
  code: string;
};

export type DemoButtonOptions = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: string;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  loadingSpeed?: number | string;
  disabled?: boolean;
  block?: boolean;
  danger?: boolean;
  ripple?: boolean;
  rippleEffects?: ButtonRippleEffect | ButtonRippleEffect[];
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
  theme?: ButtonThemeName;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  radius?: number | string;
  shadow?: string;
  activeShadow?: string;
};

export type DocsNavItem = {
  key: string;
  name: string;
  zhName: string;
  category: DocsNavCategoryId;
};

export type ApiRow = [prop: string, description: string, type: string, defaultValue: string];
export type ApiSection = {
  title: string;
  rows: ApiRow[];
};
export type ApiContent = ApiRow[] | ApiSection[];
