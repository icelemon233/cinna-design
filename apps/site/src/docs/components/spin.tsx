import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const spinDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-spin',
        zh: {
          title: '基础加载',
          description: 'Spin 展示云朵加载状态，默认尺寸为 medium。',
          codeToggle: '查看基础加载代码',
        },
        en: {
          title: 'Basic loading',
          description: 'Spin renders the cloud loading state with medium size by default.',
          codeToggle: 'View basic spin code',
        },
        code: `import { Spin } from '@cinna-design/react';

export default () => <Spin />;`,
        render: () => <Cinna.Spin />,
      },
      {
        id: 'spin-sizes',
        zh: {
          title: '加载尺寸',
          description: 'size 支持 small、medium 和 large。',
          codeToggle: '查看加载尺寸代码',
        },
        en: {
          title: 'Sizes',
          description: 'size supports small, medium, and large.',
          codeToggle: 'View spin sizes code',
        },
        code: `import { Space, Spin } from '@cinna-design/react';

export default () => (
  <Space align="center">
    <Spin size="small" />
    <Spin size="medium" />
    <Spin size="large" />
  </Space>
);`,
        render: () => (
          <Cinna.Space align="center">
            <Cinna.Spin size="small" />
            <Cinna.Spin size="medium" />
            <Cinna.Spin size="large" />
          </Cinna.Space>
        ),
      },
      {
        id: 'spin-label',
        zh: {
          title: '自定义文案',
          description: 'label 可替换默认加载文案，也可以传入 ReactNode。',
          codeToggle: '查看自定义文案代码',
        },
        en: {
          title: 'Custom label',
          description: 'Use label to replace the default loading copy, including ReactNode content.',
          codeToggle: 'View spin label code',
        },
        code: `import { Spin } from '@cinna-design/react';

export default () => <Spin label="Preparing preview" />;`,
        render: () => <Cinna.Spin label="Preparing preview" />,
      },
      {
        id: 'spin-hide-label',
        zh: {
          title: '隐藏文案',
          description: 'label={null} 可只展示加载动画。',
          codeToggle: '查看隐藏文案代码',
        },
        en: {
          title: 'Hide label',
          description: 'Use label={null} to render only the loading animation.',
          codeToggle: 'View spin hide label code',
        },
        code: `import { Spin } from '@cinna-design/react';

export default () => <Spin label={null} />;`,
        render: () => <Cinna.Spin label={null} />,
      },
      {
        id: 'spin-active',
        zh: {
          title: '控制显示',
          description: 'active 为 false 时组件返回 null，可用于控制加载态是否出现。',
          codeToggle: '查看控制显示代码',
        },
        en: {
          title: 'Controlled visibility',
          description: 'When active is false, the component returns null and can be used to control visibility.',
          codeToggle: 'View spin active code',
        },
        code: `import { Button, Space, Spin } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState(true);

  return (
    <Space direction="vertical" align="flex-start">
      <Button onClick={() => setActive((value) => !value)}>Toggle loading</Button>
      <Spin active={active} label="Syncing" />
    </Space>
  );
};`,
        render: () => {
          const SpinActiveDemo = () => {
            const [active, setActive] = React.useState(true);

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Button onClick={() => setActive((value) => !value)}>Toggle loading</Cinna.Button>
                <Cinna.Spin active={active} label="Syncing" />
              </Cinna.Space>
            );
          };

          return <SpinActiveDemo />;
        },
      },
    ],
  };
