import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../utils/cx';
import { Icon } from './Icon';
import {
  normalizeButtonRippleOpacity,
  renderButtonRipples,
  useButtonRipple,
  type ButtonRippleEffect,
} from './buttonRipple';
import { getButtonThemeStyles, type ButtonThemeInput } from './buttonTheme';
import { Popup, type PopupStyles } from './Overlay';
import { clampNumber, normalizePopupCssValue } from './Shared';
import type { CinnaSize } from './Shared';

export type TabsPosition = 'top' | 'bottom' | 'left' | 'right';
export type TabsVariant = 'borderless' | 'bordered';
export type TabsType = 'line' | 'card';

export interface TabsItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabsItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  tabPosition?: TabsPosition;
  type?: TabsType;
  variant?: TabsVariant;
  size?: CinnaSize;
  scrollable?: boolean;
  addable?: boolean;
  addIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  closable?: boolean;
  draggable?: boolean;
  onAdd?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (key: string, item: TabsItem, event: React.MouseEvent<HTMLButtonElement>) => void;
  onOrderChange?: (keys: string[], items: TabsItem[], info: { fromKey: string; toKey: string }) => void;
  tabFontSize?: number | string;
  tabFontWeight?: React.CSSProperties['fontWeight'];
  tabColor?: string;
  activeTabColor?: string;
  tabBackgroundColor?: string;
  activeTabBackgroundColor?: string;
  tabBorderColor?: string;
  activeTabBorderColor?: string;
  tabRadius?: number | string;
  indicatorColor?: string;
  listBackgroundColor?: string;
  listBorderColor?: string;
  panelColor?: string;
  panelFontSize?: number | string;
  panelBackgroundColor?: string;
  panelBorderColor?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  tabPosition = 'top',
  type = 'line',
  variant,
  size = 'medium',
  scrollable = true,
  addable = false,
  addIcon = '+',
  closeIcon = <Icon name="close-blue" size={10} />,
  closable = false,
  draggable = false,
  onAdd,
  onClose,
  onOrderChange,
  tabFontSize,
  tabFontWeight,
  tabColor,
  activeTabColor,
  tabBackgroundColor,
  activeTabBackgroundColor,
  tabBorderColor,
  activeTabBorderColor,
  tabRadius,
  indicatorColor,
  listBackgroundColor,
  listBorderColor,
  panelColor,
  panelFontSize,
  panelBackgroundColor,
  panelBorderColor,
  className,
  style,
  ...rest
}, ref) => {
  const firstKey = items.find((item) => !item.disabled)?.key ?? items[0]?.key;
  const [inner, setInner] = useState(defaultActiveKey ?? firstKey);
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [panelMotionIndex, setPanelMotionIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activePillStyle, setActivePillStyle] = useState<React.CSSProperties>({});
  const selectedCandidate = activeKey ?? inner ?? firstKey;
  const selected = items.some((item) => item.key === selectedCandidate) ? selectedCandidate : firstKey;
  const activeItem = items.find((item) => item.key === selected) ?? items[0];
  const resolvedVariant = variant ?? (type === 'card' ? 'bordered' : 'borderless');
  const vertical = tabPosition === 'left' || tabPosition === 'right';
  const controlled = activeKey !== undefined;
  const panelMotionClass = resolvedVariant === 'borderless' ? `cinna-tabs__panel--motion-${panelMotionIndex % 2}` : undefined;
  const tabsStyle = {
    ...(tabFontSize !== undefined ? { '--cinna-tabs-tab-font-size': normalizePopupCssValue(tabFontSize) } : null),
    ...(tabFontWeight !== undefined ? { '--cinna-tabs-tab-font-weight': tabFontWeight } : null),
    ...(tabColor ? { '--cinna-tabs-tab-color': tabColor } : null),
    ...(activeTabColor ? { '--cinna-tabs-active-color': activeTabColor } : null),
    ...(tabBackgroundColor ? { '--cinna-tabs-tab-bg': tabBackgroundColor } : null),
    ...(activeTabBackgroundColor ? { '--cinna-tabs-active-bg': activeTabBackgroundColor } : null),
    ...(tabBorderColor ? { '--cinna-tabs-tab-border': tabBorderColor } : null),
    ...(activeTabBorderColor ? { '--cinna-tabs-active-border': activeTabBorderColor } : null),
    ...(tabRadius !== undefined ? { '--cinna-tabs-tab-radius': normalizePopupCssValue(tabRadius) } : null),
    ...(indicatorColor ? { '--cinna-tabs-indicator-color': indicatorColor } : null),
    ...(listBackgroundColor ? { '--cinna-tabs-list-bg': listBackgroundColor } : null),
    ...(listBorderColor ? { '--cinna-tabs-list-border': listBorderColor } : null),
    ...(panelColor ? { '--cinna-tabs-panel-color': panelColor } : null),
    ...(panelFontSize !== undefined ? { '--cinna-tabs-panel-font-size': normalizePopupCssValue(panelFontSize) } : null),
    ...(panelBackgroundColor ? { '--cinna-tabs-panel-bg': panelBackgroundColor } : null),
    ...(panelBorderColor ? { '--cinna-tabs-panel-border': panelBorderColor } : null),
    ...style,
  } as React.CSSProperties;

  useEffect(() => {
    if (!controlled && selectedCandidate && !items.some((item) => item.key === selectedCandidate)) {
      setInner(firstKey);
    }
  }, [controlled, firstKey, items, selectedCandidate]);

  useLayoutEffect(() => {
    if (!selected) {
      setActivePillStyle({});
      return undefined;
    }

    const list = listRef.current;
    const activeTab = tabRefs.current[selected];
    if (!list || !activeTab) {
      setActivePillStyle({});
      return undefined;
    }

    let frame = 0;
    const updatePill = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const nextX = activeTab.offsetLeft;
        const nextY = activeTab.offsetTop;

        setActivePillStyle({
          '--cinna-tabs-active-opacity': '1',
          '--cinna-tabs-active-x': `${nextX}px`,
          '--cinna-tabs-active-y': `${nextY}px`,
          '--cinna-tabs-active-width': `${activeTab.offsetWidth}px`,
          '--cinna-tabs-active-height': `${activeTab.offsetHeight}px`,
        } as React.CSSProperties);
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);

    const Observer = window.ResizeObserver;
    const observer = Observer ? new Observer(updatePill) : null;
    observer?.observe(list);
    observer?.observe(activeTab);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updatePill);
      observer?.disconnect();
    };
  }, [items, selected, size, tabPosition]);

  const selectTab = (item: TabsItem) => {
    if (item.disabled) return;
    if (item.key !== selected) setPanelMotionIndex((index) => index + 1);
    if (!controlled) setInner(item.key);
    onChange?.(item.key);
  };

  const moveTab = (fromKey: string, toKey: string) => {
    if (fromKey === toKey) return;
    const fromIndex = items.findIndex((item) => item.key === fromKey);
    const toIndex = items.findIndex((item) => item.key === toKey);
    if (fromIndex < 0 || toIndex < 0) return;
    const nextItems = [...items];
    const [moving] = nextItems.splice(fromIndex, 1);
    nextItems.splice(toIndex, 0, moving);
    onOrderChange?.(nextItems.map((item) => item.key), nextItems, { fromKey, toKey });
  };

  return (
    <div
      ref={ref}
      className={cx(
        'cinna-tabs',
        `cinna-tabs--${tabPosition}`,
        `cinna-tabs--${type}`,
        `cinna-tabs--${resolvedVariant}`,
        `cinna-tabs--${size}`,
        vertical && 'cinna-tabs--vertical',
        scrollable && 'cinna-tabs--scrollable',
        (addable || onAdd) && 'cinna-tabs--addable',
        draggable && 'cinna-tabs--draggable',
        className
      )}
      style={tabsStyle}
      {...rest}
    >
      <div ref={listRef} className="cinna-tabs__list" role="tablist" aria-orientation={vertical ? 'vertical' : 'horizontal'}>
        <span
          className="cinna-tabs__active-pill"
          aria-hidden="true"
          style={activePillStyle}
        />
        {items.map((item) => (
          <div
            key={item.key}
            ref={(node) => {
              tabRefs.current[item.key] = node;
            }}
            role="tab"
            aria-selected={selected === item.key}
            aria-disabled={item.disabled || undefined}
            tabIndex={item.disabled ? -1 : selected === item.key ? 0 : -1}
            draggable={draggable && !item.disabled}
            className={cx(
              'cinna-tabs__tab',
              selected === item.key && 'cinna-tabs__tab--active',
              item.disabled && 'cinna-tabs__tab--disabled',
              dragKey === item.key && 'cinna-tabs__tab--dragging',
              dragOverKey === item.key && dragKey !== item.key && 'cinna-tabs__tab--drag-over',
              item.className
            )}
            style={item.style}
            onClick={() => {
              selectTab(item);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectTab(item);
              }
            }}
            onDragStart={(event) => {
              if (!draggable || item.disabled) return;
              setDragKey(item.key);
              event.dataTransfer.effectAllowed = 'move';
              event.dataTransfer.setData('text/plain', item.key);
            }}
            onDragOver={(event) => {
              if (!draggable || !dragKey || dragKey === item.key) return;
              event.preventDefault();
              event.dataTransfer.dropEffect = 'move';
              setDragOverKey(item.key);
            }}
            onDrop={(event) => {
              if (!draggable || !dragKey) return;
              event.preventDefault();
              moveTab(dragKey, item.key);
              setDragKey(null);
              setDragOverKey(null);
            }}
            onDragEnd={() => {
              setDragKey(null);
              setDragOverKey(null);
            }}
          >
            {item.icon && <span className="cinna-tabs__icon" aria-hidden="true">{item.icon}</span>}
            <span className="cinna-tabs__label">{item.label}</span>
            {(closable || item.closable) && (
              <button
                type="button"
                className="cinna-tabs__close"
                aria-label={typeof item.label === 'string' ? `Close ${item.label}` : 'Close tab'}
                onClick={(event) => {
                  event.stopPropagation();
                  onClose?.(item.key, item, event);
                }}
              >
                {item.closeIcon ?? closeIcon}
              </button>
            )}
          </div>
        ))}
        {(addable || onAdd) && (
          <button type="button" className="cinna-tabs__add" aria-label="Add tab" onClick={onAdd}>
            {addIcon}
          </button>
        )}
      </div>
      <div className={cx('cinna-tabs__panel', panelMotionClass)} role="tabpanel">
        {activeItem?.children}
      </div>
    </div>
  );
});
Tabs.displayName = 'Tabs';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'loading';
export type StepsDirection = 'horizontal' | 'vertical';
export type StepsLabelPlacement = 'right' | 'bottom' | 'horizontal' | 'vertical';
export type StepsType = 'default' | 'minimal';
export type StepsMarkerShape = 'circle' | 'rounded';

