import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const floatButtonDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-float-button',
        zh: {
          title: '基本用法',
          description: '用于放置全局可见的快捷操作。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic float button',
          description: 'Use it for globally visible quick actions.',
          codeToggle: 'View basic float button code',
        },
        code: `import { FloatButton } from '@cinna-design/react';

export default () => <FloatButton icon="+" tooltip="Create" />;`,
        render: () => <Cinna.FloatButton icon="+" tooltip="Create" />,
      },
      {
        id: 'float-button-shapes',
        zh: {
          title: '按钮形状',
          description: 'shape 支持圆形和方形，适配不同的浮动操作密度。',
          codeToggle: '查看按钮形状代码',
        },
        en: {
          title: 'Shapes',
          description: 'shape supports circle and square for different floating action density.',
          codeToggle: 'View shapes code',
        },
        code: `import { FloatButton, Icon, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <FloatButton icon="+" shape="circle" />
    <FloatButton icon="?" shape="square" />
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.FloatButton icon="+" shape="circle" />
            <Cinna.FloatButton icon="?" shape="square" />
          </Cinna.Space>
        ),
      },
      {
        id: 'float-button-content',
        zh: {
          title: '文字内容',
          description: 'children 会作为简短文字显示在图标下方，适合方形按钮。',
          codeToggle: '查看文字内容代码',
        },
        en: {
          title: 'Text content',
          description: 'children renders short text under the icon, useful with square buttons.',
          codeToggle: 'View text content code',
        },
        code: `import { FloatButton } from '@cinna-design/react';

export default () => (
  <FloatButton icon="^" shape="square" tooltip="Back to top">
    Top
  </FloatButton>
);`,
        render: () => (
          <Cinna.FloatButton icon="^" shape="square" tooltip="Back to top">
            Top
          </Cinna.FloatButton>
        ),
      },
      {
        id: 'float-button-badge',
        zh: {
          title: '徽标提示',
          description: 'badge 可用于提示待处理数量或状态。',
          codeToggle: '查看徽标提示代码',
        },
        en: {
          title: 'Badge',
          description: 'Use badge to indicate pending count or status.',
          codeToggle: 'View badge code',
        },
        code: `import { FloatButton } from '@cinna-design/react';

export default () => <FloatButton icon="!" badge={3} tooltip="Pending reviews" />;`,
        render: () => <Cinna.FloatButton icon="!" badge={3} tooltip="Pending reviews" />,
      },
      {
        id: 'float-button-tooltip',
        zh: {
          title: '悬浮提示',
          description: '传入 tooltip 后，鼠标悬浮或键盘聚焦时展示提示内容。',
          codeToggle: '查看悬浮提示代码',
        },
        en: {
          title: 'Hover tooltip',
          description: 'Pass tooltip to show helper content on hover or keyboard focus.',
          codeToggle: 'View hover tooltip code',
        },
        code: `import { FloatButton, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <FloatButton icon="?" tooltip="Need help?" />
    <FloatButton icon="i" shape="square" tooltip="Open guide">Info</FloatButton>
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.FloatButton icon="?" tooltip="Need help?" />
            <Cinna.FloatButton icon="i" shape="square" tooltip="Open guide">Info</Cinna.FloatButton>
          </Cinna.Space>
        ),
      },
      {
        id: 'float-button-group',
        zh: {
          title: '按钮组',
          description: 'FloatButton.Group 可组合多个同级快捷操作，适合页面右下角的工具入口。',
          codeToggle: '查看按钮组代码',
        },
        en: {
          title: 'Button group',
          description: 'FloatButton.Group combines peer quick actions for page-level tools.',
          codeToggle: 'View button group code',
        },
        code: `import { FloatButton } from '@cinna-design/react';

export default () => (
  <FloatButton.Group shape="square">
    <FloatButton icon="+" tooltip="Create">New</FloatButton>
    <FloatButton icon="↗" tooltip="Share">Go</FloatButton>
    <FloatButton icon="?" tooltip="Help">Ask</FloatButton>
  </FloatButton.Group>
);`,
        render: () => (
          <Cinna.FloatButton.Group shape="square">
            <Cinna.FloatButton icon="+" tooltip="Create">New</Cinna.FloatButton>
            <Cinna.FloatButton icon="↗" tooltip="Share">Go</Cinna.FloatButton>
            <Cinna.FloatButton icon="?" tooltip="Help">Ask</Cinna.FloatButton>
          </Cinna.FloatButton.Group>
        ),
      },
      {
        id: 'float-button-menu',
        zh: {
          title: '菜单模式',
          description: 'trigger 支持 click 和 hover，placement 支持向上、向下、向左、向右展开多个自定义按钮。',
          codeToggle: '查看菜单模式代码',
        },
        en: {
          title: 'Menu mode',
          description: 'Use click or hover trigger with top, bottom, left, or right placement for custom action menus.',
          codeToggle: 'View menu mode code',
        },
        code: `import { FloatButton, Space } from '@cinna-design/react';

const menuItems = [
  { key: 'edit', icon: 'E', tooltip: 'Edit' },
  { key: 'copy', icon: 'C', tooltip: 'Copy' },
  { key: 'share', icon: 'S', tooltip: 'Share' },
];

export default () => (
  <Space wrap>
    <FloatButton.Group trigger="click" placement="top" icon="☰" items={menuItems} />
    <FloatButton.Group trigger="hover" placement="left" icon="★" items={menuItems} />
    <FloatButton.Group trigger="click" placement="right" icon={<Icon name="arrow-tail-right" size={18} />} items={menuItems} />
    <FloatButton.Group trigger="hover" placement="bottom" icon={<Icon name="arrow-tail-down" size={18} />} items={menuItems} />
  </Space>
);`,
        render: () => {
          const menuItems = [
            { key: 'edit', icon: 'E', tooltip: 'Edit' },
            { key: 'copy', icon: 'C', tooltip: 'Copy' },
            { key: 'share', icon: 'S', tooltip: 'Share' },
          ];

          return (
            <Cinna.Space wrap>
              <Cinna.FloatButton.Group trigger="click" placement="top" icon="☰" items={menuItems} />
              <Cinna.FloatButton.Group trigger="hover" placement="left" icon="★" items={menuItems} />
              <Cinna.FloatButton.Group trigger="click" placement="right" icon={<Cinna.Icon name="arrow-tail-right" size={18} />} items={menuItems} />
              <Cinna.FloatButton.Group trigger="hover" placement="bottom" icon={<Cinna.Icon name="arrow-tail-down" size={18} />} items={menuItems} />
            </Cinna.Space>
          );
        },
      },
      {
        id: 'float-button-back-top',
        zh: {
          title: '返回顶部',
          description: 'FloatButton.BackTop 可绑定滚动容器，并在点击后平滑回到顶部。',
          codeToggle: '查看返回顶部代码',
        },
        en: {
          title: 'Back to top',
          description: 'FloatButton.BackTop can target a scroll container and return it to the top.',
          codeToggle: 'View back to top code',
        },
        code: `import React from 'react';
import { FloatButton } from '@cinna-design/react';

export default () => {
  const panelRef = React.useRef(null);

  return (
    <div ref={panelRef} style={{ position: 'relative', height: 170, overflow: 'auto', padding: 14, borderRadius: 18, background: '#f0fafe' }}>
      <div style={{ height: 360, fontWeight: 900 }}>Scroll this panel</div>
      <FloatButton.BackTop target={() => panelRef.current ?? window} visibilityHeight={0} duration={300} />
    </div>
  );
};`,
        render: () => {
          const BackTopDemo = () => {
            const panelRef = React.useRef<HTMLDivElement | null>(null);

            return (
              <div ref={panelRef} style={{ position: 'relative', height: 170, overflow: 'auto', padding: 14, borderRadius: 18, background: '#f0fafe' }}>
                <div style={{ height: 360, fontWeight: 900 }}>Scroll this panel</div>
                <Cinna.FloatButton.BackTop target={() => panelRef.current ?? window} visibilityHeight={0} duration={300} />
              </div>
            );
          };

          return <BackTopDemo />;
        },
      },
      {
        id: 'float-button-theme',
        zh: {
          title: '主题与自定义样式',
          description: 'theme 可快速套用配色；也可分别设置文字色、背景色、边框色、圆角和底部阴影。',
          codeToggle: '查看主题与自定义样式代码',
        },
        en: {
          title: 'Theme and custom style',
          description: 'Use theme presets or tune text color, background, border, radius, and bottom shadow directly.',
          codeToggle: 'View theme and custom style code',
        },
        code: `import { FloatButton, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <FloatButton icon="S" shape="square" theme="sky">Sky</FloatButton>
    <FloatButton icon="M" shape="square" theme="mint">Mint</FloatButton>
    <FloatButton icon="B" shape="square" theme="blossom">Bloom</FloatButton>
    <FloatButton
      icon="V"
      shape="square"
      color="#fff8ee"
      backgroundColor="#7c5746"
      borderColor="rgba(70, 51, 42, 0.34)"
      radius={18}
      shadow="0 5px 0 #5d4136"
      activeShadow="0 2px 0 #5d4136"
    >
      VIP
    </FloatButton>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap>
            <Cinna.FloatButton icon="S" shape="square" theme="sky">Sky</Cinna.FloatButton>
            <Cinna.FloatButton icon="M" shape="square" theme="mint">Mint</Cinna.FloatButton>
            <Cinna.FloatButton icon="B" shape="square" theme="blossom">Bloom</Cinna.FloatButton>
            <Cinna.FloatButton
              icon="V"
              shape="square"
              color="#fff8ee"
              backgroundColor="#7c5746"
              borderColor="rgba(70, 51, 42, 0.34)"
              radius={18}
              shadow="0 5px 0 #5d4136"
              activeShadow="0 2px 0 #5d4136"
            >
              VIP
            </Cinna.FloatButton>
          </Cinna.Space>
        ),
      },
      {
        id: 'float-button-ripple',
        zh: {
          title: '点击动效',
          description: '支持外层扩散、内部点击处扩散和边缘粒子扩散，也可以叠加使用。',
          codeToggle: '查看点击动效代码',
        },
        en: {
          title: 'Click ripple',
          description: 'Use outer rings, inner click ripples, and edge particles independently or together.',
          codeToggle: 'View click ripple code',
        },
        code: `import { FloatButton, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <FloatButton icon="O" tooltip="Outer" rippleEffects="outer" />
    <FloatButton icon="I" tooltip="Inner" rippleEffects="inner" />
    <FloatButton icon="P" tooltip="Particles" rippleEffects="particles" />
    <FloatButton
      icon="*"
      shape="square"
      tooltip="All"
      rippleEffects={['outer', 'inner', 'particles']}
      rippleParticleColors={['#ef8f8f', '#f6c96d', '#72b866', '#54b6cd', '#7a6ff0']}
      rippleParticleOpacity={0.92}
    >
      Go
    </FloatButton>
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.FloatButton icon="O" tooltip="Outer" rippleEffects="outer" />
            <Cinna.FloatButton icon="I" tooltip="Inner" rippleEffects="inner" />
            <Cinna.FloatButton icon="P" tooltip="Particles" rippleEffects="particles" />
            <Cinna.FloatButton
              icon="*"
              shape="square"
              tooltip="All"
              rippleEffects={['outer', 'inner', 'particles']}
              rippleParticleColors={['#ef8f8f', '#f6c96d', '#72b866', '#54b6cd', '#7a6ff0']}
              rippleParticleOpacity={0.92}
            >
              Go
            </Cinna.FloatButton>
          </Cinna.Space>
        ),
      },
      {
        id: 'float-button-disabled',
        zh: {
          title: '禁用状态',
          description: '禁用后仍保留入口位置，但不会触发点击操作。',
          codeToggle: '查看禁用状态代码',
        },
        en: {
          title: 'Disabled',
          description: 'Keep the entry visible while preventing click actions.',
          codeToggle: 'View disabled code',
        },
        code: `import { FloatButton, Icon } from '@cinna-design/react';

export default () => <FloatButton icon={<Icon name="close-blue" size={16} />} tooltip="Unavailable" disabled />;`,
        render: () => <Cinna.FloatButton icon={<Cinna.Icon name="close-blue" size={16} />} tooltip="Unavailable" disabled />,
      },
    ],
  };
