import React from 'react';
import cinnaCloudCatSrc from '../assets/cinna-cloud-cat.webp';
import { cx } from '../utils/cx';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  label?: React.ReactNode;
  active?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'medium', label = 'Loading', active = true, className, ...rest }) => {
  if (!active) return null;

  return (
    <div className={cx('cinna-loading', `cinna-loading--${size}`, className)} role="status" aria-live="polite" {...rest}>
      <div className="cinna-loading__sky" aria-hidden="true">
        <span className="cinna-loading__ring" />
        <span className="cinna-loading__dot cinna-loading__dot--one" />
        <span className="cinna-loading__dot cinna-loading__dot--two" />
        <span className="cinna-loading__dot cinna-loading__dot--three" />
        <img className="cinna-loading__mascot" src={cinnaCloudCatSrc} alt="" draggable={false} />
      </div>
      {label && <span className="cinna-loading__label">{label}</span>}
    </div>
  );
};

Loading.displayName = 'Loading';
