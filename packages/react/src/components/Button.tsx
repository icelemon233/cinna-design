import React from 'react';
import { cx } from '../utils/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'cream' | 'ghost' | 'text' | 'danger' | 'dashed';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'default' | 'round' | 'circle';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      shape = 'round',
      htmlType = 'button',
      loading = false,
      block = false,
      icon,
      iconPosition = 'start',
      children,
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

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
          className
        )}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...rest}
      >
        {iconPosition === 'start' &&
          (loading ? <span className="cinna-button__spinner" aria-hidden="true" /> : icon ? <span className="cinna-button__icon">{icon}</span> : null)}
        {children ? <span className="cinna-button__label">{children}</span> : null}
        {iconPosition === 'end' &&
          (loading ? <span className="cinna-button__spinner" aria-hidden="true" /> : icon ? <span className="cinna-button__icon">{icon}</span> : null)}
      </button>
    );
  }
);

Button.displayName = 'Button';
