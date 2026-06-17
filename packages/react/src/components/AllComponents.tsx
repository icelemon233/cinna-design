import React, { useEffect, useId, useMemo, useState } from 'react';
import { Button } from './Button';
import { CinnaLoading } from './CinnaLoading';
import { cx } from '../utils/cx';

export type CinnaSize = 'small' | 'medium' | 'large';
export type CinnaStatus = 'info' | 'success' | 'warning' | 'error';

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  muted?: boolean;
  compact?: boolean;
}

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(({ muted, compact, className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-typography', muted && 'cinna-typography--muted', compact && 'cinna-typography--compact', className)} {...rest} />
));
Typography.displayName = 'Typography';

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
  muted?: boolean;
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(({ level = 2, muted, className, ...rest }, ref) => {
  const titleClassName = cx('cinna-title', `cinna-title--${level}`, muted && 'cinna-title--muted', className);
  if (level === 1) return <h1 ref={ref} className={titleClassName} {...rest} />;
  if (level === 2) return <h2 ref={ref} className={titleClassName} {...rest} />;
  if (level === 3) return <h3 ref={ref} className={titleClassName} {...rest} />;
  if (level === 4) return <h4 ref={ref} className={titleClassName} {...rest} />;
  return <h5 ref={ref} className={titleClassName} {...rest} />;
});
Title.displayName = 'Title';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  muted?: boolean;
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(({ muted, className, ...rest }, ref) => (
  <p ref={ref} className={cx('cinna-paragraph', muted && 'cinna-paragraph--muted', className)} {...rest} />
));
Paragraph.displayName = 'Paragraph';

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'secondary' | 'muted' | CinnaStatus;
  strong?: boolean;
  code?: boolean;
  mark?: boolean;
  delete?: boolean;
  underline?: boolean;
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(({ tone = 'default', strong, code, mark, delete: deleted, underline, className, ...rest }, ref) => (
  <span
    ref={ref}
    className={cx(
      'cinna-text',
      `cinna-text--${tone}`,
      strong && 'cinna-text--strong',
      code && 'cinna-text--code',
      mark && 'cinna-text--mark',
      deleted && 'cinna-text--delete',
      underline && 'cinna-text--underline',
      className
    )}
    {...rest}
  />
));
Text.displayName = 'Text';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: CinnaSize | number;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  split?: React.ReactNode;
  block?: boolean;
}

export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  ({ direction = 'horizontal', size = 'medium', align = 'center', justify, wrap = false, split, block, className, style, children, ...rest }, ref) => {
    const gap = typeof size === 'number' ? `${size}px` : undefined;
    const childList = React.Children.toArray(children).filter(Boolean);
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-space',
          `cinna-space--${direction}`,
          typeof size === 'string' && `cinna-space--${size}`,
          wrap && 'cinna-space--wrap',
          block && 'cinna-space--block',
          className
        )}
        style={{ alignItems: align, justifyContent: justify, gap, ...style }}
        {...rest}
      >
        {split
          ? childList.map((child, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="cinna-space__split">{split}</span>}
                {child}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  }
);
Space.displayName = 'Space';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  gap?: CinnaSize | number;
  wrap?: boolean;
  inline?: boolean;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(({ vertical, align, justify, gap = 'medium', wrap, inline, className, style, ...rest }, ref) => {
  const resolvedGap = typeof gap === 'number' ? `${gap}px` : undefined;
  return (
    <div
      ref={ref}
      className={cx('cinna-flex', inline && 'cinna-flex--inline', vertical && 'cinna-flex--vertical', typeof gap === 'string' && `cinna-flex--${gap}`, wrap && 'cinna-flex--wrap', className)}
      style={{ alignItems: align, justifyContent: justify, gap: resolvedGap, ...style }}
      {...rest}
    />
  );
});
Flex.displayName = 'Flex';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'left' | 'center' | 'right';
  vertical?: boolean;
  dashed?: boolean;
  plain?: boolean;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(({ orientation = 'center', vertical, dashed = true, plain, className, children, ...rest }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cx(
      'cinna-divider',
      vertical ? 'cinna-divider--vertical' : 'cinna-divider--horizontal',
      `cinna-divider--${orientation}`,
      dashed && 'cinna-divider--dashed',
      plain && 'cinna-divider--plain',
      className
    )}
    {...rest}
  >
    {children && <span>{children}</span>}
  </div>
));
Divider.displayName = 'Divider';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(({ gutter = 12, align, justify, className, style, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-row', className)} style={{ alignItems: align, justifyContent: justify, gap: gutter, ...style }} {...rest} />
));
Row.displayName = 'Row';

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  offset?: number;
  order?: number;
  flex?: React.CSSProperties['flex'];
}

export const Col = React.forwardRef<HTMLDivElement, ColProps>(({ span = 24, offset = 0, order, flex, className, style, ...rest }, ref) => {
  const width = `${(span / 24) * 100}%`;
  return (
    <div
      ref={ref}
      className={cx('cinna-col', className)}
      style={{ flex: flex ?? '0 0 auto', flexBasis: width, maxWidth: width, marginLeft: offset ? `${(offset / 24) * 100}%` : undefined, order, ...style }}
      {...rest}
    />
  );
});
Col.displayName = 'Col';

export const Layout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-layout', className)} {...rest} />
));
Layout.displayName = 'Layout';

export const LayoutHeader = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...rest }, ref) => (
  <header ref={ref} className={cx('cinna-layout__header', className)} {...rest} />
));
LayoutHeader.displayName = 'LayoutHeader';

export const LayoutSider = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...rest }, ref) => (
  <aside ref={ref} className={cx('cinna-layout__sider', className)} {...rest} />
));
LayoutSider.displayName = 'LayoutSider';

export const LayoutContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...rest }, ref) => (
  <main ref={ref} className={cx('cinna-layout__content', className)} {...rest} />
));
LayoutContent.displayName = 'LayoutContent';

