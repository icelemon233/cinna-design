import React, { useEffect, useMemo, useState } from 'react';
import { cx } from '../utils/cx';
import { Icon } from './Icon';
import { Checkbox } from './DataEntry';
import { renderCell, toArray } from './Shared';
import type { CinnaSize, CinnaStatus, TreeNodeData } from './Shared';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'blue' | 'butter' | 'strawberry' | 'pistachio' | 'lavender' | 'cream';
  closable?: boolean;
  onClose?: () => void;
  bordered?: boolean;
  icon?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(({ color = 'blue', closable, onClose, bordered = true, icon, className, children, ...rest }, ref) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <span ref={ref} className={cx('cinna-tag', `cinna-tag--${color}`, !bordered && 'cinna-tag--borderless', className)} {...rest}>
      {icon && <span className="cinna-tag__icon">{icon}</span>}
      {children}
      {closable && (
        <button
          className="cinna-tag__close"
          type="button"
          aria-label="Close tag"
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          <Icon name="close-blue" size={10} />
        </button>
      )}
    </span>
  );
});
Tag.displayName = 'Tag';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: React.ReactNode;
  dot?: boolean;
  status?: CinnaStatus;
  overflowCount?: number;
  showZero?: boolean;
  text?: React.ReactNode;
  offset?: [number, number];
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ count, dot, status = 'info', overflowCount = 99, showZero, text, offset, className, children, ...rest }, ref) => {
  const numericCount = typeof count === 'number' ? count : undefined;
  const hidden = !dot && count === undefined && !text;
  const displayCount = numericCount !== undefined && numericCount > overflowCount ? `${overflowCount}+` : count;
  const markStyle = offset ? { right: offset[0], top: offset[1] } : undefined;
  return (
  <span ref={ref} className={cx('cinna-badge', !children && 'cinna-badge--standalone', className)} {...rest}>
    {children}
    {!hidden && (showZero || dot || count !== 0 || text) && (
      <span className={cx('cinna-badge__mark', dot && 'cinna-badge__mark--dot', Boolean(text && !count) && 'cinna-badge__mark--text', `cinna-badge__mark--${status}`)} style={markStyle}>
        {dot ? null : text ?? displayCount}
      </span>
    )}
  </span>
  );
});
Badge.displayName = 'Badge';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  size?: CinnaSize | number;
  shape?: 'circle' | 'square';
  icon?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(({ src, alt = '', size = 'medium', shape = 'circle', icon, className, style, children, ...rest }, ref) => {
  const resolved = typeof size === 'number' ? `${size}px` : undefined;
  return (
    <span ref={ref} className={cx('cinna-avatar', typeof size === 'string' && `cinna-avatar--${size}`, `cinna-avatar--${shape}`, className)} style={{ width: resolved, height: resolved, ...style }} {...rest}>
      {src ? <img src={src} alt={alt} /> : icon ?? children}
    </span>
  );
});

