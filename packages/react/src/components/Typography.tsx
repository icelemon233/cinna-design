import React, { useEffect, useRef, useState } from 'react';
import { cx } from '../utils/cx';
import type { CinnaStatus } from './Shared';

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  muted?: boolean;
  compact?: boolean;
}

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(({ muted, compact, className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-typography', muted && 'cinna-typography--muted', compact && 'cinna-typography--compact', className)} {...rest} />
));
Typography.displayName = 'Typography';

export type TypographyEllipsis = boolean | {
  rows?: number;
  expandable?: boolean;
  defaultExpanded?: boolean;
  moreText?: React.ReactNode;
  lessText?: React.ReactNode;
};

export type TypographyCopyable = boolean | {
  text?: string;
  copyText?: React.ReactNode;
  copiedText?: React.ReactNode;
  onCopy?: (text: string) => void;
};

interface TypographyActionOptions {
  children?: React.ReactNode;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
  defaultRows: number;
}

interface TypographyActionState {
  contentClassName: string;
  contentStyle?: React.CSSProperties;
  actions: React.ReactNode;
  expanded: boolean;
}

const getTypographyCopyText = (children: React.ReactNode, copyable?: TypographyCopyable) => {
  if (copyable && typeof copyable === 'object' && copyable.text !== undefined) return copyable.text;
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      return '';
    })
    .join('');
};

const getTypographyEllipsisConfig = (ellipsis: TypographyEllipsis | undefined, defaultRows: number) => {
  if (!ellipsis) return undefined;
  if (ellipsis === true) return { rows: defaultRows, expandable: false, defaultExpanded: false };
  return {
    rows: ellipsis.rows ?? defaultRows,
    expandable: Boolean(ellipsis.expandable),
    defaultExpanded: Boolean(ellipsis.defaultExpanded),
    moreText: ellipsis.moreText,
    lessText: ellipsis.lessText,
  };
};

const useTypographyActions = ({ children, copyable, ellipsis, defaultRows }: TypographyActionOptions): TypographyActionState => {
  const ellipsisConfig = getTypographyEllipsisConfig(ellipsis, defaultRows);
  const [expanded, setExpanded] = useState(Boolean(ellipsisConfig?.defaultExpanded));
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current !== undefined) window.clearTimeout(copiedTimeoutRef.current);
    };
  }, []);

  const copyConfig = copyable && typeof copyable === 'object' ? copyable : undefined;
  const shouldClamp = Boolean(ellipsisConfig && !expanded);
  const canExpand = Boolean(ellipsisConfig?.expandable);
  const copyText = getTypographyCopyText(children, copyable);
  const actions: React.ReactNode[] = [];

  if (canExpand) {
    actions.push(
      <button key="ellipsis" type="button" className="cinna-typography__action" onClick={() => setExpanded((value) => !value)}>
        {expanded ? ellipsisConfig?.lessText ?? '收起' : ellipsisConfig?.moreText ?? '展开'}
      </button>
    );
  }

  if (copyable) {
    actions.push(
      <button
        key="copy"
        type="button"
        className="cinna-typography__copy"
        onClick={async () => {
          try {
            await navigator.clipboard?.writeText(copyText);
          } catch {
            // Copy can fail in restricted browsers; keep the local copied feedback for consistency.
          }
          copyConfig?.onCopy?.(copyText);
          setCopied(true);
          if (copiedTimeoutRef.current !== undefined) window.clearTimeout(copiedTimeoutRef.current);
          copiedTimeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? copyConfig?.copiedText ?? '已复制' : copyConfig?.copyText ?? '复制'}
      </button>
    );
  }

  return {
    contentClassName: cx('cinna-typography__content', shouldClamp && 'cinna-typography__content--ellipsis'),
    contentStyle: shouldClamp ? ({ '--cinna-typography-ellipsis-rows': ellipsisConfig?.rows } as React.CSSProperties) : undefined,
    actions: actions.length ? <span className="cinna-typography__actions">{actions}</span> : null,
    expanded,
  };
};

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
  muted?: boolean;
  disabled?: boolean;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
}

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(({ level = 2, muted, disabled, copyable, ellipsis, className, children, ...rest }, ref) => {
  const { contentClassName, contentStyle, actions } = useTypographyActions({ children, copyable, ellipsis, defaultRows: 1 });
  const titleClassName = cx('cinna-title', `cinna-title--${level}`, muted && 'cinna-title--muted', disabled && 'cinna-title--disabled', className);
  const content = (
    <>
      <span className={contentClassName} style={contentStyle}>{children}</span>
      {actions}
    </>
  );

  if (level === 1) return <h1 ref={ref} className={titleClassName} aria-disabled={disabled || undefined} {...rest}>{content}</h1>;
  if (level === 2) return <h2 ref={ref} className={titleClassName} aria-disabled={disabled || undefined} {...rest}>{content}</h2>;
  if (level === 3) return <h3 ref={ref} className={titleClassName} aria-disabled={disabled || undefined} {...rest}>{content}</h3>;
  if (level === 4) return <h4 ref={ref} className={titleClassName} aria-disabled={disabled || undefined} {...rest}>{content}</h4>;
  return <h5 ref={ref} className={titleClassName} aria-disabled={disabled || undefined} {...rest}>{content}</h5>;
});
Title.displayName = 'Title';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  muted?: boolean;
  disabled?: boolean;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(({ muted, disabled, copyable, ellipsis, className, children, ...rest }, ref) => {
  const { contentClassName, contentStyle, actions } = useTypographyActions({ children, copyable, ellipsis, defaultRows: 2 });

  return (
    <p ref={ref} className={cx('cinna-paragraph', Boolean(actions) && 'cinna-typography-with-actions', muted && 'cinna-paragraph--muted', disabled && 'cinna-paragraph--disabled', className)} aria-disabled={disabled || undefined} {...rest}>
      <span className={contentClassName} style={contentStyle}>{children}</span>
      {actions}
    </p>
  );
});
Paragraph.displayName = 'Paragraph';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  tone?: 'default' | 'secondary' | 'muted' | CinnaStatus;
  strong?: boolean;
  code?: boolean;
  mark?: boolean;
  delete?: boolean;
  underline?: boolean;
  disabled?: boolean;
  link?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(({
  tone = 'default',
  strong,
  code,
  mark,
  delete: deleted,
  underline,
  disabled,
  link,
  href,
  target,
  rel,
  copyable,
  ellipsis,
  className,
  children,
  onClick,
  ...rest
}, ref) => {
  const { contentClassName, contentStyle, actions } = useTypographyActions({ children, copyable, ellipsis, defaultRows: 1 });
  const textClassName = cx(
    'cinna-text',
    `cinna-text--${tone}`,
    strong && 'cinna-text--strong',
    code && 'cinna-text--code',
    mark && 'cinna-text--mark',
    deleted && 'cinna-text--delete',
    underline && 'cinna-text--underline',
    disabled && 'cinna-text--disabled',
    (link || href) && 'cinna-text--link',
    className
  );
  const content = <span className={contentClassName} style={contentStyle}>{children}</span>;

  if (link || href) {
    const anchor = (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={textClassName}
        href={disabled ? undefined : href}
        target={target}
        rel={target === '_blank' ? rel ?? 'noreferrer' : rel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        {...rest}
      >
        {content}
      </a>
    );

    return actions ? <span className="cinna-typography-with-actions">{anchor}{actions}</span> : anchor;
  }

  const text = (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={textClassName}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {content}
    </span>
  );

  return actions ? <span className="cinna-typography-with-actions">{text}{actions}</span> : text;
});