export const LayoutFooter = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...rest }, ref) => (
  <footer ref={ref} className={cx('cinna-layout__footer', className)} {...rest} />
));
LayoutFooter.displayName = 'LayoutFooter';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CinnaStatus;
  message: React.ReactNode;
  description?: React.ReactNode;
  closable?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
  action?: React.ReactNode;
  closeText?: React.ReactNode;
  banner?: boolean;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ type = 'info', message, description, closable, icon, showIcon = true, action, closeText, banner, onClose, className, ...rest }, ref) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div ref={ref} className={cx('cinna-alert', `cinna-alert--${type}`, banner && 'cinna-alert--banner', className)} role={type === 'error' ? 'alert' : 'status'} {...rest}>
      {showIcon && (
        <span className="cinna-alert__icon" aria-hidden="true">
          {icon ?? statusIcon(type)}
        </span>
      )}
      <div className="cinna-alert__content">
        <div className="cinna-alert__message">{message}</div>
        {description && <div className="cinna-alert__description">{description}</div>}
      </div>
      {action && <div className="cinna-alert__action">{action}</div>}
      {closable && (
        <button
          className="cinna-alert__close"
          type="button"
          aria-label="Close alert"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          {closeText ?? 'x'}
        </button>
      )}
    </div>
  );
});
Alert.displayName = 'Alert';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'blue' | 'butter' | 'strawberry' | 'pistachio' | 'lavender' | 'cream';
  closable?: boolean;
  onClose?: () => void;
  bordered?: boolean;
  icon?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(({ color = 'blue', closable, onClose, bordered = true, icon, className, children, ...rest }, ref) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <span ref={ref} className={cx('cinna-tag', `cinna-tag--${color}`, !bordered && 'cinna-tag--borderless', className)} {...rest}>
      {icon && <span className="cinna-tag__icon">{icon}</span>}
      {children}
      {closable && (
        <button
          className="cinna-tag__close"
          type="button"
          aria-label="Close tag"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          x
        </button>
      )}
    </span>
  );
});
Tag.displayName = 'Tag';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: React.ReactNode;
  dot?: boolean;
  status?: CinnaStatus;
  overflowCount?: number;
  showZero?: boolean;
  text?: React.ReactNode;
  offset?: [number, number];
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ count, dot, status = 'info', overflowCount = 99, showZero, text, offset, className, children, ...rest }, ref) => {
  const numericCount = typeof count === 'number' ? count : undefined;
  const hidden = !dot && count === undefined && !text;
  const displayCount = numericCount !== undefined && numericCount > overflowCount ? `${overflowCount}+` : count;
  const markStyle = offset ? { right: offset[0], top: offset[1] } : undefined;
  return (
  <span ref={ref} className={cx('cinna-badge', !children && 'cinna-badge--standalone', className)} {...rest}>
    {children}
    {!hidden && (showZero || dot || count !== 0 || text) && (
      <span className={cx('cinna-badge__mark', dot && 'cinna-badge__mark--dot', Boolean(text && !count) && 'cinna-badge__mark--text', `cinna-badge__mark--${status}`)} style={markStyle}>
        {dot ? null : text ?? displayCount}
      </span>
    )}
  </span>
  );
});
Badge.displayName = 'Badge';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  size?: CinnaSize | number;
  shape?: 'circle' | 'square';
  icon?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(({ src, alt = '', size = 'medium', shape = 'circle', icon, className, style, children, ...rest }, ref) => {
  const resolved = typeof size === 'number' ? `${size}px` : undefined;
  return (
    <span ref={ref} className={cx('cinna-avatar', typeof size === 'string' && `cinna-avatar--${size}`, `cinna-avatar--${shape}`, className)} style={{ width: resolved, height: resolved, ...style }} {...rest}>
      {src ? <img src={src} alt={alt} /> : icon ?? children}
    </span>
  );
});
Avatar.displayName = 'Avatar';

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(({ description = 'No data yet', image, actions, className, children, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-empty', className)} {...rest}>
    <div className="cinna-empty__cloud" aria-hidden="true">{image}</div>
    <div className="cinna-empty__description">{description}</div>
    {actions ?? children}
  </div>
));
Empty.displayName = 'Empty';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  percent?: number;
  status?: Exclude<CinnaStatus, 'info'> | 'normal';
  showInfo?: boolean;
  type?: 'line' | 'circle';
  strokeColor?: string;
  format?: (percent: number) => React.ReactNode;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ percent = 0, status = 'normal', showInfo = true, type = 'line', strokeColor, format, className, ...rest }, ref) => {
  const safePercent = clamp(percent, 0, 100);
  const progressText = format ? format(safePercent) : `${safePercent}%`;
  return (
    <div ref={ref} className={cx('cinna-progress', `cinna-progress--${status}`, `cinna-progress--${type}`, className)} {...rest}>
      <div className="cinna-progress__track">
        <div className="cinna-progress__bar" style={{ width: type === 'line' ? `${safePercent}%` : undefined, ['--cinna-progress-percent' as string]: safePercent, background: strokeColor }} />
      </div>
      {showInfo && <span className="cinna-progress__text">{progressText}</span>}
    </div>
  );
});
Progress.displayName = 'Progress';

export interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  rows?: number;
  avatar?: boolean;
  active?: boolean;
  title?: boolean;
  round?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ rows = 3, avatar, active = true, title = true, round, className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-skeleton', active && 'cinna-skeleton--active', round && 'cinna-skeleton--round', className)} {...rest}>
    {avatar && <span className="cinna-skeleton__avatar" />}
    <div className="cinna-skeleton__lines">
      {title && <span className="cinna-skeleton__line cinna-skeleton__line--title" />}
      {Array.from({ length: rows }).map((_, index) => (
        <span key={index} className="cinna-skeleton__line" style={{ width: index === rows - 1 ? '68%' : '100%' }} />
      ))}
    </div>
  </div>
));
Skeleton.displayName = 'Skeleton';

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: CinnaStatus;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Result = React.forwardRef<HTMLDivElement, ResultProps>(({ status = 'info', title, subTitle, extra, icon, className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-result', `cinna-result--${status}`, className)} {...rest}>
    <div className="cinna-result__icon" aria-hidden="true">
      {icon ?? statusIcon(status)}
    </div>
    <div className="cinna-result__title">{title}</div>
    {subTitle && <div className="cinna-result__subtitle">{subTitle}</div>}
    {extra && <div className="cinna-result__extra">{extra}</div>}
  </div>
));
Result.displayName = 'Result';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: CinnaSize;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  loading?: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ checked, defaultChecked, onChange, size = 'medium', checkedChildren, unCheckedChildren, loading, className, disabled, ...rest }, ref) => {
  const [inner, setInner] = useState(Boolean(defaultChecked));
  const isChecked = checked ?? inner;
  const toggle = () => {
    if (disabled || loading) return;
    const next = !isChecked;
    setInner(next);
    onChange?.(next);
  };

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled || loading}
      className={cx('cinna-switch', `cinna-switch--${size}`, isChecked && 'cinna-switch--checked', loading && 'cinna-switch--loading', className)}
      onClick={toggle}
      {...rest}
    >
      <span className="cinna-switch__handle" />
      {(checkedChildren || unCheckedChildren) && <span className="cinna-switch__label">{isChecked ? checkedChildren : unCheckedChildren}</span>}
    </button>
  );
});
Switch.displayName = 'Switch';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, indeterminate, className, ...rest }, ref) => (
  <label className={cx('cinna-check', className)}>
    <input ref={ref} type="checkbox" {...rest} />
    <span className={cx('cinna-check__box', indeterminate && 'cinna-check__box--indeterminate')} aria-hidden="true" />
    {label && <span className="cinna-check__label">{label}</span>}
  </label>
));
Checkbox.displayName = 'Checkbox';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ label, className, ...rest }, ref) => (
  <label className={cx('cinna-radio', className)}>
    <input ref={ref} type="radio" {...rest} />
    <span className="cinna-radio__dot" aria-hidden="true" />
    {label && <span className="cinna-radio__label">{label}</span>}
  </label>
));
Radio.displayName = 'Radio';

export interface RadioGroupOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  optionType?: 'default' | 'button';
  size?: CinnaSize;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ options, value, defaultValue, name, onChange, direction = 'horizontal', optionType = 'default', size = 'medium', className, ...rest }, ref) => {
  const generatedName = useId();
  const [inner, setInner] = useState(defaultValue);
  const selected = value ?? inner;
  const groupName = name ?? generatedName;

  return (
    <div ref={ref} className={cx('cinna-radio-group', `cinna-radio-group--${direction}`, `cinna-radio-group--${optionType}`, `cinna-radio-group--${size}`, className)} {...rest}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={groupName}
          value={option.value}
          checked={selected === option.value}
          disabled={option.disabled}
          label={option.label}
          onChange={() => {
            setInner(option.value);
            onChange?.(option.value);
          }}
        />
      ))}
    </div>
  );
});
RadioGroup.displayName = 'RadioGroup';

