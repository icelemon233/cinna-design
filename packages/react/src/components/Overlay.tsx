import React, { useEffect, useRef, useState } from 'react';
import { Button, type ButtonProps } from './Button';
import { cx } from '../utils/cx';
import { normalizePopupCssValue } from './Shared';
import { Menu, type MenuItem } from './Navigation';

export type PopupMode = 'tooltip' | 'menu' | 'popover' | 'confirm';
export type PopupTrigger = 'click' | 'hover' | 'contextMenu';
export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopupAlign = 'left' | 'center' | 'right';

export interface PopupStyles {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  radius?: number | string;
  shadow?: string;
  fontSize?: number | string;
  minWidth?: number | string;
  width?: number | string;
  padding?: number | string;
  titleColor?: string;
  titleFontSize?: number | string;
  titleFontWeight?: React.CSSProperties['fontWeight'];
  contentColor?: string;
  contentFontSize?: number | string;
  menuColor?: string;
  menuFontSize?: number | string;
  menuHoverColor?: string;
  menuHoverBackgroundColor?: string;
  menuActiveColor?: string;
  menuActiveBackgroundColor?: string;
  menuDisabledColor?: string;
  dividerColor?: string;
  arrowColor?: string;
  arrowBorderColor?: string;
  triggerColor?: string;
  triggerBackgroundColor?: string;
  triggerBorderColor?: string;
  triggerFontSize?: number | string;
  triggerShadow?: string;
}

export interface PopupProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title' | 'content' | 'onSelect'> {
  mode?: PopupMode;
  label?: React.ReactNode;
  items?: MenuItem[];
  menu?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  description?: React.ReactNode;
  trigger?: PopupTrigger;
  placement?: PopupPlacement;
  align?: PopupAlign;
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  closeOnSelect?: boolean;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  styles?: PopupStyles;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (key: string) => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const getPopupStyleVars = (styles: PopupStyles | undefined) => {
  if (!styles) return {};
  return {
    ...(styles.backgroundColor ? { '--cinna-popup-bg': styles.backgroundColor } : null),
    ...(styles.color ? { '--cinna-popup-color': styles.color } : null),
    ...(styles.borderColor ? { '--cinna-popup-border': styles.borderColor } : null),
    ...(styles.radius !== undefined ? { '--cinna-popup-radius': normalizePopupCssValue(styles.radius) } : null),
    ...(styles.shadow ? { '--cinna-popup-shadow': styles.shadow } : null),
    ...(styles.fontSize !== undefined ? { '--cinna-popup-font-size': normalizePopupCssValue(styles.fontSize) } : null),
    ...(styles.minWidth !== undefined ? { '--cinna-popup-min-width': normalizePopupCssValue(styles.minWidth) } : null),
    ...(styles.width !== undefined ? { '--cinna-popup-width': normalizePopupCssValue(styles.width) } : null),
    ...(styles.padding !== undefined ? { '--cinna-popup-padding': normalizePopupCssValue(styles.padding) } : null),
    ...(styles.titleColor ? { '--cinna-popup-title-color': styles.titleColor } : null),
    ...(styles.titleFontSize !== undefined ? { '--cinna-popup-title-font-size': normalizePopupCssValue(styles.titleFontSize) } : null),
    ...(styles.titleFontWeight !== undefined ? { '--cinna-popup-title-font-weight': styles.titleFontWeight } : null),
    ...(styles.contentColor ? { '--cinna-popup-content-color': styles.contentColor } : null),
    ...(styles.contentFontSize !== undefined ? { '--cinna-popup-content-font-size': normalizePopupCssValue(styles.contentFontSize) } : null),
    ...(styles.menuColor ? { '--cinna-popup-menu-color': styles.menuColor } : null),
    ...(styles.menuFontSize !== undefined ? { '--cinna-popup-menu-font-size': normalizePopupCssValue(styles.menuFontSize) } : null),
    ...(styles.menuHoverColor ? { '--cinna-popup-menu-hover-color': styles.menuHoverColor } : null),
    ...(styles.menuHoverBackgroundColor ? { '--cinna-popup-menu-hover-bg': styles.menuHoverBackgroundColor } : null),
    ...(styles.menuActiveColor ? { '--cinna-popup-menu-active-color': styles.menuActiveColor } : null),
    ...(styles.menuActiveBackgroundColor ? { '--cinna-popup-menu-active-bg': styles.menuActiveBackgroundColor } : null),
    ...(styles.menuDisabledColor ? { '--cinna-popup-menu-disabled-color': styles.menuDisabledColor } : null),
    ...(styles.dividerColor ? { '--cinna-popup-divider-color': styles.dividerColor } : null),
    ...(styles.arrowColor ? { '--cinna-popup-arrow-bg': styles.arrowColor } : null),
    ...(styles.arrowBorderColor ? { '--cinna-popup-arrow-border': styles.arrowBorderColor } : null),
    ...(styles.triggerColor ? { '--cinna-popup-trigger-color': styles.triggerColor } : null),
    ...(styles.triggerBackgroundColor ? { '--cinna-popup-trigger-bg': styles.triggerBackgroundColor } : null),
    ...(styles.triggerBorderColor ? { '--cinna-popup-trigger-border': styles.triggerBorderColor } : null),
    ...(styles.triggerFontSize !== undefined ? { '--cinna-popup-trigger-font-size': normalizePopupCssValue(styles.triggerFontSize) } : null),
    ...(styles.triggerShadow ? { '--cinna-popup-trigger-shadow': styles.triggerShadow } : null),
  } as React.CSSProperties;
};

