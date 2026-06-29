import React from 'react';
import {
  normalizeButtonRippleOpacity,
  renderButtonRipples,
  useButtonRipple,
  type ButtonRippleEffect,
} from './buttonRipple';
import { getButtonThemeStyles, type ButtonThemeInput } from './buttonTheme';
import { cx } from '../utils/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'cream' | 'ghost' | 'text' | 'danger' | 'dashed';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'default' | 'round' | 'circle';
export type { ButtonRippleEffect };

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
  loadingSpeed?: number | string;
  block?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  ripple?: boolean;
  rippleEffects?: ButtonRippleEffect | ButtonRippleEffect[];
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
  theme?: ButtonThemeInput;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  radius?: number | string;
  shadow?: string;
  activeShadow?: string;
}

const normalizeCssValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const normalizeDuration = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}ms`;
  return value;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      shape = 'round',
      htmlType = 'button',
      loading = false,
      loadingSpeed,
      block = false,
      danger = false,
      icon,
      iconPosition = 'start',
      ripple = true,
      rippleEffects,
      rippleParticleColors,
      rippleParticleOpacity,
      theme,
      color,
      backgroundColor,
      borderColor,
      radius,
      shadow,
      activeShadow,
      children,
      disabled,
      className,
      style,
      onClick,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isDanger = danger || variant === 'danger';
    const { activeRippleEffects, ripples, triggerButtonRipple } = useButtonRipple({
      enabled: ripple,
      disabled: isDisabled,
      effects: rippleEffects,
      particleColors: rippleParticleColors,
    });
    const customStyle = {
      ...getButtonThemeStyles({ theme, color, backgroundColor, borderColor, shadow, activeShadow }),
      ...(radius !== undefined ? { '--button-radius': normalizeCssValue(radius) } : null),
      ...(loadingSpeed !== undefined ? { '--button-loading-speed': normalizeDuration(loadingSpeed) } : null),
      ...(rippleParticleOpacity !== undefined ? { '--button-particle-opacity': normalizeButtonRippleOpacity(rippleParticleOpacity) } : null),
      ...style,
    } as React.CSSProperties;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      triggerButtonRipple(event);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type={htmlType}
        className={cx(
          'cinna-button',
          `cinna-button--${variant}`,
          `cinna-button--${size}`,
          `cinna-button--${shape}`,
          block && 'cinna-button--block',
          isDanger && 'cinna-button--danger-tone',
          className
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        style={customStyle}
        onClick={handleClick}
        {...rest}
      >
        {iconPosition === 'start' &&
          (loading ? <span className="cinna-button__spinner" aria-hidden="true" /> : icon ? <span className="cinna-button__icon">{icon}</span> : null)}
        {children ? <span className="cinna-button__label">{children}</span> : null}
        {iconPosition === 'end' &&
          (loading ? <span className="cinna-button__spinner" aria-hidden="true" /> : icon ? <span className="cinna-button__icon">{icon}</span> : null)}
        {renderButtonRipples(ripples, activeRippleEffects)}
      </button>
    );
  }
);

Button.displayName = 'Button';
