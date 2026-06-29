import type React from 'react';

export type SiteSegmentedOption<T extends string> = {
  value: T;
  label: React.ReactNode;
};

export const SiteSegmented = <T extends string>({
  value,
  options,
  ariaLabel,
  className,
  onChange,
}: {
  value: T;
  options: SiteSegmentedOption<T>[];
  ariaLabel: string;
  className?: string;
  onChange: (value: T) => void;
}) => (
  <div
    className={['site-segmented', className].filter(Boolean).join(' ')}
    style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    aria-label={ariaLabel}
  >
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className={['site-segmented__item', option.value === value ? 'site-segmented__item--active' : undefined].filter(Boolean).join(' ')}
        aria-pressed={option.value === value}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);
