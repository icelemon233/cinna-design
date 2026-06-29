import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

type LayoutDemoPage = {
  title: string;
  description: string;
  tag: string;
  items: string[];
};

const layoutDemoPageStyle: React.CSSProperties = {
  display: 'grid',
  gap: 10,
  minHeight: '100%',
  alignContent: 'start',
};

const layoutDemoTitleRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  flexWrap: 'wrap',
};

const layoutDemoTitleStyle: React.CSSProperties = {
  color: 'var(--cinna-color-text)',
  fontSize: 18,
  fontWeight: 900,
};

const layoutDemoTagStyle: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: 999,
  background: 'rgba(168, 223, 241, 0.34)',
  color: 'var(--cinna-color-primary-deep)',
  fontSize: 12,
  fontWeight: 900,
};

const layoutDemoDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: 'var(--cinna-color-text-secondary)',
  fontWeight: 800,
  lineHeight: 1.55,
};

const layoutDemoGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))',
  gap: 8,
};

const layoutDemoItemStyle: React.CSSProperties = {
  minHeight: 48,
  padding: '10px 12px',
  borderRadius: 14,
  background: 'rgba(255, 252, 246, 0.92)',
  color: 'var(--cinna-color-text-secondary)',
  fontWeight: 850,
};

const renderLayoutDemoPage = (page: LayoutDemoPage) => (
  <div style={layoutDemoPageStyle}>
    <div style={layoutDemoTitleRowStyle}>
      <strong style={layoutDemoTitleStyle}>{page.title}</strong>
      <span style={layoutDemoTagStyle}>{page.tag}</span>
    </div>
    <p style={layoutDemoDescriptionStyle}>{page.description}</p>
    <div style={layoutDemoGridStyle}>
      {page.items.map((item) => (
        <span key={item} style={layoutDemoItemStyle}>{item}</span>
      ))}
    </div>
  </div>
);

const headerSiderPages: Record<string, LayoutDemoPage> = {
  overview: {
    title: 'Overview',
    description: 'A calm landing page for release status, ownership, and the next action.',
    tag: '3 updates',
    items: ['Health 98%', 'Next review', '2 blockers'],
  },
  tasks: {
    title: 'Tasks',
    description: 'Task queues stay in the content area while the sider keeps navigation persistent.',
    tag: '12 open',
    items: ['Design pass', 'API check', 'QA notes'],
  },
  settings: {
    title: 'Settings',
    description: 'Configuration pages can reuse the same shell without leaving the current layout.',
    tag: 'Saved',
    items: ['Access', 'Theme', 'Billing'],
  },
};

const headerSiderMenu = [
  { key: 'overview', icon: 'O', label: 'Overview' },
  { key: 'tasks', icon: 'T', label: 'Tasks' },
  { key: 'settings', icon: 'S', label: 'Settings' },
];

const fullWidthPages: Record<string, LayoutDemoPage> = {
  home: {
    title: 'Home',
    description: 'Global overview with product shortcuts and recent activity.',
    tag: 'Live',
    items: ['Today', 'Pinned', 'Activity'],
  },
  docs: {
    title: 'Docs',
    description: 'Documentation pages keep the global header while the inner sider controls sections.',
    tag: '24 pages',
    items: ['Components', 'Patterns', 'Tokens'],
  },
  team: {
    title: 'Team',
    description: 'Team workspace with member status and shared review queues.',
    tag: '8 people',
    items: ['Owners', 'Reviewers', 'Guests'],
  },
};

const fullWidthMenu = [
  { key: 'home', icon: 'H', label: 'Home' },
  { key: 'docs', icon: 'D', label: 'Docs' },
  { key: 'team', icon: 'T', label: 'Team' },
];

const siderControlPages: Record<string, LayoutDemoPage> = {
  inbox: {
    title: 'Inbox',
    description: 'Collapsed sidebars can still drive the page state with a compact icon-first menu.',
    tag: '5 new',
    items: ['Mentions', 'Approvals', 'Warnings'],
  },
  files: {
    title: 'Files',
    description: 'Hover to expand the sider, then select a destination without leaving the layout.',
    tag: 'Synced',
    items: ['Specs', 'Screenshots', 'Exports'],
  },
  settings: {
    title: 'Settings',
    description: 'The trigger only controls width; selection remains a normal controlled menu state.',
    tag: 'Ready',
    items: ['Profile', 'Security', 'Integrations'],
  },
};

const siderControlMenu = [
  { key: 'inbox', icon: 'I', label: 'Inbox', title: 'Inbox' },
  { key: 'files', icon: 'F', label: 'Files', title: 'Files' },
  { key: 'settings', icon: 'S', label: 'Settings', title: 'Settings' },
];