export interface SelectOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: SelectOption[];
  controlSize?: CinnaSize;
  placeholder?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  allowClear?: boolean;
  disabled?: boolean;
  mode?: 'single' | 'multiple';
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, controlSize = 'medium', placeholder, value, defaultValue, onChange, allowClear, disabled, mode = 'single', className, ...rest }, ref) => {
    const [open, setOpen] = useState(false);
    const [inner, setInner] = useState<string | string[]>(defaultValue ?? (mode === 'multiple' ? [] : ''));
    const selected = value ?? inner;
    const selectedValues = Array.isArray(selected) ? selected : selected ? [selected] : [];
    const selectedLabels = options.filter((option) => selectedValues.includes(option.value)).map((option) => option.label);
    const label = selectedLabels.length ? selectedLabels : [placeholder ?? 'Select'];

    const choose = (nextValue: string) => {
      const next = mode === 'multiple'
        ? selectedValues.includes(nextValue)
          ? selectedValues.filter((item) => item !== nextValue)
          : [...selectedValues, nextValue]
        : nextValue;
      setInner(next);
      onChange?.(next);
      if (mode === 'single') setOpen(false);
    };

    return (
      <div ref={ref} className={cx('cinna-select', `cinna-select--${controlSize}`, open && 'cinna-select--open', disabled && 'cinna-select--disabled', className)} {...rest}>
        <button type="button" className="cinna-select__control" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((next) => !next)}>
          <span className={cx(!selectedLabels.length && 'cinna-select__placeholder')}>
            {mode === 'multiple' && selectedLabels.length ? selectedLabels.map((item, index) => <em key={index}>{item}</em>) : label}
          </span>
          <span className="cinna-select__arrow" aria-hidden="true">v</span>
        </button>
        {allowClear && selectedValues.length > 0 && (
          <button
            type="button"
            className="cinna-select__clear"
            aria-label="Clear selection"
            onClick={() => {
              const next = mode === 'multiple' ? [] : '';
              setInner(next);
              onChange?.(next);
            }}
          >
            x
          </button>
        )}
        {open && (
          <div className="cinna-select__popup" role="listbox" aria-multiselectable={mode === 'multiple' || undefined}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selectedValues.includes(option.value)}
                disabled={option.disabled}
                className={cx('cinna-select__option', selectedValues.includes(option.value) && 'cinna-select__option--active')}
                onClick={() => choose(option.value)}
              >
                <span>{option.label}</span>
                {selectedValues.includes(option.value) && <strong aria-hidden="true">✓</strong>}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  showValue?: boolean;
  marks?: Record<number, React.ReactNode>;
  tooltip?: boolean;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(({ showValue, marks, tooltip, className, value, defaultValue, onChange, min = 0, max = 100, ...rest }, ref) => {
  const [inner, setInner] = useState(String(defaultValue ?? min));
  const current = String(value ?? inner);
  const currentNumber = Number(current);
  const minNumber = Number(min);
  const maxNumber = Number(max);
  const percent = maxNumber === minNumber ? 0 : ((currentNumber - minNumber) / (maxNumber - minNumber)) * 100;

  return (
    <label className={cx('cinna-slider', className)} style={{ ['--cinna-slider-percent' as string]: `${percent}%` }}>
      <span className="cinna-slider__track">
        <input
          ref={ref}
          type="range"
          value={current}
          min={min}
          max={max}
          onChange={(event) => {
            setInner(event.currentTarget.value);
            onChange?.(event);
          }}
          {...rest}
        />
        {tooltip && <em className="cinna-slider__tooltip">{current}</em>}
      </span>
      {showValue && <span className="cinna-slider__value">{current}</span>}
      {marks && (
        <span className="cinna-slider__marks">
          {Object.entries(marks).map(([mark, label]) => (
            <small key={mark} style={{ left: `${((Number(mark) - minNumber) / (maxNumber - minNumber)) * 100}%` }}>
              {label}
            </small>
          ))}
        </span>
      )}
    </label>
  );
});
Slider.displayName = 'Slider';

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  controlSize?: CinnaSize;
  controls?: boolean;
  onChange?: (value: number | null) => void;
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(({ controlSize = 'medium', controls = true, className, value, defaultValue, min, max, step = 1, disabled, onChange, ...rest }, ref) => {
  const [inner, setInner] = useState<number | null>(defaultValue === undefined ? null : Number(defaultValue));
  const current = value === undefined ? inner : Number(value);
  const update = (next: number | null) => {
    const normalized = next === null ? null : clampNumber(next, min === undefined ? -Infinity : Number(min), max === undefined ? Infinity : Number(max));
    setInner(normalized);
    onChange?.(normalized);
  };

  return (
    <span className={cx('cinna-input-number', `cinna-input-number--${controlSize}`, disabled && 'cinna-input-number--disabled', className)}>
      {controls && (
        <button type="button" disabled={disabled} aria-label="Decrease value" onClick={() => update((current ?? 0) - Number(step))}>
          -
        </button>
      )}
      <input
        ref={ref}
        type="number"
        value={current ?? ''}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(event) => update(event.currentTarget.value === '' ? null : Number(event.currentTarget.value))}
        {...rest}
      />
      {controls && (
        <button type="button" disabled={disabled} aria-label="Increase value" onClick={() => update((current ?? 0) + Number(step))}>
          +
        </button>
      )}
    </span>
  );
});
InputNumber.displayName = 'InputNumber';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSize?: boolean;
  showCount?: boolean;
  maxLength?: number;
  status?: Exclude<CinnaStatus, 'info'>;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ autoSize, showCount, maxLength, status, className, value, defaultValue, onChange, ...rest }, ref) => {
  const [inner, setInner] = useState(String(defaultValue ?? ''));
  const current = String(value ?? inner);
  return (
    <label className={cx('cinna-textarea-wrap', status && `cinna-textarea-wrap--${status}`, className)}>
      <textarea
        ref={ref}
        className={cx('cinna-textarea', autoSize && 'cinna-textarea--auto')}
        value={current}
        maxLength={maxLength}
        onChange={(event) => {
          setInner(event.currentTarget.value);
          onChange?.(event);
        }}
        {...rest}
      />
      {showCount && (
        <span className="cinna-textarea__count">
          {current.length}
          {maxLength ? ` / ${maxLength}` : null}
        </span>
      )}
    </label>
  );
});
TextArea.displayName = 'TextArea';

export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  allowClear?: boolean;
  character?: React.ReactNode | ((index: number) => React.ReactNode);
  disabled?: boolean;
}

export const Rate = React.forwardRef<HTMLDivElement, RateProps>(({ count = 5, value, defaultValue = 0, onChange, allowClear, character = '*', disabled, className, ...rest }, ref) => {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const choose = (next: number) => {
    if (disabled) return;
    const normalized = allowClear && current === next ? 0 : next;
    setInner(normalized);
    onChange?.(normalized);
  };

  return (
    <div ref={ref} className={cx('cinna-rate', disabled && 'cinna-rate--disabled', className)} {...rest}>
      {Array.from({ length: count }).map((_, index) => {
        const next = index + 1;
        return (
          <button
            key={next}
            type="button"
            aria-label={`${next} stars`}
            aria-pressed={current >= next}
            className={cx('cinna-rate__star', current >= next && 'cinna-rate__star--active')}
            disabled={disabled}
            onClick={() => choose(next)}
          >
            {typeof character === 'function' ? character(next) : character}
          </button>
        );
      })}
    </div>
  );
});
Rate.displayName = 'Rate';

export interface SegmentedOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SegmentedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  block?: boolean;
  size?: CinnaSize;
}

