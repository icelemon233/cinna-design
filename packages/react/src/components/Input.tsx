import React, { useId } from 'react';
import { cx } from '../utils/cx';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: InputSize;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'medium', label, helperText, error, prefix, suffix, fullWidth = true, id, className, disabled, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hasError = Boolean(error);
    const descriptionId = helperText || hasError ? `${inputId}-description` : undefined;

    return (
      <div className={cx('cinna-field', fullWidth && 'cinna-field--full', disabled && 'cinna-field--disabled', className)}>
        {label && (
          <label className="cinna-field__label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <div className={cx('cinna-input', `cinna-input--${size}`, hasError && 'cinna-input--error')}>
          {prefix && <span className="cinna-input__affix">{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={descriptionId}
            {...rest}
          />
          {suffix && <span className="cinna-input__affix">{suffix}</span>}
        </div>
        {(error || helperText) && (
          <div id={descriptionId} className={cx('cinna-field__helper', hasError && 'cinna-field__helper--error')}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
