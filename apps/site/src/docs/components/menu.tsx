import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const workspaceItems = [
  { key: 'dashboard', icon: 'D', label: 'Dashboard' },
  {
    key: 'content',
    icon: 'C',
    label: 'Content',
    children: [
      { key: 'drafts', label: 'Drafts', extra: '8' },
      { key: 'reviews', label: 'Reviews' },
      { key: 'archive', label: 'Archive' },
    ],
  },
  {
    key: 'settings',
    icon: 'S',
    label: 'Settings',
    children: [
      { key: 'profile', label: 'Profile' },
      { key: 'billing', label: 'Billing' },
    ],
  },
];

export const menuDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'menu-horizontal',
      zh: {
        title: '顶部导航',
        description: 'mode="horizontal" 适合全局导航，菜单项可以带 icon、子菜单和选中态。',
        codeToggle: '查看顶部导航代码',
      },
      en: {
        title: 'Horizontal navigation',
        description: 'Use mode="horizontal" for global navigation with icons, submenus, and selection.',
        codeToggle: 'View horizontal navigation code',
      },
      code: `import { Menu } from '@cinna-design/react';

export default () => (
  <Menu
    mode="horizontal"
    defaultSelectedKey="components"
    items={[
      { key: 'home', label: 'Home' },
      {
        key: 'components',
        label: 'Components',
        children: [
          { key: 'general', label: 'General' },
          { key: 'navigation', label: 'Navigation' },
        ],
      },
      { key: 'tokens', label: 'Tokens' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Menu
          mode="horizontal"
          defaultSelectedKey="components"
          items={[
            { key: 'home', label: 'Home' },
            {
              key: 'components',
              label: 'Components',
              children: [
                { key: 'general', label: 'General' },
                { key: 'navigation', label: 'Navigation' },
              ],
            },
            { key: 'tokens', label: 'Tokens' },
          ]}
        />
      ),
    },
    {
      id: 'menu-inline',
      zh: {
        title: '内嵌菜单',
        description: 'mode="inline" 用于侧边导航，openKeys 可控制哪些子菜单展开。',
        codeToggle: '查看内嵌菜单代码',
      },
      en: {
        title: 'Inline menu',
        description: 'Use mode="inline" for side navigation and control expanded submenus with openKeys.',
        codeToggle: 'View inline menu code',
      },
      code: `import { Menu } from '@cinna-design/react';

