import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cx } from '../utils/cx';
import { Icon } from './Icon';
import {
  normalizeButtonRippleOpacity,
  renderButtonRipples,
  useButtonRipple,
} from './buttonRipple';
import { clampNumber } from './Shared';
import type { CinnaSize, CinnaStatus, TreeNodeData } from './Shared';

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

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
  size?: CinnaSize;
  animation?: CheckboxAnimation;
  labelColor?: string;
  checkedColor?: string;
  boxColor?: string;
  borderColor?: string;
  fontSize?: number | string;
  fontWeight?: React.CSSProperties['fontWeight'];
  ripple?: boolean;
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
}

export interface CheckboxGroupOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  name?: string;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  size?: CinnaSize;
  animation?: CheckboxAnimation;
  onChange?: (checkedValues: string[]) => void;
  labelColor?: string;
  checkedColor?: string;
  boxColor?: string;
  borderColor?: string;
  fontSize?: number | string;
  fontWeight?: React.CSSProperties['fontWeight'];
  ripple?: boolean;
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
}

export type CheckboxAnimation = 'particles' | 'pop' | 'handwriting' | 'none';

const normalizeCheckboxCssValue = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : value);

const checkboxParticleCountBySize: Record<CinnaSize, number> = {
  small: 5,
  medium: 6,
  large: 7,
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  indeterminate,
  size = 'medium',
  animation,
  labelColor,
  checkedColor,
  boxColor,
  borderColor,
  fontSize,
  fontWeight,
  ripple = true,
  rippleParticleColors = ['#73c4e0', '#a8dff1', '#ffd8c2', '#fff0a6', '#df6677'],
  rippleParticleOpacity = 0.72,
  className,
  style,
  disabled,
  onClick,
  onChange,
  ...rest
}, ref) => {
  const boxRef = useRef<HTMLSpanElement | null>(null);
  const resolvedAnimation: CheckboxAnimation = animation ?? (ripple ? 'particles' : 'none');
  const rippleState = useButtonRipple({
    enabled: resolvedAnimation === 'particles' && ripple,
    disabled,
    effects: 'particles',
    particleColors: rippleParticleColors,
    particleCount: checkboxParticleCountBySize[size],
  });
  const checkboxStyle = {
    '--cinna-check-label-color': labelColor,
    '--cinna-check-checked-color': checkedColor,
    '--cinna-check-box-color': boxColor,
    '--cinna-check-border-color': borderColor,
    '--cinna-check-font-size': normalizeCheckboxCssValue(fontSize),
    '--cinna-check-font-weight': fontWeight,
    '--button-particle-opacity': normalizeButtonRippleOpacity(rippleParticleOpacity),
    ...style,
  } as React.CSSProperties;
  const triggerCheckboxRipple = (event: React.MouseEvent<HTMLLabelElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.tagName === 'INPUT') return;

    const box = boxRef.current;
    if (!box) return;

    const boxRect = box.getBoundingClientRect();
    const point = box.contains(target)
      ? { clientX: event.clientX, clientY: event.clientY }
      : { clientX: boxRect.left + boxRect.width / 2, clientY: boxRect.top + boxRect.height / 2 };

    rippleState.triggerButtonRippleAt(box, point);
  };

  return (
    <label
      className={cx(
        'cinna-check',
        `cinna-check--${size}`,
        `cinna-check--animation-${resolvedAnimation}`,
        indeterminate && 'cinna-check--indeterminate',
        disabled && 'cinna-check--disabled',
        className
      )}
      style={checkboxStyle}
      onClick={triggerCheckboxRipple}
    >
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        aria-checked={indeterminate ? 'mixed' : undefined}
        onClick={onClick}
        onChange={onChange}
        {...rest}
      />
      <span
        ref={boxRef}
        className={cx('cinna-check__box', indeterminate && 'cinna-check__box--indeterminate')}
        aria-hidden="true"
      >
        <svg className="cinna-check__mark" viewBox="0 0 12 10" focusable="false">
          <path className="cinna-check__mark-path" d="M1.6 5.2 4.7 8.1 10.5 1.8" />
        </svg>
        <span className="cinna-check__mixed" />
        {renderButtonRipples(rippleState.ripples, rippleState.activeRippleEffects)}
      </span>
      {label && <span className="cinna-check__label">{label}</span>}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(({
  options,
  value,
  defaultValue = [],
  name,
  disabled,
  direction = 'horizontal',
  size = 'medium',
  animation,
  onChange,
  labelColor,
  checkedColor,
  boxColor,
  borderColor,
  fontSize,
  fontWeight,
  ripple,
  rippleParticleColors,
  rippleParticleOpacity,
  className,
  ...rest
}, ref) => {
  const generatedName = useId();
  const [inner, setInner] = useState(defaultValue);
  const selected = value ?? inner;
  const groupName = name ?? generatedName;
  const update = (nextValue: string, checked: boolean) => {
    const next = checked ? [...selected, nextValue] : selected.filter((item) => item !== nextValue);
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cx('cinna-check-group', `cinna-check-group--${direction}`, className)} {...rest}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={groupName}
          value={option.value}
          checked={selected.includes(option.value)}
          disabled={disabled || option.disabled}
          indeterminate={option.indeterminate}
          size={size}
          animation={animation}
          label={option.label}
          labelColor={labelColor}
          checkedColor={checkedColor}
          boxColor={boxColor}
          borderColor={borderColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          ripple={ripple}
          rippleParticleColors={rippleParticleColors}
          rippleParticleOpacity={rippleParticleOpacity}
          onChange={(event) => update(option.value, event.currentTarget.checked)}
        />
      ))}
    </div>
  );
});
CheckboxGroup.displayName = 'CheckboxGroup';

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
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [inner, setInner] = useState<string | string[]>(defaultValue ?? (mode === 'multiple' ? [] : ''));
    const selected = value ?? inner;
    const selectedValues = Array.isArray(selected) ? selected : selected ? [selected] : [];
    const selectedLabels = options.filter((option) => selectedValues.includes(option.value)).map((option) => option.label);
    const label = selectedLabels.length ? selectedLabels : [placeholder ?? 'Select'];

    const setRefs = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

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

    useEffect(() => {
      if (!open) return undefined;

      const close = (event: PointerEvent | KeyboardEvent) => {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
        if (event.type === 'pointerdown' && rootRef.current?.contains(event.target as Node)) return;
        setOpen(false);
      };

      document.addEventListener('pointerdown', close, true);
      document.addEventListener('keydown', close);
      return () => {
        document.removeEventListener('pointerdown', close, true);
        document.removeEventListener('keydown', close);
      };
    }, [open]);

    return (
      <div ref={setRefs} className={cx('cinna-select', `cinna-select--${controlSize}`, open && 'cinna-select--open', disabled && 'cinna-select--disabled', className)} {...rest}>
        <button type="button" className="cinna-select__control" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((next) => !next)}>
          <span className={cx(!selectedLabels.length && 'cinna-select__placeholder')}>
            {mode === 'multiple' && selectedLabels.length ? selectedLabels.map((item, index) => <em key={index}>{item}</em>) : label}
          </span>
          <span className="cinna-select__arrow" aria-hidden="true">
            <Icon name="chevron-down" size={13} />
          </span>
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
            <Icon name="close-blue" size={12} />
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