export const Popup = React.forwardRef<HTMLSpanElement, PopupProps>(({
  mode = 'popover',
  label,
  items,
  menu,
  title,
  content,
  description,
  trigger = mode === 'menu' || mode === 'confirm' ? 'click' : 'hover',
  placement = 'bottom',
  align = 'center',
  arrow = false,
  open,
  defaultOpen = false,
  disabled = false,
  closeOnSelect = true,
  overlayClassName,
  overlayStyle,
  styles,
  onOpenChange,
  onSelect,
  okText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  className,
  children,
  style,
  ...rest
}, ref) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [contextPosition, setContextPosition] = useState<{ x: number; y: number } | null>(null);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : innerOpen;
  const isContextMenu = trigger === 'contextMenu';

  const setRefs = (node: HTMLSpanElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const setPopupOpen = (nextOpen: boolean) => {
    if (disabled && nextOpen) return;
    if (!isControlled) setInnerOpen(nextOpen);
    if (!nextOpen) setContextPosition(null);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!actualOpen || trigger === 'hover') return undefined;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      if (event instanceof MouseEvent && rootRef.current?.contains(event.target as Node)) return;
      setPopupOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [actualOpen, trigger, disabled, isControlled, onOpenChange]);

  const select = (key: string) => {
    onSelect?.(key);
    if (closeOnSelect) setPopupOpen(false);
  };

  const contextStyle = isContextMenu && contextPosition
    ? {
        '--cinna-popup-context-x': `${contextPosition.x}px`,
        '--cinna-popup-context-y': `${contextPosition.y}px`,
      } as React.CSSProperties
    : undefined;

  const panelClassName = cx(
    'cinna-popup__panel',
    `cinna-popup__panel--${mode}`,
    overlayClassName,
  );

  const panel = (
    <span className={panelClassName} role={mode === 'tooltip' ? 'tooltip' : undefined} style={{ ...contextStyle, ...overlayStyle }} aria-hidden={!actualOpen}>
      {mode === 'tooltip' ? (
        <span className="cinna-popup__content">{title ?? content}</span>
      ) : mode === 'menu' ? (
        items ? <Menu items={items} onSelect={select} /> : menu
      ) : mode === 'confirm' ? (
        <>
          {title && <strong className="cinna-popup__title">{title}</strong>}
          {description && <span className="cinna-popup__content">{description}</span>}
          {content && <span className="cinna-popup__content">{content}</span>}
          <span className="cinna-popup__actions">
            <Button
              size="small"
              variant="cream"
              {...cancelButtonProps}
              onClick={(event) => {
                cancelButtonProps?.onClick?.(event);
                if (event.defaultPrevented) return;
                setPopupOpen(false);
                onCancel?.();
              }}
            >
              {cancelButtonProps?.children ?? cancelText}
            </Button>
            <Button
              size="small"
              variant="primary"
              {...okButtonProps}
              onClick={(event) => {
                okButtonProps?.onClick?.(event);
                if (event.defaultPrevented) return;
                setPopupOpen(false);
                onConfirm?.();
              }}
            >
              {okButtonProps?.children ?? okText}
            </Button>
          </span>
        </>
      ) : (
        <>
          {title && <strong className="cinna-popup__title">{title}</strong>}
          {content && <span className="cinna-popup__content">{content}</span>}
        </>
      )}
    </span>
  );

  const triggerNode = label !== undefined ? (
    <button
      type="button"
      className={cx('cinna-popup__trigger', 'cinna-popup__trigger--button')}
      disabled={disabled}
      aria-haspopup={mode === 'tooltip' ? undefined : mode === 'menu' ? 'menu' : 'dialog'}
      aria-expanded={actualOpen}
      onClick={trigger === 'click' ? () => setPopupOpen(!actualOpen) : undefined}
    >
      {label}
    </button>
  ) : (
    <span
      className="cinna-popup__trigger cinna-popup__trigger--custom"
      aria-haspopup={mode === 'tooltip' ? undefined : mode === 'menu' ? 'menu' : 'dialog'}
      aria-expanded={actualOpen}
      onClick={trigger === 'click' ? () => setPopupOpen(!actualOpen) : undefined}
    >
      {children}
    </span>
  );

  return (
    <span
      ref={setRefs}
      className={cx(
        'cinna-popup',
        `cinna-popup--${mode}`,
        `cinna-popup--${trigger}`,
        `cinna-popup--${placement}`,
        `cinna-popup--align-${align}`,
        arrow && 'cinna-popup--arrow',
        actualOpen && 'cinna-popup--open',
        disabled && 'cinna-popup--disabled',
        className,
      )}
      style={{ ...getPopupStyleVars(styles), ...style }}
      onMouseEnter={trigger === 'hover' ? () => setPopupOpen(true) : undefined}
      onMouseLeave={trigger === 'hover' ? () => setPopupOpen(false) : undefined}
      onContextMenu={isContextMenu ? (event) => {
        event.preventDefault();
        setContextPosition({ x: event.clientX, y: event.clientY });
        setPopupOpen(true);
      } : undefined}
      {...rest}
    >
      {triggerNode}
      {panel}
    </span>
  );
});
Popup.displayName = 'Popup';

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
