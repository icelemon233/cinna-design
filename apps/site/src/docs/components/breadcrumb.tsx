import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const breadcrumbPages = {
  dashboard: {
    title: 'Dashboard',
    description: 'Overview of recent design system activity.',
  },
  system: {
    title: 'Design system',
    description: 'Components, tokens, and usage guidance.',
  },
  navigation: {
    title: 'Navigation',
    description: 'Breadcrumb keeps the current location readable.',
  },
};

const breadcrumbPreviewStyle: React.CSSProperties = {
  display: 'grid',
  gap: 14,
  maxWidth: 520,
};

const breadcrumbPanelStyle: React.CSSProperties = {
  padding: 22,
  border: '1.5px solid rgba(230, 214, 196, .86)',
  borderRadius: 24,
  background: 'rgba(255, 252, 246, .76)',
};

const LinkedBreadcrumbExample = () => {
  const [active, setActive] = React.useState<keyof typeof breadcrumbPages>('navigation');
  const page = breadcrumbPages[active];

  return (
    <div style={breadcrumbPreviewStyle}>
      <Cinna.Breadcrumb
        items={[
          { key: 'dashboard', title: 'Dashboard', href: '#dashboard' },
          { key: 'system', title: 'Design system', href: '#system' },
          { key: 'navigation', title: 'Navigation' },
        ]}
        onItemClick={(event, item) => {
          event.preventDefault();
          if (item.key === 'dashboard' || item.key === 'system') setActive(item.key);
        }}
      />
      <div style={breadcrumbPanelStyle}>
        <Cinna.Title level={5}>{page.title}</Cinna.Title>
        <Cinna.Text tone="secondary">{page.description}</Cinna.Text>
      </div>
    </div>
  );
};

const CardBreadcrumbExample = () => {
  const [active, setActive] = React.useState('Products');

  return (
    <Cinna.Card>
      <Cinna.Space direction="vertical" align="flex-start">
        <Cinna.Breadcrumb
          items={[
            { key: 'products', title: 'Products', href: '#products' },
            { key: 'cloud-cake', title: 'Cloud cake' },
          ]}
          onItemClick={(event, item) => {
            event.preventDefault();
            setActive(String(item.title));
          }}
        />
        <Cinna.Title level={4}>{active === 'Products' ? 'Product catalog' : 'Cloud cake details'}</Cinna.Title>
      </Cinna.Space>
    </Cinna.Card>
  );
};

const IconBreadcrumbExample = () => (
  <Cinna.Breadcrumb
    separator={<Cinna.Icon name="chevron-right" size={12} />}
    items={[
      { key: 'home', icon: '⌂', title: 'Home' },
      { key: 'library', icon: '◆', title: 'Library' },
      { key: 'breadcrumb', icon: '•', title: 'Breadcrumb' },
    ]}
  />
);

const MenuBreadcrumbExample = () => {
  const [active, setActive] = React.useState('Components');

  return (
    <div style={breadcrumbPreviewStyle}>
      <Cinna.Breadcrumb
        items={[
          { key: 'home', title: 'Home', href: '#home' },
          {
            key: 'components',
            title: active,
            menu: [
              { key: 'general', label: 'General' },
              { key: 'navigation', label: 'Navigation' },
              { key: 'feedback', label: 'Feedback' },
            ],
          },
          { key: 'breadcrumb', title: 'Breadcrumb' },
        ]}
        onItemClick={(event) => event.preventDefault()}
        onMenuSelect={(key) => setActive(key === 'general' ? 'General' : key === 'feedback' ? 'Feedback' : 'Navigation')}
      />
      <div style={breadcrumbPanelStyle}>
        <Cinna.Title level={5}>{active}</Cinna.Title>
        <Cinna.Text tone="secondary">Select a sibling level from the breadcrumb menu.</Cinna.Text>
      </div>
    </div>
  );
};

const StyledBreadcrumbExample = () => (
  <Cinna.Breadcrumb
    items={[
      { key: 'workspace', title: 'Workspace', color: '#8a6c5f', fontWeight: 700 },
      { key: 'review', title: 'Review', color: '#3d8eaa', fontStyle: 'italic', fontWeight: 900 },
      { key: 'ready', title: 'Ready', color: '#4f8d42', fontWeight: 900 },
    ]}
  />
);