export type AutoCompleteVariant = 'outlined' | 'filled' | 'borderless' | 'underlined';
export type AutoCompleteSemanticSlot = 'root' | 'input' | 'clear' | 'popup' | 'list' | 'option' | 'empty';

export interface AutoCompleteOption {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface AutoCompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onSelect' | 'children' | 'styles'> {
  options?: Array<string | AutoCompleteOption>;
  children?: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
  controlSize?: CinnaSize;
  variant?: AutoCompleteVariant;
  status?: Exclude<CinnaStatus, 'info'>;
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  backfill?: boolean;
  defaultActiveFirstOption?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onPopupScroll?: React.UIEventHandler<HTMLSpanElement>;
  filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
  notFoundContent?: React.ReactNode;
  popupRender?: (originNode: React.ReactNode) => React.ReactNode;
  popupMatchInputWidth?: boolean | number;
  classNames?: Partial<Record<AutoCompleteSemanticSlot, string>>;
  styles?: Partial<Record<AutoCompleteSemanticSlot, React.CSSProperties>>;
}

const normalizeAutoCompleteOptions = (options: Array<string | AutoCompleteOption> = []): AutoCompleteOption[] =>
  options.map((option) => (typeof option === 'string' ? { label: option, value: option } : { ...option, label: option.label ?? option.value }));

const getAutoCompleteText = (node: React.ReactNode) => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  return '';
};

const getFirstEnabledAutoCompleteIndex = (options: AutoCompleteOption[]) => options.findIndex((option) => !option.disabled);

const getNextAutoCompleteIndex = (options: AutoCompleteOption[], current: number, step: 1 | -1) => {
  if (!options.length) return -1;
  let next = current;
  for (let index = 0; index < options.length; index += 1) {
    next = (next + step + options.length) % options.length;
    if (!options[next]?.disabled) return next;
  }
  return -1;
};