export const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(({ options, value, defaultValue, onChange, block, size = 'medium', className, ...rest }, ref) => {
  const [inner, setInner] = useState(defaultValue ?? options[0]?.value);
  const selected = value ?? inner;

  return (
    <div ref={ref} className={cx('cinna-segmented', `cinna-segmented--${size}`, block && 'cinna-segmented--block', className)} {...rest}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={option.disabled}
          className={cx('cinna-segmented__item', selected === option.value && 'cinna-segmented__item--active')}
          onClick={() => {
            setInner(option.value);
            onChange?.(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});
Segmented.displayName = 'Segmented';

export interface TabsItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabsItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  tabPosition?: 'top' | 'left';
  type?: 'line' | 'card';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ items, activeKey, defaultActiveKey, onChange, tabPosition = 'top', type = 'line', className, ...rest }, ref) => {
  const [inner, setInner] = useState(defaultActiveKey ?? items[0]?.key);
  const selected = activeKey ?? inner;
  const activeItem = items.find((item) => item.key === selected) ?? items[0];

  return (
    <div ref={ref} className={cx('cinna-tabs', `cinna-tabs--${tabPosition}`, `cinna-tabs--${type}`, className)} {...rest}>
      <div className="cinna-tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={selected === item.key}
            disabled={item.disabled}
            className={cx('cinna-tabs__tab', selected === item.key && 'cinna-tabs__tab--active')}
            onClick={() => {
              setInner(item.key);
              onChange?.(item.key);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="cinna-tabs__panel" role="tabpanel">
        {activeItem?.children}
      </div>
    </div>
  );
});
Tabs.displayName = 'Tabs';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: 'wait' | 'process' | 'finish' | 'error';
  icon?: React.ReactNode;
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
  size?: CinnaSize;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(({ items, current = 0, direction = 'horizontal', size = 'medium', className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-steps', `cinna-steps--${direction}`, `cinna-steps--${size}`, className)} {...rest}>
    {items.map((item, index) => (
      <div key={index} className={cx('cinna-step', index < current && 'cinna-step--done', index === current && 'cinna-step--current', item.status && `cinna-step--${item.status}`)}>
        <span className="cinna-step__dot">{item.icon ?? index + 1}</span>
        <span>
          <strong>{item.title}</strong>
          {item.description && <small>{item.description}</small>}
        </span>
      </div>
    ))}
  </div>
));
Steps.displayName = 'Steps';

export interface BreadcrumbItem {
  title: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ items, separator = '/', className, ...rest }, ref) => (
  <nav ref={ref} className={cx('cinna-breadcrumb', className)} aria-label="Breadcrumb" {...rest}>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {item.href ? <a href={item.href}>{item.title}</a> : <span>{item.title}</span>}
        {index < items.length - 1 && <em>{separator}</em>}
      </React.Fragment>
    ))}
  </nav>
));
Breadcrumb.displayName = 'Breadcrumb';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current?: number;
  defaultCurrent?: number;
  total: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  simple?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(({ current, defaultCurrent = 1, total, pageSize = 10, onChange, simple, showTotal, className, ...rest }, ref) => {
  const [inner, setInner] = useState(defaultCurrent);
  const active = current ?? inner;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageList = buildPageList(active, pages);
  const setPage = (page: number) => {
    const next = clampNumber(page, 1, pages);
    setInner(next);
    onChange?.(next);
  };
  const range: [number, number] = [Math.min(total, (active - 1) * pageSize + 1), Math.min(total, active * pageSize)];

  return (
    <div ref={ref} className={cx('cinna-pagination', className)} {...rest}>
      {showTotal && <span className="cinna-pagination__total">{showTotal(total, range)}</span>}
      <button type="button" disabled={active <= 1} onClick={() => setPage(active - 1)}>
        Prev
      </button>
      {simple ? (
        <span className="cinna-pagination__simple">{active} / {pages}</span>
      ) : (
        pageList.map((page, index) =>
          page === 'gap' ? (
            <span key={`gap-${index}`} className="cinna-pagination__gap">...</span>
          ) : (
            <button key={page} type="button" className={cx(page === active && 'cinna-pagination__page--active')} onClick={() => setPage(page)}>
              {page}
            </button>
          )
        )
      )}
      <button type="button" disabled={active >= pages} onClick={() => setPage(active + 1)}>
        Next
      </button>
    </div>
  );
});
Pagination.displayName = 'Pagination';

export interface MenuItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: MenuItem[];
  selectedKey?: string;
  defaultSelectedKey?: string;
  mode?: 'vertical' | 'horizontal';
  onSelect?: (key: string) => void;
  inlineIndent?: number;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(({ items, selectedKey, defaultSelectedKey, mode = 'vertical', onSelect, inlineIndent = 18, className, ...rest }, ref) => {
  const [inner, setInner] = useState(defaultSelectedKey);
  const active = selectedKey ?? inner;
  const select = (key: string) => {
    setInner(key);
    onSelect?.(key);
  };
  return (
    <div ref={ref} className={cx('cinna-menu', `cinna-menu--${mode}`, className)} role="menu" {...rest}>
      {renderMenuItems(items, active, select, inlineIndent)}
    </div>
  );
});
Menu.displayName = 'Menu';

export interface CollapseItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: CollapseItem[];
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  accordion?: boolean;
  bordered?: boolean;
  onChange?: (keys: string[]) => void;
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(({ items, activeKey, defaultActiveKey, accordion, bordered = true, onChange, className, ...rest }, ref) => {
  const defaults = toArray(defaultActiveKey);
  const controlled = toArray(activeKey);
  const [inner, setInner] = useState(defaults);
  const active = activeKey === undefined ? inner : controlled;
  const toggle = (key: string) => {
    const next = active.includes(key) ? active.filter((item) => item !== key) : accordion ? [key] : [...active, key];
    setInner(next);
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cx('cinna-collapse', !bordered && 'cinna-collapse--borderless', className)} {...rest}>
      {items.map((item) => (
        <div key={item.key} className={cx('cinna-collapse__item', item.disabled && 'cinna-collapse__item--disabled')}>
          <button type="button" disabled={item.disabled} aria-expanded={active.includes(item.key)} onClick={() => toggle(item.key)}>
            <span>{item.label}</span>
            {item.extra && <em>{item.extra}</em>}
          </button>
          {active.includes(item.key) && <div>{item.children}</div>}
        </div>
      ))}
    </div>
  );
});
Collapse.displayName = 'Collapse';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  title: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
}

export const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(({ title, placement = 'top', trigger = 'hover', className, children, ...rest }, ref) => {
  const [open, setOpen] = useState(false);
  return (
    <span
      ref={ref}
      className={cx('cinna-tooltip', `cinna-tooltip--${placement}`, trigger === 'click' && open && 'cinna-tooltip--open', className)}
      onClick={trigger === 'click' ? () => setOpen((next) => !next) : undefined}
      {...rest}
    >
      {children}
      <span className="cinna-tooltip__bubble" role="tooltip">
        {title}
      </span>
    </span>
  );
});
Tooltip.displayName = 'Tooltip';

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title' | 'content'> {
  content: React.ReactNode;
  title?: React.ReactNode;
  trigger?: 'hover' | 'click';
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Popover = React.forwardRef<HTMLSpanElement, PopoverProps>(({ content, title, trigger = 'hover', placement = 'bottom', className, children, ...rest }, ref) => {
  const [open, setOpen] = useState(false);
  return (
    <span
      ref={ref}
      className={cx('cinna-popover', `cinna-popover--${placement}`, trigger === 'click' && open && 'cinna-popover--open', className)}
      onClick={trigger === 'click' ? () => setOpen((next) => !next) : undefined}
      {...rest}
    >
      {children}
      <span className="cinna-popover__panel">
        {title && <strong>{title}</strong>}
        <span>{content}</span>
      </span>
    </span>
  );
});
Popover.displayName = 'Popover';

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDetailsElement>, 'onSelect'> {
  label: React.ReactNode;
  menu?: React.ReactNode;
  items?: MenuItem[];
  trigger?: 'click' | 'hover';
  onSelect?: (key: string) => void;
}

