import React from 'react';
import { cx } from '../utils/cx';

export type CardTone = 'cream' | 'blue' | 'butter' | 'strawberry' | 'pistachio' | 'lavender';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: CardTone;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  interactive?: boolean;
  padded?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ tone = 'cream', title, extra, interactive = false, padded = true, className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-card',
          `cinna-card--${tone}`,
          interactive && 'cinna-card--interactive',
          padded && 'cinna-card--padded',
          className
        )}
        {...rest}
      >
        {(title || extra) && (
          <div className="cinna-card__header">
            {title && <div className="cinna-card__title">{title}</div>}
            {extra && <div className="cinna-card__extra">{extra}</div>}
          </div>
        )}
        <div className="cinna-card__body">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';