export const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(({
  options = [],
  children,
  controlSize = 'medium',
  variant = 'outlined',
  status,
  allowClear,
  backfill = false,
  defaultActiveFirstOption = true,
  open,
  defaultOpen = false,
  onOpenChange,
  onChange,
  onSelect,
  onSearch,
  onClear,
  onInputKeyDown,
  onPopupScroll,
  filterOption = true,
  notFoundContent = null,
  popupRender,
  popupMatchInputWidth = true,
  classNames,
  styles,
  className,
  style,
  value,
  defaultValue = '',
  disabled,
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}, ref) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inner, setInner] = useState(String(defaultValue));
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [previewValue, setPreviewValue] = useState<string | null>(null);
  const isOpenControlled = open !== undefined;
  const actualOpen = isOpenControlled ? Boolean(open) : innerOpen;
  const current = String(value ?? inner);
  const inputValue = previewValue ?? current;
  const normalized = useMemo(() => normalizeAutoCompleteOptions(options), [options]);
  const filtered = useMemo(() => {
    if (filterOption === false) return normalized;
    if (typeof filterOption === 'function') return normalized.filter((option) => filterOption(current, option));
    const query = current.trim().toLowerCase();
    if (!query) return normalized;
    return normalized.filter((option) => {
      const label = getAutoCompleteText(option.label).toLowerCase();
      return option.value.toLowerCase().includes(query) || label.includes(query);
    });
  }, [current, filterOption, normalized]);
  const canOpen = !disabled && !readOnly;
  const popupVisible = canOpen && actualOpen && (filtered.length > 0 || notFoundContent !== null);
  const listId = useId();

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const setPopupOpen = (nextOpen: boolean) => {
    const allowedOpen = canOpen ? nextOpen : false;
    if (!isOpenControlled) setInnerOpen(allowedOpen);
    if (actualOpen !== allowedOpen) onOpenChange?.(allowedOpen);
    if (!allowedOpen) {
      setActiveIndex(-1);
      setPreviewValue(null);
    }
  };

  const update = (next: string) => {
    setPreviewValue(null);
    setInner(next);
    onChange?.(next);
  };

  const selectOption = (option: AutoCompleteOption) => {
    if (option.disabled) return;
    update(option.value);
    onSelect?.(option.value, option);
    setPopupOpen(false);
  };

  const clearValue = () => {
    update('');
    onClear?.();
    setPopupOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!actualOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setPopupOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPopupOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer, true);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer, true);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [actualOpen, canOpen, isOpenControlled, onOpenChange]);

  useEffect(() => {
    if (!actualOpen) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex((currentIndex) => {
      if (!defaultActiveFirstOption) return currentIndex;
      if (currentIndex >= 0 && filtered[currentIndex] && !filtered[currentIndex].disabled) return currentIndex;
      return getFirstEnabledAutoCompleteIndex(filtered);
    });
  }, [actualOpen, defaultActiveFirstOption, filtered]);

  const childInputProps = React.isValidElement(children) ? children.props : undefined;
  const inputClassName = cx(
    'cinna-native-input',
    `cinna-native-input--${controlSize}`,
    status && `cinna-native-input--${status}`,
    classNames?.input,
    childInputProps?.className
  );
  const commonInputProps = {
    ...rest,
    ref: setInputRef,
    className: inputClassName,
    style: { ...styles?.input, ...childInputProps?.style },
    value: inputValue,
    disabled,
    readOnly,
    role: 'combobox',
    'aria-autocomplete': 'list',
    'aria-expanded': popupVisible,
    'aria-controls': popupVisible ? listId : undefined,
    'aria-activedescendant': popupVisible && activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined,
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => {
      childInputProps?.onFocus?.(event);
      if (canOpen) setPopupOpen(true);
      onFocus?.(event);
    },
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
      childInputProps?.onBlur?.(event);
      onBlur?.(event);
      window.setTimeout(() => {
        if (!rootRef.current?.contains(document.activeElement)) setPopupOpen(false);
      });
    },
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      childInputProps?.onChange?.(event);
      const next = event.currentTarget.value;
      update(next);
      onSearch?.(next);
      if (canOpen) setPopupOpen(true);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
      childInputProps?.onKeyDown?.(event);
      onInputKeyDown?.(event);
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!actualOpen) setPopupOpen(true);
        const nextIndex = getNextAutoCompleteIndex(filtered, activeIndex, event.key === 'ArrowDown' ? 1 : -1);
        setActiveIndex(nextIndex);
        if (backfill && nextIndex >= 0) setPreviewValue(filtered[nextIndex].value);
      } else if (event.key === 'Enter' && popupVisible && activeIndex >= 0 && filtered[activeIndex]) {
        event.preventDefault();
        selectOption(filtered[activeIndex]);
      } else if (event.key === 'Escape') {
        setPopupOpen(false);
      } else if (event.key === 'Tab') {
        setPopupOpen(false);
      }
    },
  } satisfies React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;

  const clearIcon = allowClear && typeof allowClear === 'object' ? allowClear.clearIcon ?? <Icon name="close-blue" size={11} /> : <Icon name="close-blue" size={11} />;
  const popupWidth = typeof popupMatchInputWidth === 'number'
    ? popupMatchInputWidth
    : popupMatchInputWidth === false
      ? 'max-content'
      : undefined;
  const list = (
    <span
      id={listId}
      className={cx('cinna-auto-complete__list', classNames?.list)}
      role="listbox"
      onScroll={onPopupScroll}
      style={styles?.list}
    >
      {filtered.length > 0 ? filtered.map((option, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={`${option.value}-${index}`}
            id={`${listId}-option-${index}`}
            type="button"
            role="option"
            aria-selected={active}
            disabled={option.disabled}
            className={cx(
              'cinna-auto-complete__option',
              active && 'cinna-auto-complete__option--active',
              option.disabled && 'cinna-auto-complete__option--disabled',
              classNames?.option,
              option.className
            )}
            style={{ ...styles?.option, ...option.style }}
            onMouseDown={(event) => event.preventDefault()}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => selectOption(option)}
          >
            <span className="cinna-auto-complete__label">{option.label}</span>
            {option.description && <small>{option.description}</small>}
          </button>
        );
      }) : (
        <span className={cx('cinna-auto-complete__empty', classNames?.empty)} style={styles?.empty}>
          {notFoundContent}
        </span>
      )}
    </span>
  );

  return (
    <span
      ref={rootRef}
      className={cx(
        'cinna-auto-complete',
        `cinna-auto-complete--${controlSize}`,
        `cinna-auto-complete--${variant}`,
        status && `cinna-auto-complete--${status}`,
        actualOpen && 'cinna-auto-complete--open',
        disabled && 'cinna-auto-complete--disabled',
        readOnly && 'cinna-auto-complete--readonly',
        classNames?.root,
        className
      )}
      style={{ ...styles?.root, ...style }}
    >
      {React.isValidElement(children) ? React.cloneElement(children, commonInputProps) : <input {...commonInputProps} />}
      {allowClear && current && !disabled && !readOnly && (
        <button
          type="button"
          className={cx('cinna-auto-complete__clear', classNames?.clear)}
          style={styles?.clear}
          aria-label="Clear input"
          onMouseDown={(event) => event.preventDefault()}
          onClick={clearValue}
        >
          {clearIcon}
        </button>
      )}
      {popupVisible && (
        <span
          className={cx('cinna-auto-complete__popup', classNames?.popup)}
          style={{ width: popupWidth, ...styles?.popup }}
        >
          {popupRender ? popupRender(list) : list}
        </span>
      )}
    </span>
  );
});
AutoComplete.displayName = 'AutoComplete';

export type CascaderOptionValue = string | number;
export type CascaderValue = CascaderOptionValue[];
export type CascaderMultipleValue = CascaderValue[];
export type CascaderRawValue = CascaderOptionValue | CascaderValue | CascaderMultipleValue;
export type CascaderExpandTrigger = 'click' | 'hover';
export type CascaderPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
export type CascaderVariant = 'outlined' | 'filled' | 'borderless' | 'underlined';
export type CascaderShowCheckedStrategy = 'SHOW_PARENT' | 'SHOW_CHILD';
export type CascaderSemanticSlot = 'root' | 'control' | 'prefix' | 'content' | 'placeholder' | 'tag' | 'clear' | 'suffix' | 'popup' | 'menus' | 'menu' | 'option' | 'search' | 'empty';

