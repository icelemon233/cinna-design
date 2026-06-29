import React, { useState } from 'react';
import { cx } from '../utils/cx';
import { Icon } from './Icon';
import { Loading } from './Loading';
import { clamp, clampNumber, statusIcon } from './Shared';
import type { CinnaStatus } from './Shared';

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
          {closeText ?? <Icon name={type === 'error' ? 'close-red' : 'close-blue'} size={12} />}
        </button>
      )}
    </div>
  );
});

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

export { Loading };
export const Spin = Loading;

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