export interface StepItem {
  key?: string | number;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  status?: StepStatus;
  icon?: React.ReactNode;
  logo?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (index: number, event: React.MouseEvent<HTMLElement>) => void;
}

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: StepItem[];
  current?: number;
  defaultCurrent?: number;
  direction?: StepsDirection;
  size?: CinnaSize;
  status?: StepStatus;
  labelPlacement?: StepsLabelPlacement;
  type?: StepsType;
  clickable?: boolean;
  underline?: boolean;
  markerShape?: StepsMarkerShape;
  connector?: React.ReactNode;
  connectorCount?: number;
  connectorColor?: string;
  markerFontSize?: number | string;
  markerFontWeight?: React.CSSProperties['fontWeight'];
  markerColor?: string;
  markerBackgroundColor?: string;
  markerBorderColor?: string;
  titleFontSize?: number | string;
  titleFontWeight?: React.CSSProperties['fontWeight'];
  titleColor?: string;
  subTitleFontSize?: number | string;
  subTitleColor?: string;
  descriptionFontSize?: number | string;
  descriptionColor?: string;
  onChange?: (current: number, item: StepItem, event: React.MouseEvent<HTMLElement>) => void;
}

const normalizeStepsLabelPlacement = (placement: StepsLabelPlacement) => (placement === 'vertical' ? 'bottom' : placement === 'horizontal' ? 'right' : placement);

const renderStepMarker = (item: StepItem, index: number, status: StepStatus) => {
  if (item.logo !== undefined) return item.logo;
  if (item.icon !== undefined) return item.icon;
  if (status === 'finish') return '✓';
  if (status === 'error') return '!';
  if (status === 'loading') return <span className="cinna-step__spinner" aria-hidden="true" />;
  return index + 1;
};

const getStepDescription = (item: StepItem) => item.description ?? item.content;

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(({
  items,
  current,
  defaultCurrent = 0,
  direction = 'horizontal',
  size = 'medium',
  status = 'process',
  labelPlacement = 'right',
  type = 'default',
  clickable = false,
  underline = false,
  markerShape = 'circle',
  connector,
  connectorCount = 1,
  connectorColor,
  markerFontSize,
  markerFontWeight,
  markerColor,
  markerBackgroundColor,
  markerBorderColor,
  titleFontSize,
  titleFontWeight,
  titleColor,
  subTitleFontSize,
  subTitleColor,
  descriptionFontSize,
  descriptionColor,
  onChange,
  className,
  style,
  ...rest
}, ref) => {
  const [innerCurrent, setInnerCurrent] = useState(defaultCurrent);
  const [motion, setMotion] = useState<{ from: number; to: number; id: number } | null>(null);
  const previousActiveRef = useRef<number | null>(null);
  const motionIdRef = useRef(0);
  const motionTimeoutRef = useRef<number | undefined>(undefined);
  const maxStepIndex = Math.max(0, items.length - 1);
  const active = clampNumber(current ?? innerCurrent, 0, maxStepIndex);
  const isControlled = current !== undefined;
  const normalizedLabelPlacement = normalizeStepsLabelPlacement(labelPlacement);
  const repeatedConnectorCount = Math.max(1, Math.round(connectorCount));
  const hasCustomConnector = connector !== undefined;
  const stepsStyle = {
    ...(connectorColor ? { '--cinna-steps-connector-color': connectorColor } : null),
    ...(markerFontSize !== undefined ? { '--cinna-steps-marker-font-size': normalizePopupCssValue(markerFontSize) } : null),
    ...(markerFontWeight !== undefined ? { '--cinna-steps-marker-font-weight': markerFontWeight } : null),
    ...(markerColor ? { '--cinna-steps-marker-color': markerColor } : null),
    ...(markerBackgroundColor ? { '--cinna-steps-marker-bg': markerBackgroundColor } : null),
    ...(markerBorderColor ? { '--cinna-steps-marker-border': markerBorderColor } : null),
    ...(titleFontSize !== undefined ? { '--cinna-steps-title-font-size': normalizePopupCssValue(titleFontSize) } : null),
    ...(titleFontWeight !== undefined ? { '--cinna-steps-title-font-weight': titleFontWeight } : null),
    ...(titleColor ? { '--cinna-steps-title-color': titleColor } : null),
    ...(subTitleFontSize !== undefined ? { '--cinna-steps-subtitle-font-size': normalizePopupCssValue(subTitleFontSize) } : null),
    ...(subTitleColor ? { '--cinna-steps-subtitle-color': subTitleColor } : null),
    ...(descriptionFontSize !== undefined ? { '--cinna-steps-description-font-size': normalizePopupCssValue(descriptionFontSize) } : null),
    ...(descriptionColor ? { '--cinna-steps-description-color': descriptionColor } : null),
    ...style,
  } as React.CSSProperties;

  useEffect(() => {
    if (previousActiveRef.current === null) {
      previousActiveRef.current = active;
      return;
    }
    const previous = clampNumber(previousActiveRef.current, 0, maxStepIndex);
    if (previous === active) return;

    motionIdRef.current += 1;
    if (motionTimeoutRef.current !== undefined) window.clearTimeout(motionTimeoutRef.current);
    setMotion({ from: previous, to: active, id: motionIdRef.current });
    previousActiveRef.current = active;
    motionTimeoutRef.current = window.setTimeout(() => setMotion(null), 560);
  }, [active, maxStepIndex]);

  useEffect(() => {
    return () => {
      if (motionTimeoutRef.current !== undefined) window.clearTimeout(motionTimeoutRef.current);
    };
  }, []);

  const getStatus = (item: StepItem, index: number): StepStatus => {
    if (item.status) return item.status;
    if (index < active) return 'finish';
    if (index === active) return status;
    return 'wait';
  };

  const handleStepClick = (item: StepItem, index: number, event: React.MouseEvent<HTMLElement>) => {
    if (item.disabled) return;
    const canClick = clickable || Boolean(onChange) || Boolean(item.onClick);
    if (!canClick) return;
    if (!isControlled) setInnerCurrent(index);
    item.onClick?.(index, event);
    onChange?.(index, item, event);
  };

  const renderConnector = (index: number) => {
    if (index >= items.length - 1) return null;
    const connectorInMotion = motion && (
      motion.to > motion.from
        ? index >= motion.from && index < motion.to
        : index >= motion.to && index < motion.from
    );
    return (
      <span
        className={cx(
          'cinna-step__connector',
          index < active && 'cinna-step__connector--finish',
          connectorInMotion && 'cinna-step__connector--motion',
          connectorInMotion && motion.to < motion.from && 'cinna-step__connector--motion-reverse',
          hasCustomConnector && 'cinna-step__connector--custom'
        )}
        aria-hidden="true"
      >
        {hasCustomConnector ? (
          Array.from({ length: repeatedConnectorCount }, (_, connectorIndex) => (
            <span key={connectorIndex} className="cinna-step__connector-token">{connector}</span>
          ))
        ) : (
          <span className="cinna-step__connector-line" />
        )}
      </span>
    );
  };

  const renderStep = (item: StepItem, index: number) => {
    const stepStatus = getStatus(item, index);
    const stepDescription = getStepDescription(item);
    const interactive = !item.disabled && (clickable || Boolean(onChange) || Boolean(item.onClick));
    const StepTag = interactive ? 'button' : 'div';

    return (
      <StepTag
        key={item.key ?? index}
        type={interactive ? 'button' : undefined}
        className={cx(
          'cinna-step',
          `cinna-step--${stepStatus}`,
          index === active && 'cinna-step--current',
          index < active && 'cinna-step--done',
          motion?.to === index && 'cinna-step--motion-current',
          motion?.from === index && 'cinna-step--motion-previous',
          interactive && 'cinna-step--clickable',
          item.disabled && 'cinna-step--disabled',
          item.className
        )}
        style={item.style}
        aria-current={index === active ? 'step' : undefined}
        disabled={interactive ? item.disabled : undefined}
        onClick={(event) => handleStepClick(item, index, event)}
      >
        <span className="cinna-step__marker" aria-hidden="true">{renderStepMarker(item, index, stepStatus)}</span>
        <span className="cinna-step__body">
          <span className="cinna-step__header">
            <strong className="cinna-step__title">{item.title}</strong>
            {item.subTitle && <small className="cinna-step__subtitle">{item.subTitle}</small>}
          </span>
          {stepDescription && <small className="cinna-step__description">{stepDescription}</small>}
        </span>
      </StepTag>
    );
  };

  if (type === 'minimal') {
    const activeItem = items[active];
    const activeDescription = activeItem ? getStepDescription(activeItem) : null;

    return (
      <div
        ref={ref}
        className={cx(
          'cinna-steps',
          'cinna-steps--minimal',
          `cinna-steps--${direction}`,
          `cinna-steps--${size}`,
          `cinna-steps--marker-${markerShape}`,
          className
        )}
        style={stepsStyle}
        {...rest}
      >
        <div className="cinna-steps__minimal-dots" role="list">
          {items.map((item, index) => {
            const stepStatus = getStatus(item, index);
            const interactive = !item.disabled && (clickable || Boolean(onChange) || Boolean(item.onClick));
            const DotTag = interactive ? 'button' : 'span';

            return (
              <DotTag
                key={item.key ?? index}
                type={interactive ? 'button' : undefined}
                className={cx(
                  'cinna-step__minimal-dot',
                  `cinna-step__minimal-dot--${stepStatus}`,
                  index === active && 'cinna-step__minimal-dot--current',
                  motion?.to === index && 'cinna-step__minimal-dot--motion-current',
                  interactive && 'cinna-step__minimal-dot--clickable',
                  item.disabled && 'cinna-step__minimal-dot--disabled'
                )}
                aria-label={typeof item.title === 'string' ? item.title : `Step ${index + 1}`}
                aria-current={index === active ? 'step' : undefined}
                disabled={interactive ? item.disabled : undefined}
                onClick={(event) => handleStepClick(item, index, event)}
              />
            );
          })}
        </div>
        {activeItem && (
          <div className="cinna-steps__minimal-summary">
            <strong className="cinna-step__title">{activeItem.title}</strong>
            {activeDescription && <small className="cinna-step__description">{activeDescription}</small>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cx(
        'cinna-steps',
        `cinna-steps--${direction}`,
        `cinna-steps--${size}`,
        `cinna-steps--label-${normalizedLabelPlacement}`,
        `cinna-steps--marker-${markerShape}`,
        underline && 'cinna-steps--underline',
        clickable && 'cinna-steps--clickable',
        className
      )}
      style={stepsStyle}
      {...rest}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.key ?? index}>
          {renderStep(item, index)}
          {renderConnector(index)}
        </React.Fragment>
      ))}
    </div>
  );
});
Steps.displayName = 'Steps';

