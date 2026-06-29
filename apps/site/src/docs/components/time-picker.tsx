import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const timePickerDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-time-picker',
        zh: {
          title: '基本用法',
          description: '用于录入单个时间。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic time picker',
          description: 'Use it to enter a single time.',
          codeToggle: 'View basic time picker code',
        },
        code: `import { TimePicker } from '@cinna-design/react';

export default () => <TimePicker defaultValue="09:30" />;`,
        render: () => <Cinna.TimePicker defaultValue="09:30" />,
      },
      {
        id: 'time-picker-sizes',
        zh: {
          title: '控件尺寸',
          description: 'controlSize 提供 small、medium 与 large 三种尺寸。',
          codeToggle: '查看控件尺寸代码',
        },
        en: {
          title: 'Control sizes',
          description: 'controlSize supports small, medium, and large controls.',
          codeToggle: 'View control sizes code',
        },
        code: `import { Space, TimePicker } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <TimePicker controlSize="small" defaultValue="09:00" />
    <TimePicker controlSize="medium" defaultValue="13:30" />
    <TimePicker controlSize="large" defaultValue="18:45" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.TimePicker controlSize="small" defaultValue="09:00" />
            <Cinna.TimePicker controlSize="medium" defaultValue="13:30" />
            <Cinna.TimePicker controlSize="large" defaultValue="18:45" />
          </Cinna.Space>
        ),
      },
      {
        id: 'time-picker-limits-step',
        zh: {
          title: '时间限制与步长',
          description: 'min、max 与 step 来自原生时间输入，可限制可选时间和秒级步长。',
          codeToggle: '查看时间限制与步长代码',
        },
        en: {
          title: 'Time limits and step',
          description: 'min, max, and step come from native time input to constrain time and second step.',
          codeToggle: 'View limits and step code',
        },
        code: `import { TimePicker } from '@cinna-design/react';

export default () => (
  <TimePicker min="09:00" max="18:00" step={900} defaultValue="13:30" />
);`,
        render: () => <Cinna.TimePicker min="09:00" max="18:00" step={900} defaultValue="13:30" />,
      },
      {
        id: 'time-picker-status',
        zh: {
          title: '校验状态',
          description: 'status 可表达成功、警告或错误状态。',
          codeToggle: '查看校验状态代码',
        },
        en: {
          title: 'Validation status',
          description: 'status can express success, warning, or error feedback.',
          codeToggle: 'View validation status code',
        },
        code: `import { Space, TimePicker } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <TimePicker status="success" defaultValue="09:30" />
    <TimePicker status="warning" defaultValue="09:30" />
    <TimePicker status="error" defaultValue="09:30" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.TimePicker status="success" defaultValue="09:30" />
            <Cinna.TimePicker status="warning" defaultValue="09:30" />
            <Cinna.TimePicker status="error" defaultValue="09:30" />
          </Cinna.Space>
        ),
      },
      {
        id: 'time-picker-native-props',
        zh: {
          title: '原生属性',
          description: 'TimePicker 继承原生 input 属性，可使用 disabled、readOnly、name 等能力。',
          codeToggle: '查看原生属性代码',
        },
        en: {
          title: 'Native attributes',
          description: 'TimePicker extends native input attributes such as disabled, readOnly, and name.',
          codeToggle: 'View native attributes code',
        },
        code: `import { Space, TimePicker } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <TimePicker name="meetingTime" defaultValue="09:30" readOnly />
    <TimePicker defaultValue="09:30" disabled />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.TimePicker name="meetingTime" defaultValue="09:30" readOnly />
            <Cinna.TimePicker defaultValue="09:30" disabled />
          </Cinna.Space>
        ),
      },
      {
        id: 'time-picker-controlled',
        zh: {
          title: '受控时间',
          description: 'value 与 onChange 可用于接入外部状态。',
          codeToggle: '查看受控时间代码',
        },
        en: {
          title: 'Controlled time',
          description: 'Use value and onChange to connect TimePicker to external state.',
          codeToggle: 'View controlled time code',
        },
        code: `import { Space, Text, TimePicker } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState('09:30');

  return (
    <Space direction="vertical" align="flex-start">
      <TimePicker value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      <Text tone="secondary">Time: {value}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledTimePickerDemo = () => {
            const [value, setValue] = React.useState('09:30');

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.TimePicker value={value} onChange={(event) => setValue(event.currentTarget.value)} />
                <Cinna.Text tone="secondary">Time: {value}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledTimePickerDemo />;
        },
      },
    ],
  };
