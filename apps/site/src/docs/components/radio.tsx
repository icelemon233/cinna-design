import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const radioDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-radio',
        zh: {
          title: '基本用法',
          description: '单个 Radio 可用于表达互斥选项中的一项。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic radio',
          description: 'A single Radio represents one item in an exclusive choice.',
          codeToggle: 'View basic radio code',
        },
        code: `import { Radio } from '@cinna-design/react';

export default () => <Radio label="Default channel" defaultChecked />;`,
        render: () => <Cinna.Radio label="Default channel" defaultChecked />,
      },
      {
        id: 'radio-group-basic',
        zh: {
          title: '单选组合',
          description: 'RadioGroup 通过 options 管理一组互斥选项。',
          codeToggle: '查看单选组合代码',
        },
        en: {
          title: 'Radio group',
          description: 'RadioGroup uses options to manage an exclusive set of choices.',
          codeToggle: 'View radio group code',
        },
        code: `import { RadioGroup } from '@cinna-design/react';

const options = [
  { label: 'Docs', value: 'docs' },
  { label: 'Tokens', value: 'tokens' },
  { label: 'Icons', value: 'icons' },
];

export default () => <RadioGroup options={options} defaultValue="docs" />;`,
        render: () => (
          <Cinna.RadioGroup
            options={[
              { label: 'Docs', value: 'docs' },
              { label: 'Tokens', value: 'tokens' },
              { label: 'Icons', value: 'icons' },
            ]}
            defaultValue="docs"
          />
        ),
      },
      {
        id: 'radio-group-vertical',
        zh: {
          title: '垂直排列',
          description: 'direction="vertical" 适合需要逐项阅读的选项。',
          codeToggle: '查看垂直排列代码',
        },
        en: {
          title: 'Vertical group',
          description: 'direction="vertical" works well for options that need scanning line by line.',
          codeToggle: 'View vertical group code',
        },
        code: `import { RadioGroup } from '@cinna-design/react';

const options = [
  { label: 'Every release', value: 'every' },
  { label: 'Weekly summary', value: 'weekly' },
  { label: 'Only major updates', value: 'major' },
];

export default () => (
  <RadioGroup direction="vertical" options={options} defaultValue="weekly" />
);`,
        render: () => (
          <Cinna.RadioGroup
            direction="vertical"
            options={[
              { label: 'Every release', value: 'every' },
              { label: 'Weekly summary', value: 'weekly' },
              { label: 'Only major updates', value: 'major' },
            ]}
            defaultValue="weekly"
          />
        ),
      },
      {
        id: 'radio-button-style',
        zh: {
          title: '按钮样式',
          description: 'optionType="button" 将选项展示为紧凑按钮组，size 可调整按钮高度。',
          codeToggle: '查看按钮样式代码',
        },
        en: {
          title: 'Button style',
          description: 'optionType="button" renders compact choices, while size adjusts button height.',
          codeToggle: 'View button style code',
        },
        code: `import { RadioGroup, Space } from '@cinna-design/react';

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

export default () => (
  <Space direction="vertical" align="flex-start">
    <RadioGroup optionType="button" size="small" options={options} defaultValue="day" />
    <RadioGroup optionType="button" size="large" options={options} defaultValue="week" />
  </Space>
);`,
        render: () => {
          const options = [
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
          ];

          return (
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.RadioGroup optionType="button" size="small" options={options} defaultValue="day" />
              <Cinna.RadioGroup optionType="button" size="large" options={options} defaultValue="week" />
            </Cinna.Space>
          );
        },
      },
      {
        id: 'radio-disabled',
        zh: {
          title: '禁用选项',
          description: '可在 options 中设置 disabled 禁用某一项。',
          codeToggle: '查看禁用选项代码',
        },
        en: {
          title: 'Disabled option',
          description: 'Set disabled in options to prevent selecting a specific item.',
          codeToggle: 'View disabled option code',
        },
        code: `import { RadioGroup } from '@cinna-design/react';

const options = [
  { label: 'Stable', value: 'stable' },
  { label: 'Paused', value: 'paused', disabled: true },
  { label: 'Draft', value: 'draft' },
];

export default () => <RadioGroup options={options} defaultValue="stable" />;`,
        render: () => (
          <Cinna.RadioGroup
            options={[
              { label: 'Stable', value: 'stable' },
              { label: 'Paused', value: 'paused', disabled: true },
              { label: 'Draft', value: 'draft' },
            ]}
            defaultValue="stable"
          />
        ),
      },
      {
        id: 'radio-controlled',
        zh: {
          title: '受控组合',
          description: 'value 与 onChange 可用于接入外部状态。',
          codeToggle: '查看受控组合代码',
        },
        en: {
          title: 'Controlled group',
          description: 'Use value and onChange to connect RadioGroup to external state.',
          codeToggle: 'View controlled group code',
        },
        code: `import { RadioGroup, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const options = [
  { label: 'Public', value: 'public' },
  { label: 'Internal', value: 'internal' },
];

export default () => {
  const [value, setValue] = useState('internal');

  return (
    <Space direction="vertical" align="flex-start">
      <RadioGroup options={options} value={value} onChange={setValue} />
      <Text tone="secondary">Selected: {value}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledRadioDemo = () => {
            const [value, setValue] = React.useState('internal');

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.RadioGroup
                  options={[
                    { label: 'Public', value: 'public' },
                    { label: 'Internal', value: 'internal' },
                  ]}
                  value={value}
                  onChange={setValue}
                />
                <Cinna.Text tone="secondary">Selected: {value}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledRadioDemo />;
        },
      },
    ],
  };