export interface BreadcrumbItem {
  key?: string;
  title: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  menu?: MenuItem[];
  separator?: React.ReactNode;
  color?: string;
  fontStyle?: React.CSSProperties['fontStyle'];
  fontWeight?: React.CSSProperties['fontWeight'];
  className?: string;
  style?: React.CSSProperties;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, item: BreadcrumbItem, index: number) => void;
  onMenuSelect?: (key: string, item: BreadcrumbItem, index: number) => void;
}

const renderBreadcrumbContent = (item: BreadcrumbItem, hasMenu = false) => (
  <span className="cinna-breadcrumb__content">
    {item.icon && <span className="cinna-breadcrumb__icon" aria-hidden="true">{item.icon}</span>}
    <span>{item.title}</span>
    {hasMenu && <span className="cinna-breadcrumb__caret" aria-hidden="true"><Icon name="chevron-down" size={12} /></span>}
  </span>
);

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ items, separator = '/', onItemClick, onMenuSelect, className, ...rest }, ref) => (
  <nav ref={ref} className={cx('cinna-breadcrumb', className)} aria-label="Breadcrumb" {...rest}>
    {items.map((item, index) => {
      const itemStyle = {
        color: item.color,
        fontStyle: item.fontStyle,
        fontWeight: item.fontWeight,
        ...item.style,
      } as React.CSSProperties;
      const content = item.menu?.length ? (
        <details className={cx('cinna-breadcrumb__dropdown', item.className)}>
          <summary style={itemStyle}>{renderBreadcrumbContent(item, true)}</summary>
          <div className="cinna-breadcrumb__menu">
            <Menu items={item.menu} onSelect={(key) => onMenuSelect?.(key, item, index)} />
          </div>
        </details>
      ) : item.href ? (
        <a className={cx('cinna-breadcrumb__item', item.className)} style={itemStyle} href={item.href} onClick={(event) => onItemClick?.(event, item, index)}>
          {renderBreadcrumbContent(item)}
        </a>
      ) : (
        <span className={cx('cinna-breadcrumb__item', item.className)} style={itemStyle}>
          {renderBreadcrumbContent(item)}
        </span>
      );

      return (
        <React.Fragment key={item.key ?? index}>
          {content}
          {index < items.length - 1 && <em>{item.separator ?? separator}</em>}
        </React.Fragment>
      );
    })}
  </nav>
));
Breadcrumb.displayName = 'Breadcrumb';

export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationAlign = 'start' | 'center' | 'end';
export type PaginationItemType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';
export type PaginationSimple = boolean | { readOnly?: boolean };

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current?: number;
  defaultCurrent?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onChange?: (page: number, pageSize: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  simple?: PaginationSimple;
  size?: PaginationSize;
  responsive?: boolean;
  align?: PaginationAlign;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  showLessItems?: boolean;
  showAllPages?: boolean;
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  showSizeChanger?: boolean;
  totalBoundaryShowSizeChanger?: number;
  showTitle?: boolean;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  itemRender?: (page: number, type: PaginationItemType, originalElement: React.ReactNode) => React.ReactNode;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  pageFontSize?: number | string;
  pageFontWeight?: React.CSSProperties['fontWeight'];
  pageColor?: string;
  pageBorderColor?: string;
  pageBorderWidth?: number | string;
  pageBorderStyle?: React.CSSProperties['borderStyle'];
  pageRadius?: number | string;
  activePageColor?: string;
  activePageBackgroundColor?: string;
  activePageBorderColor?: string;
  activePageUnderline?: boolean;
  activePageUnderlineColor?: string;
  activePageUnderlineWidth?: number | string;
  activePageUnderlineHeight?: number | string;
  activePageUnderlineRadius?: number | string;
  activePageUnderlineBottom?: number | string;
}

type PaginationToken = number | 'jump-prev' | 'jump-next';
type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const paginationButtonRippleEffects: ButtonRippleEffect[] = ['inner'];