export const Dropdown = React.forwardRef<HTMLDetailsElement, DropdownProps>(({ label, menu, items, trigger = 'click', onSelect, className, ...rest }, ref) => (
  <details ref={ref} className={cx('cinna-dropdown', trigger === 'hover' && 'cinna-dropdown--hover', className)} {...rest}>
    <summary>{label}</summary>
    <div className="cinna-dropdown__menu">
      {items ? <Menu items={items} onSelect={onSelect} /> : menu}
    </div>
  </details>
));
Dropdown.displayName = 'Dropdown';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  title?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  maskClosable?: boolean;
  width?: number | string;
  centered?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({ open, title, onCancel, onOk, footer, okText = 'OK', cancelText = 'Cancel', maskClosable = true, width, centered = true, className, children, ...rest }, ref) => {
  if (!open) return null;
  return (
    <div className={cx('cinna-overlay', centered && 'cinna-overlay--centered')} onClick={maskClosable ? onCancel : undefined}>
      <div ref={ref} className={cx('cinna-modal', className)} role="dialog" aria-modal="true" style={{ width }} onClick={(event) => event.stopPropagation()} {...rest}>
        <div className="cinna-modal__header">
          <strong>{title}</strong>
          <button type="button" aria-label="Close modal" onClick={onCancel}>
            x
          </button>
        </div>
        <div className="cinna-modal__body">{children}</div>
        <div className="cinna-modal__footer">
          {footer ?? (
            <>
              <Button variant="cream" onClick={onCancel}>{cancelText}</Button>
              <Button onClick={onOk}>{okText}</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});
Modal.displayName = 'Modal';

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  title?: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  onClose?: () => void;
  extra?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  maskClosable?: boolean;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(({ open, title, placement = 'right', onClose, extra, width, height, maskClosable = true, className, children, ...rest }, ref) => {
  if (!open) return null;
  return (
    <div className="cinna-overlay cinna-overlay--drawer" onClick={maskClosable ? onClose : undefined}>
      <div ref={ref} className={cx('cinna-drawer', `cinna-drawer--${placement}`, className)} role="dialog" aria-modal="true" style={{ width, height }} onClick={(event) => event.stopPropagation()} {...rest}>
        <div className="cinna-drawer__header">
          <strong>{title}</strong>
          <span className="cinna-drawer__extra">
            {extra}
            <button type="button" aria-label="Close drawer" onClick={onClose}>
              x
            </button>
          </span>
        </div>
        <div className="cinna-drawer__body">{children}</div>
      </div>
    </div>
  );
});
Drawer.displayName = 'Drawer';

export interface PopconfirmProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  placement?: 'top' | 'bottom';
}

export const Popconfirm = React.forwardRef<HTMLSpanElement, PopconfirmProps>(({ title, description, onConfirm, onCancel, okText = 'OK', cancelText = 'Cancel', placement = 'bottom', className, children, ...rest }, ref) => {
  const [open, setOpen] = useState(false);
  return (
    <span ref={ref} className={cx('cinna-popconfirm', `cinna-popconfirm--${placement}`, className)} {...rest}>
      <span onClick={() => setOpen(true)}>{children}</span>
      {open && (
        <span className="cinna-popconfirm__panel">
          <strong>{title}</strong>
          {description && <span>{description}</span>}
          <span className="cinna-popconfirm__actions">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onCancel?.();
              }}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onConfirm?.();
              }}
            >
              {okText}
            </button>
          </span>
        </span>
      )}
    </span>
  );
});
Popconfirm.displayName = 'Popconfirm';

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  title: React.ReactNode;
  dataIndex?: keyof T;
  key?: string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sorter?: (a: T, b: T) => number;
  width?: number | string;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T, index: number) => React.Key);
  bordered?: boolean;
  size?: CinnaSize;
  emptyText?: React.ReactNode;
  rowSelection?: {
    selectedRowKeys?: React.Key[];
    onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  };
}

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({ columns, dataSource, rowKey, bordered, size = 'medium', emptyText = 'No data', rowSelection, className, ...rest }: TableProps<T>) {
  const [sortState, setSortState] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selected, setSelected] = useState<React.Key[]>(rowSelection?.selectedRowKeys ?? []);
  const resolveKey = (record: T, index: number) => {
    if (typeof rowKey === 'function') return rowKey(record, index);
    if (rowKey) return String(record[rowKey]);
    return String(record.key ?? index);
  };
  const activeSelected = rowSelection?.selectedRowKeys ?? selected;
  const sortedData = useMemo(() => {
    if (!sortState) return dataSource;
    const column = columns.find((item, index) => (item.key ?? String(item.dataIndex ?? index)) === sortState.key);
    if (!column?.sorter) return dataSource;
    return [...dataSource].sort((a, b) => (sortState.direction === 'asc' ? column.sorter!(a, b) : column.sorter!(b, a)));
  }, [columns, dataSource, sortState]);
  const updateSelection = (key: React.Key, record: T, checked: boolean) => {
    const next = checked ? [...activeSelected, key] : activeSelected.filter((item) => item !== key);
    setSelected(next);
    rowSelection?.onChange?.(next, sortedData.filter((item, index) => next.includes(resolveKey(item, index))));
  };

  return (
    <div className={cx('cinna-table', `cinna-table--${size}`, bordered && 'cinna-table--bordered', className)} {...rest}>
      <table>
        <thead>
          <tr>
            {rowSelection && <th className="cinna-table__selection" />}
            {columns.map((column, index) => (
              <th key={column.key ?? String(column.dataIndex ?? index)} style={{ textAlign: column.align, width: column.width }}>
                {column.sorter ? (
                  <button
                    type="button"
                    className="cinna-table__sorter"
                    onClick={() => {
                      const key = column.key ?? String(column.dataIndex ?? index);
                      setSortState((current) => (current?.key === key && current.direction === 'asc' ? { key, direction: 'desc' } : { key, direction: 'asc' }));
                    }}
                  >
                    {column.title}
                    <span aria-hidden="true">{sortState?.key === (column.key ?? String(column.dataIndex ?? index)) ? (sortState.direction === 'asc' ? 'asc' : 'desc') : 'sort'}</span>
                  </button>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length ? (
            sortedData.map((record, rowIndex) => {
              const key = resolveKey(record, rowIndex);
              return (
                <tr key={key} className={cx(activeSelected.includes(key) && 'cinna-table__row--selected')}>
                  {rowSelection && (
                    <td className="cinna-table__selection">
                      <Checkbox aria-label={`Select row ${rowIndex + 1}`} checked={activeSelected.includes(key)} onChange={(event) => updateSelection(key, record, event.currentTarget.checked)} />
                    </td>
                  )}
                  {columns.map((column, colIndex) => {
                    const value = column.dataIndex ? record[column.dataIndex] : undefined;
                    return (
                      <td key={column.key ?? String(column.dataIndex ?? colIndex)} style={{ textAlign: column.align }}>
                        {column.render ? column.render(value, record, rowIndex) : renderCell(value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="cinna-table__empty" colSpan={columns.length + (rowSelection ? 1 : 0)}>
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export interface ListProps<T = unknown> extends React.HTMLAttributes<HTMLDivElement> {
  dataSource: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  itemLayout?: 'horizontal' | 'vertical';
}

export function List<T = unknown>({ dataSource, renderItem, header, footer, bordered = true, itemLayout = 'horizontal', className, ...rest }: ListProps<T>) {
  return (
    <div className={cx('cinna-list', `cinna-list--${itemLayout}`, !bordered && 'cinna-list--borderless', className)} {...rest}>
      {header && <div className="cinna-list__header">{header}</div>}
      {dataSource.map((item, index) => (
        <div key={index} className="cinna-list__item">
          {renderItem(item, index)}
        </div>
      ))}
      {footer && <div className="cinna-list__footer">{footer}</div>}
    </div>
  );
}

export interface DescriptionItem {
  label: React.ReactNode;
  children: React.ReactNode;
}

export interface DescriptionsProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
  column?: number;
  bordered?: boolean;
  size?: CinnaSize;
}

export const Descriptions = React.forwardRef<HTMLDListElement, DescriptionsProps>(({ items, column, bordered = true, size = 'medium', className, style, ...rest }, ref) => (
  <dl ref={ref} className={cx('cinna-descriptions', `cinna-descriptions--${size}`, !bordered && 'cinna-descriptions--borderless', className)} style={{ gridTemplateColumns: column ? `repeat(${column}, minmax(0, 1fr))` : undefined, ...style }} {...rest}>
    {items.map((item, index) => (
      <div key={index}>
        <dt>{item.label}</dt>
        <dd>{item.children}</dd>
      </div>
    ))}
  </dl>
));
Descriptions.displayName = 'Descriptions';

export interface TimelineItem {
  children: React.ReactNode;
  color?: 'blue' | 'butter' | 'strawberry' | 'pistachio';
  label?: React.ReactNode;
  dot?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
  mode?: 'left' | 'alternate';
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(({ items, mode = 'left', className, ...rest }, ref) => (
  <ol ref={ref} className={cx('cinna-timeline', `cinna-timeline--${mode}`, className)} {...rest}>
    {items.map((item, index) => (
      <li key={index} className={cx(item.color && `cinna-timeline__item--${item.color}`)}>
        {item.label && <em>{item.label}</em>}
        <span>{item.dot}</span>
        <div>{item.children}</div>
      </li>
    ))}
  </ol>
));
Timeline.displayName = 'Timeline';

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  title?: React.ReactNode;
  value: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  precision?: number;
  valueStyle?: React.CSSProperties;
}

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(({ title, value, suffix, prefix, precision, valueStyle, className, ...rest }, ref) => {
  const displayValue = typeof value === 'number' && precision !== undefined ? value.toFixed(precision) : value;
  return (
  <div ref={ref} className={cx('cinna-statistic', className)} {...rest}>
    {title && <span>{title}</span>}
    <strong style={valueStyle}>
      {prefix && <small>{prefix}</small>}
      {displayValue}
      {suffix && <small>{suffix}</small>}
    </strong>
  </div>
  );
});
Statistic.displayName = 'Statistic';

export const Spin = CinnaLoading;

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  controlSize?: CinnaSize;
  status?: Exclude<CinnaStatus, 'info'>;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({ controlSize = 'medium', status, className, ...rest }, ref) => (
  <input ref={ref} type="date" className={cx('cinna-native-input', `cinna-native-input--${controlSize}`, status && `cinna-native-input--${status}`, className)} {...rest} />
));
DatePicker.displayName = 'DatePicker';

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  controlSize?: CinnaSize;
  status?: Exclude<CinnaStatus, 'info'>;
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(({ controlSize = 'medium', status, className, ...rest }, ref) => (
  <input ref={ref} type="time" className={cx('cinna-native-input', `cinna-native-input--${controlSize}`, status && `cinna-native-input--${status}`, className)} {...rest} />
));
TimePicker.displayName = 'TimePicker';

export interface ColorPickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  presets?: string[];
  showText?: boolean;
  onChange?: (value: string) => void;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(({ presets = [], showText, className, value, defaultValue = '#A8DFF1', onChange, ...rest }, ref) => {
  const [inner, setInner] = useState(String(defaultValue));
  const current = String(value ?? inner);
  const update = (next: string) => {
    setInner(next);
    onChange?.(next);
  };
  return (
    <span className={cx('cinna-color-picker', className)}>
      <input
        ref={ref}
        type="color"
        value={current}
        onChange={(event) => update(event.currentTarget.value)}
        {...rest}
      />
      {showText && <code>{current}</code>}
      {presets.length > 0 && (
        <span className="cinna-color-picker__presets">
          {presets.map((color) => (
            <button key={color} type="button" aria-label={`Pick ${color}`} style={{ background: color }} onClick={() => update(color)} />
          ))}
        </span>
      )}
    </span>
  );
});
ColorPicker.displayName = 'ColorPicker';

export interface AutoCompleteOption {
  label: React.ReactNode;
  value: string;
}

export interface AutoCompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onSelect'> {
  options: Array<string | AutoCompleteOption>;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  allowClear?: boolean;
}

export const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(({ options, allowClear, onChange, onSelect, className, value, defaultValue = '', ...rest }, ref) => {
  const [inner, setInner] = useState(String(defaultValue));
  const current = String(value ?? inner);
  const normalized = options.map((option) => (typeof option === 'string' ? { label: option, value: option } : option));
  const filtered = normalized.filter((option) => option.value.toLowerCase().includes(current.toLowerCase())).slice(0, 6);
  const update = (next: string) => {
    setInner(next);
    onChange?.(next);
  };
  return (
    <span className={cx('cinna-auto-complete', className)}>
      <input
        ref={ref}
        className="cinna-native-input"
        value={current}
        onChange={(event) => update(event.currentTarget.value)}
        {...rest}
      />
      {allowClear && current && (
        <button type="button" aria-label="Clear input" onClick={() => update('')}>
          x
        </button>
      )}
      {current && filtered.length > 0 && (
        <span className="cinna-auto-complete__popup">
          {filtered.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                update(option.value);
                onSelect?.(option.value);
              }}
            >
              {option.label}
            </button>
          ))}
        </span>
      )}
    </span>
  );
});
AutoComplete.displayName = 'AutoComplete';

export interface CascaderOption {
  label: string;
  value: string;
  children?: CascaderOption[];
}

export interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: CascaderOption[];
  separator?: string;
  placeholder?: string;
  showSearch?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const Cascader = React.forwardRef<HTMLDivElement, CascaderProps>(
  ({ options, separator = ' / ', placeholder = 'Select path', showSearch, className, defaultValue, value, onChange, ...rest }, ref) => {
    const flatOptions = flattenCascader(options, '', separator);
    const [query, setQuery] = useState('');
    const filtered = showSearch && query ? flatOptions.filter((option) => String(option.label).toLowerCase().includes(query.toLowerCase())) : flatOptions;
    return (
      <div ref={ref} className={cx('cinna-cascader', className)}>
        {showSearch && <input className="cinna-native-input" placeholder="Search path" value={query} onChange={(event) => setQuery(event.currentTarget.value)} />}
        <Select
          {...rest}
          placeholder={placeholder}
          options={filtered}
          defaultValue={defaultValue as string | undefined}
          value={value as string | undefined}
          onChange={(next) => onChange?.(String(next))}
        />
      </div>
    );
  }
);
Cascader.displayName = 'Cascader';

export interface TreeNodeData {
  key: string;
  title: React.ReactNode;
  children?: TreeNodeData[];
}

export interface TreeSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  treeData: TreeNodeData[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  allowClear?: boolean;
}

export const TreeSelect = React.forwardRef<HTMLDivElement, TreeSelectProps>(({ treeData, placeholder = 'Select node', value, defaultValue, onChange, allowClear, className, ...rest }, ref) => {
  const options = flattenTree(treeData);
  return (
    <Select
      ref={ref}
      className={className}
      options={options}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      allowClear={allowClear}
      onChange={(next) => onChange?.(String(next))}
      {...rest}
    />
  );
});
TreeSelect.displayName = 'TreeSelect';

export interface MentionsProps extends Omit<TextAreaProps, 'onSelect'> {
  options?: Array<string | { label: React.ReactNode; value: string }>;
  prefix?: string;
  onSelect?: (value: string) => void;
}

export const Mentions = React.forwardRef<HTMLTextAreaElement, MentionsProps>(({ options = [], prefix = '@', onSelect, className, value, defaultValue = '', onChange, ...rest }, ref) => {
  const [inner, setInner] = useState(String(defaultValue));
  const current = String(value ?? inner);
  const normalized = options.map((option) => (typeof option === 'string' ? { label: option, value: option } : option));
  const insertMention = (nextValue: string) => {
    const next = `${current}${current.endsWith(' ') || !current ? '' : ' '}${prefix}${nextValue} `;
    setInner(next);
    onSelect?.(nextValue);
  };
  return (
  <div className={cx('cinna-mentions', className)}>
    <TextArea
      ref={ref}
      value={current}
      onChange={(event) => {
        setInner(event.currentTarget.value);
        onChange?.(event);
      }}
      {...rest}
    />
    {options.length > 0 && (
      <div className="cinna-mentions__options">
        {normalized.map((option) => (
          <button key={option.value} type="button" onClick={() => insertMention(option.value)}>
            {prefix}
            {option.label}
          </button>
        ))}
      </div>
    )}
  </div>
  );
});
Mentions.displayName = 'Mentions';

export interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  showUploadList?: boolean;
  buttonProps?: React.ButtonHTMLAttributes<HTMLSpanElement>;
}

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(({ label = 'Choose file', hint, showUploadList = true, className, onChange, buttonProps, ...rest }, ref) => {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className={cx('cinna-upload', className)}>
      <label className="cinna-upload__trigger">
        <input
          ref={ref}
          type="file"
          onChange={(event) => {
            setFiles(Array.from(event.currentTarget.files ?? []).map((file) => file.name));
            onChange?.(event);
          }}
          {...rest}
        />
        <span {...buttonProps}>{label}</span>
      </label>
      {hint && <small>{hint}</small>}
      {showUploadList && files.length > 0 && (
        <ul className="cinna-upload__list">
          {files.map((file) => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      )}
    </div>
  );
});
Upload.displayName = 'Upload';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  layout?: 'vertical' | 'horizontal' | 'inline';
  disabled?: boolean;
  requiredMark?: boolean | 'optional';
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ layout = 'vertical', disabled, requiredMark = true, className, ...rest }, ref) => (
  <form ref={ref} className={cx('cinna-form', `cinna-form--${layout}`, disabled && 'cinna-form--disabled', requiredMark === 'optional' && 'cinna-form--optional', className)} aria-disabled={disabled || undefined} {...rest} />
));
Form.displayName = 'Form';

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  help?: React.ReactNode;
  required?: boolean;
  validateStatus?: Exclude<CinnaStatus, 'info'>;
  extra?: React.ReactNode;
}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ label, help, required, validateStatus, extra, className, children, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-form-item', validateStatus && `cinna-form-item--${validateStatus}`, className)} {...rest}>
    {label && (
      <label>
        {required && <span aria-hidden="true">*</span>}
        {label}
      </label>
    )}
    {children}
    {help && <small>{help}</small>}
    {extra && <em>{extra}</em>}
  </div>
));
FormItem.displayName = 'FormItem';

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  fullscreen?: boolean;
  headerRender?: (date: Date) => React.ReactNode;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(({ value, defaultValue, onChange, fullscreen, headerRender, className, ...rest }, ref) => {
  const [selected, setSelected] = useState(defaultValue ?? value ?? new Date());
  const active = value ?? selected;
  const days = useMemo(() => buildCalendarDays(active), [active]);
  const monthLabel = active.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  const changeMonth = (offset: number) => {
    const next = new Date(active);
    next.setMonth(active.getMonth() + offset);
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cx('cinna-calendar', fullscreen && 'cinna-calendar--fullscreen', className)} {...rest}>
      <div className="cinna-calendar__header">
        {headerRender ? (
          headerRender(active)
        ) : (
          <>
            <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>
              {'<'}
            </button>
            <strong>{monthLabel}</strong>
            <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>
              {'>'}
            </button>
          </>
        )}
      </div>
      <div className="cinna-calendar__grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <strong key={`${day}-${index}`}>{day}</strong>
        ))}
        {days.map((day, index) => (
          <button
            key={index}
            type="button"
            className={cx(!day.inMonth && 'cinna-calendar__day--muted', sameDay(day.date, active) && 'cinna-calendar__day--active', sameDay(day.date, new Date()) && 'cinna-calendar__day--today')}
            onClick={() => {
              setSelected(day.date);
              onChange?.(day.date);
            }}
          >
            {day.date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
});
Calendar.displayName = 'Calendar';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  defaultActiveIndex?: number;
  dots?: boolean;
  arrows?: boolean;
  afterChange?: (activeIndex: number) => void;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ items, autoplay, autoplaySpeed = 2600, defaultActiveIndex = 0, dots = true, arrows = true, afterChange, className, ...rest }, ref) => {
  const [active, setActive] = useState(defaultActiveIndex);
  const count = Math.max(items.length, 1);
  const go = (next: number) => {
    const normalized = (next + count) % count;
    setActive(normalized);
    afterChange?.(normalized);
  };

  useEffect(() => {
    if (!autoplay || count <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % count;
        afterChange?.(next);
        return next;
      });
    }, autoplaySpeed);
    return () => window.clearInterval(timer);
  }, [afterChange, autoplay, autoplaySpeed, count]);

  return (
    <div ref={ref} className={cx('cinna-carousel', className)} {...rest}>
      <div className="cinna-carousel__viewport">
        <div className="cinna-carousel__track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="cinna-carousel__item">
              {item}
            </div>
          ))}
        </div>
      </div>
      {arrows && items.length > 1 && (
        <span className="cinna-carousel__arrows">
          <button type="button" aria-label="Previous slide" onClick={() => go(active - 1)}>
            {'<'}
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(active + 1)}>
            {'>'}
          </button>
        </span>
      )}
      {dots && items.length > 1 && (
        <span className="cinna-carousel__dots">
          {items.map((_, index) => (
            <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} className={cx(index === active && 'cinna-carousel__dot--active')} onClick={() => go(index)} />
          ))}
        </span>
      )}
    </div>
  );
});
Carousel.displayName = 'Carousel';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: React.ReactNode;
  fallback?: string;
  preview?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ caption, fallback, preview, className, onError, ...rest }, ref) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [src, setSrc] = useState(rest.src);
  return (
    <figure className={cx('cinna-image', preview && 'cinna-image--previewable')}>
      <img
        ref={ref}
        className={className}
        {...rest}
        src={src}
        onClick={preview ? () => setPreviewOpen(true) : rest.onClick}
        onError={(event) => {
          if (fallback) setSrc(fallback);
          onError?.(event);
        }}
      />
      {caption && <figcaption>{caption}</figcaption>}
      {previewOpen && src && (
        <button type="button" className="cinna-image__preview" aria-label="Close image preview" onClick={() => setPreviewOpen(false)}>
          <img src={src} alt={rest.alt ?? ''} />
        </button>
      )}
    </figure>
  );
});
Image.displayName = 'Image';

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  treeData: TreeNodeData[];
  defaultExpandedKeys?: string[];
  selectable?: boolean;
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelect?: (key: string) => void;
}

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(({ treeData, defaultExpandedKeys, selectable, selectedKey, defaultSelectedKey, onSelect, className, ...rest }, ref) => {
  const [innerSelected, setInnerSelected] = useState(defaultSelectedKey);
  const activeSelected = selectedKey ?? innerSelected;
  const selectNode = (key: string) => {
    setInnerSelected(key);
    onSelect?.(key);
  };
  return (
    <div ref={ref} className={cx('cinna-tree', className)} {...rest}>
      {treeData.map((node) => (
        <TreeNodeView key={node.key} node={node} defaultExpandedKeys={defaultExpandedKeys} selectable={selectable} selectedKey={activeSelected} onSelect={selectNode} />
      ))}
    </div>
  );
});
Tree.displayName = 'Tree';