export default () => (
  <Menu
    mode="inline"
    defaultSelectedKey="drafts"
    defaultOpenKeys={['content']}
    items={[
      { key: 'dashboard', icon: 'D', label: 'Dashboard' },
      {
        key: 'content',
        icon: 'C',
        label: 'Content',
        children: [
          { key: 'drafts', label: 'Drafts', extra: '8' },
          { key: 'reviews', label: 'Reviews' },
          { key: 'archive', label: 'Archive' },
        ],
      },
    ]}
  />
);`,
      render: () => (
        <Cinna.Menu
          mode="inline"
          defaultSelectedKey="drafts"
          defaultOpenKeys={['content']}
          items={workspaceItems}
        />
      ),
    },
    {
      id: 'menu-accordion-open',
      zh: {
        title: '只展开当前父级',
        description: '受控 openKeys 可以让同一时间只保留一个父级菜单展开。',
        codeToggle: '查看只展开当前父级代码',
      },
      en: {
        title: 'One parent at a time',
        description: 'Control openKeys to keep only one parent submenu expanded at a time.',
        codeToggle: 'View controlled open keys code',
      },
      code: `import { Menu } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [openKeys, setOpenKeys] = useState(['content']);
  const items = [
    { key: 'dashboard', icon: 'D', label: 'Dashboard' },
    {
      key: 'content',
      icon: 'C',
      label: 'Content',
      children: [
        { key: 'drafts', label: 'Drafts' },
        { key: 'reviews', label: 'Reviews' },
      ],
    },
    {
      key: 'settings',
      icon: 'S',
      label: 'Settings',
      children: [
        { key: 'profile', label: 'Profile' },
        { key: 'billing', label: 'Billing' },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys.slice(-1))}
      defaultSelectedKey="reviews"
      items={items}
    />
  );
};`,
      render: () => {
        const ControlledOpenDemo = () => {
          const [openKeys, setOpenKeys] = React.useState(['content']);

          return (
            <Cinna.Menu
              mode="inline"
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys.slice(-1))}
              defaultSelectedKey="reviews"
              items={workspaceItems}
            />
          );
        };

        return <ControlledOpenDemo />;
      },
    },
    {
      id: 'menu-collapsed',
      zh: {
        title: '收起内嵌菜单',
        description: 'inlineCollapsed 会只保留图标，并在悬浮时展示菜单项提示。',
        codeToggle: '查看收起菜单代码',
      },
      en: {
        title: 'Collapsed inline menu',
        description: 'inlineCollapsed keeps icons visible and shows item hints on hover.',
        codeToggle: 'View collapsed inline menu code',
      },
      code: `import { Button, Menu, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Space direction="vertical" align="flex-start">
      <Button size="small" onClick={() => setCollapsed(!collapsed)}>
        Toggle
      </Button>
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        defaultSelectedKey="dashboard"
        items={[
          { key: 'dashboard', icon: 'D', label: 'Dashboard', title: 'Dashboard' },
          { key: 'content', icon: 'C', label: 'Content', title: 'Content' },
          { key: 'settings', icon: 'S', label: 'Settings', title: 'Settings' },
        ]}
      />
    </Space>
  );
};`,
      render: () => {
        const CollapsedMenuDemo = () => {
          const [collapsed, setCollapsed] = React.useState(false);

          return (
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.Button size="small" onClick={() => setCollapsed(!collapsed)}>Toggle</Cinna.Button>
              <Cinna.Menu
                mode="inline"
                inlineCollapsed={collapsed}
                defaultSelectedKey="dashboard"
                items={[
                  { key: 'dashboard', icon: 'D', label: 'Dashboard', title: 'Dashboard' },
                  { key: 'content', icon: 'C', label: 'Content', title: 'Content' },
                  { key: 'settings', icon: 'S', label: 'Settings', title: 'Settings' },
                ]}
              />
            </Cinna.Space>
          );
        };

        return <CollapsedMenuDemo />;
      },
    },
    {
      id: 'menu-popup-submenu',
      zh: {
        title: '弹出子菜单',
        description: '垂直和顶部菜单的子级默认以浮层形式出现，triggerSubMenuAction 可切换悬浮或点击展开。',
        codeToggle: '查看弹出子菜单代码',
      },
      en: {
        title: 'Popup submenu',
        description: 'Submenus in vertical and horizontal menus open as floating panels; triggerSubMenuAction switches hover or click.',
        codeToggle: 'View popup submenu code',
      },
      code: `import { Menu } from '@cinna-design/react';