const PaginationButton = ({ className, children, disabled, onMouseDown, ...rest }: PaginationButtonProps) => {
  const { activeRippleEffects, ripples, triggerButtonRipple } = useButtonRipple({
    enabled: true,
    disabled,
    effects: paginationButtonRippleEffects,
  });

  return (
    <button
      className={cx('cinna-pagination__item', className)}
      disabled={disabled}
      onMouseDown={(event) => {
        triggerButtonRipple(event);
        onMouseDown?.(event);
      }}
      {...rest}
    >
      <span className="cinna-pagination__item-content">{children}</span>
      {renderButtonRipples(ripples, activeRippleEffects)}
    </button>
  );
};

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(({
  current,
  defaultCurrent = 1,
  total = 0,
  pageSize,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onChange,
  onShowSizeChange,
  simple,
  size = 'medium',
  responsive = false,
  align = 'start',
  disabled = false,
  hideOnSinglePage = false,
  showLessItems = false,
  showAllPages = false,
  showQuickJumper = false,
  showSizeChanger,
  totalBoundaryShowSizeChanger = 50,
  showTitle = true,
  prevIcon = <Icon name="chevron-left" size={13} />,
  nextIcon = <Icon name="chevron-right" size={13} />,
  itemRender,
  showTotal,
  pageFontSize,
  pageFontWeight,
  pageColor,
  pageBorderColor,
  pageBorderWidth,
  pageBorderStyle,
  pageRadius,
  activePageColor,
  activePageBackgroundColor,
  activePageBorderColor,
  activePageUnderline,
  activePageUnderlineColor,
  activePageUnderlineWidth,
  activePageUnderlineHeight,
  activePageUnderlineRadius,
  activePageUnderlineBottom,
  className,
  style,
  ...rest
}, ref) => {
  const [inner, setInner] = useState(defaultCurrent);
  const [innerPageSize, setInnerPageSize] = useState(defaultPageSize);
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
  const sizeChangerRef = useRef<HTMLSpanElement | null>(null);
  const activePageSize = Math.max(1, pageSize ?? innerPageSize);
  const pages = Math.max(1, Math.ceil(total / activePageSize));
  const active = clampNumber(current ?? inner, 1, pages);
  const [quickJumpValue, setQuickJumpValue] = useState(String(active));
  const pageList = buildPaginationPageList(active, pages, showLessItems, showAllPages);
  const shouldShowSizeChanger = showSizeChanger ?? total > totalBoundaryShowSizeChanger;
  const simpleReadOnly = typeof simple === 'object' && simple.readOnly;
  const jumperConfig = typeof showQuickJumper === 'object' ? showQuickJumper : {};

  useEffect(() => {
    setQuickJumpValue(String(active));
  }, [active]);

  useEffect(() => {
    if (!sizeMenuOpen) return;

    const closeSizeMenu = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      if (event.type === 'pointerdown' && sizeChangerRef.current?.contains(event.target as Node)) return;
      setSizeMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeSizeMenu, true);
    document.addEventListener('keydown', closeSizeMenu);

    return () => {
      document.removeEventListener('pointerdown', closeSizeMenu, true);
      document.removeEventListener('keydown', closeSizeMenu);
    };
  }, [sizeMenuOpen]);

  useEffect(() => {
    if (disabled) setSizeMenuOpen(false);
  }, [disabled]);

  if (hideOnSinglePage && pages <= 1) return null;

  const setPage = (page: number, nextPageSize = activePageSize) => {
    if (disabled) return;
    const next = clampNumber(page, 1, pages);
    setInner(next);
    onChange?.(next, nextPageSize);
  };
  const changePageSize = (nextPageSize: number) => {
    if (disabled) return;
    const nextPages = Math.max(1, Math.ceil(total / nextPageSize));
    const nextPage = clampNumber(active, 1, nextPages);
    if (pageSize === undefined) setInnerPageSize(nextPageSize);
    setInner(nextPage);
    setSizeMenuOpen(false);
    onShowSizeChange?.(nextPage, nextPageSize);
    onChange?.(nextPage, nextPageSize);
  };
  const jumpToInputPage = () => {
    const next = Number.parseInt(quickJumpValue, 10);
    if (Number.isFinite(next)) setPage(next);
    else setQuickJumpValue(String(active));
  };
  const range: [number, number] = total === 0
    ? [0, 0]
    : [Math.min(total, (active - 1) * activePageSize + 1), Math.min(total, active * activePageSize)];
  const paginationStyle = {
    ...(pageFontSize !== undefined ? { '--cinna-pagination-font-size': normalizePopupCssValue(pageFontSize) } : null),
    ...(pageFontWeight !== undefined ? { '--cinna-pagination-font-weight': pageFontWeight } : null),
    ...(pageColor ? { '--cinna-pagination-color': pageColor } : null),
    ...(pageBorderColor ? { '--cinna-pagination-border-color': pageBorderColor } : null),
    ...(pageBorderWidth !== undefined ? { '--cinna-pagination-border-width': normalizePopupCssValue(pageBorderWidth) } : null),
    ...(pageBorderStyle ? { '--cinna-pagination-border-style': pageBorderStyle } : null),
    ...(pageRadius !== undefined ? { '--cinna-pagination-radius': normalizePopupCssValue(pageRadius) } : null),
    ...(activePageColor ? { '--cinna-pagination-active-color': activePageColor } : null),
    ...(activePageBackgroundColor ? { '--cinna-pagination-active-bg': activePageBackgroundColor } : null),
    ...(activePageBorderColor ? { '--cinna-pagination-active-border': activePageBorderColor } : null),
    ...(activePageUnderlineColor ? { '--cinna-pagination-active-underline-color': activePageUnderlineColor } : null),
    ...(activePageUnderlineWidth !== undefined ? { '--cinna-pagination-active-underline-width': normalizePopupCssValue(activePageUnderlineWidth) } : null),
    ...(activePageUnderlineHeight !== undefined ? { '--cinna-pagination-active-underline-height': normalizePopupCssValue(activePageUnderlineHeight) } : null),
    ...(activePageUnderlineRadius !== undefined ? { '--cinna-pagination-active-underline-radius': normalizePopupCssValue(activePageUnderlineRadius) } : null),
    ...(activePageUnderlineBottom !== undefined ? { '--cinna-pagination-active-underline-bottom': normalizePopupCssValue(activePageUnderlineBottom) } : null),
    ...style,
  } as React.CSSProperties;
  const renderItemContent = (page: number, type: PaginationItemType, originalElement: React.ReactNode) => itemRender?.(page, type, originalElement) ?? originalElement;

  return (
    <div
      ref={ref}
      className={cx(
        'cinna-pagination',
        `cinna-pagination--${size}`,
        `cinna-pagination--align-${align}`,
        responsive && 'cinna-pagination--responsive',
        disabled && 'cinna-pagination--disabled',
        simple && 'cinna-pagination--simple',
        activePageUnderline === false && 'cinna-pagination--no-active-underline',
        className
      )}
      style={paginationStyle}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {showTotal && <span className="cinna-pagination__total">{showTotal(total, range)}</span>}
      <div className="cinna-pagination__list" role="navigation" aria-label="Pagination">
        <PaginationButton
          type="button"
          className="cinna-pagination__nav"
          disabled={disabled || active <= 1}
          title={showTitle ? 'Previous page' : undefined}
          aria-label="Previous page"
          onClick={() => setPage(active - 1)}
        >
          {renderItemContent(Math.max(1, active - 1), 'prev', prevIcon)}
        </PaginationButton>
        {simple ? (
          <span className="cinna-pagination__simple-control">
            {simpleReadOnly ? (
              <span className="cinna-pagination__simple-current">{active}</span>
            ) : (
              <input
                value={quickJumpValue}
                disabled={disabled}
                inputMode="numeric"
                aria-label="Current page"
                onChange={(event) => setQuickJumpValue(event.currentTarget.value)}
                onBlur={jumpToInputPage}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') jumpToInputPage();
                }}
              />
            )}
            <span>/ {pages}</span>
          </span>
        ) : (
          pageList.map((token, index) => {
            if (token === 'jump-prev' || token === 'jump-next') {
              const target = token === 'jump-prev' ? Math.max(1, active - 5) : Math.min(pages, active + 5);
              const type = token;
              return (
                <PaginationButton
                  key={`${token}-${index}`}
                  type="button"
                  className="cinna-pagination__jump"
                  disabled={disabled}
                  title={showTitle ? (token === 'jump-prev' ? 'Jump backward' : 'Jump forward') : undefined}
                  aria-label={token === 'jump-prev' ? 'Jump backward' : 'Jump forward'}
                  onClick={() => setPage(target)}
                >
                  {renderItemContent(target, type, '•••')}
                </PaginationButton>
              );
            }

            return (
              <PaginationButton
                key={token}
                type="button"
                className={cx('cinna-pagination__page', token === active && 'cinna-pagination__page--active')}
                disabled={disabled}
                title={showTitle ? `${token}` : undefined}
                aria-current={token === active ? 'page' : undefined}
                onClick={() => setPage(token)}
              >
                {renderItemContent(token, 'page', token)}
              </PaginationButton>
            );
          })
        )}
        <PaginationButton
          type="button"
          className="cinna-pagination__nav"
          disabled={disabled || active >= pages}
          title={showTitle ? 'Next page' : undefined}
          aria-label="Next page"
          onClick={() => setPage(active + 1)}
        >
          {renderItemContent(Math.min(pages, active + 1), 'next', nextIcon)}
        </PaginationButton>
      </div>
      {shouldShowSizeChanger && (
        <span ref={sizeChangerRef} className={cx('cinna-pagination__size-wrap', sizeMenuOpen && 'cinna-pagination__size-wrap--open')}>
          <button
            type="button"
            className="cinna-pagination__size-changer"
            disabled={disabled}
            aria-label="Page size"
            aria-haspopup="listbox"
            aria-expanded={sizeMenuOpen}
            onClick={() => setSizeMenuOpen((open) => !open)}
          >
            <span>{activePageSize} / page</span>
            <Icon name="chevron-down" size={12} />
          </button>
          {sizeMenuOpen && (
            <span className="cinna-pagination__size-menu" role="listbox" aria-label="Page size options">
              {pageSizeOptions.map((option) => {
                const selected = option === activePageSize;
                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={cx('cinna-pagination__size-option', selected && 'cinna-pagination__size-option--selected')}
                    onClick={() => changePageSize(option)}
                  >
                    <span className="cinna-pagination__size-check" aria-hidden="true">{selected ? '✓' : ''}</span>
                    <span>{option} / page</span>
                  </button>
                );
              })}
            </span>
          )}
        </span>
      )}
      {showQuickJumper && !simple && (
        <span className="cinna-pagination__jumper">
          <span>Go to</span>
          <input
            value={quickJumpValue}
            disabled={disabled}
            inputMode="numeric"
            aria-label="Jump to page"
            onChange={(event) => setQuickJumpValue(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') jumpToInputPage();
            }}
          />
          {jumperConfig.goButton !== undefined ? (
            <PaginationButton type="button" disabled={disabled} onClick={jumpToInputPage}>{jumperConfig.goButton}</PaginationButton>
          ) : (
            <span>page</span>
          )}
        </span>
      )}
    </div>
  );
});
Pagination.displayName = 'Pagination';