const sideLayoutPages: Record<string, LayoutDemoPage> = {
  board: {
    title: 'Task board',
    description: 'A focused two-column workspace for cards, lanes, and progress.',
    tag: 'Board',
    items: ['Backlog', 'Doing', 'Done'],
  },
  calendar: {
    title: 'Calendar',
    description: 'The same sider can switch to schedule views with a different content surface.',
    tag: 'Week',
    items: ['Planning', 'Reviews', 'Launch'],
  },
};

const sideLayoutMenu = [
  { key: 'board', icon: 'B', label: 'Board' },
  { key: 'calendar', icon: 'C', label: 'Calendar' },
];

const HeaderSiderLayoutDemo = () => {
  const [active, setActive] = React.useState('overview');
  const page = headerSiderPages[active] ?? headerSiderPages.overview;

  return (
    <Cinna.Layout hasSider style={{ maxWidth: 680 }}>
      <Cinna.LayoutSider
        width={164}
        sticky
        offsetTop={16}
        style={{ minHeight: 210 }}
        menu={headerSiderMenu}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <Cinna.Layout style={{ padding: 0, border: 0, background: 'transparent' }}>
        <Cinna.LayoutHeader>{page.title}</Cinna.LayoutHeader>
        <Cinna.LayoutContent style={{ minHeight: 150 }}>{renderLayoutDemoPage(page)}</Cinna.LayoutContent>
      </Cinna.Layout>
    </Cinna.Layout>
  );
};

const FullWidthLayoutDemo = () => {
  const [active, setActive] = React.useState('docs');
  const page = fullWidthPages[active] ?? fullWidthPages.docs;

  return (
    <Cinna.Layout style={{ maxWidth: 680 }}>
      <Cinna.LayoutHeader>Global header / {page.title}</Cinna.LayoutHeader>
      <Cinna.Layout hasSider style={{ padding: 0, border: 0, background: 'transparent' }}>
        <Cinna.LayoutSider
          width={148}
          menu={fullWidthMenu}
          menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
        />
        <Cinna.LayoutContent style={{ minHeight: 150 }}>{renderLayoutDemoPage(page)}</Cinna.LayoutContent>
      </Cinna.Layout>
      <Cinna.LayoutFooter>{page.tag}</Cinna.LayoutFooter>
    </Cinna.Layout>
  );
};

const SiderControlLayoutDemo = () => {
  const [active, setActive] = React.useState('inbox');
  const page = siderControlPages[active] ?? siderControlPages.inbox;

  return (
    <Cinna.Layout hasSider style={{ maxWidth: 680 }}>
      <Cinna.LayoutSider
        width={188}
        collapsedWidth={76}
        collapsible
        defaultCollapsed
        expandOnHover
        menu={siderControlMenu}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <Cinna.LayoutContent style={{ minHeight: 150 }}>{renderLayoutDemoPage(page)}</Cinna.LayoutContent>
    </Cinna.Layout>
  );
};

const SideLayoutDemo = () => {
  const [active, setActive] = React.useState('board');
  const page = sideLayoutPages[active] ?? sideLayoutPages.board;

  return (
    <Cinna.Layout hasSider style={{ maxWidth: 680 }}>
      <Cinna.LayoutSider
        width={156}
        style={{ minHeight: 168 }}
        menu={sideLayoutMenu}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <Cinna.LayoutContent style={{ minHeight: 168 }}>{renderLayoutDemoPage(page)}</Cinna.LayoutContent>
    </Cinna.Layout>
  );
};

