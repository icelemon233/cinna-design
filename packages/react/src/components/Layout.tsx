import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cx } from '../utils/cx';
import { clampNumber } from './Shared';
import type { CinnaSize, GridGap } from './Shared';
import { Icon } from './Icon';
import { Menu, type MenuItem, type MenuProps } from './Navigation';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  size?: CinnaSize | number;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  split?: React.ReactNode;
  block?: boolean;
}

export const Space = React.forwardRef<HTMLDivElement, SpaceProps>(
  ({ direction = 'horizontal', size = 'medium', align = 'center', justify, wrap = false, split, block, className, style, children, ...rest }, ref) => {
    const gap = typeof size === 'number' ? `${size}px` : undefined;
    const childList = React.Children.toArray(children).filter(Boolean);
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-space',
          `cinna-space--${direction}`,
          typeof size === 'string' && `cinna-space--${size}`,
          wrap && 'cinna-space--wrap',
          block && 'cinna-space--block',
          className
        )}
        style={{ alignItems: align, justifyContent: justify, gap, ...style }}
        {...rest}
      >
        {split
          ? childList.map((child, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="cinna-space__split">{split}</span>}
                {child}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  }
);
Space.displayName = 'Space';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  gap?: CinnaSize | number;
  wrap?: boolean;
  inline?: boolean;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(({ vertical, align, justify, gap = 'medium', wrap, inline, className, style, ...rest }, ref) => {
  const resolvedGap = typeof gap === 'number' ? `${gap}px` : undefined;
  return (
    <div
      ref={ref}
      className={cx('cinna-flex', inline && 'cinna-flex--inline', vertical && 'cinna-flex--vertical', typeof gap === 'string' && `cinna-flex--${gap}`, wrap && 'cinna-flex--wrap', className)}
      style={{ alignItems: align, justifyContent: justify, gap: resolvedGap, ...style }}
      {...rest}
    />
  );
});
Flex.displayName = 'Flex';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'left' | 'center' | 'right';
  vertical?: boolean;
  dashed?: boolean;
  plain?: boolean;
  color?: string;
  character?: string;
  left?: boolean | number | string;
  right?: boolean | number | string;
}

const normalizeDividerCssValue = (value: boolean | number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') return value;
  return undefined;
};

const getDividerOrientation = (orientation: DividerProps['orientation'], left: DividerProps['left'], right: DividerProps['right']) => {
  if (right !== undefined && right !== false) return 'right';
  if (left !== undefined && left !== false) return 'left';
  return orientation ?? 'center';
};

const getDividerCharacterRepeat = (character: string | undefined) => {
  if (!character) return undefined;
  return Array.from({ length: 36 }, () => character).join('');
};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(({
  orientation,
  vertical,
  dashed = true,
  plain,
  color,
  character,
  left,
  right,
  className,
  children,
  style,
  ...rest
}, ref) => {
  const resolvedOrientation = getDividerOrientation(orientation, left, right);
  const dividerStyle = {
    ...(color ? { '--cinna-divider-color': color } : null),
    ...(left !== undefined && left !== false ? { '--cinna-divider-left': normalizeDividerCssValue(left) } : null),
    ...(right !== undefined && right !== false ? { '--cinna-divider-right': normalizeDividerCssValue(right) } : null),
    ...style,
  } as React.CSSProperties;
  const characterRepeat = getDividerCharacterRepeat(character);

  return (
    <div
      ref={ref}
      role="separator"
      className={cx(
        'cinna-divider',
        vertical ? 'cinna-divider--vertical' : 'cinna-divider--horizontal',
        `cinna-divider--${resolvedOrientation}`,
        dashed && 'cinna-divider--dashed',
        plain && 'cinna-divider--plain',
        character && 'cinna-divider--character',
        left !== undefined && left !== false && left !== true && 'cinna-divider--custom-left',
        right !== undefined && right !== false && right !== true && 'cinna-divider--custom-right',
        className
      )}
      data-divider-character={characterRepeat}
      style={dividerStyle}
      {...rest}
    >
      {children && <span>{children}</span>}
    </div>
  );
});
Divider.displayName = 'Divider';

const gridGapPresets: Record<CinnaSize, string> = {
  small: '8px',
  medium: '16px',
  large: '24px',
};