export type MenuMode = 'vertical' | 'horizontal' | 'inline';
export type MenuTheme = 'light' | 'dark';
export type MenuTriggerSubMenuAction = 'hover' | 'click';
export type MenuSemanticSlot =
  | 'root'
  | 'item'
  | 'itemIcon'
  | 'itemContent'
  | 'itemExtra'
  | 'subMenuTitle'
  | 'subMenuList'
  | 'group'
  | 'groupTitle'
  | 'divider'
  | 'popup';

export interface MenuClickInfo {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement>;
}

export interface MenuSelectInfo extends MenuClickInfo {
  selectedKeys: string[];
}

export type MenuClassNames = Partial<Record<MenuSemanticSlot, string>> | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticSlot, string>>);
export type MenuStyles = Partial<Record<MenuSemanticSlot, React.CSSProperties>> | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticSlot, React.CSSProperties>>);
export type MenuExpandIcon = React.ReactNode | ((info: { item: MenuItem; open: boolean; mode: MenuMode; level: number }) => React.ReactNode);
export type MenuPopupRender = (node: React.ReactElement, info: { item: MenuItem; keyPath: string[] }) => React.ReactElement;

export type MenuItem = {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: MenuItem[];
  danger?: boolean;
  extra?: React.ReactNode;
  title?: React.ReactNode;
  theme?: MenuTheme;
  popupClassName?: string;
  popupOffset?: [number, number];
  popupRender?: MenuPopupRender;
  onTitleClick?: (info: MenuClickInfo) => void;
  className?: string;
  style?: React.CSSProperties;
  type?: 'item';
} | {
  key?: string;
  label?: never;
  disabled?: never;
  icon?: never;
  children?: never;
  danger?: never;
  extra?: never;
  title?: never;
  theme?: never;
  popupClassName?: never;
  popupOffset?: never;
  popupRender?: never;
  onTitleClick?: never;
  className?: string;
  style?: React.CSSProperties;
  type: 'divider';
  dashed?: boolean;
} | {
  key?: string;
  label: React.ReactNode;
  children: MenuItem[];
  disabled?: never;
  icon?: never;
  danger?: never;
  extra?: never;
  title?: never;
  theme?: never;
  popupClassName?: never;
  popupOffset?: never;
  popupRender?: never;
  onTitleClick?: never;
  className?: string;
  style?: React.CSSProperties;
  type: 'group';
};

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onSelect'> {
  items: MenuItem[];
  selectedKey?: string;
  defaultSelectedKey?: string;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  mode?: MenuMode;
  theme?: MenuTheme;
  inlineCollapsed?: boolean;
  collapsedWidth?: number | string;
  selectable?: boolean;
  multiple?: boolean;
  triggerSubMenuAction?: MenuTriggerSubMenuAction;
  expandIcon?: MenuExpandIcon;
  forceSubMenuRender?: boolean;
  subMenuOpenDelay?: number;
  subMenuCloseDelay?: number;
  tooltip?: false | {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    styles?: PopupStyles;
  };
  popupRender?: MenuPopupRender;
  classNames?: MenuClassNames;
  styles?: MenuStyles;
  onClick?: (info: MenuClickInfo) => void;
  onSelect?: (key: string, info: MenuSelectInfo) => void;
  onDeselect?: (key: string, info: MenuSelectInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  inlineIndent?: number;
}

function findTopLevelMenuActiveTarget(root: HTMLDivElement) {
  const topLevelItems = Array.from(root.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement && !child.classList.contains('cinna-menu__active-pill')
  );

  for (const child of topLevelItems) {
    if (child.classList.contains('cinna-menu__item--active')) return child;

    if (child.classList.contains('cinna-menu__submenu')) {
      const title = Array.from(child.children).find(
        (node): node is HTMLElement =>
          node instanceof HTMLElement &&
          node.classList.contains('cinna-menu__submenu-title') &&
          (node.classList.contains('cinna-menu__item--active') || node.classList.contains('cinna-menu__item--child-active'))
      );
      if (title) return title;
    }
  }

  return null;
}

function findInlineMenuActiveTarget(root: HTMLDivElement) {
  return root.querySelector<HTMLElement>(
    [
      '.cinna-menu__item--active:not(.cinna-menu__item--title-only)',
      '.cinna-menu__submenu-title.cinna-menu__item--active:not(.cinna-menu__item--title-only)',
      '.cinna-menu__submenu-title.cinna-menu__item--child-active:not(.cinna-menu__item--title-only)',
    ].join(', ')
  );
}

