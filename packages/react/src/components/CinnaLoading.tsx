import React from 'react';
import { cx } from '../utils/cx';

export interface CinnaLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  label?: React.ReactNode;
  active?: boolean;
}

export const CinnaLoading: React.FC<CinnaLoadingProps> = ({ size = 'medium', label = 'Loading', active = true, className, ...rest }) => {
  if (!active) return null;

  return (
    <div className={cx('cinna-loading', `cinna-loading--${size}`, className)} role="status" aria-live="polite" {...rest}>
      <div className="cinna-loading__sky" aria-hidden="true">
        <span className="cinna-loading__ring" />
        <span className="cinna-loading__dot cinna-loading__dot--one" />
        <span className="cinna-loading__dot cinna-loading__dot--two" />
        <span className="cinna-loading__dot cinna-loading__dot--three" />
        <span className="cinna-loading__cloud" />
      </div>
      {label && <span className="cinna-loading__label">{label}</span>}
    </div>
  );
};

CinnaLoading.displayName = 'CinnaLoading';