const normalizeGridCssValue = (value: number | string | undefined, fallback: string) => {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const normalizeGridGapValue = (value: GridGap | undefined, fallback: string) => {
  if (value === undefined) return fallback;
  if (typeof value === 'number') return `${value}px`;
  return gridGapPresets[value as CinnaSize] ?? value;
};

const normalizeGridGapPair = (value: GridGap | [GridGap, GridGap] | undefined, fallback = '16px'): [string, string] => {
  if (Array.isArray(value)) return [normalizeGridGapValue(value[0], fallback), normalizeGridGapValue(value[1], fallback)];
  const gap = normalizeGridGapValue(value, fallback);
  return [gap, gap];
};

const normalizeRowGutter = (value: RowProps['gutter']): [string, string] => {
  if (Array.isArray(value)) return [normalizeGridGapValue(value[0], '0px'), normalizeGridGapValue(value[1], '0px')];
  return [normalizeGridGapValue(value, '0px'), '0px'];
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  gap?: GridGap | [GridGap, GridGap];
  minColumnWidth?: number | string;
  inline?: boolean;
}

const normalizeGridTemplateColumns = (columns: GridProps['columns'], minColumnWidth: GridProps['minColumnWidth']) => {
  if (minColumnWidth !== undefined) return `repeat(auto-fit, minmax(${normalizeGridCssValue(minColumnWidth, '220px')}, 1fr))`;
  if (typeof columns === 'number') return `repeat(${Math.max(1, Math.floor(columns))}, minmax(0, 1fr))`;
  return columns ?? 'repeat(1, minmax(0, 1fr))';
};

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(({ columns = 1, gap = 'medium', minColumnWidth, inline, className, style, ...rest }, ref) => {
  const [columnGap, rowGap] = normalizeGridGapPair(gap);

  return (
    <div
      ref={ref}
      className={cx('cinna-grid', inline && 'cinna-grid--inline', className)}
      style={{
        '--cinna-grid-template': normalizeGridTemplateColumns(columns, minColumnWidth),
        '--cinna-grid-gap-x': columnGap,
        '--cinna-grid-gap-y': rowGap,
        ...style,
      } as React.CSSProperties}
      {...rest}
    />
  );
});
Grid.displayName = 'Grid';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: GridGap | [GridGap, GridGap];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(({ gutter = 0, align, justify, wrap = true, className, style, ...rest }, ref) => {
  const [horizontalGutter, verticalGutter] = normalizeRowGutter(gutter);

  return (
    <div
      ref={ref}
      className={cx('cinna-row', !wrap && 'cinna-row--nowrap', className)}
      style={{
        alignItems: align,
        justifyContent: justify,
        rowGap: verticalGutter,
        '--cinna-row-gutter-x': horizontalGutter,
        ...style,
      } as React.CSSProperties}
      {...rest}
    />
  );
});
Row.displayName = 'Row';

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  offset?: number;
  order?: number;
  flex?: React.CSSProperties['flex'];
}

export const Col = React.forwardRef<HTMLDivElement, ColProps>(({ span = 24, offset = 0, order, flex, className, style, ...rest }, ref) => {
  const width = `${(span / 24) * 100}%`;
  const columnLayoutStyle = flex === undefined
    ? { flex: '0 0 auto', flexBasis: width, maxWidth: width }
    : { flex };

  return (
    <div
      ref={ref}
      className={cx('cinna-col', className)}
      style={{ ...columnLayoutStyle, marginLeft: offset ? `${(offset / 24) * 100}%` : undefined, order, ...style }}
      {...rest}
    />
  );
});
Col.displayName = 'Col';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  hasSider?: boolean;
}

const normalizeLayoutCssValue = (value: number | string | undefined) => {
  if (typeof value === 'number') return `${value}px`;
  return value;
};

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(({ hasSider, className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-layout', hasSider && 'cinna-layout--has-sider', className)} {...rest} />
));
Layout.displayName = 'Layout';

export interface LayoutHeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  offsetTop?: number | string;
  height?: number | string;
}

export const LayoutHeader = React.forwardRef<HTMLElement, LayoutHeaderProps>(({ sticky, offsetTop = 0, height, className, style, ...rest }, ref) => (
  <header
    ref={ref}
    className={cx('cinna-layout__header', sticky && 'cinna-layout__header--sticky', className)}
    style={{
      ...(sticky ? { '--cinna-layout-header-top': normalizeLayoutCssValue(offsetTop) } : null),
      ...(height !== undefined ? { '--cinna-layout-header-height': normalizeLayoutCssValue(height) } : null),
      ...style,
    } as React.CSSProperties}
    {...rest}
  />
));
LayoutHeader.displayName = 'LayoutHeader';