export interface CascaderOption {
  label?: React.ReactNode;
  value?: CascaderOptionValue;
  children?: CascaderOption[];
  disabled?: boolean;
  isLeaf?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export interface CascaderFieldNames {
  label?: string;
  value?: string;
  children?: string;
  disabled?: string;
  isLeaf?: string;
  loading?: string;
}

export interface CascaderSearchConfig {
  filter?: (inputValue: string, path: CascaderOption[]) => boolean;
  sort?: (a: CascaderOption[], b: CascaderOption[], inputValue: string) => number;
  render?: (inputValue: string, path: CascaderOption[]) => React.ReactNode;
  limit?: number | false;
  matchInputWidth?: boolean;
  searchValue?: string;
  onSearch?: (value: string) => void;
  autoClearSearchValue?: boolean;
  searchIcon?: React.ReactNode;
}

export interface CascaderTagRenderInfo {
  label: React.ReactNode;
  value: CascaderValue;
  option: CascaderOption;
  path: CascaderOption[];
  onClose: () => void;
}

export interface CascaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children' | 'prefix'> {
  options?: CascaderOption[];
  value?: CascaderRawValue;
  defaultValue?: CascaderRawValue;
  multiple?: boolean;
  onChange?: (value: CascaderValue | CascaderMultipleValue, selectedOptions: CascaderOption[] | CascaderOption[][]) => void;
  placeholder?: React.ReactNode;
  separator?: React.ReactNode;
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  changeOnSelect?: boolean;
  disabled?: boolean;
  displayRender?: (labels: React.ReactNode[], selectedOptions: CascaderOption[]) => React.ReactNode;
  tagRender?: (info: CascaderTagRenderInfo) => React.ReactNode;
  expandTrigger?: CascaderExpandTrigger;
  expandIcon?: React.ReactNode;
  fieldNames?: CascaderFieldNames;
  loadData?: (selectedOptions: CascaderOption[]) => void | CascaderOption[] | Promise<void | CascaderOption[]>;
  loadingIcon?: React.ReactNode;
  maxTagCount?: number | 'responsive';
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: CascaderTagRenderInfo[]) => React.ReactNode);
  maxTagTextLength?: number;
  notFoundContent?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: CascaderPlacement;
  prefix?: React.ReactNode;
  popupRender?: (menus: React.ReactNode) => React.ReactNode;
  showCheckedStrategy?: CascaderShowCheckedStrategy;
  showSearch?: boolean | CascaderSearchConfig;
  suffixIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  controlSize?: CinnaSize;
  size?: CinnaSize;
  status?: Exclude<CinnaStatus, 'info'>;
  variant?: CascaderVariant;
  optionRender?: (option: CascaderOption, path: CascaderOption[]) => React.ReactNode;
  classNames?: Partial<Record<CascaderSemanticSlot, string>>;
  styles?: Partial<Record<CascaderSemanticSlot, React.CSSProperties>>;
}

const cascaderDefaultFieldNames = {
  label: 'label',
  value: 'value',
  children: 'children',
  disabled: 'disabled',
  isLeaf: 'isLeaf',
  loading: 'loading',
};

const getCascaderFields = (fieldNames?: CascaderFieldNames) => ({ ...cascaderDefaultFieldNames, ...fieldNames });
const getCascaderOptionValue = (option: CascaderOption, fields: ReturnType<typeof getCascaderFields>) => option[fields.value] as CascaderOptionValue | undefined;
const getCascaderOptionLabel = (option: CascaderOption, fields: ReturnType<typeof getCascaderFields>) => (option[fields.label] ?? getCascaderOptionValue(option, fields)) as React.ReactNode;
const getCascaderChildren = (option: CascaderOption, fields: ReturnType<typeof getCascaderFields>) => option[fields.children] as CascaderOption[] | undefined;
const getCascaderDisabled = (option: CascaderOption, fields: ReturnType<typeof getCascaderFields>) => Boolean(option[fields.disabled]);
const getCascaderLoading = (option: CascaderOption, fields: ReturnType<typeof getCascaderFields>) => Boolean(option[fields.loading]);
const getCascaderIsLeaf = (option: CascaderOption, fields: ReturnType<typeof getCascaderFields>) => {
  const children = getCascaderChildren(option, fields);
  if (children?.length) return false;
  return option[fields.isLeaf] !== false;
};
const isCascaderPathValue = (value: unknown): value is CascaderValue => Array.isArray(value) && !Array.isArray(value[0]);
const isCascaderMultipleValue = (value: unknown): value is CascaderMultipleValue => Array.isArray(value) && Array.isArray(value[0]);
const getCascaderPathKey = (value: CascaderValue) => value.map((item) => String(item)).join('__cinna__');
const isSameCascaderPath = (a: CascaderValue, b: CascaderValue) => a.length === b.length && a.every((item, index) => item === b[index]);
const getCascaderPathLabels = (path: CascaderOption[], fields: ReturnType<typeof getCascaderFields>) => path.map((option) => getCascaderOptionLabel(option, fields));
const getCascaderPathValue = (path: CascaderOption[], fields: ReturnType<typeof getCascaderFields>) =>
  path.map((option) => getCascaderOptionValue(option, fields)).filter((value): value is CascaderOptionValue => value !== undefined);

function findCascaderPathByValue(options: CascaderOption[], value: CascaderValue | CascaderOptionValue | undefined, fields: ReturnType<typeof getCascaderFields>, parent: CascaderOption[] = []): CascaderOption[] {
  if (value === undefined || value === null) return [];
  const targetPath = Array.isArray(value) ? value : undefined;
  for (const option of options) {
    const optionValue = getCascaderOptionValue(option, fields);
    const path = [...parent, option];
    const pathValue = getCascaderPathValue(path, fields);
    if (targetPath ? isSameCascaderPath(pathValue, targetPath) : optionValue === value) return path;
    const childPath = findCascaderPathByValue(getCascaderChildren(option, fields) ?? [], value, fields, path);
    if (childPath.length) return childPath;
  }
  return [];
}