export default () => (
  <Menu
    triggerSubMenuAction="click"
    items={[
      {
        key: 'workspace',
        icon: 'W',
        label: 'Workspace',
        popupOffset: [8, 0],
        children: [
          { key: 'overview', label: 'Overview' },
          { key: 'activity', label: 'Activity' },
        ],
      },
    ]}
  />
);`,
      render: () => (
        <Cinna.Menu
          triggerSubMenuAction="click"
          items={[
            {
              key: 'workspace',
              icon: 'W',
              label: 'Workspace',
              popupOffset: [8, 0],
              children: [
                { key: 'overview', label: 'Overview' },
                { key: 'activity', label: 'Activity' },
              ],
            },
          ]}
        />
      ),
    },
    {
      id: 'menu-multiple',
      zh: {
        title: '多选菜单',
        description: 'multiple 允许同时选中多个菜单项，并在取消选中时触发 onDeselect。',
        codeToggle: '查看多选菜单代码',
      },
      en: {
        title: 'Multiple selection',
        description: 'Use multiple to keep several items selected and receive onDeselect when an item is removed.',
        codeToggle: 'View multiple selection code',
      },
      code: `import { Menu, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [keys, setKeys] = useState(['email']);

  return (
    <Space direction="vertical" align="flex-start">
      <Menu
        multiple
        selectedKeys={keys}
        onSelect={(_, info) => setKeys(info.selectedKeys)}
        onDeselect={(_, info) => setKeys(info.selectedKeys)}
        items={[
          { key: 'email', label: 'Email' },
          { key: 'sms', label: 'SMS' },
          { key: 'push', label: 'Push' },
        ]}
      />
      <Text tone="secondary">{keys.join(', ')}</Text>
    </Space>
  );
};`,
      render: () => {
        const MultipleMenuDemo = () => {
          const [keys, setKeys] = React.useState(['email']);

          return (
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.Menu
                multiple
                selectedKeys={keys}
                onSelect={(_, info) => setKeys(info.selectedKeys)}
                onDeselect={(_, info) => setKeys(info.selectedKeys)}
                items={[
                  { key: 'email', label: 'Email' },
                  { key: 'sms', label: 'SMS' },
                  { key: 'push', label: 'Push' },
                ]}
              />
              <Cinna.Text tone="secondary">{keys.join(', ')}</Cinna.Text>
            </Cinna.Space>
          );
        };

        return <MultipleMenuDemo />;
      },
    },
    {
      id: 'menu-item-types',
      zh: {
        title: '分组、分割线和状态',
        description: '菜单项支持 group、divider、disabled、danger 和 extra，用于组织复杂操作。',
        codeToggle: '查看菜单项状态代码',
      },
      en: {
        title: 'Groups, dividers, and states',
        description: 'Items support group, divider, disabled, danger, and extra for organizing complex actions.',
        codeToggle: 'View item states code',
      },
      code: `import { Menu } from '@cinna-design/react';

export default () => (
  <Menu
    defaultSelectedKey="profile"
    items={[
      {
        type: 'group',
        label: 'Account',
        children: [
          { key: 'profile', label: 'Profile', extra: 'new' },
          { key: 'security', label: 'Security' },
        ],
      },
      { type: 'divider', dashed: true },
      { key: 'billing', label: 'Billing', disabled: true },
      { key: 'delete', label: 'Delete workspace', danger: true },
    ]}
  />
);`,
      render: () => (
        <Cinna.Menu
          defaultSelectedKey="profile"
          items={[
            {
              type: 'group',
              label: 'Account',
              children: [
                { key: 'profile', label: 'Profile', extra: 'new' },
                { key: 'security', label: 'Security' },
              ],
            },
            { type: 'divider', dashed: true },
            { key: 'billing', label: 'Billing', disabled: true },
            { key: 'delete', label: 'Delete workspace', danger: true },
          ]}
        />
      ),
    },
    {
      id: 'menu-theme',
      zh: {
        title: '主题和子菜单主题',
        description: 'theme 可以切换整体明暗风格，子菜单也可以单独指定 theme。',
        codeToggle: '查看主题代码',
      },
      en: {
        title: 'Theme and submenu theme',
        description: 'Use theme to switch the whole menu tone, and set theme on a submenu independently.',
        codeToggle: 'View theme code',
      },
      code: `import { Menu } from '@cinna-design/react';

