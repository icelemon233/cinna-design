import type { ApiRow, ButtonExample, SiteLanguage } from '../types';

export const buttonExamples: ButtonExample[] = [
  {
    id: 'variants',
    zh: {
      title: '按钮类型',
      description: '用不同变体表达主操作、次级操作、轻量操作、虚线操作和文本操作。',
      codeToggle: '查看按钮类型代码',
    },
    en: {
      title: 'Button variants',
      description: 'Use variants to separate primary, secondary, lightweight, dashed, and text actions.',
      codeToggle: 'View variant code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="cream">Cream</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="dashed">Dashed</Button>
    <Button variant="text">Text</Button>
  </Space>
);`,  },
  {
    id: 'sizes',
    zh: {
      title: '按钮尺寸',
      description: '提供 small、medium、large 三种尺寸，适配紧凑工具栏和重点操作区。',
      codeToggle: '查看尺寸代码',
    },
    en: {
      title: 'Button sizes',
      description: 'Small, medium, and large sizes fit compact toolbars and prominent action areas.',
      codeToggle: 'View size code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space align="center" wrap>
    <Button size="small">Small</Button>
    <Button>Medium</Button>
    <Button size="large">Large</Button>
  </Space>
);`,  },
  {
    id: 'loading',
    zh: {
      title: '加载中',
      description: '异步提交时使用 loading，loadingSpeed 可调整转圈速度，数字按毫秒处理。',
      codeToggle: '查看加载中代码',
    },
    en: {
      title: 'Loading',
      description: 'Use loading for async actions. loadingSpeed controls spinner speed, and numbers are milliseconds.',
      codeToggle: 'View loading code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button loading loadingSpeed={420}>Fast 420ms</Button>
    <Button loading loadingSpeed={760}>Normal 760ms</Button>
    <Button loading loadingSpeed="1.4s">Slow 1.4s</Button>
  </Space>
);`,  },
  {
    id: 'disabled',
    zh: {
      title: '不可用',
      description: '操作暂不可用时使用 disabled，避免重复触发或误操作。',
      codeToggle: '查看不可用代码',
    },
    en: {
      title: 'Disabled',
      description: 'Use disabled when an action is unavailable to prevent repeated or accidental operations.',
      codeToggle: 'View disabled code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button disabled>Disabled</Button>
    <Button variant="secondary" disabled>Unavailable</Button>
    <Button variant="ghost" danger disabled>Danger disabled</Button>
  </Space>
);`,  },
  {
    id: 'danger-series',
    zh: {
      title: '危险按钮系列',
      description: 'danger 是一个状态系列，可以叠加到现有按钮类型上，统一表达删除、移除和权限变更等高风险操作。',
      codeToggle: '查看危险按钮代码',
    },
    en: {
      title: 'Danger series',
      description: 'Danger is a state that can be layered onto every variant for destructive or high-risk actions.',
      codeToggle: 'View danger code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button danger>Primary danger</Button>
    <Button variant="secondary" danger>Secondary danger</Button>
    <Button variant="cream" danger>Cream danger</Button>
    <Button variant="ghost" danger>Ghost danger</Button>
    <Button variant="dashed" danger>Dashed danger</Button>
    <Button variant="text" danger>Text danger</Button>
  </Space>
);`,  },
  {
    id: 'icons',
    zh: {
      title: '图标与形状',
      description: '按钮支持前后图标、圆角按钮和纯图标圆形按钮。',
      codeToggle: '查看图标代码',
    },
    en: {
      title: 'Icons and shapes',
      description: 'Buttons can render leading icons, trailing icons, round shapes, and icon-only circles.',
      codeToggle: 'View icon code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button icon="☁">Cloud action</Button>
    <Button variant="dashed" icon="✦" iconPosition="end">Add sparkle</Button>
    <Button shape="circle" aria-label="Cloud" icon="☁" />
  </Space>
);`,  },
  {
    id: 'custom-style',
    zh: {
      title: '自定义颜色、圆角与阴影',
      description: '可直接调整文字颜色、背景色、边框色、圆角和底部阴影，用于业务品牌色或特殊操作。',
      codeToggle: '查看自定义样式代码',
    },
    en: {
      title: 'Custom color, radius, and shadow',
      description: 'Tune text color, background, border, radius, and bottom shadow for branded or special actions.',
      codeToggle: 'View custom style code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button
      color="#ffffff"
      backgroundColor="#7A6FF0"
      borderColor="#5F56D9"
      radius={14}
      shadow="0 6px 0 #54B6CD"
      activeShadow="0 2px 0 #3388A3"
    >
      Grape cloud
    </Button>
    <Button
      backgroundColor="#FFF0F7"
      borderColor="#EA8A98"
      radius="18px"
      shadow="0 5px 0 #62B9D4"
      activeShadow="0 2px 0 #3D8EAA"
    >
      Berry soft
    </Button>
  </Space>
);`,  },
  {
    id: 'theme-presets',
    zh: {
      title: '主题配色',
      description: 'theme 内置 10 套按钮配色，会优先应用文字色、背景色、边框色和底部阴影。',
      codeToggle: '查看主题配色代码',
    },
    en: {
      title: 'Theme presets',
      description: 'theme includes 10 presets for text color, background, border, and bottom shadow.',
      codeToggle: 'View theme preset code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button theme="sky">Sky</Button>
    <Button theme="butter">Butter</Button>
    <Button theme="berry">Berry</Button>
    <Button theme="mint">Mint</Button>
    <Button theme="grape">Grape</Button>
    <Button theme="peach">Peach</Button>
    <Button theme="cream">Cream</Button>
    <Button theme="cocoa">Cocoa</Button>
    <Button theme="ocean">Ocean</Button>
    <Button theme="blossom">Blossom</Button>
  </Space>
);`,  },
  {
    id: 'custom-ripple',
    zh: {
      title: '自定义按钮波纹',
      description: '支持外层扩散、点击处内部扩散和边框粒子扩散；粒子可传入颜色列表和透明度，形成七彩发散效果。',
      codeToggle: '查看波纹代码',
    },
    en: {
      title: 'Custom ripple',
      description: 'Use outer rings, inner click ripples, and border particles with color lists and opacity for rainbow scatter effects.',
      codeToggle: 'View ripple code',
    },
    code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Button rippleEffects="outer">Outer ring</Button>
    <Button rippleEffects="inner">Click ripple</Button>
    <Button rippleEffects="particles">Particles</Button>
    <Button
      rippleEffects="particles"
      rippleParticleColors={['#ef8f8f', '#f6c96d', '#72b866', '#54b6cd', '#7a6ff0']}
      rippleParticleOpacity={0.92}
    >
      Rainbow particles
    </Button>
    <Button rippleEffects={['outer', 'inner', 'particles']}>All effects</Button>
  </Space>
);`,  },
  {
    id: 'block',
    zh: {
      title: '块级按钮',
      description: '需要占满容器宽度时使用 block，常见于表单底部或移动端确认操作。',
      codeToggle: '查看块级按钮代码',
    },
    en: {
      title: 'Block button',
      description: 'Use block when the button should fill its container, especially in forms or mobile flows.',
      codeToggle: 'View block code',
    },
    code: `import { Button } from '@cinna-design/react';

export default () => <Button block>Publish recipe</Button>;`,  },
];

export const buttonApiRows: Record<SiteLanguage, ApiRow[]> = {
  zh: [
    ['danger', '危险按钮状态，可叠加到现有按钮类型。', 'boolean', 'false'],
    ['ripple', '是否启用点击波纹。', 'boolean', 'true'],
    ['rippleEffects', '波纹效果：外层扩散、内部扩散或粒子扩散。', "'outer' | 'inner' | 'particles' | Array", "'outer'"],
    ['rippleParticleColors', '粒子颜色，支持单个颜色或颜色列表。', 'string | string[]', '-'],
    ['rippleParticleOpacity', '粒子初始透明度，会限制在 0 到 1。', 'number', '0.72'],
    ['theme', '主题配色，优先应用文字色、背景色、边框色和底部阴影。', "'sky' | 'butter' | 'berry' | 'mint' | 'grape' | 'peach' | 'cream' | 'cocoa' | 'ocean' | 'blossom' | object", '-'],
    ['color', '按钮文字颜色。', 'string', '-'],
    ['backgroundColor', '按钮背景色。', 'string', '-'],
    ['borderColor', '按钮边框色。', 'string', '-'],
    ['radius', '按钮圆角。', 'number | string', '-'],
    ['shadow', '按钮底部阴影。', 'string', '-'],
    ['activeShadow', '按钮按下时的底部阴影。', 'string', '-'],
    ['loadingSpeed', 'loading 转圈速度，数字按毫秒处理。', 'number | string', '760ms'],
  ],
  en: [
    ['danger', 'Danger state that can be layered onto existing variants.', 'boolean', 'false'],
    ['ripple', 'Whether click ripple is enabled.', 'boolean', 'true'],
    ['rippleEffects', 'Ripple effects: outer ring, inner click ripple, or particles.', "'outer' | 'inner' | 'particles' | Array", "'outer'"],
    ['rippleParticleColors', 'Particle color, either one color or a color list.', 'string | string[]', '-'],
    ['rippleParticleOpacity', 'Initial particle opacity, clamped between 0 and 1.', 'number', '0.72'],
    ['theme', 'Theme preset that takes priority over text, background, border, and bottom shadow props.', "'sky' | 'butter' | 'berry' | 'mint' | 'grape' | 'peach' | 'cream' | 'cocoa' | 'ocean' | 'blossom' | object", '-'],
    ['color', 'Button text color.', 'string', '-'],
    ['backgroundColor', 'Button background color.', 'string', '-'],
    ['borderColor', 'Button border color.', 'string', '-'],
    ['radius', 'Button border radius.', 'number | string', '-'],
    ['shadow', 'Button bottom shadow.', 'string', '-'],
    ['activeShadow', 'Bottom shadow while pressed.', 'string', '-'],
    ['loadingSpeed', 'Spinner speed for loading buttons. Numbers are milliseconds.', 'number | string', '760ms'],
  ],
};