function findMenuActiveTarget(root: HTMLDivElement, mode: MenuMode) {
  return mode === 'inline' ? findInlineMenuActiveTarget(root) : findTopLevelMenuActiveTarget(root);
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    items,
    selectedKey,
    defaultSelectedKey,
    selectedKeys,
    defaultSelectedKeys,
    openKeys,
    defaultOpenKeys,
    mode = 'vertical',
    theme = 'light',
    inlineCollapsed = false,
    collapsedWidth = 80,
    selectable = true,
    multiple = false,
    triggerSubMenuAction = 'hover',
    expandIcon,
    forceSubMenuRender = false,
    subMenuOpenDelay = 0,
    subMenuCloseDelay = 0.1,
    tooltip,
    popupRender,
    classNames,
    styles,
    onClick,
    onSelect,
    onDeselect,
    onOpenChange,
    inlineIndent = 24,
    className,
    style,
    ...rest
  } = props;
  const controlledSelectedKeys = selectedKeys ?? (selectedKey !== undefined ? [selectedKey] : undefined);
  const defaultKeys = defaultSelectedKeys ?? (defaultSelectedKey !== undefined ? [defaultSelectedKey] : []);
  const [innerSelectedKeys, setInnerSelectedKeys] = useState(defaultKeys);
  const [innerOpenKeys, setInnerOpenKeys] = useState(defaultOpenKeys ?? []);
  const openTimerRef = useRef<Record<string, number | undefined>>({});
  const closeTimerRef = useRef<Record<string, number | undefined>>({});
  const menuRootRef = useRef<HTMLDivElement | null>(null);
  const [activePillStyle, setActivePillStyle] = useState<React.CSSProperties>({});
  const activeKeys = controlledSelectedKeys ?? innerSelectedKeys;
  const activeOpenKeys = openKeys ?? innerOpenKeys;
  const collapsed = mode === 'inline' && inlineCollapsed;
  const semanticClassNames = resolveMenuSemanticMap(classNames, props);
  const semanticStyles = resolveMenuSemanticMap(styles, props);
  const activeKeySignature = activeKeys.join('\u0001');

  const setMenuRoot = (node: HTMLDivElement | null) => {
    menuRootRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  useEffect(() => {
    return () => {
      Object.values(openTimerRef.current).forEach((timer) => timer && window.clearTimeout(timer));
      Object.values(closeTimerRef.current).forEach((timer) => timer && window.clearTimeout(timer));
    };
  }, []);

  useLayoutEffect(() => {
    if (collapsed || !activeKeys.length) {
      setActivePillStyle({});
      return undefined;
    }

    const root = menuRootRef.current;
    const activeItem = root ? findMenuActiveTarget(root, mode) : null;
    if (!root || !activeItem) {
      setActivePillStyle({});
      return undefined;
    }

    let frame = 0;
    const updatePill = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rootRect = root.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const nextX = itemRect.left - rootRect.left + root.scrollLeft;
        const nextY = itemRect.top - rootRect.top + root.scrollTop;

        setActivePillStyle({
          '--cinna-menu-active-opacity': '1',
          '--cinna-menu-active-x': `${nextX}px`,
          '--cinna-menu-active-y': `${nextY}px`,
          '--cinna-menu-active-width': `${itemRect.width}px`,
          '--cinna-menu-active-height': `${itemRect.height}px`,
        } as React.CSSProperties);
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);

    const Observer = window.ResizeObserver;
    const observer = Observer ? new Observer(updatePill) : null;
    observer?.observe(root);
    observer?.observe(activeItem);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updatePill);
      observer?.disconnect();
    };
  }, [activeKeySignature, activeKeys.length, activeOpenKeys, collapsed, items, mode]);

  const setSelected = (nextKeys: string[]) => {
    if (!controlledSelectedKeys) setInnerSelectedKeys(nextKeys);
  };

  const setOpen = (nextKeys: string[]) => {
    if (!openKeys) setInnerOpenKeys(nextKeys);
    onOpenChange?.(nextKeys);
  };

  const openSubMenu = (key: string) => {
    if (activeOpenKeys.includes(key)) return;
    setOpen([...activeOpenKeys, key]);
  };

  const closeSubMenu = (key: string) => {
    if (!activeOpenKeys.includes(key)) return;
    setOpen(activeOpenKeys.filter((item) => item !== key));
  };

  const scheduleOpen = (key: string) => {
    window.clearTimeout(closeTimerRef.current[key]);
    window.clearTimeout(openTimerRef.current[key]);
    openTimerRef.current[key] = window.setTimeout(() => openSubMenu(key), Math.max(0, subMenuOpenDelay) * 1000);
  };

  const scheduleClose = (key: string) => {
    window.clearTimeout(openTimerRef.current[key]);
    window.clearTimeout(closeTimerRef.current[key]);
    closeTimerRef.current[key] = window.setTimeout(() => closeSubMenu(key), Math.max(0, subMenuCloseDelay) * 1000);
  };

  const toggleSubMenu = (item: MenuItem, keyPath: string[], event: React.MouseEvent<HTMLElement>) => {
    if (item.type === 'divider' || item.type === 'group' || item.disabled || !item.children?.length) return;
    item.onTitleClick?.({ key: item.key, keyPath, domEvent: event });
    const nextOpen = activeOpenKeys.includes(item.key)
      ? activeOpenKeys.filter((key) => key !== item.key)
      : [...activeOpenKeys, item.key];
    setOpen(nextOpen);
  };

  const select = (item: MenuItem, keyPath: string[], event: React.MouseEvent<HTMLElement>) => {
    if (item.type === 'divider' || item.type === 'group' || item.disabled || item.children?.length) return;
    const clickInfo: MenuClickInfo = { key: item.key, keyPath, domEvent: event };
    onClick?.(clickInfo);
    if (!selectable) return;

    const exists = activeKeys.includes(item.key);
    const nextKeys = multiple
      ? exists
        ? activeKeys.filter((key) => key !== item.key)
        : [...activeKeys, item.key]
      : [item.key];
    const selectInfo: MenuSelectInfo = { ...clickInfo, selectedKeys: nextKeys };
    setSelected(nextKeys);
    if (multiple && exists) onDeselect?.(item.key, selectInfo);
    else onSelect?.(item.key, selectInfo);
  };

  const rootStyle = {
    ...(collapsed ? { '--cinna-menu-collapsed-width': normalizePopupCssValue(collapsedWidth) } : null),
    ...semanticStyles.root,
    ...style,
  } as React.CSSProperties;

	  return (
	    <div
	      ref={setMenuRoot}
	      className={cx(
	        'cinna-menu',
        `cinna-menu--${mode}`,
        `cinna-menu--${theme}`,
        collapsed && 'cinna-menu--collapsed',
        !selectable && 'cinna-menu--not-selectable',
        semanticClassNames.root,
        className
      )}
      role="menu"
	      style={rootStyle}
	      {...rest}
	    >
	      <span className="cinna-menu__active-pill" aria-hidden="true" style={activePillStyle} />
	      {renderMenuItems(items, {
        mode,
        theme,
        inlineIndent,
        collapsed,
        selectedKeys: activeKeys,
        openKeys: activeOpenKeys,
        triggerSubMenuAction,
        forceSubMenuRender,
        tooltip,
        expandIcon,
        popupRender,
        semanticClassNames,
        semanticStyles,
        onItemSelect: select,
        onSubMenuToggle: toggleSubMenu,
        onSubMenuOpen: scheduleOpen,
        onSubMenuClose: scheduleClose,
      })}
    </div>
  );
});

export type AnchorTarget = string | Element | (() => Element | null);

export interface AnchorItem {
  key: string;
  href: string;
  title: React.ReactNode;
  anchorTarget?: AnchorTarget;
  targetOffset?: number;
}

export type AnchorDirection = 'vertical' | 'horizontal';

export interface AnchorProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items: AnchorItem[];
  offsetTop?: number;
  targetOffset?: number;
  direction?: AnchorDirection;
  affix?: boolean;
  getContainer?: () => HTMLElement | Window | null;
  defaultActiveHref?: string;
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, item: AnchorItem) => void;
  onChange?: (activeHref: string) => void;
}

const queryAnchorTarget = (selector: string, container: HTMLElement | Window) => {
  const root = container instanceof Window ? document : container;
  return root.querySelector(selector);
};

const getAnchorTargetElement = (href: string, container: HTMLElement | Window) => {
  if (!href.startsWith('#')) return null;
  const id = href.slice(1);
  if (!id) return null;
  if (container instanceof Window) return document.getElementById(id);
  return container.querySelector(`[id="${id.replace(/"/g, '\\"')}"]`);
};

const resolveAnchorTarget = (item: AnchorItem, container: HTMLElement | Window) => {
  if (typeof item.anchorTarget === 'function') return item.anchorTarget();
  if (typeof item.anchorTarget === 'string') return queryAnchorTarget(item.anchorTarget, container);
  if (item.anchorTarget) return item.anchorTarget;
  return getAnchorTargetElement(item.href, container);
};

const scrollAnchorContainer = (container: HTMLElement | Window, target: Element, offset: number) => {
  const targetRect = target.getBoundingClientRect();
  if (container instanceof Window) {
    container.scrollTo?.({ top: targetRect.top + container.scrollY - offset, behavior: 'smooth' });
    return;
  }

  const containerRect = container.getBoundingClientRect();
  container.scrollTo?.({ top: container.scrollTop + targetRect.top - containerRect.top - offset, behavior: 'smooth' });
};