export type LayoutSiderPlacement = 'left' | 'right';

export interface LayoutSiderProps extends React.HTMLAttributes<HTMLElement> {
  width?: number | string;
  collapsedWidth?: number | string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  trigger?: React.ReactNode | null;
  menu?: MenuItem[];
  menuProps?: Omit<MenuProps, 'items' | 'inlineCollapsed'>;
  sticky?: boolean;
  offsetTop?: number | string;
  placement?: LayoutSiderPlacement;
  expandOnHover?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const LayoutSider = React.forwardRef<HTMLElement, LayoutSiderProps>(({
  width = 200,
  collapsedWidth = 72,
  collapsed,
  defaultCollapsed = false,
  collapsible,
  trigger,
  menu,
  menuProps,
  sticky,
  offsetTop = 0,
  placement = 'left',
  expandOnHover,
  onCollapse,
  className,
  style,
  children,
  onMouseEnter,
  onMouseLeave,
  ...rest
}, ref) => {
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed);
  const mergedCollapsed = collapsed ?? innerCollapsed;

  const setCollapsed = (nextCollapsed: boolean) => {
    if (collapsed === undefined) setInnerCollapsed(nextCollapsed);
    onCollapse?.(nextCollapsed);
  };

  return (
    <aside
      ref={ref}
      className={cx(
        'cinna-layout__sider',
        `cinna-layout__sider--${placement}`,
        sticky && 'cinna-layout__sider--sticky',
        collapsible && 'cinna-layout__sider--collapsible',
        mergedCollapsed && 'cinna-layout__sider--collapsed',
        menu && 'cinna-layout__sider--with-menu',
        className
      )}
      style={{
        '--cinna-layout-sider-width': normalizeLayoutCssValue(width),
        '--cinna-layout-sider-collapsed-width': normalizeLayoutCssValue(collapsedWidth),
        ...(sticky ? { '--cinna-layout-sider-top': normalizeLayoutCssValue(offsetTop) } : null),
        ...style,
      } as React.CSSProperties}
      aria-expanded={collapsible ? !mergedCollapsed : undefined}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        if (expandOnHover && collapsible && mergedCollapsed) setCollapsed(false);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        if (expandOnHover && collapsible && !mergedCollapsed) setCollapsed(true);
      }}
      {...rest}
    >
      <div className="cinna-layout__sider-content">
        {menu ? (
          <Menu
            mode="inline"
            {...menuProps}
            items={menu}
            inlineCollapsed={mergedCollapsed}
          />
        ) : children}
      </div>
      {collapsible && trigger !== null && (
        <button
          type="button"
          className="cinna-layout__sider-trigger"
          aria-label={mergedCollapsed ? 'Expand sider' : 'Collapse sider'}
          onClick={() => setCollapsed(!mergedCollapsed)}
        >
          {trigger ?? (mergedCollapsed ? <Icon name="chevron-right" size={12} /> : <Icon name="chevron-left" size={12} />)}
        </button>
      )}
    </aside>
  );
});
LayoutSider.displayName = 'LayoutSider';

export const LayoutContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...rest }, ref) => (
  <main ref={ref} className={cx('cinna-layout__content', className)} {...rest} />
));
LayoutContent.displayName = 'LayoutContent';

export interface LayoutFooterProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  offsetBottom?: number | string;
  height?: number | string;
}

export const LayoutFooter = React.forwardRef<HTMLElement, LayoutFooterProps>(({ sticky, offsetBottom = 0, height, className, style, ...rest }, ref) => (
  <footer
    ref={ref}
    className={cx('cinna-layout__footer', sticky && 'cinna-layout__footer--sticky', className)}
    style={{
      ...(sticky ? { '--cinna-layout-footer-bottom': normalizeLayoutCssValue(offsetBottom) } : null),
      ...(height !== undefined ? { '--cinna-layout-footer-height': normalizeLayoutCssValue(height) } : null),
      ...style,
    } as React.CSSProperties}
    {...rest}
  />
));