export interface CollapseItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: CollapseItem[];
  activeKey?: string | string[];
  defaultActiveKey?: string | string[];
  accordion?: boolean;
  bordered?: boolean;
  onChange?: (keys: string[]) => void;
}

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(({ items, activeKey, defaultActiveKey, accordion, bordered = true, onChange, className, ...rest }, ref) => {
  const defaults = toArray(defaultActiveKey);
  const controlled = toArray(activeKey);
  const [inner, setInner] = useState(defaults);
  const active = activeKey === undefined ? inner : controlled;
  const toggle = (key: string) => {
    const next = active.includes(key) ? active.filter((item) => item !== key) : accordion ? [key] : [...active, key];
    setInner(next);
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cx('cinna-collapse', !bordered && 'cinna-collapse--borderless', className)} {...rest}>
      {items.map((item) => (
        <div key={item.key} className={cx('cinna-collapse__item', item.disabled && 'cinna-collapse__item--disabled')}>
          <button type="button" disabled={item.disabled} aria-expanded={active.includes(item.key)} onClick={() => toggle(item.key)}>
            <span>{item.label}</span>
            {item.extra && <em>{item.extra}</em>}
          </button>
          {active.includes(item.key) && <div>{item.children}</div>}
        </div>
      ))}
    </div>
  );
});

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  title: React.ReactNode;
  dataIndex?: keyof T;
  key?: string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sorter?: (a: T, b: T) => number;
  width?: number | string;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey?: keyof T | ((record: T, index: number) => React.Key);
  bordered?: boolean;
  size?: CinnaSize;
  emptyText?: React.ReactNode;
  rowSelection?: {
    selectedRowKeys?: React.Key[];
    onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  };
}

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({ columns, dataSource, rowKey, bordered, size = 'medium', emptyText = 'No data', rowSelection, className, ...rest }: TableProps<T>) {
  const [sortState, setSortState] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selected, setSelected] = useState<React.Key[]>(rowSelection?.selectedRowKeys ?? []);
  const resolveKey = (record: T, index: number) => {
    if (typeof rowKey === 'function') return rowKey(record, index);
    if (rowKey) return String(record[rowKey]);
    return String(record.key ?? index);
  };
  const activeSelected = rowSelection?.selectedRowKeys ?? selected;
  const sortedData = useMemo(() => {
    if (!sortState) return dataSource;
    const column = columns.find((item, index) => (item.key ?? String(item.dataIndex ?? index)) === sortState.key);
    if (!column?.sorter) return dataSource;
    return [...dataSource].sort((a, b) => (sortState.direction === 'asc' ? column.sorter!(a, b) : column.sorter!(b, a)));
  }, [columns, dataSource, sortState]);
  const updateSelection = (key: React.Key, record: T, checked: boolean) => {
    const next = checked ? [...activeSelected, key] : activeSelected.filter((item) => item !== key);
    setSelected(next);
    rowSelection?.onChange?.(next, sortedData.filter((item, index) => next.includes(resolveKey(item, index))));
  };

  return (
    <div className={cx('cinna-table', `cinna-table--${size}`, bordered && 'cinna-table--bordered', className)} {...rest}>
      <table>
        <thead>
          <tr>
            {rowSelection && <th className="cinna-table__selection" />}
            {columns.map((column, index) => (
              <th key={column.key ?? String(column.dataIndex ?? index)} style={{ textAlign: column.align, width: column.width }}>
                {column.sorter ? (
                  <button
                    type="button"
                    className="cinna-table__sorter"
                    onClick={() => {
                      const key = column.key ?? String(column.dataIndex ?? index);
                      setSortState((current) => (current?.key === key && current.direction === 'asc' ? { key, direction: 'desc' } : { key, direction: 'asc' }));
                    }}
                  >
                    {column.title}
                    <span aria-hidden="true">{sortState?.key === (column.key ?? String(column.dataIndex ?? index)) ? (sortState.direction === 'asc' ? 'asc' : 'desc') : 'sort'}</span>
                  </button>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length ? (
            sortedData.map((record, rowIndex) => {
              const key = resolveKey(record, rowIndex);
              return (
                <tr key={key} className={cx(activeSelected.includes(key) && 'cinna-table__row--selected')}>
                  {rowSelection && (
                    <td className="cinna-table__selection">
                      <Checkbox aria-label={`Select row ${rowIndex + 1}`} checked={activeSelected.includes(key)} onChange={(event) => updateSelection(key, record, event.currentTarget.checked)} />
                    </td>
                  )}
                  {columns.map((column, colIndex) => {
                    const value = column.dataIndex ? record[column.dataIndex] : undefined;
                    return (
                      <td key={column.key ?? String(column.dataIndex ?? colIndex)} style={{ textAlign: column.align }}>
                        {column.render ? column.render(value, record, rowIndex) : renderCell(value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="cinna-table__empty" colSpan={columns.length + (rowSelection ? 1 : 0)}>
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export interface ListProps<T = unknown> extends React.HTMLAttributes<HTMLDivElement> {
  dataSource: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  itemLayout?: 'horizontal' | 'vertical';
}

export function List<T = unknown>({ dataSource, renderItem, header, footer, bordered = true, itemLayout = 'horizontal', className, ...rest }: ListProps<T>) {
  return (
    <div className={cx('cinna-list', `cinna-list--${itemLayout}`, !bordered && 'cinna-list--borderless', className)} {...rest}>
      {header && <div className="cinna-list__header">{header}</div>}
      {dataSource.map((item, index) => (
        <div key={index} className="cinna-list__item">
          {renderItem(item, index)}
        </div>
      ))}
      {footer && <div className="cinna-list__footer">{footer}</div>}
    </div>
  );
}

export interface DescriptionItem {
  label: React.ReactNode;
  children: React.ReactNode;
}

export interface DescriptionsProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
  column?: number;
  bordered?: boolean;
  size?: CinnaSize;
}

export const Descriptions = React.forwardRef<HTMLDListElement, DescriptionsProps>(({ items, column, bordered = true, size = 'medium', className, style, ...rest }, ref) => (
  <dl ref={ref} className={cx('cinna-descriptions', `cinna-descriptions--${size}`, !bordered && 'cinna-descriptions--borderless', className)} style={{ gridTemplateColumns: column ? `repeat(${column}, minmax(0, 1fr))` : undefined, ...style }} {...rest}>
    {items.map((item, index) => (
      <div key={index}>
        <dt>{item.label}</dt>
        <dd>{item.children}</dd>
      </div>
    ))}
  </dl>
));
Descriptions.displayName = 'Descriptions';

export interface TimelineItem {
  children: React.ReactNode;
  color?: 'blue' | 'butter' | 'strawberry' | 'pistachio';
  label?: React.ReactNode;
  dot?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
  mode?: 'left' | 'alternate';
}

export const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(({ items, mode = 'left', className, ...rest }, ref) => (
  <ol ref={ref} className={cx('cinna-timeline', `cinna-timeline--${mode}`, className)} {...rest}>
    {items.map((item, index) => (
      <li key={index} className={cx(item.color && `cinna-timeline__item--${item.color}`)}>
        {item.label && <em>{item.label}</em>}
        <span>{item.dot}</span>
        <div>{item.children}</div>
      </li>
    ))}
  </ol>
));
Timeline.displayName = 'Timeline';

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  title?: React.ReactNode;
  value: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  precision?: number;
  valueStyle?: React.CSSProperties;
}

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(({ title, value, suffix, prefix, precision, valueStyle, className, ...rest }, ref) => {
  const displayValue = typeof value === 'number' && precision !== undefined ? value.toFixed(precision) : value;
  return (
  <div ref={ref} className={cx('cinna-statistic', className)} {...rest}>
    {title && <span>{title}</span>}
    <strong style={valueStyle}>
      {prefix && <small>{prefix}</small>}
      {displayValue}
      {suffix && <small>{suffix}</small>}
    </strong>
  </div>
  );
});
Statistic.displayName = 'Statistic';

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  fullscreen?: boolean;
  headerRender?: (date: Date) => React.ReactNode;
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(({ value, defaultValue, onChange, fullscreen, headerRender, className, ...rest }, ref) => {
  const [selected, setSelected] = useState(defaultValue ?? value ?? new Date());
  const active = value ?? selected;
  const days = useMemo(() => buildCalendarDays(active), [active]);
  const monthLabel = active.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  const changeMonth = (offset: number) => {
    const next = new Date(active);
    next.setMonth(active.getMonth() + offset);
    setSelected(next);
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cx('cinna-calendar', fullscreen && 'cinna-calendar--fullscreen', className)} {...rest}>
      <div className="cinna-calendar__header">
        {headerRender ? (
          headerRender(active)
        ) : (
          <>
            <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>
              <Icon name="chevron-left" size={13} />
            </button>
            <strong>{monthLabel}</strong>
            <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>
              <Icon name="chevron-right" size={13} />
            </button>
          </>
        )}
      </div>
      <div className="cinna-calendar__grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <strong key={`${day}-${index}`}>{day}</strong>
        ))}
        {days.map((day, index) => (
          <button
            key={index}
            type="button"
            className={cx(!day.inMonth && 'cinna-calendar__day--muted', sameDay(day.date, active) && 'cinna-calendar__day--active', sameDay(day.date, new Date()) && 'cinna-calendar__day--today')}
            onClick={() => {
              setSelected(day.date);
              onChange?.(day.date);
            }}
          >
            {day.date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
});
Calendar.displayName = 'Calendar';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  defaultActiveIndex?: number;
  dots?: boolean;
  arrows?: boolean;
  afterChange?: (activeIndex: number) => void;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ items, autoplay, autoplaySpeed = 2600, defaultActiveIndex = 0, dots = true, arrows = true, afterChange, className, ...rest }, ref) => {
  const [active, setActive] = useState(defaultActiveIndex);
  const count = Math.max(items.length, 1);
  const go = (next: number) => {
    const normalized = (next + count) % count;
    setActive(normalized);
    afterChange?.(normalized);
  };

  useEffect(() => {
    if (!autoplay || count <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % count;
        afterChange?.(next);
        return next;
      });
    }, autoplaySpeed);
    return () => window.clearInterval(timer);
  }, [afterChange, autoplay, autoplaySpeed, count]);

  return (
    <div ref={ref} className={cx('cinna-carousel', className)} {...rest}>
      <div className="cinna-carousel__viewport">
        <div className="cinna-carousel__track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="cinna-carousel__item">
              {item}
            </div>
          ))}
        </div>
      </div>
      {arrows && items.length > 1 && (
        <span className="cinna-carousel__arrows">
          <button type="button" aria-label="Previous slide" onClick={() => go(active - 1)}>
            <Icon name="chevron-left" size={14} />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(active + 1)}>
            <Icon name="chevron-right" size={14} />
          </button>
        </span>
      )}
      {dots && items.length > 1 && (
        <span className="cinna-carousel__dots">
          {items.map((_, index) => (
            <button key={index} type="button" aria-label={`Go to slide ${index + 1}`} className={cx(index === active && 'cinna-carousel__dot--active')} onClick={() => go(index)} />
          ))}
        </span>
      )}
    </div>
  );
});
Carousel.displayName = 'Carousel';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  caption?: React.ReactNode;
  fallback?: string;
  preview?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ caption, fallback, preview, className, onError, ...rest }, ref) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [src, setSrc] = useState(rest.src);
  return (
    <figure className={cx('cinna-image', preview && 'cinna-image--previewable')}>
      <img
        ref={ref}
        className={className}
        {...rest}
        src={src}
        onClick={preview ? () => setPreviewOpen(true) : rest.onClick}
        onError={(event) => {
          if (fallback) setSrc(fallback);
          onError?.(event);
        }}
      />
      {caption && <figcaption>{caption}</figcaption>}
      {previewOpen && src && (
        <button type="button" className="cinna-image__preview" aria-label="Close image preview" onClick={() => setPreviewOpen(false)}>
          <img src={src} alt={rest.alt ?? ''} />
        </button>
      )}
    </figure>
  );
});
Image.displayName = 'Image';

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  treeData: TreeNodeData[];
  defaultExpandedKeys?: string[];
  selectable?: boolean;
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelect?: (key: string) => void;
}

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(({ treeData, defaultExpandedKeys, selectable, selectedKey, defaultSelectedKey, onSelect, className, ...rest }, ref) => {
  const [innerSelected, setInnerSelected] = useState(defaultSelectedKey);
  const activeSelected = selectedKey ?? innerSelected;
  const selectNode = (key: string) => {
    setInnerSelected(key);
    onSelect?.(key);
  };
  return (
    <div ref={ref} className={cx('cinna-tree', className)} {...rest}>
      {treeData.map((node) => (
        <TreeNodeView key={node.key} node={node} defaultExpandedKeys={defaultExpandedKeys} selectable={selectable} selectedKey={activeSelected} onSelect={selectNode} />
      ))}
    </div>
  );
});

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  rotate?: number;
  gap?: number;
  opacity?: number;
}