function flattenCascaderPaths(options: CascaderOption[], fields: ReturnType<typeof getCascaderFields>, includeParents = false, parent: CascaderOption[] = []): CascaderOption[][] {
  return options.flatMap((option) => {
    const path = [...parent, option];
    const children = getCascaderChildren(option, fields) ?? [];
    const childPaths = children.length ? flattenCascaderPaths(children, fields, includeParents, path) : [];
    return includeParents || !children.length ? [path, ...childPaths] : childPaths;
  });
}

function normalizeCascaderValue(value: CascaderRawValue | undefined, options: CascaderOption[], fields: ReturnType<typeof getCascaderFields>, multiple: boolean): CascaderValue | CascaderMultipleValue {
  if (value === undefined || value === null) return multiple ? [] : [];
  if (multiple) {
    if (isCascaderMultipleValue(value)) return value;
    if (isCascaderPathValue(value)) return [value];
    const path = findCascaderPathByValue(options, value as CascaderOptionValue, fields);
    return path.length ? [getCascaderPathValue(path, fields)] : [];
  }
  if (isCascaderMultipleValue(value)) return value[0] ?? [];
  if (isCascaderPathValue(value)) return value;
  return getCascaderPathValue(findCascaderPathByValue(options, value as CascaderOptionValue, fields), fields);
}

function getCascaderPathFromValue(value: CascaderValue, options: CascaderOption[], fields: ReturnType<typeof getCascaderFields>) {
  return findCascaderPathByValue(options, value, fields);
}

function getCascaderColumns(options: CascaderOption[], activeValue: CascaderValue, fields: ReturnType<typeof getCascaderFields>) {
  const columns: CascaderOption[][] = [options];
  let current = options;
  activeValue.forEach((value) => {
    const selected = current.find((option) => getCascaderOptionValue(option, fields) === value);
    const children = selected ? getCascaderChildren(selected, fields) : undefined;
    if (children?.length) {
      columns.push(children);
      current = children;
    }
  });
  return columns;
}

function updateCascaderOptionAtPath(
  options: CascaderOption[],
  targetValue: CascaderValue,
  fields: ReturnType<typeof getCascaderFields>,
  updater: (option: CascaderOption) => CascaderOption,
  parentValue: CascaderValue = []
): CascaderOption[] {
  let changed = false;
  const nextOptions = options.map((option) => {
    const optionValue = getCascaderOptionValue(option, fields);
    const pathValue = optionValue === undefined ? parentValue : [...parentValue, optionValue];

    if (isSameCascaderPath(pathValue, targetValue)) {
      changed = true;
      return updater(option);
    }

    const children = getCascaderChildren(option, fields);
    if (!children?.length) return option;

    const nextChildren = updateCascaderOptionAtPath(children, targetValue, fields, updater, pathValue);
    if (nextChildren === children) return option;

    changed = true;
    return { ...option, [fields.children]: nextChildren };
  });

  return changed ? nextOptions : options;
}

const isCascaderLoadPromise = (value: unknown): value is Promise<void | CascaderOption[]> =>
  Boolean(value && typeof (value as Promise<void | CascaderOption[]>).then === 'function');

function getCascaderSearchConfig(showSearch: CascaderProps['showSearch']): CascaderSearchConfig | null {
  if (!showSearch) return null;
  return showSearch === true ? {} : showSearch;
}

