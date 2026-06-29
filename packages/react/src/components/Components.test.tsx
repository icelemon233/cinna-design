import { useState } from 'react';
import { act, createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import {
  Alert,
  Anchor,
  AutoComplete,
  Breadcrumb,
  Carousel,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Divider,
  FloatButton,
  FloatButtonBackTop,
  FloatButtonGroup,
  Grid,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Menu,
  Mentions,
  Modal,
  Notification,
  Pagination,
  Paragraph,
  Popup,
  Progress,
  RadioGroup,
  Row,
  Col,
  Select,
  Splitter,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Text,
  Tree,
} from '../index';
import type { CascaderOption } from '../index';

describe('components', () => {
  it('renders data display primitives', () => {
    render(
      <>
        <Tag>Cloud</Tag>
        <Progress percent={42} />
        <Table columns={[{ title: 'Name', dataIndex: 'name' }]} dataSource={[{ key: 'cloud', name: 'Cloud' }]} />
      </>
    );

    expect(screen.getAllByText('Cloud')).toHaveLength(2);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('closes closable tags and notifications', () => {
    render(
      <>
        <Tag closable>Berry</Tag>
        <Notification title="Published" content="Ready" closable />
      </>
    );

    fireEvent.click(screen.getByLabelText('Close tag'));
    expect(screen.queryByText('Berry')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close notification'));
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  });

  it('supports controlled-like selection components', () => {
    render(<RadioGroup defaultValue="a" options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} />);
    expect(screen.getByLabelText('A')).toBeChecked();
  });

  it('renders checkbox motion, disabled state, custom styles, and group linkage', () => {
    const onGroupChange = vi.fn();
    const { container } = render(
      <>
        <Checkbox
          label="Styled checkbox"
          defaultChecked
          animation="particles"
          fontSize={18}
          labelColor="#46332a"
          checkedColor="#73c4e0"
          borderColor="#8a6c5f"
          rippleParticleColors={['#73c4e0', '#ffd8c2']}
        />
        <Checkbox label="Pop checkbox" animation="pop" />
        <Checkbox label="Handwriting checkbox" animation="handwriting" />
        <Checkbox label="Disabled checkbox" disabled />
        <CheckboxGroup
          options={[
            { label: 'Docs', value: 'docs' },
            { label: 'Tokens', value: 'tokens' },
          ]}
          defaultValue={['docs']}
          onChange={onGroupChange}
        />
      </>
    );

    const styled = screen.getByLabelText('Styled checkbox').closest('.cinna-check');
    const styledBox = styled?.querySelector('.cinna-check__box');
    expect(styled).toHaveStyle({
      '--cinna-check-font-size': '18px',
      '--cinna-check-label-color': '#46332a',
      '--cinna-check-checked-color': '#73c4e0',
      '--cinna-check-border-color': '#8a6c5f',
    });
    expect(styled).toHaveClass('cinna-check--animation-particles');
    expect(screen.getByLabelText('Pop checkbox').closest('.cinna-check')).toHaveClass('cinna-check--animation-pop');
    expect(screen.getByLabelText('Handwriting checkbox').closest('.cinna-check')).toHaveClass('cinna-check--animation-handwriting');
    expect(screen.getByLabelText('Disabled checkbox').closest('.cinna-check')).toHaveClass('cinna-check--disabled');

    const styledLabel = styled?.querySelector('.cinna-check__label');
    fireEvent.click(styledLabel!);
    expect(styledBox!.querySelectorAll('.cinna-button__ripple-particle')).toHaveLength(6);
    expect(styled!.querySelector('.cinna-check__label .cinna-button__ripple-particle')).toBeNull();
    expect(styledBox!.querySelector('.cinna-check__mark-path')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Tokens'));
    expect(onGroupChange).toHaveBeenCalledWith(['docs', 'tokens']);
  });

  it('closes select popups when clicking outside', () => {
    render(
      <>
        <Select placeholder="Pick resource" options={[{ label: 'Docs', value: 'docs' }]} />
        <button type="button">Outside</button>
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pick resource' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects cascader paths from column menus and closes outside', () => {
    const onChange = vi.fn();
    render(
      <>
        <Cascader
          options={[
            {
              label: 'Docs',
              value: 'docs',
              children: [{ label: 'API', value: 'api' }],
            },
          ]}
          placeholder="Choose path"
          onChange={onChange}
        />
        <button type="button">Outside</button>
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Choose path' }));
    expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(1);
    fireEvent.click(screen.getByRole('option', { name: /Docs/ }));
    expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(2);
    fireEvent.click(screen.getByRole('option', { name: 'API' }));

    expect(onChange).toHaveBeenCalledWith(['docs', 'api'], expect.arrayContaining([expect.objectContaining({ value: 'docs' })]));
    expect(screen.queryByRole('option', { name: 'API' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Docs/ }));
    expect(screen.getByRole('option', { name: /Docs/ })).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByRole('option', { name: /Docs/ })).not.toBeInTheDocument();
  });

  it('shows loading state while lazy loading cascader children', async () => {
    vi.useFakeTimers();

    try {
      const loadData = vi.fn(() => new Promise<CascaderOption[]>((resolve) => {
        setTimeout(() => {
          resolve([{ label: 'API', value: 'api' }]);
        }, 500);
      }));
      const { container } = render(
        <Cascader
          options={[{ label: 'Docs', value: 'docs', isLeaf: false }]}
          loadData={loadData}
          placeholder="Choose path"
        />
      );

      fireEvent.click(screen.getByRole('button', { name: 'Choose path' }));
      fireEvent.click(screen.getByRole('option', { name: /Docs/ }));

      expect(loadData).toHaveBeenCalledWith([expect.objectContaining({ value: 'docs' })]);
      expect(screen.getByRole('option', { name: /Docs/ })).toHaveAttribute('aria-busy', 'true');
      expect(container.querySelector('.cinna-cascader__loading')).toBeInTheDocument();
      expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(1);

      await act(async () => {
        vi.advanceTimersByTime(500);
        await Promise.resolve();
      });

      expect(document.querySelectorAll('.cinna-cascader__menu')).toHaveLength(2);
      expect(screen.getByRole('option', { name: 'API' })).toBeInTheDocument();
      expect(container.querySelector('.cinna-cascader__loading')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('supports cascader search, multiple values, field names, and custom popup styles', () => {
    const onSearchChange = vi.fn();
    const onChange = vi.fn();
    const { container, rerender } = render(
      <Cascader
        showSearch={{ onSearch: onSearchChange, render: (_, path) => path.map((item) => item.label).join(' -> ') }}
        options={[
          {
            label: 'Docs',
            value: 'docs',
            children: [{ label: 'API', value: 'api' }],
          },
        ]}
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select path' }));
    fireEvent.change(screen.getByPlaceholderText('Search path'), { target: { value: 'api' } });
    expect(onSearchChange).toHaveBeenCalledWith('api');
    fireEvent.click(screen.getByRole('option', { name: 'Docs -> API' }));
    expect(onChange).toHaveBeenCalledWith(['docs', 'api'], expect.any(Array));

    rerender(
      <Cascader
        multiple
        open
        defaultValue={[['docs', 'api']]}
        maxTagCount={1}
        fieldNames={{ label: 'name', value: 'id', children: 'nodes' }}
        options={[
          {
            name: 'Docs',
            id: 'docs',
            nodes: [{ name: 'API', id: 'api' }],
          },
        ]}
        styles={{ popup: { borderColor: '#73c4e0' } }}
      />
    );

    expect(screen.getByText('Docs / API')).toHaveClass('cinna-cascader__tag');
    expect(container.querySelector('.cinna-cascader__popup')).toHaveStyle({ borderColor: '#73c4e0' });
    expect(screen.getByRole('option', { name: /Docs/ })).toBeInTheDocument();
  });

  it('allows breadcrumb links to be handled locally', () => {
    const onItemClick = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());
    window.location.hash = '#/breadcrumb';

    render(
      <Breadcrumb
        items={[
          { key: 'dashboard', title: 'Dashboard', href: '#dashboard' },
          { key: 'navigation', title: 'Navigation' },
        ]}
        onItemClick={onItemClick}
      />
    );

    fireEvent.click(screen.getByRole('link', { name: 'Dashboard' }));

    expect(onItemClick).toHaveBeenCalledWith(expect.any(Object), { key: 'dashboard', title: 'Dashboard', href: '#dashboard' }, 0);
    expect(window.location.hash).toBe('#/breadcrumb');
  });

  it('renders breadcrumb icons, menu levels, separators, and item styles', () => {
    const onMenuSelect = vi.fn();
    const { container } = render(
      <Breadcrumb
        separator=">"
        items={[
          { key: 'home', title: 'Home', icon: 'H', separator: ':', color: '#3d8eaa', fontWeight: 900 },
          {
            key: 'section',
            title: 'Section',
            color: '#8a6c5f',
            fontWeight: 700,
            menu: [
              { key: 'general', label: 'General' },
              { key: 'navigation', label: 'Navigation' },
            ],
          },
          { key: 'current', title: 'Current', fontStyle: 'italic' },
        ]}
        onMenuSelect={onMenuSelect}
      />
    );

    expect(container.querySelector('.cinna-breadcrumb__icon')).toHaveTextContent('H');
    expect(screen.getByText(':')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('Home').closest('.cinna-breadcrumb__item')).toHaveStyle({ color: '#3d8eaa', fontWeight: '900' });
    expect(screen.getByText('Section').closest('summary')).toHaveStyle({ color: '#8a6c5f', fontWeight: '700' });
    expect(screen.getByText('Current').closest('.cinna-breadcrumb__item')).toHaveStyle({ fontStyle: 'italic' });

    fireEvent.click(screen.getByRole('menuitem', { name: 'Navigation' }));
    expect(onMenuSelect).toHaveBeenCalledWith('navigation', expect.objectContaining({ key: 'section' }), 1);
  });

  it('changes pagination pages and page sizes', () => {
    const onChange = vi.fn();
    const onShowSizeChange = vi.fn();

    render(
      <Pagination
        total={120}
        defaultCurrent={2}
        defaultPageSize={10}
        pageSizeOptions={[10, 20, 40]}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onChange).toHaveBeenCalledWith(3, 10);

    expect(document.querySelector('select.cinna-pagination__size-changer')).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Page size'));
    expect(screen.getByRole('listbox', { name: 'Page size options' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('option', { name: '20 / page' }));
    expect(onShowSizeChange).toHaveBeenCalledWith(3, 20);
    expect(onChange).toHaveBeenLastCalledWith(3, 20);
    expect(screen.queryByRole('listbox', { name: 'Page size options' })).not.toBeInTheDocument();
  });

  it('supports pagination quick jump, hidden single-page state, and custom visuals', () => {
    const onChange = vi.fn();
    const { container, rerender } = render(
      <Pagination total={200} showQuickJumper={{ goButton: 'Go' }} showSizeChanger={false} onChange={onChange} />
    );

    fireEvent.change(screen.getByLabelText('Jump to page'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));

    expect(onChange).toHaveBeenCalledWith(7, 10);
    expect(screen.getByRole('button', { name: '7' })).toHaveClass('cinna-pagination__page--active');

    rerender(<Pagination total={8} hideOnSinglePage />);
    expect(container.firstChild).toBeNull();

    rerender(
      <Pagination
        total={30}
        showSizeChanger={false}
        prevIcon="Prev"
        nextIcon="Next"
        pageFontSize={16}
        pageFontWeight={800}
        pageColor="#6b584b"
        pageBorderColor="#efb8c8"
        pageBorderWidth={2}
        pageBorderStyle="dashed"
        pageRadius={12}
        activePageColor="#513323"
        activePageBackgroundColor="#ffe8a8"
        activePageBorderColor="#d8984f"
        activePageUnderlineColor="#fff3c2"
        activePageUnderlineWidth={24}
        activePageUnderlineHeight={4}
        activePageUnderlineRadius={8}
        activePageUnderlineBottom={6}
      />
    );

    expect(container.querySelector('.cinna-pagination')).toHaveStyle({
      '--cinna-pagination-font-size': '16px',
      '--cinna-pagination-font-weight': '800',
      '--cinna-pagination-color': '#6b584b',
      '--cinna-pagination-border-color': '#efb8c8',
      '--cinna-pagination-border-width': '2px',
      '--cinna-pagination-border-style': 'dashed',
      '--cinna-pagination-radius': '12px',
      '--cinna-pagination-active-color': '#513323',
      '--cinna-pagination-active-bg': '#ffe8a8',
      '--cinna-pagination-active-border': '#d8984f',
      '--cinna-pagination-active-underline-color': '#fff3c2',
      '--cinna-pagination-active-underline-width': '24px',
      '--cinna-pagination-active-underline-height': '4px',
      '--cinna-pagination-active-underline-radius': '8px',
      '--cinna-pagination-active-underline-bottom': '6px',
    });
    expect(screen.getByRole('button', { name: 'Previous page' })).toHaveTextContent('Prev');
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveTextContent('Next');

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Previous page' }), { clientX: 8, clientY: 8 });
    expect(container.querySelector('.cinna-button__ripple--inner')).toBeInTheDocument();

    rerender(<Pagination total={30} activePageUnderline={false} />);
    expect(container.querySelector('.cinna-pagination')).toHaveClass('cinna-pagination--no-active-underline');
  });

  it('supports clickable steps, automatic finish state, and status overrides', () => {
    const onChange = vi.fn();
    const ClickableStepsTest = () => {
      const [current, setCurrent] = useState(1);
      return (
        <Steps
          clickable
          current={current}
          onChange={(next, item, event) => {
            setCurrent(next);
            onChange(next, item, event);
          }}
          items={[
            { title: 'Upload' },
            { title: 'Build', description: 'Running checks' },
            { title: 'Verify', description: 'Token mismatch' },
          ]}
        />
      );
    };
    const { container } = render(<ClickableStepsTest />
    );

    expect(container.querySelectorAll('.cinna-step')[0]).toHaveClass('cinna-step--finish');
    expect(container.querySelectorAll('.cinna-step')[1]).toHaveClass('cinna-step--process', 'cinna-step--current');

    fireEvent.click(screen.getByRole('button', { name: /Verify/ }));
    expect(onChange).toHaveBeenCalledWith(2, expect.objectContaining({ title: 'Verify' }), expect.any(Object));
    expect(container.querySelectorAll('.cinna-step')[2]).toHaveClass('cinna-step--motion-current');
    expect(container.querySelectorAll('.cinna-step__connector')[1]).toHaveClass('cinna-step__connector--motion');
  });

  it('renders vertical, logo, underline, minimal, and custom connector steps', () => {
    const { container } = render(
      <>
        <Steps
          direction="vertical"
          labelPlacement="bottom"
          underline
          markerShape="rounded"
          connector="→"
          connectorCount={3}
          connectorColor="#df6677"
          markerFontSize={15}
          markerBackgroundColor="#ffe8a8"
          titleFontSize={18}
          titleColor="#46332a"
          items={[
            { title: 'Logo', logo: '☁' },
            { title: 'Review', subTitle: 'Owner', description: 'Check content' },
          ]}
        />
        <Steps
          type="minimal"
          defaultCurrent={1}
          items={[
            { title: 'Queued', description: 'Waiting' },
            { title: 'Running', description: 'One title with one description' },
            { title: 'Done' },
          ]}
        />
      </>
    );

    const root = container.querySelector('.cinna-steps');
    expect(root).toHaveClass('cinna-steps--vertical', 'cinna-steps--label-bottom', 'cinna-steps--marker-rounded', 'cinna-steps--underline');
    expect(root).toHaveStyle({
      '--cinna-steps-connector-color': '#df6677',
      '--cinna-steps-marker-font-size': '15px',
      '--cinna-steps-marker-bg': '#ffe8a8',
      '--cinna-steps-title-font-size': '18px',
      '--cinna-steps-title-color': '#46332a',
    });
    expect(container.querySelectorAll('.cinna-step__connector-token')).toHaveLength(3);
    expect(screen.getByText('☁')).toHaveClass('cinna-step__marker');
    expect(screen.getByText('Owner')).toHaveClass('cinna-step__subtitle');
    expect(container.querySelector('.cinna-steps--minimal')).toBeInTheDocument();
    expect(screen.getByText('One title with one description')).toHaveClass('cinna-step__description');
  });

  it('opens popup menus by click and closes after menu selection', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <Popup
        mode="menu"
        label="Actions"
        onSelect={onSelect}
        items={[
          { key: 'edit', label: 'Edit' },
          { type: 'divider' },
          { key: 'publish', label: 'Publish', disabled: true },
        ]}
      />
    );
    const root = container.querySelector('.cinna-popup--menu');

    expect(root).not.toHaveClass('cinna-popup--open');
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));

    expect(root).toHaveClass('cinna-popup--open');
    expect(screen.getByRole('separator')).toHaveClass('cinna-menu__divider');
    expect(screen.getByRole('menuitem', { name: 'Publish' })).toBeDisabled();

    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalledWith('edit');
    expect(root).not.toHaveClass('cinna-popup--open');
  });

  it('supports popup menu hover placement, arrows, and context menu coordinates', () => {
    const { container } = render(
      <>
        <Popup mode="menu" trigger="hover" placement="top" align="right" arrow label="Hover menu" items={[{ key: 'preview', label: 'Preview' }]} />
        <Popup mode="menu" trigger="contextMenu" label="Context menu" items={[{ key: 'rename', label: 'Rename' }]} />
      </>
    );
    const [hoverRoot, contextRoot] = Array.from(container.querySelectorAll('.cinna-popup--menu'));

    expect(hoverRoot).toHaveClass('cinna-popup--hover', 'cinna-popup--top', 'cinna-popup--align-right', 'cinna-popup--arrow');
    fireEvent.mouseEnter(hoverRoot);
    expect(hoverRoot).toHaveClass('cinna-popup--open');
    fireEvent.mouseLeave(hoverRoot);
    expect(hoverRoot).not.toHaveClass('cinna-popup--open');

    const contextEvent = createEvent.contextMenu(screen.getByRole('button', { name: 'Context menu' }), {
      clientX: 128,
      clientY: 240,
    });
    fireEvent(screen.getByRole('button', { name: 'Context menu' }), contextEvent);

    expect(contextEvent.defaultPrevented).toBe(true);
    expect(contextRoot).toHaveClass('cinna-popup--contextMenu', 'cinna-popup--open');
    expect(contextRoot.querySelector('.cinna-popup__panel')).toHaveStyle({
      '--cinna-popup-context-x': '128px',
      '--cinna-popup-context-y': '240px',
    });
  });

  it('supports rich menu selection, groups, and submenu open state', () => {
    const onSelect = vi.fn();
    const onDeselect = vi.fn();
    const onOpenChange = vi.fn();
    const { container } = render(
      <Menu
        mode="inline"
        multiple
        defaultSelectedKeys={['draft']}
        defaultOpenKeys={['content']}
        onSelect={onSelect}
        onDeselect={onDeselect}
        onOpenChange={onOpenChange}
        items={[
          {
            type: 'group',
            label: 'Workspace',
            children: [
              { key: 'draft', label: 'Draft', icon: 'D', extra: '3' },
              { type: 'divider', dashed: true },
              {
                key: 'content',
                label: 'Content',
                children: [
                  { key: 'article', label: 'Article' },
                  { key: 'release', label: 'Release', danger: true },
                ],
              },
            ],
          },
        ]}
      />
    );

    expect(container.querySelector('.cinna-menu')).toHaveClass('cinna-menu--inline');
    expect(screen.getByText('Workspace')).toHaveClass('cinna-menu__group-title');
    expect(screen.getByRole('separator')).toHaveClass('cinna-menu__divider--dashed');
    expect(screen.getByRole('menuitem', { name: /Draft/ })).toHaveClass('cinna-menu__item--active');
    expect(screen.getByRole('menuitem', { name: 'Release' })).toHaveClass('cinna-menu__item--danger');

    fireEvent.click(screen.getByRole('menuitem', { name: 'Article' }));
    expect(onSelect).toHaveBeenCalledWith('article', expect.objectContaining({ selectedKeys: ['draft', 'article'], keyPath: ['article', 'content'] }));

    fireEvent.click(screen.getByRole('menuitem', { name: /Draft/ }));
    expect(onDeselect).toHaveBeenCalledWith('draft', expect.objectContaining({ selectedKeys: ['article'] }));

    fireEvent.click(screen.getByRole('menuitem', { name: /Content/ }));
    expect(onOpenChange).toHaveBeenCalledWith([]);
  });

  it('supports collapsed inline menu tooltip and semantic styling hooks', () => {
    const { container } = render(
      <Menu
        mode="inline"
        inlineCollapsed
        defaultSelectedKey="mail"
        classNames={{ item: 'custom-menu-item' }}
        styles={{ root: { borderColor: '#123456' }, itemIcon: { color: '#df6677' } }}
        items={[
          { key: 'mail', icon: 'M', label: 'Mail', title: 'Mailbox' },
          { key: 'files', icon: 'F', label: 'Files' },
        ]}
      />
    );
    const root = container.querySelector('.cinna-menu');

    expect(root).toHaveClass('cinna-menu--collapsed');
    expect(root).toHaveStyle({ borderColor: '#123456' });
    expect(screen.getByRole('menuitem', { name: 'M' })).toHaveClass('custom-menu-item', 'cinna-menu__item--title-only');
    expect(container.querySelector('.cinna-menu__icon')).toHaveStyle({ color: '#df6677' });
    expect(container.querySelector('.cinna-popup--tooltip')).toBeInTheDocument();
  });

  it('renders a movable selected layer for horizontal menu', () => {
    const { container } = render(
      <Menu
        mode="horizontal"
        defaultSelectedKey="dashboard"
        items={[
          { key: 'dashboard', label: 'Dashboard' },
          { key: 'settings', label: 'Settings' },
        ]}
      />
    );

    expect(container.querySelector('.cinna-menu')).toHaveClass('cinna-menu--horizontal');
    expect(container.querySelector('.cinna-menu__active-pill')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Dashboard' })).toHaveClass('cinna-menu__item--active');
  });

  it('keeps the submenu popup shell when popupRender customizes menu content', () => {
    const { container } = render(
      <Menu
        triggerSubMenuAction="click"
        styles={{ popup: { minWidth: 220 }, subMenuList: { gap: 10 } }}
        popupRender={(node) => <div data-testid="menu-popup-render">{node}</div>}
        items={[
          {
            key: 'create',
            label: 'Create',
            children: [
              { key: 'doc', label: 'Document' },
              { key: 'board', label: 'Board' },
            ],
          },
        ]}
      />
    );

    fireEvent.click(screen.getByRole('menuitem', { name: /Create/ }));

    const subMenu = container.querySelector('.cinna-menu__submenu') as HTMLElement;
    const popup = Array.from(subMenu.children).find((child) => child.classList.contains('cinna-menu__submenu-popup')) as HTMLElement | undefined;
    const customContent = screen.getByTestId('menu-popup-render');
    const list = customContent.querySelector('.cinna-menu__submenu-list') as HTMLElement;

    expect(popup).toBeInTheDocument();
    expect(popup).toHaveClass('cinna-menu__submenu-popup--open');
    expect(popup).toHaveStyle({ minWidth: '220px' });
    expect(popup).toContainElement(customContent);
    expect(list).toHaveStyle({ gap: '10px' });
    expect(list).toContainElement(screen.getByRole('menuitem', { name: 'Document' }));
    expect(list).toContainElement(screen.getByRole('menuitem', { name: 'Board' }));
  });

  it('supports popup visual styles and customized confirm actions', () => {
    const onConfirm = vi.fn();
    const { container } = render(
      <Popup
        mode="confirm"
        trigger="click"
        title="Ship release?"
        description="The release will be visible to everyone."
        styles={{
          backgroundColor: '#123456',
          titleColor: '#fff7e6',
          titleFontSize: 18,
          contentColor: '#dcefff',
          contentFontSize: '13px',
        }}
        okButtonProps={{ theme: 'berry', children: 'Ship' }}
        cancelButtonProps={{ color: '#594335', backgroundColor: '#fff6df', children: 'Wait' }}
        onConfirm={onConfirm}
      >
        <button type="button">Open confirm</button>
      </Popup>
    );
    const root = container.querySelector('.cinna-popup');

    expect(root).toHaveStyle({
      '--cinna-popup-bg': '#123456',
      '--cinna-popup-title-color': '#fff7e6',
      '--cinna-popup-title-font-size': '18px',
      '--cinna-popup-content-color': '#dcefff',
      '--cinna-popup-content-font-size': '13px',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Open confirm' }));
    expect(root).toHaveClass('cinna-popup--open', 'cinna-popup--confirm');
    expect(screen.getByText('Ship release?')).toHaveClass('cinna-popup__title');

    fireEvent.click(screen.getByRole('button', { name: 'Ship' }));
    expect(onConfirm).toHaveBeenCalled();
    expect(root).not.toHaveClass('cinna-popup--open');
  });

  it('renders tooltip through popup mode and accepts popup styles', () => {
    const { container } = render(
      <Popup
        mode="tooltip"
        trigger="click"
        title="Helpful hint"
        styles={{ backgroundColor: '#fff8d8', contentColor: '#60452f', contentFontSize: 12 }}
      >
        <button type="button">Need help</button>
      </Popup>
    );
    const root = container.querySelector('.cinna-popup--tooltip');

    expect(root).toHaveClass('cinna-popup', 'cinna-popup--tooltip');
    expect(root).toHaveStyle({
      '--cinna-popup-bg': '#fff8d8',
      '--cinna-popup-content-color': '#60452f',
      '--cinna-popup-content-font-size': '12px',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Need help' }));

    expect(root).toHaveClass('cinna-popup--open');
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful hint');
  });

  it('scrolls anchor targets inside a local container', () => {
    const onChange = vi.fn();
    const { container } = render(
      <div>
        <div data-testid="scroll-pane">
          <section id="anchor-target">Target section</section>
        </div>
        <Anchor
          affix
          offsetTop={12}
          direction="horizontal"
          getContainer={() => screen.getByTestId('scroll-pane')}
          items={[{ key: 'target', href: '#anchor-target', title: 'Target' }]}
          onChange={onChange}
        />
      </div>
    );
    const scrollPane = screen.getByTestId('scroll-pane') as HTMLDivElement;
    const scrollTo = vi.fn();
    Object.defineProperty(scrollPane, 'scrollTo', { value: scrollTo, configurable: true });

    fireEvent.click(screen.getByRole('link', { name: 'Target' }));

    expect(container.querySelector('.cinna-anchor')).toHaveClass('cinna-anchor--horizontal');
    expect(container.querySelector('.cinna-anchor')).toHaveClass('cinna-anchor--affix');
    expect(container.querySelector('.cinna-anchor')).toHaveStyle({ top: '12px' });
    expect(scrollTo).toHaveBeenCalled();
    expect(screen.getByRole('link', { name: 'Target' })).toHaveClass('cinna-anchor__item--active');
    expect(onChange).toHaveBeenCalledWith('#anchor-target');
    expect(window.location.hash).not.toBe('#anchor-target');
  });

  it('supports custom anchor target points and item offsets', () => {
    const { container } = render(
      <div>
        <div data-testid="custom-scroll-pane">
          <section data-anchor-point="custom">Custom target section</section>
        </div>
        <Anchor
          targetOffset={8}
          getContainer={() => screen.getByTestId('custom-scroll-pane')}
          items={[{
            key: 'custom',
            href: '#custom-anchor-link',
            title: 'Custom target',
            anchorTarget: '[data-anchor-point="custom"]',
            targetOffset: 32,
          }]}
        />
      </div>
    );
    const scrollPane = screen.getByTestId('custom-scroll-pane') as HTMLDivElement;
    const scrollTo = vi.fn();
    Object.defineProperty(scrollPane, 'scrollTo', { value: scrollTo, configurable: true });

    fireEvent.click(screen.getByRole('link', { name: 'Custom target' }));

    expect(container.querySelector('.cinna-anchor__item--active')).toHaveTextContent('Custom target');
    expect(scrollTo).toHaveBeenCalledWith({ top: -32, behavior: 'smooth' });
    expect(window.location.hash).not.toBe('#custom-anchor-link');
  });

  it('supports themed divider color, character lines, and custom text placement', () => {
    const { container } = render(
      <>
        <Divider color="#ef8f8f" character="*" left="24%">Sweet break</Divider>
        <Divider right={40}>Right break</Divider>
      </>
    );

    const [leftDivider, rightDivider] = Array.from(container.querySelectorAll('.cinna-divider'));
    expect(leftDivider).toHaveClass('cinna-divider--left', 'cinna-divider--character', 'cinna-divider--custom-left');
    expect(leftDivider).toHaveStyle({ '--cinna-divider-color': '#ef8f8f', '--cinna-divider-left': '24%' });
    expect(leftDivider?.getAttribute('data-divider-character')).toContain('*');
    expect(screen.getByText('Sweet break')).toBeInTheDocument();
    expect(rightDivider).toHaveClass('cinna-divider--right', 'cinna-divider--custom-right');
    expect(rightDivider).toHaveStyle({ '--cinna-divider-right': '40px' });
  });

  it('renders the simplified grid and row gutter styles', () => {
    const { container } = render(
      <>
        <Grid columns={3} gap={[24, '12px']}>
          <div>One</div>
          <div>Two</div>
        </Grid>
        <Row gutter={[24, 16]} wrap={false}>
          <Col span={12} offset={6} order={2}>Half</Col>
        </Row>
      </>
    );

    const grid = container.querySelector('.cinna-grid');
    expect(grid).toHaveStyle({
      '--cinna-grid-template': 'repeat(3, minmax(0, 1fr))',
      '--cinna-grid-gap-x': '24px',
      '--cinna-grid-gap-y': '12px',
    });

    const row = container.querySelector('.cinna-row');
    expect(row).toHaveClass('cinna-row--nowrap');
    expect(row).toHaveStyle({
      '--cinna-row-gutter-x': '24px',
      rowGap: '16px',
    });

    const col = container.querySelector('.cinna-col');
    expect(col).toHaveStyle({
      flexBasis: '50%',
      maxWidth: '50%',
      marginLeft: '25%',
      order: '2',
    });
  });

  it('supports sticky layout regions and collapsible sider sizing', () => {
    const onCollapse = vi.fn();
    const { container } = render(
      <Layout hasSider>
        <LayoutSider width={188} collapsedWidth={76} collapsible defaultCollapsed sticky expandOnHover onCollapse={onCollapse}>
          Project navigation
        </LayoutSider>
        <Layout>
          <LayoutHeader sticky offsetTop={12} height={56}>Header</LayoutHeader>
          <LayoutContent>Content</LayoutContent>
          <LayoutFooter sticky offsetBottom={8} height={48}>Footer</LayoutFooter>
        </Layout>
      </Layout>
    );

    const layout = container.querySelector('.cinna-layout');
    const sider = container.querySelector('.cinna-layout__sider');
    const header = container.querySelector('.cinna-layout__header');
    const footer = container.querySelector('.cinna-layout__footer');

    expect(layout).toHaveClass('cinna-layout--has-sider');
    expect(sider).toHaveClass('cinna-layout__sider--sticky', 'cinna-layout__sider--collapsible', 'cinna-layout__sider--collapsed');
    expect(sider).toHaveStyle({
      '--cinna-layout-sider-width': '188px',
      '--cinna-layout-sider-collapsed-width': '76px',
    });
    expect(header).toHaveClass('cinna-layout__header--sticky');
    expect(header).toHaveStyle({ '--cinna-layout-header-top': '12px', '--cinna-layout-header-height': '56px' });
    expect(footer).toHaveClass('cinna-layout__footer--sticky');
    expect(footer).toHaveStyle({ '--cinna-layout-footer-bottom': '8px', '--cinna-layout-footer-height': '48px' });

    fireEvent.click(screen.getByRole('button', { name: 'Expand sider' }));
    expect(onCollapse).toHaveBeenCalledWith(false);
    expect(sider).not.toHaveClass('cinna-layout__sider--collapsed');
  });

  it('renders layout sider navigation through menu and syncs collapsed state', () => {
    const { container } = render(
      <Layout hasSider>
        <LayoutSider
          collapsible
          defaultCollapsed
          menu={[
            { key: 'dashboard', icon: 'D', label: 'Dashboard' },
            { key: 'settings', icon: 'S', label: 'Settings' },
          ]}
          menuProps={{ defaultSelectedKey: 'dashboard' }}
        />
        <LayoutContent>Content</LayoutContent>
      </Layout>
    );
    const sider = container.querySelector('.cinna-layout__sider');
    const menu = container.querySelector('.cinna-menu');

    expect(sider).toHaveClass('cinna-layout__sider--with-menu', 'cinna-layout__sider--collapsed');
    expect(menu).toHaveClass('cinna-menu--inline', 'cinna-menu--collapsed');
    expect(screen.getByRole('menuitem', { name: 'D' })).toHaveClass('cinna-menu__item--active');

    fireEvent.click(screen.getByRole('button', { name: 'Expand sider' }));
    expect(menu).not.toHaveClass('cinna-menu--collapsed');
  });

  it('resizes splitter panels by dragging the separator', () => {
    const onResizeEnd = vi.fn();
    const { container } = render(
      <Splitter onResizeEnd={onResizeEnd}>
        <Splitter.Panel defaultSize="40%" min={120}>Left</Splitter.Panel>
        <Splitter.Panel min={120}>Right</Splitter.Panel>
      </Splitter>
    );

    const panels = container.querySelectorAll('.cinna-splitter__panel');
    const dragger = screen.getByRole('separator', { name: 'Resize panels' });
    const initialSize = Number.parseFloat((panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'));

    fireEvent.pointerDown(dragger, { clientX: 260, pointerId: 1 });
    fireEvent.pointerMove(window, { clientX: 320 });
    fireEvent.pointerUp(window);

    const resizedSize = Number.parseFloat((panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'));
    expect(resizedSize).toBeGreaterThan(initialSize);
    expect(onResizeEnd).toHaveBeenCalled();
    expect(container.querySelector('input[type="range"]')).not.toBeInTheDocument();
  });

  it('supports splitter disabled drag, lazy resize, custom divider, and double click reset', () => {
    const onResize = vi.fn();
    const onDoubleClick = vi.fn();
    const { container, rerender } = render(
      <Splitter lazy divider={{ color: '#73c4e0', dashed: false, thickness: 3 }} onResize={onResize} onDraggerDoubleClick={onDoubleClick}>
        <Splitter.Panel defaultSize="50%" min={120}>First</Splitter.Panel>
        <Splitter.Panel min={120}>Second</Splitter.Panel>
      </Splitter>
    );

    const panels = container.querySelectorAll('.cinna-splitter__panel');
    const dragger = screen.getByRole('separator', { name: 'Resize panels' });
    const initialSize = Number.parseFloat((panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'));

    expect(dragger).not.toHaveClass('cinna-splitter__dragger--dashed');
    expect(dragger.querySelector('span')).not.toHaveAttribute('data-divider-character');

    fireEvent.pointerDown(dragger, { clientX: 260, pointerId: 1 });
    fireEvent.pointerMove(window, { clientX: 330 });
    const lazySize = Number.parseFloat((panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'));
    const preview = container.querySelector('.cinna-splitter__preview') as HTMLElement;

    expect(lazySize).toBeCloseTo(initialSize);
    expect(preview).toBeInTheDocument();
    expect(Number.parseFloat(preview.style.getPropertyValue('--cinna-splitter-preview-position'))).toBeGreaterThan(initialSize);
    expect(onResize).not.toHaveBeenCalled();
    fireEvent.pointerUp(window);
    expect(onResize).toHaveBeenCalled();
    expect(container.querySelector('.cinna-splitter__preview')).not.toBeInTheDocument();

    const resizedSize = Number.parseFloat((panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'));
    expect(resizedSize).toBeGreaterThan(initialSize);

    fireEvent.doubleClick(dragger);
    expect(onDoubleClick).toHaveBeenCalledWith(0);
    expect(Number.parseFloat((panels[0] as HTMLElement).style.getPropertyValue('--cinna-splitter-panel-size'))).toBeCloseTo(initialSize);

    rerender(
      <Splitter disabled>
        <Splitter.Panel defaultSize="50%">First</Splitter.Panel>
        <Splitter.Panel>Second</Splitter.Panel>
      </Splitter>
    );

    const disabledDragger = screen.getByRole('separator', { name: 'Resize panels' });
    expect(disabledDragger).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders typography disabled text and links', () => {
    render(
      <>
        <Text disabled>Unavailable copy</Text>
        <Text link href="#docs">Docs link</Text>
      </>
    );

    expect(screen.getByText('Unavailable copy').closest('.cinna-text')).toHaveClass('cinna-text--disabled');
    expect(screen.getByText('Unavailable copy').closest('.cinna-text')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('link', { name: 'Docs link' })).toHaveAttribute('href', '#docs');
    expect(screen.getByRole('link', { name: 'Docs link' })).toHaveClass('cinna-text--link');
  });

  it('expands typography ellipsis content', () => {
    const { container } = render(
      <Paragraph ellipsis={{ rows: 2, expandable: true, moreText: 'More', lessText: 'Less' }}>
        Long typography content that can be expanded when readers need more detail.
      </Paragraph>
    );

    const content = container.querySelector('.cinna-typography__content');
    expect(content).toHaveClass('cinna-typography__content--ellipsis');

    fireEvent.click(screen.getByRole('button', { name: 'More' }));

    expect(screen.getByRole('button', { name: 'Less' })).toBeInTheDocument();
    expect(content).not.toHaveClass('cinna-typography__content--ellipsis');
  });

  it('copies typography content with themed action feedback', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<Text copyable={{ text: 'copy me', copyText: 'Copy', copiedText: 'Done' }}>Shown text</Text>);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('copy me'));
    expect(screen.getByRole('button', { name: 'Done' })).toHaveClass('cinna-typography__copy');
  });

  it('switch toggles when clicked', () => {
    render(<Switch aria-label="soft switch" />);
    const control = screen.getByRole('switch', { name: 'soft switch' });
    fireEvent.click(control);
    expect(control).toHaveAttribute('aria-checked', 'true');
  });

  it('renders float button ripple effects when clicked', () => {
    const { container } = render(
      <FloatButton
        icon="+"
        rippleEffects={['outer', 'inner', 'particles']}
        rippleParticleColors={['#ef8f8f', '#54b6cd']}
        rippleParticleOpacity={0.64}
      />
    );
    const button = screen.getByRole('button', { name: '+' });
    button.getBoundingClientRect = () => ({
      x: 0,
      y: 0,
      width: 56,
      height: 56,
      top: 0,
      right: 56,
      bottom: 56,
      left: 0,
      toJSON: () => ({}),
    });

    fireEvent.click(button, { clientX: 28, clientY: 28 });

    expect(container.querySelector('.cinna-button__ripple--outer')).toBeInTheDocument();
    expect(container.querySelector('.cinna-button__ripple--inner')).toBeInTheDocument();
    expect(container.querySelectorAll('.cinna-button__ripple-particle').length).toBeGreaterThan(0);
    expect(button).toHaveStyle({ '--button-particle-opacity': '0.64' });
  });

  it('does not render float button ripple effects when disabled', () => {
    const { container } = render(<FloatButton icon="x" disabled rippleEffects={['outer', 'inner', 'particles']} />);
    fireEvent.click(screen.getByRole('button', { name: 'x' }));

    expect(container.querySelector('.cinna-button__ripple')).not.toBeInTheDocument();
    expect(container.querySelector('.cinna-button__ripple-particle')).not.toBeInTheDocument();
  });

  it('supports float button theme presets', () => {
    render(
      <FloatButton icon="T" shape="square" theme="mint" color="#111111" backgroundColor="#222222" />
    );

    expect(screen.getByRole('button', { name: 'T' })).toHaveStyle({
      '--button-color': '#263a30',
      '--button-bg': '#9bcb8e',
      '--button-border': 'rgba(74, 130, 79, 0.24)',
      '--button-shadow': '0 5px 0 #72b866',
    });
  });

  it('opens float button groups with click trigger', () => {
    const { container } = render(
      <FloatButtonGroup
        trigger="click"
        items={[
          { key: 'edit', icon: 'E', tooltip: 'Edit' },
          { key: 'share', icon: 'S', tooltip: 'Share' },
        ]}
      />
    );

    expect(container.querySelector('.cinna-float-button-group')).not.toHaveClass('cinna-float-button-group--open');
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(container.querySelector('.cinna-float-button-group')).toHaveClass('cinna-float-button-group--open');
  });

  it('scrolls target to top from the back top float button', () => {
    const target = document.createElement('div');
    target.scrollTop = 160;

    render(<FloatButtonBackTop target={() => target} visibilityHeight={10} duration={0} />);
    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }));

    expect(target.scrollTop).toBe(0);
  });

  it('inserts mention options into the textarea', () => {
    render(<Mentions options={['cloud']} defaultValue="Invite" />);
    expect(screen.queryByRole('button', { name: '@cloud' })).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('button', { name: '@cloud' })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('button', { name: '@cloud' })).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.click(screen.getByRole('button', { name: '@cloud' }));
    expect(screen.getByRole('textbox')).toHaveValue('Invite @cloud ');
    expect(screen.queryByRole('button', { name: '@cloud' })).not.toBeInTheDocument();
  });

  it('keeps autocomplete suggestions closed until user interaction', () => {
    const onSelect = vi.fn();
    render(<AutoComplete options={['docs', 'design', 'tokens']} defaultValue="do" onSelect={onSelect} />);

    expect(screen.queryByRole('option', { name: 'docs' })).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'docs' })).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('option', { name: 'docs' })).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'docs' }));

    expect(onSelect).toHaveBeenCalledWith('docs', expect.objectContaining({ value: 'docs' }));
    expect(screen.getByRole('combobox')).toHaveValue('docs');
    expect(screen.queryByRole('option', { name: 'docs' })).not.toBeInTheDocument();
  });

  it('supports autocomplete filtering, clear, keyboard backfill, and empty content', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    const { rerender } = render(
      <AutoComplete
        allowClear
        backfill
        defaultValue="d"
        options={['docs', 'design', 'tokens']}
        onChange={onChange}
        onClear={onClear}
      />
    );
    const input = screen.getByRole('combobox');

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('design');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenLastCalledWith('design');
    expect(screen.queryByRole('option', { name: 'design' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear input' }));
    expect(onClear).toHaveBeenCalled();
    expect(input).toHaveValue('');

    rerender(<AutoComplete open options={[]} notFoundContent="No matching resource" />);
    expect(screen.getByText('No matching resource')).toHaveClass('cinna-auto-complete__empty');
  });

  it('supports autocomplete custom filtering and semantic styles', () => {
    const { container } = render(
      <AutoComplete
        defaultValue="zz"
        open
        filterOption={false}
        popupMatchInputWidth={320}
        options={[{ label: 'Docs', value: 'docs', description: 'Guide' }]}
        classNames={{ option: 'custom-option' }}
        styles={{ popup: { borderColor: '#73c4e0' }, option: { color: '#46332a' } }}
      />
    );

    const popup = container.querySelector('.cinna-auto-complete__popup') as HTMLElement;
    const option = screen.getByRole('option', { name: /Docs/ });

    expect(option).toHaveClass('custom-option');
    expect(option).toHaveStyle({ color: '#46332a' });
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(popup).toHaveStyle({ width: '320px', borderColor: '#73c4e0' });
  });

  it('supports uncontrolled tree selection', () => {
    render(<Tree selectable treeData={[{ key: 'root', title: 'Root', children: [{ key: 'leaf', title: 'Leaf' }] }]} />);
    const leaf = screen.getByRole('button', { name: 'Leaf' });
    fireEvent.click(leaf);
    expect(leaf).toHaveClass('cinna-tree__node--selected');
  });

  it('autoplays carousel slides', () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel autoplay autoplaySpeed={1000} items={['One', 'Two']} />);
    const track = container.querySelector('.cinna-carousel__track');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(track).toHaveStyle({ transform: 'translateX(-100%)' });
    vi.useRealTimers();
  });

  it('renders overlays and tabs', () => {
    const { container } = render(
      <>
        <Alert message="Saved" />
        <Modal open title="Recipe">
          Modal content
        </Modal>
        <Tabs items={[{ key: 'one', label: 'One', children: 'Panel one' }]} />
      </>
    );

    expect(screen.getByRole('dialog')).toHaveTextContent('Modal content');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
    expect(container.querySelector('.cinna-tabs__active-pill')).toBeInTheDocument();
  });

  it('keeps bordered tab panels stable without switch fade motion', () => {
    const { container } = render(
      <>
        <Tabs
          items={[
            { key: 'overview', label: 'Overview', children: 'Overview panel' },
            { key: 'activity', label: 'Activity', children: 'Activity panel' },
          ]}
        />
        <Tabs
          variant="bordered"
          items={[
            { key: 'tab-1', label: 'Tab 1', children: 'Tab 1 panel' },
            { key: 'tab-2', label: 'Tab 2', children: 'Tab 2 panel' },
          ]}
        />
      </>
    );

    const [borderlessPanel, borderedPanel] = Array.from(container.querySelectorAll('.cinna-tabs__panel'));
    expect(borderlessPanel.className).toContain('cinna-tabs__panel--motion-');
    expect(borderedPanel.className).not.toContain('cinna-tabs__panel--motion-');

    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(borderedPanel.className).not.toContain('cinna-tabs__panel--motion-');
  });

  it('supports rich tabs with icons, editing, dragging, and style variables', () => {
    const onChange = vi.fn();
    const onAdd = vi.fn();
    const onClose = vi.fn();
    const onOrderChange = vi.fn();
    const { container } = render(
      <Tabs
        variant="bordered"
        tabPosition="left"
        size="large"
        draggable
        addable
        closable
        defaultActiveKey="activity"
        onChange={onChange}
        onAdd={onAdd}
        onClose={onClose}
        onOrderChange={onOrderChange}
        tabFontSize={16}
        tabFontWeight={800}
        tabColor="#6b584b"
        activeTabColor="#3d8eaa"
        activeTabBackgroundColor="#ffffff"
        tabBorderColor="#ead8c0"
        activeTabBorderColor="#8bd4eb"
        tabRadius={12}
        panelColor="#513323"
        panelBackgroundColor="#fffcf6"
        panelBorderColor="#ead8c0"
        items={[
          { key: 'overview', icon: 'O', label: 'Overview', children: 'Overview panel' },
          { key: 'activity', icon: 'A', label: 'Activity', children: 'Activity panel' },
          { key: 'settings', icon: 'S', label: 'Settings', children: 'Settings panel', disabled: true },
        ]}
      />
    );
    const root = container.querySelector('.cinna-tabs');

    expect(root).toHaveClass('cinna-tabs--bordered', 'cinna-tabs--left', 'cinna-tabs--large', 'cinna-tabs--draggable');
    expect(root).toHaveStyle({
      '--cinna-tabs-tab-font-size': '16px',
      '--cinna-tabs-tab-font-weight': '800',
      '--cinna-tabs-tab-color': '#6b584b',
      '--cinna-tabs-active-color': '#3d8eaa',
      '--cinna-tabs-active-bg': '#ffffff',
      '--cinna-tabs-tab-border': '#ead8c0',
      '--cinna-tabs-active-border': '#8bd4eb',
      '--cinna-tabs-tab-radius': '12px',
      '--cinna-tabs-panel-color': '#513323',
      '--cinna-tabs-panel-bg': '#fffcf6',
      '--cinna-tabs-panel-border': '#ead8c0',
    });
    expect(screen.getByRole('tab', { name: /Activity/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('A')).toHaveClass('cinna-tabs__icon');

    fireEvent.click(screen.getByRole('tab', { name: /Overview/ }));
    expect(onChange).toHaveBeenCalledWith('overview');

    fireEvent.click(screen.getByRole('button', { name: 'Add tab' }));
    expect(onAdd).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Close Overview' }));
    expect(onClose).toHaveBeenCalledWith('overview', expect.objectContaining({ key: 'overview' }), expect.any(Object));

    fireEvent.dragStart(screen.getByRole('tab', { name: /Overview/ }), {
      dataTransfer: { effectAllowed: '', setData: vi.fn() },
    });
    fireEvent.dragOver(screen.getByRole('tab', { name: /Activity/ }), {
      dataTransfer: { dropEffect: '' },
    });
    fireEvent.drop(screen.getByRole('tab', { name: /Activity/ }), {
      dataTransfer: { dropEffect: '' },
    });
    expect(onOrderChange).toHaveBeenCalledWith(
      ['activity', 'overview', 'settings'],
      expect.arrayContaining([expect.objectContaining({ key: 'overview' })]),
      { fromKey: 'overview', toKey: 'activity' }
    );
  });
});
