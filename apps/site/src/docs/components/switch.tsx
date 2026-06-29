import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const switchDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-switch',
        zh: {
          title: '基本用法',
          description: '用于在开和关之间切换状态。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic switch',
          description: 'Use it to toggle between on and off states.',
          codeToggle: 'View basic switch code',
        },
        code: `import { Switch } from '@cinna-design/react';

export default () => <Switch defaultChecked />;`,
        render: () => <Cinna.Switch defaultChecked />,
      },
      {
        id: 'switch-children',
        zh: {
          title: '开关文案',
          description: 'checkedChildren 与 unCheckedChildren 用于展示开关两种状态的短文案。',
          codeToggle: '查看开关文案代码',
        },
        en: {
          title: 'State labels',
          description: 'checkedChildren and unCheckedChildren render short labels for each state.',
          codeToggle: 'View state labels code',
        },
        code: `import { Switch } from '@cinna-design/react';

export default () => (
  <Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />
);`,
        render: () => <Cinna.Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked />,
      },
      {
        id: 'switch-sizes',
        zh: {
          title: '开关尺寸',
          description: 'size 提供 small、medium 与 large 三种尺寸。',
          codeToggle: '查看开关尺寸代码',
        },
        en: {
          title: 'Switch sizes',
          description: 'size supports small, medium, and large controls.',
          codeToggle: 'View switch sizes code',
        },
        code: `import { Space, Switch } from '@cinna-design/react';

export default () => (
  <Space>
    <Switch size="small" defaultChecked />
    <Switch size="medium" defaultChecked />
    <Switch size="large" defaultChecked />
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.Switch size="small" defaultChecked />
            <Cinna.Switch size="medium" defaultChecked />
            <Cinna.Switch size="large" defaultChecked />
          </Cinna.Space>
        ),
      },
      {
        id: 'switch-disabled-loading',
        zh: {
          title: '禁用与加载',
          description: 'disabled 与 loading 都会阻止用户切换状态，loading 会显示处理中效果。',
          codeToggle: '查看禁用与加载代码',
        },
        en: {
          title: 'Disabled and loading',
          description: 'disabled and loading both prevent toggling, while loading shows progress feedback.',
          codeToggle: 'View disabled and loading code',
        },
        code: `import { Space, Switch } from '@cinna-design/react';

export default () => (
  <Space>
    <Switch disabled />
    <Switch defaultChecked disabled />
    <Switch loading defaultChecked />
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.Switch disabled />
            <Cinna.Switch defaultChecked disabled />
            <Cinna.Switch loading defaultChecked />
          </Cinna.Space>
        ),
      },
      {
        id: 'switch-controlled',
        zh: {
          title: '受控状态',
          description: 'checked 与 onChange 可用于接入外部状态。',
          codeToggle: '查看受控状态代码',
        },
        en: {
          title: 'Controlled',
          description: 'Use checked and onChange to connect the switch to external state.',
          codeToggle: 'View controlled code',
        },
        code: `import { Space, Switch, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <Space direction="vertical" align="flex-start">
      <Switch checked={checked} onChange={setChecked} />
      <Text tone="secondary">Enabled: {String(checked)}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledSwitchDemo = () => {
            const [checked, setChecked] = React.useState(true);

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Switch checked={checked} onChange={setChecked} />
                <Cinna.Text tone="secondary">Enabled: {String(checked)}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledSwitchDemo />;
        },
      },
    ],
  };