export const layoutDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-layout',
        zh: {
          title: '基本结构',
          description: '使用 Header、Content、Footer 组成页面骨架。',
          codeToggle: '查看基本结构代码',
        },
        en: {
          title: 'Basic structure',
          description: 'Use Header, Content, and Footer to compose a page skeleton.',
          codeToggle: 'View basic structure code',
        },
        code: `import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@cinna-design/react';

export default () => (
  <Layout>
    <LayoutHeader>Header</LayoutHeader>
    <LayoutContent>Content</LayoutContent>
    <LayoutFooter>Footer</LayoutFooter>
  </Layout>
);`,
        render: () => (
          <Cinna.Layout>
            <Cinna.LayoutHeader>Header</Cinna.LayoutHeader>
            <Cinna.LayoutContent>Content</Cinna.LayoutContent>
            <Cinna.LayoutFooter>Footer</Cinna.LayoutFooter>
          </Cinna.Layout>
        ),
      },
      {
        id: 'top-middle-bottom-layout',
        zh: {
          title: '上中下布局',
          description: '适合内容型页面和文档型页面的经典上中下结构。',
          codeToggle: '查看上中下布局代码',
        },
        en: {
          title: 'Header content footer',
          description: 'A classic top-middle-bottom layout for content and documentation pages.',
          codeToggle: 'View top-middle-bottom code',
        },
        code: `import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@cinna-design/react';

export default () => (
  <Layout style={{ maxWidth: 620 }}>
    <LayoutHeader>Product navigation</LayoutHeader>
    <LayoutContent style={{ minHeight: 96 }}>Release workspace</LayoutContent>
    <LayoutFooter>Cloud-soft footer</LayoutFooter>
  </Layout>
);`,
        render: () => (
          <Cinna.Layout style={{ maxWidth: 620 }}>
            <Cinna.LayoutHeader>Product navigation</Cinna.LayoutHeader>
            <Cinna.LayoutContent style={{ minHeight: 96 }}>Release workspace</Cinna.LayoutContent>
            <Cinna.LayoutFooter>Cloud-soft footer</Cinna.LayoutFooter>
          </Cinna.Layout>
        ),
      },
      {
        id: 'header-sider-layout',
        zh: {
          title: '顶部-侧边布局',
          description: 'Sider 贯穿主体高度，点击侧边菜单会切换右侧页面内容。',
          codeToggle: '查看顶部侧边布局代码',
        },
        en: {
          title: 'Header and sider',
          description: 'Let the sider span the body height and switch the right page content on selection.',
          codeToggle: 'View header sider code',
        },
        code: `import { useState } from 'react';
import { Layout, LayoutContent, LayoutHeader, LayoutSider } from '@cinna-design/react';

const pages: Record<string, { title: string; body: string }> = {
  overview: { title: 'Overview', body: 'Release status, ownership, and the next action.' },
  tasks: { title: 'Tasks', body: 'Task queues stay in the content area.' },
  settings: { title: 'Settings', body: 'Configuration pages reuse the same shell.' },
};

export default () => {
  const [active, setActive] = useState('overview');
  const page = pages[active];

  return (
    <Layout hasSider style={{ maxWidth: 680 }}>
      <LayoutSider
        width={164}
        sticky
        offsetTop={16}
        style={{ minHeight: 210 }}
        menu={[
          { key: 'overview', icon: 'O', label: 'Overview' },
          { key: 'tasks', icon: 'T', label: 'Tasks' },
          { key: 'settings', icon: 'S', label: 'Settings' },
        ]}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <Layout style={{ padding: 0, border: 0, background: 'transparent' }}>
        <LayoutHeader>{page.title}</LayoutHeader>
        <LayoutContent style={{ minHeight: 150 }}>
          <strong>{page.title}</strong>
          <p>{page.body}</p>
        </LayoutContent>
      </Layout>
    </Layout>
  );
};`,
        render: () => <HeaderSiderLayoutDemo />,
      },
      {
        id: 'full-width-layout',
        zh: {
          title: '顶部-侧边布局-通栏',
          description: 'Header 横跨页面，主体区域继续嵌套可切换内容的侧边栏。',
          codeToggle: '查看通栏布局代码',
        },
        en: {
          title: 'Full-width app layout',
          description: 'Let the header span the page while the body nests a sider that switches content.',
          codeToggle: 'View full-width layout code',
        },
        code: `import { useState } from 'react';
import { Layout, LayoutContent, LayoutFooter, LayoutHeader, LayoutSider } from '@cinna-design/react';

const pages: Record<string, { title: string; body: string }> = {
  home: { title: 'Home', body: 'Global overview with product shortcuts.' },
  docs: { title: 'Docs', body: 'Documentation sections live under the global header.' },
  team: { title: 'Team', body: 'Team workspace with shared review queues.' },
};

export default () => {
  const [active, setActive] = useState('docs');
  const page = pages[active];

  return (
    <Layout style={{ maxWidth: 680 }}>
      <LayoutHeader>Global header / {page.title}</LayoutHeader>
      <Layout hasSider style={{ padding: 0, border: 0, background: 'transparent' }}>
        <LayoutSider
          width={148}
          menu={[
            { key: 'home', icon: 'H', label: 'Home' },
            { key: 'docs', icon: 'D', label: 'Docs' },
            { key: 'team', icon: 'T', label: 'Team' },
          ]}
          menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
        />
        <LayoutContent style={{ minHeight: 150 }}>{page.body}</LayoutContent>
      </Layout>
      <LayoutFooter>{page.title}</LayoutFooter>
    </Layout>
  );
};`,
        render: () => <FullWidthLayoutDemo />,
      },
      {
        id: 'sticky-header-footer-layout',
        zh: {
          title: '吸顶和吸底',
          description: 'Header 和 Footer 贴住容器顶部和底部，中间内容区独立滚动。',
          codeToggle: '查看吸顶吸底代码',
        },
        en: {
          title: 'Sticky header and footer',
          description: 'Keep the header and footer attached to the panel edges while the middle content scrolls.',
          codeToggle: 'View sticky layout code',
        },
        code: `import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@cinna-design/react';

const panels = ['Overview', 'Daily metrics', 'Queued reviews', 'Release notes', 'Access log'];

export default () => (
  <Layout style={{ maxWidth: 680, height: 280, overflow: 'hidden', gridTemplateRows: 'auto minmax(0, 1fr) auto' }}>
    <LayoutHeader sticky>Sticky header</LayoutHeader>
    <LayoutContent style={{ display: 'grid', gap: 10, minHeight: 0, overflow: 'auto' }}>
      {panels.map((panel) => (
        <div key={panel} style={{ minHeight: 56, padding: 14, borderRadius: 14, background: '#fffcf6' }}>
          {panel}
        </div>
      ))}
    </LayoutContent>
    <LayoutFooter sticky>Sticky footer</LayoutFooter>
  </Layout>
);`,
        render: () => {
          const panels = ['Overview', 'Daily metrics', 'Queued reviews', 'Release notes', 'Access log'];

          return (
            <Cinna.Layout style={{ maxWidth: 680, height: 280, overflow: 'hidden', gridTemplateRows: 'auto minmax(0, 1fr) auto' }}>
              <Cinna.LayoutHeader sticky>Sticky header</Cinna.LayoutHeader>
              <Cinna.LayoutContent style={{ display: 'grid', gap: 10, minHeight: 0, overflow: 'auto' }}>
                {panels.map((panel) => (
                  <div key={panel} style={{ minHeight: 56, padding: 14, borderRadius: 14, background: '#fffcf6' }}>
                    {panel}
                  </div>
                ))}
              </Cinna.LayoutContent>
              <Cinna.LayoutFooter sticky>Sticky footer</Cinna.LayoutFooter>
            </Cinna.Layout>
          );
        },
      },
      {
        id: 'sider-control-layout',
        zh: {
          title: '侧栏宽度与收起',
          description: 'width 和 collapsedWidth 控制侧栏宽度，侧栏收起或展开时仍然可以切换页面。',
          codeToggle: '查看侧栏控制代码',
        },
        en: {
          title: 'Sider width and collapse',
          description: 'Use width and collapsedWidth for sizing; page switching still works while the sider collapses or expands.',
          codeToggle: 'View sider control code',
        },
        code: `import { useState } from 'react';
import { Layout, LayoutContent, LayoutSider } from '@cinna-design/react';

const pages: Record<string, string> = {
  inbox: 'Mentions, approvals, and warnings.',
  files: 'Specs, screenshots, and exports.',
  settings: 'Profile, security, and integrations.',
};

export default () => {
  const [active, setActive] = useState('inbox');

  return (
    <Layout hasSider style={{ maxWidth: 680 }}>
      <LayoutSider
        width={188}
        collapsedWidth={76}
        collapsible
        defaultCollapsed
        expandOnHover
        menu={[
          { key: 'inbox', icon: 'I', label: 'Inbox', title: 'Inbox' },
          { key: 'files', icon: 'F', label: 'Files', title: 'Files' },
          { key: 'settings', icon: 'S', label: 'Settings', title: 'Settings' },
        ]}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <LayoutContent style={{ minHeight: 150 }}>{pages[active]}</LayoutContent>
    </Layout>
  );
};`,
        render: () => <SiderControlLayoutDemo />,
      },
      {
        id: 'sider-layout',
        zh: {
          title: '侧边布局',
          description: '适合常驻导航和主内容区的两栏工作台，点击导航即可切换内容。',
          codeToggle: '查看侧边布局代码',
        },
        en: {
          title: 'Sider layout',
          description: 'Use a persistent sider with a main workspace and switch content from the navigation.',
          codeToggle: 'View sider layout code',
        },
        code: `import { useState } from 'react';
import { Layout, LayoutContent, LayoutSider } from '@cinna-design/react';

const pages: Record<string, string> = {
  board: 'Task board',
  calendar: 'Calendar',
};

export default () => {
  const [active, setActive] = useState('board');

  return (
    <Layout hasSider style={{ maxWidth: 680 }}>
      <LayoutSider
        width={156}
        style={{ minHeight: 168 }}
        menu={[
          { key: 'board', icon: 'B', label: 'Board' },
          { key: 'calendar', icon: 'C', label: 'Calendar' },
        ]}
        menuProps={{ selectedKey: active, onSelect: (key) => setActive(key) }}
      />
      <LayoutContent style={{ minHeight: 168 }}>{pages[active]}</LayoutContent>
    </Layout>
  );
};`,
        render: () => <SideLayoutDemo />,
      },
    ],
  };
