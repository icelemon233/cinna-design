import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const colorPickerDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-color-picker',
        zh: {
          title: '基本用法',
          description: '用于选择单个十六进制颜色。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic color picker',
          description: 'Use it to choose a single hex color.',
          codeToggle: 'View basic color picker code',
        },
        code: `import { ColorPicker } from '@cinna-design/react';

export default () => <ColorPicker defaultValue="#A8DFF1" />;`,
        render: () => <Cinna.ColorPicker defaultValue="#A8DFF1" />,
      },
      {
        id: 'color-picker-show-text',
        zh: {
          title: '显示色值',
          description: 'showText 会在颜色控件旁展示当前色值。',
          codeToggle: '查看显示色值代码',
        },
        en: {
          title: 'Show color text',
          description: 'showText displays the current color value next to the control.',
          codeToggle: 'View show text code',
        },
        code: `import { ColorPicker } from '@cinna-design/react';

export default () => <ColorPicker showText defaultValue="#F6C96D" />;`,
        render: () => <Cinna.ColorPicker showText defaultValue="#F6C96D" />,
      },
      {
        id: 'color-picker-presets',
        zh: {
          title: '预设颜色',
          description: 'presets 提供一组快捷色块，点击后会切换当前颜色。',
          codeToggle: '查看预设颜色代码',
        },
        en: {
          title: 'Presets',
          description: 'presets renders quick swatches that update the current color.',
          codeToggle: 'View presets code',
        },
        code: `import { ColorPicker } from '@cinna-design/react';

export default () => (
  <ColorPicker
    showText
    defaultValue="#A8DFF1"
    presets={['#A8DFF1', '#F6C96D', '#9BCB8E', '#DF6677']}
  />
);`,
        render: () => (
          <Cinna.ColorPicker
            showText
            defaultValue="#A8DFF1"
            presets={['#A8DFF1', '#F6C96D', '#9BCB8E', '#DF6677']}
          />
        ),
      },
      {
        id: 'color-picker-native-props',
        zh: {
          title: '原生属性',
          description: 'ColorPicker 继承原生 input 属性，可使用 disabled、name 等能力。',
          codeToggle: '查看原生属性代码',
        },
        en: {
          title: 'Native attributes',
          description: 'ColorPicker extends native input attributes such as disabled and name.',
          codeToggle: 'View native attributes code',
        },
        code: `import { ColorPicker, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <ColorPicker name="brandColor" defaultValue="#9BCB8E" />
    <ColorPicker defaultValue="#DF6677" disabled />
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.ColorPicker name="brandColor" defaultValue="#9BCB8E" />
            <Cinna.ColorPicker defaultValue="#DF6677" disabled />
          </Cinna.Space>
        ),
      },
      {
        id: 'color-picker-controlled',
        zh: {
          title: '受控颜色',
          description: 'value 与 onChange 可用于接入外部状态。',
          codeToggle: '查看受控颜色代码',
        },
        en: {
          title: 'Controlled color',
          description: 'Use value and onChange to connect ColorPicker to external state.',
          codeToggle: 'View controlled color code',
        },
        code: `import { ColorPicker, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState('#A8DFF1');

  return (
    <Space direction="vertical" align="flex-start">
      <ColorPicker
        showText
        value={value}
        presets={['#A8DFF1', '#F6C96D', '#9BCB8E']}
        onChange={setValue}
      />
      <Text tone="secondary">Color: {value}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledColorPickerDemo = () => {
            const [value, setValue] = React.useState('#A8DFF1');

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.ColorPicker
                  showText
                  value={value}
                  presets={['#A8DFF1', '#F6C96D', '#9BCB8E']}
                  onChange={setValue}
                />
                <Cinna.Text tone="secondary">Color: {value}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledColorPickerDemo />;
        },
      },
    ],
  };