export interface TransferItem {
  key: string;
  title: string;
}

export interface TransferProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  dataSource: TransferItem[];
  targetKeys?: string[];
  onChange?: (targetKeys: string[]) => void;
  titles?: [React.ReactNode, React.ReactNode];
  showSearch?: boolean;
}

export const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(({ dataSource, targetKeys = [], onChange, titles = ['Source', 'Target'], showSearch, className, ...rest }, ref) => {
  const [targets, setTargets] = useState(targetKeys);
  const [query, setQuery] = useState('');
  const move = (key: string, toTarget: boolean) => {
    const next = toTarget ? [...targets, key] : targets.filter((target) => target !== key);
    setTargets(next);
    onChange?.(next);
  };
  const filter = (items: TransferItem[]) => (query ? items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())) : items);
  const left = filter(dataSource.filter((item) => !targets.includes(item.key)));
  const right = filter(dataSource.filter((item) => targets.includes(item.key)));

  return (
    <div ref={ref} className={cx('cinna-transfer', className)} {...rest}>
      {showSearch && <input className="cinna-native-input cinna-transfer__search" placeholder="Search items" value={query} onChange={(event) => setQuery(event.currentTarget.value)} />}
      <TransferList title={titles[0]} items={left} actionLabel="Add" onMove={(key) => move(key, true)} />
      <TransferList title={titles[1]} items={right} actionLabel="Remove" onMove={(key) => move(key, false)} />
    </div>
  );
});
Transfer.displayName = 'Transfer';