export const Anchor = React.forwardRef<HTMLElement, AnchorProps>(({
  items,
  offsetTop = 0,
  targetOffset,
  direction = 'vertical',
  affix = false,
  getContainer,
  defaultActiveHref,
  onItemClick,
  onChange,
  className,
  style,
  ...rest
}, ref) => {
  const [activeHref, setActiveHref] = useState(defaultActiveHref ?? items[0]?.href ?? '');

  const activate = (href: string) => {
    setActiveHref(href);
    onChange?.(href);
  };

  return (
    <nav ref={ref} className={cx('cinna-anchor', `cinna-anchor--${direction}`, affix && 'cinna-anchor--affix', className)} style={{ top: offsetTop, ...style }} {...rest}>
      {items.map((item) => (
        <a
          key={item.key}
          href={item.href}
          className={cx(activeHref === item.href && 'cinna-anchor__item--active')}
          aria-current={activeHref === item.href ? 'true' : undefined}
          onClick={(event) => {
            onItemClick?.(event, item);
            if (event.defaultPrevented) return;
            const container = getContainer?.() ?? window;
            const target = container ? resolveAnchorTarget(item, container) : null;
            if (!target) return;
            event.preventDefault();
            scrollAnchorContainer(container, target, item.targetOffset ?? targetOffset ?? offsetTop);
            activate(item.href);
          }}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
});
Anchor.displayName = 'Anchor';

export interface AffixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number;
  offsetBottom?: number;
}

export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(({ offsetTop, offsetBottom, className, style, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-affix', className)} style={{ top: offsetTop, bottom: offsetBottom, ...style }} {...rest} />
));

export interface FloatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  shape?: 'circle' | 'square';
  tooltip?: React.ReactNode;
  badge?: React.ReactNode;
  ripple?: boolean;
  rippleEffects?: ButtonRippleEffect | ButtonRippleEffect[];
  rippleParticleColors?: string | string[];
  rippleParticleOpacity?: number;
  theme?: ButtonThemeInput;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  radius?: number | string;
  shadow?: string;
  activeShadow?: string;
}

const normalizeFloatButtonCssValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const FloatButtonBase = React.forwardRef<HTMLButtonElement, FloatButtonProps>(
  (
    {
      icon = '+',
      shape = 'circle',
      tooltip,
      badge,
      ripple = true,
      rippleEffects,
      rippleParticleColors,
      rippleParticleOpacity,
      theme,
      color,
      backgroundColor,
      borderColor,
      radius,
      shadow,
      activeShadow,
      className,
      children,
      disabled,
      onClick,
      style,
      ...rest
    },
    ref
  ) => {
    const { activeRippleEffects, ripples, triggerButtonRipple } = useButtonRipple({
      enabled: ripple,
      disabled,
      effects: rippleEffects,
      particleColors: rippleParticleColors,
    });
    const customStyle = {
      ...getButtonThemeStyles({ theme, color, backgroundColor, borderColor, shadow, activeShadow }),
      ...(radius !== undefined ? { '--button-radius': normalizeFloatButtonCssValue(radius) } : null),
      ...(rippleParticleOpacity !== undefined ? { '--button-particle-opacity': normalizeButtonRippleOpacity(rippleParticleOpacity) } : null),
      ...style,
    } as React.CSSProperties;
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      triggerButtonRipple(event);
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cx('cinna-float-button', `cinna-float-button--${shape}`, className)}
        title={typeof tooltip === 'string' ? tooltip : undefined}
        disabled={disabled}
        style={customStyle}
        onClick={handleClick}
        {...rest}
      >
        <span className="cinna-float-button__icon">{icon}</span>
        {children && <small className="cinna-float-button__label">{children}</small>}
        {badge && <em>{badge}</em>}
        {tooltip && <span className="cinna-float-button__tooltip">{tooltip}</span>}
        {renderButtonRipples(ripples, activeRippleEffects)}
      </button>
    );
  }
);
FloatButtonBase.displayName = 'FloatButton';

export interface FloatButtonMenuItem extends Omit<FloatButtonProps, 'content'> {
  key?: React.Key;
  label?: React.ReactNode;
  content?: React.ReactNode;
}

export interface FloatButtonGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  shape?: 'circle' | 'square';
  placement?: 'top' | 'right' | 'bottom' | 'left';
  trigger?: 'click' | 'hover';
  open?: boolean;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  tooltip?: React.ReactNode;
  items?: FloatButtonMenuItem[];
  onOpenChange?: (open: boolean) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const renderFloatButtonGroupChildren = (children: React.ReactNode, shape: 'circle' | 'square') =>
  React.Children.map(children, (child) => {
    if (!React.isValidElement<FloatButtonProps>(child)) return child;
    return React.cloneElement(child, { shape: child.props.shape ?? shape });
  });

export const FloatButtonGroup = React.forwardRef<HTMLDivElement, FloatButtonGroupProps>(
  (
    {
      shape = 'circle',
      placement = 'top',
      trigger,
      open,
      defaultOpen = false,
      icon = '+',
      closeIcon = <Icon name="close-blue" size={14} />,
      tooltip,
      items,
      children,
      className,
      onOpenChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const isControlled = open !== undefined;
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const mergedOpen = isControlled ? Boolean(open) : innerOpen;
    const menuMode = Boolean(trigger);
    const setOpen = (nextOpen: boolean) => {
      if (!isControlled) setInnerOpen(nextOpen);
      onOpenChange?.(nextOpen);
    };
    const listContent = items
      ? items.map(({ key, label, content, onClick: itemOnClick, ...item }, index) => (
          <FloatButtonBase
            key={key ?? index}
            {...item}
            shape={item.shape ?? shape}
            onClick={(event) => {
              itemOnClick?.(event);
              if (trigger === 'click') setOpen(false);
            }}
          >
            {content ?? label ?? item.children}
          </FloatButtonBase>
        ))
      : renderFloatButtonGroupChildren(children, shape);
    const list = <div className="cinna-float-button-group__list">{listContent}</div>;
    const triggerButton = menuMode ? (
      <FloatButtonBase
        className="cinna-float-button-group__trigger"
        shape={shape}
        icon={mergedOpen ? closeIcon : icon}
        tooltip={tooltip}
        aria-expanded={mergedOpen}
        aria-haspopup="menu"
        onClick={(event) => {
          onClick?.(event);
          if (trigger === 'click') setOpen(!mergedOpen);
        }}
      />
    ) : null;
    const listFirst = placement === 'top' || placement === 'left';

    return (
      <div
        ref={ref}
        className={cx(
          'cinna-float-button-group',
          `cinna-float-button-group--${shape}`,
          `cinna-float-button-group--${placement}`,
          menuMode && 'cinna-float-button-group--menu',
          mergedOpen && 'cinna-float-button-group--open',
          className
        )}
        onMouseEnter={(event) => {
          if (trigger === 'hover') setOpen(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (trigger === 'hover') setOpen(false);
          onMouseLeave?.(event);
        }}
        {...rest}
      >
        {listFirst && list}
        {triggerButton}
        {!listFirst && list}
      </div>
    );
  }
);
FloatButtonGroup.displayName = 'FloatButtonGroup';

const getBackTopTarget = (target?: () => HTMLElement | Window) => target?.() ?? window;

const getBackTopScrollTop = (target: HTMLElement | Window) => {
  if (target === window) return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  return (target as HTMLElement).scrollTop;
};

const setBackTopScrollTop = (target: HTMLElement | Window, top: number) => {
  if (target === window) {
    window.scrollTo(0, top);
    return;
  }

  (target as HTMLElement).scrollTop = top;
};

const scrollBackTop = (target: HTMLElement | Window, duration: number) => {
  const start = getBackTopScrollTop(target);

  if (duration <= 0 || start <= 0) {
    setBackTopScrollTop(target, 0);
    return;
  }

  const startTime = performance.now();
  const step = (time: number) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setBackTopScrollTop(target, Math.round(start * (1 - eased)));

    if (progress < 1) window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
};

export interface FloatButtonBackTopProps extends FloatButtonProps {
  duration?: number;
  visibilityHeight?: number;
  target?: () => HTMLElement | Window;
}

export const FloatButtonBackTop = React.forwardRef<HTMLButtonElement, FloatButtonBackTopProps>(
  ({ icon = <Icon name="arrow-tail-up" size={18} />, tooltip = 'Back to top', duration = 450, visibilityHeight = 400, target, onClick, style, className, ...rest }, ref) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const scrollTarget = getBackTopTarget(target);
      const updateVisible = () => {
        setVisible(getBackTopScrollTop(scrollTarget) >= visibilityHeight);
      };

      updateVisible();
      scrollTarget.addEventListener('scroll', updateVisible, { passive: true });
      window.addEventListener('resize', updateVisible);

      return () => {
        scrollTarget.removeEventListener('scroll', updateVisible);
        window.removeEventListener('resize', updateVisible);
      };
    }, [target, visibilityHeight]);

    return (
      <FloatButtonBase
        ref={ref}
        icon={icon}
        tooltip={tooltip}
        aria-label={typeof tooltip === 'string' ? tooltip : 'Back to top'}
        className={cx('cinna-float-button--back-top', !visible && 'cinna-float-button--hidden', className)}
        style={{ pointerEvents: visible ? undefined : 'none', ...style }}
        onClick={(event) => {
          onClick?.(event);
          scrollBackTop(getBackTopTarget(target), duration);
        }}
        {...rest}
      />
    );
  }
);
FloatButtonBackTop.displayName = 'FloatButtonBackTop';

export const FloatButton = Object.assign(FloatButtonBase, {
  Group: FloatButtonGroup,
  BackTop: FloatButtonBackTop,
});

function buildPaginationPageList(current: number, pages: number, showLessItems: boolean, showAllPages: boolean): PaginationToken[] {
  if (pages <= 0) return [];
  if (showAllPages) return Array.from({ length: pages }, (_, index) => index + 1);

  const siblingCount = showLessItems ? 0 : 1;
  const compactLimit = showLessItems ? 5 : 7;
  if (pages <= compactLimit) return Array.from({ length: pages }, (_, index) => index + 1);

  const edgeWindow = 3 + siblingCount;
  let left = Math.max(2, current - siblingCount);
  let right = Math.min(pages - 1, current + siblingCount);

  if (current <= edgeWindow) {
    left = 2;
    right = Math.min(pages - 1, edgeWindow + siblingCount);
  } else if (current >= pages - edgeWindow + 1) {
    left = Math.max(2, pages - edgeWindow - siblingCount + 1);
    right = pages - 1;
  }

  const result: PaginationToken[] = [1];
  if (left > 2) {
    result.push('jump-prev');
  } else {
    for (let page = 2; page < left; page += 1) result.push(page);
  }

  for (let page = left; page <= right; page += 1) result.push(page);

  if (right < pages - 1) {
    result.push('jump-next');
  } else {
    for (let page = right + 1; page < pages; page += 1) result.push(page);
  }

  result.push(pages);
  return result;
}

