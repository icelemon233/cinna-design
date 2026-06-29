import React from 'react';
import arrowTailDown from '../assets/icons/cinna-arrow-tail-down.png';
import arrowTailDownLeft from '../assets/icons/cinna-arrow-tail-down-left.png';
import arrowTailDownRight from '../assets/icons/cinna-arrow-tail-down-right.png';
import arrowTailLeft from '../assets/icons/cinna-arrow-tail-left.png';
import arrowTailRight from '../assets/icons/cinna-arrow-tail-right.png';
import arrowTailUp from '../assets/icons/cinna-arrow-tail-up.png';
import arrowTailUpLeft from '../assets/icons/cinna-arrow-tail-up-left.png';
import arrowTailUpRight from '../assets/icons/cinna-arrow-tail-up-right.png';
import chevronDown from '../assets/icons/cinna-chevron-down.png';
import chevronLeft from '../assets/icons/cinna-chevron-left.png';
import chevronRight from '../assets/icons/cinna-chevron-right.png';
import chevronUp from '../assets/icons/cinna-chevron-up.png';
import closeBlue from '../assets/icons/cinna-close-blue.png';
import closeRed from '../assets/icons/cinna-close-red.png';
import { cx } from '../utils/cx';

export const iconSources = {
  'arrow-tail-up': arrowTailUp,
  'arrow-tail-up-right': arrowTailUpRight,
  'arrow-tail-right': arrowTailRight,
  'arrow-tail-down-right': arrowTailDownRight,
  'arrow-tail-down': arrowTailDown,
  'arrow-tail-down-left': arrowTailDownLeft,
  'arrow-tail-left': arrowTailLeft,
  'arrow-tail-up-left': arrowTailUpLeft,
  'chevron-up': chevronUp,
  'chevron-right': chevronRight,
  'chevron-down': chevronDown,
  'chevron-left': chevronLeft,
  'close-blue': closeBlue,
  'close-red': closeRed,
} as const;

export type IconName = keyof typeof iconSources;

export interface IconProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  name: IconName;
  size?: number | string;
}

const normalizeIconSize = (size: number | string | undefined) => {
  if (typeof size === 'number') return `${size}px`;
  return size;
};

export const Icon = React.forwardRef<HTMLImageElement, IconProps>(({ name, size = 16, alt = '', className, style, ...rest }, ref) => {
  const normalizedSize = normalizeIconSize(size);

  return (
    <img
      ref={ref}
      src={iconSources[name]}
      alt={alt}
      aria-hidden={alt ? rest['aria-hidden'] : true}
      className={cx('cinna-icon', `cinna-icon--${name}`, className)}
      draggable={false}
      style={{
        width: normalizedSize,
        height: normalizedSize,
        ...style,
      }}
      {...rest}
    />
  );
});

Icon.displayName = 'Icon';