export interface AnchorItem {
  key: string;
  href: string;
  title: React.ReactNode;
}

export interface AnchorProps extends React.HTMLAttributes<HTMLElement> {
  items: AnchorItem[];
  offsetTop?: number;
}

export const Anchor = React.forwardRef<HTMLElement, AnchorProps>(({ items, offsetTop = 0, className, style, ...rest }, ref) => (
  <nav ref={ref} className={cx('cinna-anchor', className)} style={{ top: offsetTop, ...style }} {...rest}>
    {items.map((item) => (
      <a key={item.key} href={item.href}>
        {item.title}
      </a>
    ))}
  </nav>
));
Anchor.displayName = 'Anchor';

export interface AffixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number;
  offsetBottom?: number;
}

export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(({ offsetTop, offsetBottom, className, style, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-affix', className)} style={{ top: offsetTop, bottom: offsetBottom, ...style }} {...rest} />
));
Affix.displayName = 'Affix';

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  rotate?: number;
  gap?: number;
  opacity?: number;
}

export const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(({ content = 'Cinna Design', rotate = -18, gap = 120, opacity = 0.08, className, style, ...rest }, ref) => (
  <div
    ref={ref}
    className={cx('cinna-watermark', className)}
    data-watermark={content}
    style={{ ['--cinna-watermark-rotate' as string]: `${rotate}deg`, ['--cinna-watermark-gap' as string]: `${gap}px`, ['--cinna-watermark-opacity' as string]: opacity, ...style }}
    {...rest}
  />
));
Watermark.displayName = 'Watermark';