interface MenuRenderOptions {
  mode: MenuMode;
  theme: MenuTheme;
  inlineIndent: number;
  collapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  triggerSubMenuAction: MenuTriggerSubMenuAction;
  forceSubMenuRender: boolean;
  tooltip: MenuProps['tooltip'];
  expandIcon?: MenuExpandIcon;
  popupRender?: MenuPopupRender;
  semanticClassNames: Partial<Record<MenuSemanticSlot, string>>;
  semanticStyles: Partial<Record<MenuSemanticSlot, React.CSSProperties>>;
  onItemSelect: (item: MenuItem, keyPath: string[], event: React.MouseEvent<HTMLElement>) => void;
  onSubMenuToggle: (item: MenuItem, keyPath: string[], event: React.MouseEvent<HTMLElement>) => void;
  onSubMenuOpen: (key: string) => void;
  onSubMenuClose: (key: string) => void;

}

function resolveMenuSemanticMap<T extends string | React.CSSProperties>(
  map: Partial<Record<MenuSemanticSlot, T>> | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticSlot, T>>) | undefined,
  props: MenuProps
) {
  if (!map) return {};
  return typeof map === 'function' ? map({ props }) : map;
}

function isMenuDivider(item: MenuItem): item is Extract<MenuItem, { type: 'divider' }> {
  return item.type === 'divider';
}

function isMenuGroup(item: MenuItem): item is Extract<MenuItem, { type: 'group' }> {
  return item.type === 'group';
}

function menuHasSelectedChild(item: MenuItem, selectedKeys: string[]): boolean {
  if (isMenuDivider(item) || !item.children?.length) return false;
  return item.children.some((child) => !isMenuDivider(child) && !isMenuGroup(child) && (selectedKeys.includes(child.key) || menuHasSelectedChild(child, selectedKeys)));
}

function renderMenuItems(items: MenuItem[], options: MenuRenderOptions, level = 0, parentKeys: string[] = []): React.ReactNode {
  return items.map((item, index) => {
    if (isMenuDivider(item)) {
      return (
        <span
          key={item.key ?? `divider-${index}`}
          className={cx('cinna-menu__divider', item.dashed && 'cinna-menu__divider--dashed', item.className, options.semanticClassNames.divider)}
          role="separator"
          style={{ ...options.semanticStyles.divider, ...item.style }}
        />
      );
    }

    if (isMenuGroup(item)) {
      return (
        <div key={item.key ?? `group-${index}`} className={cx('cinna-menu__group', item.className, options.semanticClassNames.group)} role="group" style={{ ...options.semanticStyles.group, ...item.style }}>
          <span className={cx('cinna-menu__group-title', options.semanticClassNames.groupTitle)} style={options.semanticStyles.groupTitle}>{item.label}</span>
          <div className="cinna-menu__group-list">
            {renderMenuItems(item.children, options, level + 1, parentKeys)}
          </div>
        </div>
      );
    }

    const hasChildren = Boolean(item.children?.length);
    const keyPath = [item.key, ...parentKeys];
    const open = hasChildren && options.openKeys.includes(item.key);
    const selected = options.selectedKeys.includes(item.key);
    const childSelected = menuHasSelectedChild(item, options.selectedKeys);
    const itemTheme = item.theme ?? options.theme;
    const popupSubMenu = hasChildren && (options.mode !== 'inline' || options.collapsed);
    const titleOnly = options.collapsed && options.mode === 'inline';
    const itemPadding = !options.collapsed && options.mode === 'inline'
      ? { paddingLeft: level ? 14 + level * options.inlineIndent : undefined }
      : undefined;
    const expandIcon = hasChildren
      ? typeof options.expandIcon === 'function'
        ? options.expandIcon({ item, open, mode: options.mode, level })
        : options.expandIcon ?? <Icon name="chevron-down" size={12} />
      : null;

    const content = (
      <button
        key={item.key}
        type="button"
        role="menuitem"
        disabled={item.disabled}
        aria-haspopup={hasChildren || undefined}
        aria-expanded={hasChildren ? open : undefined}
        title={typeof item.title === 'string' ? item.title : typeof item.label === 'string' ? item.label : undefined}
        className={cx(
          hasChildren ? 'cinna-menu__submenu-title' : 'cinna-menu__item',
          selected && 'cinna-menu__item--active',
          childSelected && 'cinna-menu__item--child-active',
          open && 'cinna-menu__item--open',
          item.danger && 'cinna-menu__item--danger',
          item.disabled && 'cinna-menu__item--disabled',
          titleOnly && 'cinna-menu__item--title-only',
          item.className,
          hasChildren ? options.semanticClassNames.subMenuTitle : options.semanticClassNames.item
        )}
        style={{ ...itemPadding, ...(hasChildren ? options.semanticStyles.subMenuTitle : options.semanticStyles.item), ...item.style }}
        onClick={(event) => {
          if (hasChildren) {
            if (options.mode === 'inline' || options.collapsed || options.triggerSubMenuAction === 'click') {
              options.onSubMenuToggle(item, keyPath, event);
            } else {
              item.onTitleClick?.({ key: item.key, keyPath, domEvent: event });
            }
            return;
          }
          options.onItemSelect(item, keyPath, event);
        }}
      >
        {item.icon && <span className={cx('cinna-menu__icon', options.semanticClassNames.itemIcon)} style={options.semanticStyles.itemIcon}>{item.icon}</span>}
        {!titleOnly && <span className={cx('cinna-menu__content', options.semanticClassNames.itemContent)} style={options.semanticStyles.itemContent}>{item.label}</span>}
        {!titleOnly && item.extra && <span className={cx('cinna-menu__extra', options.semanticClassNames.itemExtra)} style={options.semanticStyles.itemExtra}>{item.extra}</span>}
        {hasChildren && !titleOnly && <span className="cinna-menu__expand-icon" aria-hidden="true">{expandIcon}</span>}
      </button>
    );

    const maybeWithTooltip = !hasChildren && titleOnly && options.tooltip !== false
      ? (
        <Popup mode="tooltip" title={item.title ?? item.label} placement={options.tooltip?.placement ?? 'right'} styles={options.tooltip?.styles}>
          {content}
        </Popup>
      )
      : content;

    if (!hasChildren) return maybeWithTooltip;

    const list = (
      <div
        className={cx(
          'cinna-menu__submenu-list',
          `cinna-menu__submenu-list--${itemTheme}`,
          open && 'cinna-menu__submenu-list--open',
          options.semanticClassNames.subMenuList
        )}
        role="menu"
        style={options.semanticStyles.subMenuList}
      >
        {renderMenuItems(item.children ?? [], options, popupSubMenu ? 0 : level + 1, keyPath)}
      </div>
    );
    const renderedListContent = (item.popupRender ?? options.popupRender)?.(list, { item, keyPath }) ?? list;
    const popupStyle = {
      ...(item.popupOffset ? {
        '--cinna-menu-popup-offset-x': normalizePopupCssValue(item.popupOffset[0]),
        '--cinna-menu-popup-offset-y': normalizePopupCssValue(item.popupOffset[1]),
      } : null),
      ...options.semanticStyles.popup,
    } as React.CSSProperties;
    const renderedList = popupSubMenu ? (
      <div
        className={cx(
          'cinna-menu__submenu-popup',
          `cinna-menu__submenu-popup--${itemTheme}`,
          open && 'cinna-menu__submenu-popup--open',
          item.popupClassName,
          options.semanticClassNames.popup
        )}
        style={popupStyle}
      >
        {renderedListContent}
      </div>
    ) : renderedListContent;

    return (
      <div
        key={item.key}
        className={cx(
          'cinna-menu__submenu',
          popupSubMenu && 'cinna-menu__submenu--popup',
          open && 'cinna-menu__submenu--open',
          childSelected && 'cinna-menu__submenu--child-active',
          `cinna-menu__submenu--${itemTheme}`
        )}
        onMouseEnter={popupSubMenu && options.triggerSubMenuAction === 'hover' && !item.disabled ? () => options.onSubMenuOpen(item.key) : undefined}
        onMouseLeave={popupSubMenu && options.triggerSubMenuAction === 'hover' && !item.disabled ? () => options.onSubMenuClose(item.key) : undefined}
      >
        {titleOnly && options.tooltip !== false ? (
          <Popup mode="tooltip" title={item.title ?? item.label} placement={options.tooltip?.placement ?? 'right'} styles={options.tooltip?.styles}>
            {content}
          </Popup>
        ) : content}
        {(open || options.forceSubMenuRender || !popupSubMenu) && renderedList}
      </div>
    );
  });
}