export const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(({ content = 'Cinna Design', rotate = -18, gap = 120, opacity = 0.08, className, style, ...rest }, ref) => (
  <div
    ref={ref}
    className={cx('cinna-watermark', className)}
    data-watermark={content}
    style={{ ['--cinna-watermark-rotate' as string]: `${rotate}deg`, ['--cinna-watermark-gap' as string]: `${gap}px`, ['--cinna-watermark-opacity' as string]: opacity, ...style }}
    {...rest}
  />
));

function buildCalendarDays(value: Date) {
  const year = value.getFullYear();
  const month = value.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());

  return Array.from({ length: 42 }).map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { date, inMonth: date.getMonth() === month };
  });
}

function sameDay(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
}

function TreeNodeView({
  node,
  defaultExpandedKeys,
  selectable,
  selectedKey,
  onSelect,
}: {
  node: TreeNodeData;
  defaultExpandedKeys?: string[];
  selectable?: boolean;
  selectedKey?: string;
  onSelect?: (key: string) => void;
}) {
  if (!node.children?.length) {
    return (
      <button type="button" className={cx('cinna-tree__node', selectedKey === node.key && 'cinna-tree__node--selected')} disabled={!selectable} onClick={() => onSelect?.(node.key)}>
        {node.title}
      </button>
    );
  }
  return (
    <details className="cinna-tree__branch" open={defaultExpandedKeys ? defaultExpandedKeys.includes(node.key) : true}>
      <summary>{node.title}</summary>
      <div>
        {node.children.map((child) => (
          <TreeNodeView key={child.key} node={child} defaultExpandedKeys={defaultExpandedKeys} selectable={selectable} selectedKey={selectedKey} onSelect={onSelect} />
        ))}
      </div>
    </details>
  );
}