export const breadcrumbDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-breadcrumb',
        zh: {
          title: '基本用法',
          description: '展示当前页面在层级结构中的位置。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic breadcrumb',
          description: 'Show where the current page sits in a hierarchy.',
          codeToggle: 'View basic breadcrumb code',
        },
        code: `import { Breadcrumb } from '@cinna-design/react';

export default () => (
  <Breadcrumb
    items={[
      { title: 'Home' },
      { title: 'Components' },
      { title: 'Breadcrumb' },
    ]}
  />
);`,
        render: () => (
          <Cinna.Breadcrumb
            items={[
              { title: 'Home' },
              { title: 'Components' },
              { title: 'Breadcrumb' },
            ]}
          />
        ),
      },
      {
        id: 'breadcrumb-links',
        zh: {
          title: '可点击上级',
          description: '为上级节点提供 href，当前页保持普通文本。',
          codeToggle: '查看可点击上级代码',
        },
        en: {
          title: 'Linked ancestors',
          description: 'Give ancestor items href values while keeping the current page as text.',
          codeToggle: 'View linked ancestors code',
        },
        code: `import { useState } from 'react';
import { Breadcrumb, Text, Title } from '@cinna-design/react';

export default () => {
  const [active, setActive] = useState('Navigation');

  return (
    <>
      <Breadcrumb
        items={[
          { key: 'dashboard', title: 'Dashboard', href: '#dashboard' },
          { key: 'system', title: 'Design system', href: '#system' },
          { key: 'navigation', title: 'Navigation' },
        ]}
        onItemClick={(event, item) => {
          event.preventDefault();
          setActive(String(item.title));
        }}
      />
      <Title level={5}>{active}</Title>
      <Text tone="secondary">The example updates locally without changing the docs route.</Text>
    </>
  );
};`,
        render: () => <LinkedBreadcrumbExample />,
      },
      {
        id: 'breadcrumb-separator',
        zh: {
          title: '自定义分隔符',
          description: '通过 separator 调整路径节点之间的分隔符。',
          codeToggle: '查看自定义分隔符代码',
        },
        en: {
          title: 'Custom separator',
          description: 'Use separator to adjust the marker between path items.',
          codeToggle: 'View custom separator code',
        },
        code: `import { Breadcrumb, Icon } from '@cinna-design/react';

export default () => (
  <Breadcrumb
    separator={<Icon name="chevron-right" size={12} />}
    items={[
      { title: 'Projects' },
      { title: 'Cinna', separator: ':' },
      { title: 'Release notes' },
    ]}
  />
);`,
        render: () => (
          <Cinna.Breadcrumb
            separator={<Cinna.Icon name="chevron-right" size={12} />}
            items={[
              { title: 'Projects' },
              { title: 'Cinna', separator: ':' },
              { title: 'Release notes' },
            ]}
          />
        ),
      },
      {
        id: 'breadcrumb-icons',
        zh: {
          title: '带图标',
          description: 'icon 可放在层级文字前，帮助用户快速识别路径类型。',
          codeToggle: '查看带图标代码',
        },
        en: {
          title: 'With icons',
          description: 'Use icon before item text to make path levels easier to scan.',
          codeToggle: 'View icon breadcrumb code',
        },
        code: `import { Breadcrumb, Icon } from '@cinna-design/react';

export default () => (
  <Breadcrumb
    separator={<Icon name="chevron-right" size={12} />}
    items={[
      { key: 'home', icon: '⌂', title: 'Home' },
      { key: 'library', icon: '◆', title: 'Library' },
      { key: 'breadcrumb', icon: '•', title: 'Breadcrumb' },
    ]}
  />
);`,
        render: () => <IconBreadcrumbExample />,
      },
      {
        id: 'breadcrumb-menu',
        zh: {
          title: '层级下拉菜单',
          description: '为某一层设置 menu，可以在当前路径中切换同级入口。',
          codeToggle: '查看层级下拉菜单代码',
        },
        en: {
          title: 'Item menu',
          description: 'Set menu on a level to switch sibling entries inside the current path.',
          codeToggle: 'View item menu code',
        },
        code: `import { useState } from 'react';
import { Breadcrumb, Text, Title } from '@cinna-design/react';

export default () => {
  const [active, setActive] = useState('Components');

  return (
    <>
      <Breadcrumb
        items={[
          { key: 'home', title: 'Home', href: '#home' },
          {
            key: 'components',
            title: active,
            menu: [
              { key: 'general', label: 'General' },
              { key: 'navigation', label: 'Navigation' },
              { key: 'feedback', label: 'Feedback' },
            ],
          },
          { key: 'breadcrumb', title: 'Breadcrumb' },
        ]}
        onItemClick={(event) => event.preventDefault()}
        onMenuSelect={(key) => setActive(key)}
      />
      <Title level={5}>{active}</Title>
      <Text tone="secondary">Select a sibling level from the breadcrumb menu.</Text>
    </>
  );
};`,
        render: () => <MenuBreadcrumbExample />,
      },
      {
        id: 'breadcrumb-rich-title',
        zh: {
          title: '分层文字样式',
          description: '可以为不同层级设置颜色、字重、斜体或完整 style。',
          codeToggle: '查看自定义标题代码',
        },
        en: {
          title: 'Per-level text style',
          description: 'Set color, font weight, italic style, or full style per breadcrumb level.',
          codeToggle: 'View custom title code',
        },
        code: `import { Breadcrumb } from '@cinna-design/react';

export default () => (
  <Breadcrumb
    items={[
      { key: 'workspace', title: 'Workspace', color: '#8a6c5f', fontWeight: 700 },
      { key: 'review', title: 'Review', color: '#3d8eaa', fontStyle: 'italic', fontWeight: 900 },
      { key: 'ready', title: 'Ready', color: '#4f8d42', fontWeight: 900 },
    ]}
  />
);`,
        render: () => <StyledBreadcrumbExample />,
      },
      {
        id: 'breadcrumb-in-card',
        zh: {
          title: '页面标题前置',
          description: '面包屑可放在卡片或标题区顶部，帮助用户快速确认当前位置。',
          codeToggle: '查看页面标题前置代码',
        },
        en: {
          title: 'Before a page title',
          description: 'Place Breadcrumb above a card or title area to clarify page position.',
          codeToggle: 'View page title breadcrumb code',
        },
        code: `import { useState } from 'react';
import { Breadcrumb, Card, Space, Title } from '@cinna-design/react';

export default () => {
  const [active, setActive] = useState('Cloud cake details');

  return (
    <Card>
      <Space direction="vertical" align="flex-start">
        <Breadcrumb
          items={[
            { key: 'products', title: 'Products', href: '#products' },
            { key: 'cloud-cake', title: 'Cloud cake' },
          ]}
          onItemClick={(event, item) => {
            event.preventDefault();
            setActive(String(item.title));
          }}
        />
        <Title level={4}>{active}</Title>
      </Space>
    </Card>
  );
};`,
        render: () => <CardBreadcrumbExample />,
      },
    ],
  };