export interface FloatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shape?: 'circle' | 'square';
  tooltip?: React.ReactNode;
  badge?: React.ReactNode;
}

export const FloatButton = React.forwardRef<HTMLButtonElement, FloatButtonProps>(({ icon = '+', shape = 'circle', tooltip, badge, className, children, ...rest }, ref) => (
  <button ref={ref} type="button" className={cx('cinna-float-button', `cinna-float-button--${shape}`, className)} title={typeof tooltip === 'string' ? tooltip : undefined} {...rest}>
    <span>{icon}</span>
    {children && <small>{children}</small>}
    {badge && <em>{badge}</em>}
    {tooltip && <span className="cinna-float-button__tooltip">{tooltip}</span>}
  </button>
));
FloatButton.displayName = 'FloatButton';

export interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  type?: CinnaStatus;
  content: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(({ type = 'info', content, icon, closable, onClose, className, ...rest }, ref) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div ref={ref} className={cx('cinna-message', `cinna-message--${type}`, className)} role="status" {...rest}>
      {icon ?? statusIcon(type)} <span>{content}</span>
      {closable && (
        <button
          type="button"
          aria-label="Close message"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          x
        </button>
      )}
    </div>
  );
});
Message.displayName = 'Message';

export interface NotificationProps extends Omit<MessageProps, 'title'> {
  title?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(({ title, content, type = 'info', icon, actions, closable, onClose, className, ...rest }, ref) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div ref={ref} className={cx('cinna-notification', `cinna-notification--${type}`, className)} role="status" {...rest}>
      <strong>
        {icon ?? statusIcon(type)} {title}
      </strong>
      <span>{content}</span>
      {actions && <div className="cinna-notification__actions">{actions}</div>}
      {closable && (
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          x
        </button>
      )}
    </div>
  );
});
Notification.displayName = 'Notification';

export interface TourStep {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface TourProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  open?: boolean;
  current?: number;
  steps: TourStep[];
  onChange?: (current: number) => void;
  onClose?: () => void;
}

export const Tour = React.forwardRef<HTMLDivElement, TourProps>(({ open = true, current, steps, onChange, onClose, className, ...rest }, ref) => {
  const [inner, setInner] = useState(0);
  if (!open) return null;
  const active = current ?? inner;
  const step = steps[active];
  const setStep = (next: number) => {
    const normalized = clampNumber(next, 0, steps.length - 1);
    setInner(normalized);
    onChange?.(normalized);
  };
  return (
    <div ref={ref} className={cx('cinna-tour', className)} {...rest}>
      <strong>{step?.title}</strong>
      {step?.description && <span>{step.description}</span>}
      <small>
        {active + 1} / {steps.length}
      </small>
      <span className="cinna-tour__actions">
        <button type="button" disabled={active <= 0} onClick={() => setStep(active - 1)}>Prev</button>
        {active < steps.length - 1 ? <button type="button" onClick={() => setStep(active + 1)}>Next</button> : <button type="button" onClick={onClose}>Done</button>}
      </span>
    </div>
  );
});
Tour.displayName = 'Tour';

export interface SplitterProps extends React.HTMLAttributes<HTMLDivElement> {
  first: React.ReactNode;
  second: React.ReactNode;
  defaultSize?: number;
  min?: number;
  max?: number;
}

export const Splitter = React.forwardRef<HTMLDivElement, SplitterProps>(({ first, second, defaultSize = 48, min = 24, max = 76, className, ...rest }, ref) => {
  const [size, setSize] = useState(defaultSize);
  return (
  <div ref={ref} className={cx('cinna-splitter', className)} style={{ ['--cinna-splitter-first' as string]: `${size}%` }} {...rest}>
    <div>{first}</div>
    <input aria-label="Resize panels" type="range" min={min} max={max} value={size} onChange={(event) => setSize(Number(event.currentTarget.value))} />
    <div>{second}</div>
  </div>
  );
});
Splitter.displayName = 'Splitter';

function statusIcon(status: CinnaStatus) {
  return status === 'success' ? '✓' : status === 'warning' ? '!' : status === 'error' ? '!' : 'i';
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function renderCell(value: unknown): React.ReactNode {
  if (React.isValidElement(value)) return value;
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function toArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function buildPageList(current: number, pages: number): Array<number | 'gap'> {
  if (pages <= 7) return Array.from({ length: pages }, (_, index) => index + 1);
  const middle = [current - 1, current, current + 1].filter((page) => page > 1 && page < pages);
  const result: Array<number | 'gap'> = [1];
  if (middle[0] && middle[0] > 2) result.push('gap');
  result.push(...middle);
  if (middle[middle.length - 1] && middle[middle.length - 1] < pages - 1) result.push('gap');
  result.push(pages);
  return result;
}

function renderMenuItems(items: MenuItem[], selectedKey: string | undefined, onSelect: (key: string) => void, inlineIndent: number, level = 0): React.ReactNode {
  return items.map((item) => {
    const content = (
      <button
        key={item.key}
        type="button"
        role="menuitem"
        disabled={item.disabled}
        className={cx('cinna-menu__item', selectedKey === item.key && 'cinna-menu__item--active')}
        style={{ paddingLeft: level ? 14 + level * inlineIndent : undefined }}
        onClick={() => onSelect(item.key)}
      >
        {item.icon && <span className="cinna-menu__icon">{item.icon}</span>}
        {item.label}
      </button>
    );

    if (!item.children?.length) return content;
    return (
      <div key={item.key} className="cinna-menu__group">
        {content}
        {renderMenuItems(item.children, selectedKey, onSelect, inlineIndent, level + 1)}
      </div>
    );
  });
}

function flattenCascader(options: CascaderOption[], parent = '', separator = ' / '): SelectOption[] {
  return options.flatMap((option) => {
    const label = parent ? `${parent}${separator}${option.label}` : option.label;
    if (option.children?.length) return flattenCascader(option.children, label, separator);
    return [{ label, value: option.value }];
  });
}

function flattenTree(nodes: TreeNodeData[], level = 0): SelectOption[] {
  return nodes.flatMap((node) => [
    { label: `${'  '.repeat(level)}${String(node.title)}`, value: node.key },
    ...(node.children ? flattenTree(node.children, level + 1) : []),
  ]);
}

function buildCalendarDays(value: Date) {
  const year = value.getFullYear();
  const month = value.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());

  return Array.from({ length: 42 }).map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { date, inMonth: date.getMonth() === month };
  });
}

function sameDay(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
}

function TreeNodeView({
  node,
  defaultExpandedKeys,
  selectable,
  selectedKey,
  onSelect,
}: {
  node: TreeNodeData;
  defaultExpandedKeys?: string[];
  selectable?: boolean;
  selectedKey?: string;
  onSelect?: (key: string) => void;
}) {
  if (!node.children?.length) {
    return (
      <button type="button" className={cx('cinna-tree__node', selectedKey === node.key && 'cinna-tree__node--selected')} disabled={!selectable} onClick={() => onSelect?.(node.key)}>
        {node.title}
      </button>
    );
  }
  return (
    <details className="cinna-tree__branch" open={defaultExpandedKeys ? defaultExpandedKeys.includes(node.key) : true}>
      <summary>{node.title}</summary>
      <div>
        {node.children.map((child) => (
          <TreeNodeView key={child.key} node={child} defaultExpandedKeys={defaultExpandedKeys} selectable={selectable} selectedKey={selectedKey} onSelect={onSelect} />
        ))}
      </div>
    </details>
  );
}

function TransferList({ title, items, actionLabel, onMove }: { title: React.ReactNode; items: TransferItem[]; actionLabel: string; onMove: (key: string) => void }) {
  return (
    <div className="cinna-transfer__list">
      <strong>{title}</strong>
      {items.length === 0 ? (
        <span className="cinna-transfer__empty">Empty</span>
      ) : (
        items.map((item) => (
          <button key={item.key} type="button" onClick={() => onMove(item.key)}>
            <span>{item.title}</span>
            <em>{actionLabel}</em>
          </button>
        ))
      )}
    </div>
  );
}