export type SplitterOrientation = 'horizontal' | 'vertical';

export interface SplitterDividerOptions {
  color?: string;
  dashed?: boolean;
  size?: number | string;
  thickness?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export interface SplitterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number | string;
  size?: number | string;
  min?: number | string;
  max?: number | string;
  resizable?: boolean;
}

interface SplitterPanelConfig {
  key: React.Key;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  defaultSize?: number | string;
  size?: number | string;
  min?: number | string;
  max?: number | string;
  resizable: boolean;
}

interface SplitterDragState {
  index: number;
  startPoint: number;
  startSizes: number[];
}

const getSplitterPreviewPosition = (sizes: number[], index: number, dividerSize: number) => (
  sizes.slice(0, index + 1).reduce((sum, size) => sum + size, 0) + index * dividerSize + dividerSize / 2
);

export const SplitterPanel = React.forwardRef<HTMLDivElement, SplitterPanelProps>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cx('cinna-splitter__panel', className)} {...rest} />
));
SplitterPanel.displayName = 'SplitterPanel';

export interface SplitterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onResize'> {
  children?: React.ReactNode;
  first?: React.ReactNode;
  second?: React.ReactNode;
  orientation?: SplitterOrientation;
  vertical?: boolean;
  defaultSize?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  lazy?: boolean;
  divider?: SplitterDividerOptions;
  resetOnDoubleClick?: boolean;
  onResizeStart?: (sizes: number[]) => void;
  onResize?: (sizes: number[]) => void;
  onResizeEnd?: (sizes: number[]) => void;
  onDraggerDoubleClick?: (index: number) => void;
}

const isSplitterPanelElement = (child: React.ReactNode): child is React.ReactElement<SplitterPanelProps> => (
  React.isValidElement(child) && child.type === SplitterPanel
);

const normalizeSplitterSize = (value: number | string | undefined, total: number): number | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return value;
  const trimmed = value.trim();
  if (trimmed.endsWith('%')) return total * (Number.parseFloat(trimmed) / 100);
  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const getSplitterPanelMin = (panel: SplitterPanelConfig, total: number) => normalizeSplitterSize(panel.min, total) ?? 48;
const getSplitterPanelMax = (panel: SplitterPanelConfig, total: number) => normalizeSplitterSize(panel.max, total) ?? Number.POSITIVE_INFINITY;

const balanceSplitterSizes = (sizes: number[], panels: SplitterPanelConfig[], total: number) => {
  if (!panels.length) return [];
  const available = Math.max(total, panels.length * 24);
  const minSizes = panels.map((panel) => getSplitterPanelMin(panel, available));
  const maxSizes = panels.map((panel, index) => Math.max(minSizes[index], getSplitterPanelMax(panel, available)));
  const nextSizes = panels.map((_, index) => clampNumber(sizes[index] ?? available / panels.length, minSizes[index], maxSizes[index]));

  let guard = 0;
  while (Math.abs(nextSizes.reduce((sum, size) => sum + size, 0) - available) > 0.5 && guard < panels.length * 4) {
    guard += 1;
    const current = nextSizes.reduce((sum, size) => sum + size, 0);
    const diff = available - current;
    const grow = diff > 0;
    const adjustable = nextSizes
      .map((size, index) => ({ size, index, room: grow ? maxSizes[index] - size : size - minSizes[index] }))
      .filter((item) => item.room > 0.5);
    if (!adjustable.length) break;
    const share = Math.abs(diff) / adjustable.length;
    adjustable.forEach(({ index, room }) => {
      const delta = Math.min(share, room);
      nextSizes[index] += grow ? delta : -delta;
    });
  }

  return nextSizes;
};

const formatSplitterCssSize = (value: number | string | undefined, fallback: number) => {
  if (value === undefined) return `${fallback}px`;
  return typeof value === 'number' ? `${value}px` : value;
};

const getSplitterPoint = (event: PointerEvent, orientation: SplitterOrientation) => (
  orientation === 'horizontal' ? event.clientX : event.clientY
);