export default () => (
  <Menu
    theme="dark"
    defaultSelectedKey="books"
    items={[
      {
        key: 'library',
        label: 'Library',
        theme: 'light',
        children: [
          { key: 'books', label: 'Books' },
          { key: 'notes', label: 'Notes' },
        ],
      },
      { key: 'settings', label: 'Settings' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Menu
          theme="dark"
          defaultSelectedKey="books"
          items={[
            {
              key: 'library',
              label: 'Library',
              theme: 'light',
              children: [
                { key: 'books', label: 'Books' },
                { key: 'notes', label: 'Notes' },
              ],
            },
            { key: 'settings', label: 'Settings' },
          ]}
        />
      ),
    },
    {
      id: 'menu-switch-mode',
      zh: {
        title: '切换菜单类型',
        description: 'mode 可以在 horizontal、vertical 和 inline 之间切换。',
        codeToggle: '查看切换菜单类型代码',
      },
      en: {
        title: 'Switch menu mode',
        description: 'Switch mode between horizontal, vertical, and inline.',
        codeToggle: 'View switch mode code',
      },
      code: `import { Menu, Segmented, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [mode, setMode] = useState('inline');
  const items = [
    { key: 'dashboard', icon: 'D', label: 'Dashboard' },
    {
      key: 'content',
      icon: 'C',
      label: 'Content',
      children: [
        { key: 'drafts', label: 'Drafts' },
        { key: 'reviews', label: 'Reviews' },
      ],
    },
    { key: 'settings', icon: 'S', label: 'Settings' },
  ];

  return (
    <Space direction="vertical" align="flex-start">
      <Segmented
        value={mode}
        onChange={(value) => setMode(value)}
        options={[
          { label: 'Inline', value: 'inline' },
          { label: 'Vertical', value: 'vertical' },
          { label: 'Horizontal', value: 'horizontal' },
        ]}
      />
      <Menu mode={mode} defaultSelectedKey="dashboard" items={items} />
    </Space>
  );
};`,
      render: () => {
        const SwitchMenuModeDemo = () => {
          const [mode, setMode] = React.useState<'inline' | 'vertical' | 'horizontal'>('inline');

          return (
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.Segmented
                value={mode}
                onChange={(value) => setMode(value as 'inline' | 'vertical' | 'horizontal')}
                options={[
                  { label: 'Inline', value: 'inline' },
                  { label: 'Vertical', value: 'vertical' },
                  { label: 'Horizontal', value: 'horizontal' },
                ]}
              />
              <Cinna.Menu mode={mode} defaultSelectedKey="dashboard" items={workspaceItems} />
            </Cinna.Space>
          );
        };

        return <SwitchMenuModeDemo />;
      },
    },
    {
      id: 'menu-custom-structure',
      zh: {
        title: '自定义语义样式和弹出层',
        description: 'classNames、styles 和 popupRender 可以精确控制菜单内部结构与子菜单浮层。',
        codeToggle: '查看自定义语义结构代码',
      },
      en: {
        title: 'Custom semantic styles and popup',
        description: 'Use classNames, styles, and popupRender to tune semantic nodes and submenu panels.',
        codeToggle: 'View custom semantic styles code',
      },
      code: `import { Menu } from '@cinna-design/react';

export default () => (
  <Menu
    triggerSubMenuAction="click"
    classNames={{ item: 'workspace-menu-item' }}
    styles={{
      root: { borderColor: '#9bd4e8' },
      itemIcon: { color: '#3d8eaa' },
      popup: { minWidth: 220 },
    }}
    popupRender={(node) => (
      <div style={{ padding: 4, borderRadius: 14, background: '#effaff' }}>
        {node}
      </div>
    )}
    items={[
      {
        key: 'create',
        icon: '+',
        label: 'Create',
        children: [
          { key: 'doc', label: 'Document' },
          { key: 'board', label: 'Board' },
        ],
      },
    ]}
  />
);`,
      render: () => (
        <Cinna.Menu
          triggerSubMenuAction="click"
          classNames={{ item: 'workspace-menu-item' }}
          styles={{
            root: { borderColor: '#9bd4e8' },
            itemIcon: { color: '#3d8eaa' },
            popup: { minWidth: 220 },
          }}
          popupRender={(node) => (
            <div style={{ padding: 4, borderRadius: 14, background: '#effaff' }}>
              {node}
            </div>
          )}
          items={[
            {
              key: 'create',
              icon: '+',
              label: 'Create',
              children: [
                { key: 'doc', label: 'Document' },
                { key: 'board', label: 'Board' },
              ],
            },
          ]}
        />
      ),
    },
  ],
};