const CascaderBase = React.forwardRef<HTMLDivElement, CascaderProps>(({
  options = [],
  value,
  defaultValue,
  multiple = false,
  onChange,
  placeholder = 'Select path',
  separator = ' / ',
  allowClear = true,
  changeOnSelect = false,
  disabled = false,
  displayRender,
  tagRender,
  expandTrigger = 'click',
  expandIcon = <Icon name="chevron-right" size={12} />,
  fieldNames,
  loadData,
  loadingIcon = <span className="cinna-cascader__loading" role="status" aria-label="Loading" />,
  maxTagCount,
  maxTagPlaceholder,
  maxTagTextLength,
  notFoundContent = 'Not Found',
  open,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottomLeft',
  prefix,
  popupRender,
  showCheckedStrategy = 'SHOW_PARENT',
  showSearch,
  suffixIcon = <Icon name="chevron-down" size={13} />,
  removeIcon = <Icon name="close-blue" size={10} />,
  controlSize,
  size,
  status,
  variant = 'outlined',
  optionRender,
  classNames,
  styles,
  className,
  style,
  ...rest
}, ref) => {
  const fields = useMemo(() => getCascaderFields(fieldNames), [fieldNames]);
  const resolvedSize = controlSize ?? size ?? 'medium';
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [asyncOptions, setAsyncOptions] = useState<CascaderOption[]>(options);
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isOpenControlled = open !== undefined;
  const actualOpen = isOpenControlled ? Boolean(open) : innerOpen;
  const isValueControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<CascaderValue | CascaderMultipleValue>(() => normalizeCascaderValue(defaultValue, options, fields, multiple));
  const mergedOptions = asyncOptions;
  const selectedValue = (isValueControlled ? normalizeCascaderValue(value, mergedOptions, fields, multiple) : normalizeCascaderValue(innerValue as CascaderRawValue, mergedOptions, fields, multiple)) as CascaderValue | CascaderMultipleValue;
  const selectedValues = multiple ? selectedValue as CascaderMultipleValue : [];
  const selectedSingleValue = multiple ? [] : selectedValue as CascaderValue;
  const initialActive = multiple ? selectedValues[0] ?? [] : selectedSingleValue;
  const [activeValue, setActiveValue] = useState<CascaderValue>(initialActive);
  const searchConfig = getCascaderSearchConfig(showSearch);
  const isSearchControlled = searchConfig?.searchValue !== undefined;
  const [innerSearch, setInnerSearch] = useState('');
  const searchValue = isSearchControlled ? String(searchConfig?.searchValue ?? '') : innerSearch;
  const selectedPath = getCascaderPathFromValue(selectedSingleValue, mergedOptions, fields);
  const selectableSearchPaths = useMemo(() => flattenCascaderPaths(mergedOptions, fields, changeOnSelect || multiple), [changeOnSelect, fields, multiple, mergedOptions]);
  const columns = getCascaderColumns(mergedOptions, activeValue, fields);
  const popupId = useId();

  useEffect(() => {
    setAsyncOptions(options);
  }, [options]);

  const setRootRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const setPopupOpen = (nextOpen: boolean) => {
    const next = disabled ? false : nextOpen;
    if (!isOpenControlled) setInnerOpen(next);
    if (actualOpen !== next) onOpenChange?.(next);
    if (!next && !isSearchControlled) setInnerSearch('');
  };

  const commitValue = (nextValue: CascaderValue | CascaderMultipleValue, selectedOptions: CascaderOption[] | CascaderOption[][]) => {
    if (!isValueControlled) setInnerValue(nextValue);
    onChange?.(nextValue, selectedOptions);
  };

  const updateSearch = (next: string) => {
    if (!isSearchControlled) setInnerSearch(next);
    searchConfig?.onSearch?.(next);
  };

  const displaySingle = () => {
    if (!selectedPath.length) return null;
    const labels = getCascaderPathLabels(selectedPath, fields);
    return displayRender ? displayRender(labels, selectedPath) : labels.map((label, index) => <React.Fragment key={index}>{index > 0 ? separator : null}{label}</React.Fragment>);
  };

  const getTagInfos = (): CascaderTagRenderInfo[] => selectedValues.map((pathValue) => {
    const path = getCascaderPathFromValue(pathValue, mergedOptions, fields);
    const option = path[path.length - 1] ?? {};
    const labels = getCascaderPathLabels(path, fields);
    let label: React.ReactNode = displayRender ? displayRender(labels, path) : labels.map((item) => String(item)).join(String(separator));
    if (maxTagTextLength && typeof label === 'string' && label.length > maxTagTextLength) label = `${label.slice(0, maxTagTextLength)}...`;
    return {
      label,
      value: pathValue,
      option,
      path,
      onClose: () => {
        const next = selectedValues.filter((item) => !isSameCascaderPath(item, pathValue));
        const nextOptions = next.map((item) => getCascaderPathFromValue(item, mergedOptions, fields));
        commitValue(next, nextOptions);
      },
    };
  }).filter((info) => info.path.length > 0);

  const visibleTagInfos = () => {
    const infos = getTagInfos();
    if (showCheckedStrategy === 'SHOW_CHILD') return infos.filter((info) => !infos.some((other) => other !== info && isSameCascaderPath(info.value, other.value.slice(0, info.value.length))));
    if (showCheckedStrategy === 'SHOW_PARENT') return infos.filter((info) => !infos.some((other) => other !== info && isSameCascaderPath(other.value, info.value.slice(0, other.value.length))));
    return infos;
  };

  const selectPath = (path: CascaderOption[], closeOnLeaf = true) => {
    const nextPathValue = getCascaderPathValue(path, fields);
    if (!nextPathValue.length) return;
    const option = path[path.length - 1];
    const leaf = getCascaderIsLeaf(option, fields);

    if (multiple) {
      const exists = selectedValues.some((item) => isSameCascaderPath(item, nextPathValue));
      const next = exists ? selectedValues.filter((item) => !isSameCascaderPath(item, nextPathValue)) : [...selectedValues, nextPathValue];
      const nextOptions = next.map((item) => getCascaderPathFromValue(item, mergedOptions, fields));
      commitValue(next, nextOptions);
      if (searchConfig?.autoClearSearchValue !== false) updateSearch('');
      return;
    }

    if (leaf || changeOnSelect) {
      commitValue(nextPathValue, path);
      if (leaf && closeOnLeaf) setPopupOpen(false);
    }
  };

  const updateAsyncOption = (pathValue: CascaderValue, updater: (option: CascaderOption) => CascaderOption) => {
    setAsyncOptions((current) => updateCascaderOptionAtPath(current, pathValue, fields, updater));
  };

  const setPathLoading = (pathValue: CascaderValue, nextLoading: boolean) => {
    updateAsyncOption(pathValue, (option) => ({ ...option, [fields.loading]: nextLoading }));
  };

  const finishLoadingPath = (pathValue: CascaderValue, children?: CascaderOption[]) => {
    updateAsyncOption(pathValue, (option) => ({
      ...option,
      [fields.loading]: false,
      ...(children ? { [fields.children]: children } : {}),
    }));
  };

  const triggerLoadData = (path: CascaderOption[]) => {
    if (!loadData) return;

    const pathValue = getCascaderPathValue(path, fields);
    if (!pathValue.length) return;

    setPathLoading(pathValue, true);

    try {
      const result = loadData(path);
      if (Array.isArray(result)) {
        finishLoadingPath(pathValue, result);
        return;
      }

      if (isCascaderLoadPromise(result)) {
        result.then(
          (children) => {
            finishLoadingPath(pathValue, Array.isArray(children) ? children : undefined);
          },
          () => {
            finishLoadingPath(pathValue);
          }
        );
      }
    } catch (error) {
      finishLoadingPath(pathValue);
      throw error;
    }
  };

  const activateOption = (path: CascaderOption[], shouldSelect: boolean) => {
    const option = path[path.length - 1];
    if (!option || getCascaderDisabled(option, fields)) return;
    const pathValue = getCascaderPathValue(path, fields);
    const loading = getCascaderLoading(option, fields);
    setActiveValue(pathValue);
    if (loading) return;
    if (!getCascaderIsLeaf(option, fields) && loadData && !(getCascaderChildren(option, fields)?.length)) triggerLoadData(path);
    if (shouldSelect || getCascaderIsLeaf(option, fields) || changeOnSelect || multiple) selectPath(path, true);
  };

  const clearValue = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    commitValue(multiple ? [] : [], multiple ? [] : []);
    setActiveValue([]);
    updateSearch('');
    setPopupOpen(false);
  };

  const defaultSearchFilter = (input: string, path: CascaderOption[]) => {
    const lower = input.toLowerCase();
    return getCascaderPathLabels(path, fields).some((label) => String(label).toLowerCase().includes(lower));
  };

  const searchResults = useMemo(() => {
    if (!searchConfig || !searchValue) return [];
    const filter = searchConfig.filter ?? defaultSearchFilter;
    let results = selectableSearchPaths.filter((path) => filter(searchValue, path));
    if (searchConfig.sort) results = [...results].sort((a, b) => searchConfig.sort?.(a, b, searchValue) ?? 0);
    if (typeof searchConfig.limit === 'number') results = results.slice(0, searchConfig.limit);
    else if (searchConfig.limit !== false) results = results.slice(0, 50);
    return results;
  }, [searchConfig, searchValue, selectableSearchPaths]);

  useEffect(() => {
    if (!actualOpen) return;
    const close = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      if (event.type === 'pointerdown' && rootRef.current?.contains(event.target as Node)) return;
      setPopupOpen(false);
    };
    document.addEventListener('pointerdown', close, true);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close, true);
      document.removeEventListener('keydown', close);
    };
  }, [actualOpen, disabled, isOpenControlled, onOpenChange]);

  const content = multiple ? (
    <span className={cx('cinna-cascader__tags', classNames?.content)} style={styles?.content}>
      {visibleTagInfos().slice(0, maxTagCount === 'responsive' ? 2 : maxTagCount).map((info) => (
        tagRender ? (
          <React.Fragment key={getCascaderPathKey(info.value)}>{tagRender(info)}</React.Fragment>
        ) : (
          <span key={getCascaderPathKey(info.value)} className={cx('cinna-cascader__tag', classNames?.tag)} style={styles?.tag}>
            {info.label}
            <button type="button" aria-label="Remove selected path" onClick={(event) => { event.stopPropagation(); info.onClose(); }}>{removeIcon}</button>
          </span>
        )
      ))}
      {(() => {
        const infos = visibleTagInfos();
        const limit = maxTagCount === 'responsive' ? 2 : maxTagCount;
        const omitted = typeof limit === 'number' ? infos.slice(limit) : [];
        if (!omitted.length) return null;
        const label = typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(omitted) : maxTagPlaceholder ?? `+${omitted.length}`;
        return <span className="cinna-cascader__tag cinna-cascader__tag--omitted">{label}</span>;
      })()}
      {!visibleTagInfos().length && <span className={cx('cinna-cascader__placeholder', classNames?.placeholder)} style={styles?.placeholder}>{placeholder}</span>}
    </span>
  ) : (
    <span className={cx('cinna-cascader__content', classNames?.content, !selectedPath.length && 'cinna-cascader__placeholder')} style={selectedPath.length ? styles?.content : styles?.placeholder}>
      {selectedPath.length ? displaySingle() : placeholder}
    </span>
  );

  const renderOptionContent = (option: CascaderOption, path: CascaderOption[]) => optionRender?.(option, path) ?? getCascaderOptionLabel(option, fields);
  const renderMenuOption = (option: CascaderOption, path: CascaderOption[]) => {
    const pathValue = getCascaderPathValue(path, fields);
    const active = isSameCascaderPath(activeValue.slice(0, pathValue.length), pathValue);
    const checked = multiple
      ? selectedValues.some((item) => isSameCascaderPath(item, pathValue))
      : isSameCascaderPath(selectedSingleValue, pathValue);
    const hasChildren = !getCascaderIsLeaf(option, fields);
    const disabledOption = getCascaderDisabled(option, fields);
    const loadingOption = getCascaderLoading(option, fields);
    const eventHandlers = {
      onMouseEnter: expandTrigger === 'hover' && hasChildren && !disabledOption && !loadingOption ? () => activateOption(path, false) : undefined,
      onClick: () => activateOption(path, expandTrigger === 'click' || !hasChildren),
    };

    return (
      <button
        key={getCascaderPathKey(pathValue)}
        type="button"
        role="option"
        aria-selected={checked}
        disabled={disabledOption}
        className={cx(
          'cinna-cascader__option',
          active && 'cinna-cascader__option--active',
          checked && 'cinna-cascader__option--checked',
          disabledOption && 'cinna-cascader__option--disabled',
          loadingOption && 'cinna-cascader__option--loading',
          option.className,
          classNames?.option
        )}
        style={{ ...styles?.option, ...option.style }}
        aria-busy={loadingOption || undefined}
        {...eventHandlers}
      >
        {multiple && <span className="cinna-cascader__check" aria-hidden="true">{checked ? '✓' : ''}</span>}
        <span>{renderOptionContent(option, path)}</span>
        {loadingOption ? <small className="cinna-cascader__loading-icon">{loadingIcon}</small> : hasChildren ? <small className="cinna-cascader__expand-icon">{expandIcon}</small> : null}
      </button>
    );
  };

  const menus = searchConfig && searchValue ? (
    <span className="cinna-cascader__search-results" role="listbox">
      {searchResults.length ? searchResults.map((path) => {
        const value = getCascaderPathValue(path, fields);
        const contentNode = searchConfig.render
          ? searchConfig.render(searchValue, path)
          : getCascaderPathLabels(path, fields).map((label, index) => <React.Fragment key={index}>{index > 0 ? separator : null}{label}</React.Fragment>);
        return (
          <button
            key={getCascaderPathKey(value)}
            type="button"
            role="option"
            className={cx('cinna-cascader__option', classNames?.option)}
            style={styles?.option}
            onClick={() => {
              setActiveValue(value);
              selectPath(path, true);
            }}
          >
            <span>{contentNode}</span>
          </button>
        );
      }) : (
        <span className={cx('cinna-cascader__empty', classNames?.empty)} style={styles?.empty}>{notFoundContent}</span>
      )}
    </span>
  ) : (
    <span className={cx('cinna-cascader__menus', classNames?.menus)} role="listbox" style={styles?.menus}>
      {columns.map((column, columnIndex) => (
        <span key={columnIndex} className={cx('cinna-cascader__menu', classNames?.menu)} style={styles?.menu}>
          {column.length ? column.map((option) => {
            const parentPath = activeValue.slice(0, columnIndex);
            return renderMenuOption(option, [...getCascaderPathFromValue(parentPath, mergedOptions, fields).slice(0, columnIndex), option]);
          }) : <span className={cx('cinna-cascader__empty', classNames?.empty)} style={styles?.empty}>{notFoundContent}</span>}
        </span>
      ))}
    </span>
  );

  const popup = (
    <span className={cx('cinna-cascader__popup', `cinna-cascader__popup--${placement}`, classNames?.popup)} style={styles?.popup}>
      {searchConfig && (
        <label className={cx('cinna-cascader__search', classNames?.search)} style={styles?.search}>
          {searchConfig.searchIcon && <span>{searchConfig.searchIcon}</span>}
          <input value={searchValue} placeholder="Search path" onChange={(event) => updateSearch(event.currentTarget.value)} />
        </label>
      )}
      {popupRender ? popupRender(menus) : menus}
    </span>
  );

  const hasValue = multiple ? selectedValues.length > 0 : selectedSingleValue.length > 0;
  const clearIcon = allowClear && typeof allowClear === 'object' ? allowClear.clearIcon ?? <Icon name="close-blue" size={11} /> : <Icon name="close-blue" size={11} />;

  return (
    <div
      ref={setRootRef}
      className={cx(
        'cinna-cascader',
        `cinna-cascader--${resolvedSize}`,
        `cinna-cascader--${variant}`,
        `cinna-cascader--${placement}`,
        status && `cinna-cascader--${status}`,
        actualOpen && 'cinna-cascader--open',
        multiple && 'cinna-cascader--multiple',
        disabled && 'cinna-cascader--disabled',
        classNames?.root,
        className
      )}
      style={{ ...styles?.root, ...style }}
      {...rest}
    >
      <button
        type="button"
        className={cx('cinna-cascader__control', classNames?.control)}
        style={styles?.control}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={actualOpen}
        aria-controls={actualOpen ? popupId : undefined}
        onClick={() => setPopupOpen(!actualOpen)}
      >
        {prefix && <span className={cx('cinna-cascader__prefix', classNames?.prefix)} style={styles?.prefix}>{prefix}</span>}
        {content}
        {allowClear && hasValue && !disabled && (
          <span
            role="button"
            tabIndex={-1}
            aria-label="Clear cascader"
            className={cx('cinna-cascader__clear', classNames?.clear)}
            style={styles?.clear}
            onClick={clearValue}
          >
            {clearIcon}
          </span>
        )}
        <span className={cx('cinna-cascader__suffix', classNames?.suffix)} style={styles?.suffix} aria-hidden="true">{suffixIcon}</span>
      </button>
      {actualOpen && (
        <span id={popupId}>
          {popup}
        </span>
      )}
    </div>
  );
});
CascaderBase.displayName = 'Cascader';