const getSplitterDragRange = (panels: SplitterPanelConfig[], sizes: number[], index: number, total: number) => {
  const beforeSize = sizes[index] ?? 0;
  const afterSize = sizes[index + 1] ?? 0;
  const beforeMin = getSplitterPanelMin(panels[index], total);
  const beforeMax = getSplitterPanelMax(panels[index], total);
  const afterMin = getSplitterPanelMin(panels[index + 1], total);
  const afterMax = getSplitterPanelMax(panels[index + 1], total);

  return {
    minDelta: Math.max(beforeMin - beforeSize, afterSize - afterMax),
    maxDelta: Math.min(beforeMax - beforeSize, afterSize - afterMin),
  };
};

const SplitterBase = React.forwardRef<HTMLDivElement, SplitterProps>(({
  children,
  first,
  second,
  orientation,
  vertical,
  defaultSize = 48,
  min = 24,
  max = 76,
  disabled,
  lazy,
  divider,
  resetOnDoubleClick = true,
  onResizeStart,
  onResize,
  onResizeEnd,
  onDraggerDoubleClick,
  className,
  style,
  ...rest
}, ref) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<SplitterDragState | null>(null);
  const draftSizesRef = useRef<number[] | null>(null);
  const [sizes, setSizes] = useState<number[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [previewPosition, setPreviewPosition] = useState<number | null>(null);
  const resolvedOrientation: SplitterOrientation = orientation ?? (vertical ? 'vertical' : 'horizontal');
  const dividerSize = normalizeSplitterSize(divider?.size, 0) ?? 14;
  const dividerCssSize = formatSplitterCssSize(divider?.size, 14);
  const dividerLineThickness = formatSplitterCssSize(divider?.thickness, 1.5);

  const panels = useMemo<SplitterPanelConfig[]>(() => {
    const childList = React.Children.toArray(children).filter(Boolean);
    if (childList.length) {
      return childList.map((child, index) => {
        if (isSplitterPanelElement(child)) {
          const { children: panelChildren, className: panelClassName, style: panelStyle, defaultSize: panelDefaultSize, size, min: panelMin, max: panelMax, resizable = true } = child.props;
          return {
            key: child.key ?? index,
            children: panelChildren,
            className: panelClassName,
            style: panelStyle,
            defaultSize: panelDefaultSize,
            size,
            min: panelMin,
            max: panelMax,
            resizable,
          };
        }

        return { key: index, children: child, resizable: true };
      });
    }

    return [
      { key: 'first', children: first, defaultSize: `${defaultSize}%`, min: `${min}%`, max: `${max}%`, resizable: true },
      { key: 'second', children: second, resizable: true },
    ].filter((panel) => panel.children !== undefined);
  }, [children, defaultSize, first, max, min, second]);

  const getPanelSpace = () => {
    const rect = rootRef.current?.getBoundingClientRect();
    const rawSize = resolvedOrientation === 'horizontal' ? rect?.width : rect?.height;
    return Math.max((rawSize || 640) - Math.max(0, panels.length - 1) * dividerSize, panels.length * 48);
  };

  const buildInitialSizes = (total: number) => {
    const resolved = panels.map((panel) => normalizeSplitterSize(panel.size ?? panel.defaultSize, total));
    const fixedTotal = resolved.reduce<number>((sum, size) => sum + (size ?? 0), 0);
    const missingCount = resolved.filter((size) => size === undefined).length;
    const remaining = Math.max(0, total - fixedTotal);
    const fallback = missingCount ? remaining / missingCount : total / panels.length;

    return balanceSplitterSizes(resolved.map((size) => size ?? fallback), panels, total);
  };

  const setRootRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (!panels.length) return;
    const total = getPanelSpace();
    setSizes((current) => {
      const controlled = panels.some((panel) => panel.size !== undefined);
      if (!current.length || current.length !== panels.length || controlled) return buildInitialSizes(total);
      return balanceSplitterSizes(current, panels, total);
    });
  }, [panels, resolvedOrientation, dividerSize]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      const total = getPanelSpace();
      setSizes((current) => current.length ? balanceSplitterSizes(current, panels, total) : buildInitialSizes(total));
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [panels, resolvedOrientation, dividerSize]);

  useEffect(() => {
    if (draggingIndex === null) return;

    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;
      event.preventDefault();

      const total = getPanelSpace();
      const rawDelta = getSplitterPoint(event, resolvedOrientation) - dragState.startPoint;
      const { minDelta, maxDelta } = getSplitterDragRange(panels, dragState.startSizes, dragState.index, total);
      const delta = clampNumber(rawDelta, minDelta, maxDelta);
      const nextSizes = [...dragState.startSizes];
      nextSizes[dragState.index] += delta;
      nextSizes[dragState.index + 1] -= delta;
      draftSizesRef.current = nextSizes;

      if (lazy) {
        setPreviewPosition(getSplitterPreviewPosition(nextSizes, dragState.index, dividerSize));
      } else {
        setSizes(nextSizes);
        onResize?.(nextSizes);
      }
    };

    const handlePointerUp = () => {
      const nextSizes = draftSizesRef.current;
      if (nextSizes) {
        setSizes(nextSizes);
        onResizeEnd?.(nextSizes);
        if (lazy) onResize?.(nextSizes);
      }
      dragStateRef.current = null;
      draftSizesRef.current = null;
      setDraggingIndex(null);
      setPreviewPosition(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingIndex, lazy, onResize, onResizeEnd, panels, resolvedOrientation]);

  const activeSizes = sizes.length === panels.length ? sizes : buildInitialSizes(getPanelSpace());

  const startDrag = (event: React.PointerEvent<HTMLButtonElement>, index: number) => {
    if (disabled || !panels[index]?.resizable || !panels[index + 1]?.resizable) return;
    event.preventDefault();
    const total = getPanelSpace();
    const balancedSizes = balanceSplitterSizes(activeSizes, panels, total);
    dragStateRef.current = {
      index,
      startPoint: resolvedOrientation === 'horizontal' ? event.clientX : event.clientY,
      startSizes: balancedSizes,
    };
    draftSizesRef.current = balancedSizes;
    setDraggingIndex(index);
    if (lazy) setPreviewPosition(getSplitterPreviewPosition(balancedSizes, index, dividerSize));
    onResizeStart?.(balancedSizes);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const resetPanels = (index: number) => {
    if (!resetOnDoubleClick || disabled) return;
    const total = getPanelSpace();
    const resetSizes = buildInitialSizes(total);
    setSizes(resetSizes);
    onDraggerDoubleClick?.(index);
    onResize?.(resetSizes);
    onResizeEnd?.(resetSizes);
  };

  return (
    <div
      ref={setRootRef}
      className={cx(
        'cinna-splitter',
        `cinna-splitter--${resolvedOrientation}`,
        disabled && 'cinna-splitter--disabled',
        lazy && 'cinna-splitter--lazy',
        className
      )}
      style={{
        '--cinna-splitter-dragger-size': dividerCssSize,
        '--cinna-splitter-divider-color': divider?.color,
        '--cinna-splitter-line-thickness': dividerLineThickness,
        ...style,
      } as React.CSSProperties}
      {...rest}
    >
      {panels.map((panel, index) => {
        const draggerDisabled = Boolean(disabled || !panel.resizable || !panels[index + 1]?.resizable);
        const panelStyle = {
          '--cinna-splitter-panel-size': `${activeSizes[index] ?? 0}px`,
          ...panel.style,
        } as React.CSSProperties;

        return (
          <React.Fragment key={panel.key}>
            <div className={cx('cinna-splitter__panel', panel.className)} style={panelStyle}>
              {panel.children}
            </div>
            {index < panels.length - 1 && (
              <button
                type="button"
                className={cx(
                  'cinna-splitter__dragger',
                  divider?.dashed !== false && 'cinna-splitter__dragger--dashed',
                  draggingIndex === index && 'cinna-splitter__dragger--active',
                  draggerDisabled && 'cinna-splitter__dragger--disabled',
                  divider?.className
                )}
                style={divider?.style}
                role="separator"
                aria-label="Resize panels"
                aria-orientation={resolvedOrientation === 'horizontal' ? 'vertical' : 'horizontal'}
                aria-disabled={draggerDisabled || undefined}
                onPointerDown={(event) => startDrag(event, index)}
                onDoubleClick={() => resetPanels(index)}
              >
                <span aria-hidden="true" />
              </button>
            )}
          </React.Fragment>
        );
      })}
      {lazy && draggingIndex !== null && previewPosition !== null && (
        <span
          className="cinna-splitter__preview"
          style={{ '--cinna-splitter-preview-position': `${previewPosition}px` } as React.CSSProperties}
          aria-hidden="true"
        />
      )}
    </div>
  );
});
SplitterBase.displayName = 'Splitter';

export const Splitter = Object.assign(SplitterBase, { Panel: SplitterPanel });