export const Cascader = Object.assign(CascaderBase, {
  SHOW_PARENT: 'SHOW_PARENT' as CascaderShowCheckedStrategy,
  SHOW_CHILD: 'SHOW_CHILD' as CascaderShowCheckedStrategy,
});

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

export const Mentions = React.forwardRef<HTMLTextAreaElement, MentionsProps>(({
  options = [],
  prefix = '@',
  onSelect,
  className,
  value,
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  disabled,
  readOnly,
  ...rest
}, ref) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(String(defaultValue));
  const [open, setOpen] = useState(false);
  const current = String(value ?? inner);
  const normalized = options.map((option) => (typeof option === 'string' ? { label: option, value: option } : option));
  const insertMention = (nextValue: string) => {
    const next = `${current}${current.endsWith(' ') || !current ? '' : ' '}${prefix}${nextValue} `;
    setInner(next);
    onSelect?.(nextValue);
    setOpen(false);
  };
  const canOpen = !disabled && !readOnly && normalized.length > 0;

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer, true);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer, true);
  }, [open]);

  return (
  <div ref={rootRef} className={cx('cinna-mentions', open && 'cinna-mentions--open', className)}>
    <TextArea
      ref={ref}
      value={current}
      disabled={disabled}
      readOnly={readOnly}
      onFocus={(event) => {
        if (canOpen) setOpen(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setOpen(false);
        onBlur?.(event);
      }}
      onChange={(event) => {
        setInner(event.currentTarget.value);
        if (canOpen) setOpen(true);
        onChange?.(event);
      }}
      {...rest}
    />
    {open && normalized.length > 0 && (
      <div className="cinna-mentions__options">
        {normalized.map((option) => (
          <button
            key={option.value}
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => insertMention(option.value)}
          >
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

function flattenTree(nodes: TreeNodeData[], level = 0): SelectOption[] {
  return nodes.flatMap((node) => [
    { label: `${'  '.repeat(level)}${String(node.title)}`, value: node.key },
    ...(node.children ? flattenTree(node.children, level + 1) : []),
  ]);
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
