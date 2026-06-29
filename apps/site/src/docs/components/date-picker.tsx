import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const datePickerDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-date-picker',
        zh: {
          title: '基本用法',
          description: '用于录入单个日期。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic date picker',
          description: 'Use it to enter a single date.',
          codeToggle: 'View basic date picker code',
        },
        code: `import { DatePicker } from '@cinna-design/react';

export default () => <DatePicker defaultValue="2026-06-17" />;`,
        render: () => <Cinna.DatePicker defaultValue="2026-06-17" />,
      },
      {
        id: 'date-picker-sizes',
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
        code: `import { DatePicker, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <DatePicker controlSize="small" defaultValue="2026-01-01" />
    <DatePicker controlSize="medium" defaultValue="2026-06-17" />
    <DatePicker controlSize="large" defaultValue="2026-12-31" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.DatePicker controlSize="small" defaultValue="2026-01-01" />
            <Cinna.DatePicker controlSize="medium" defaultValue="2026-06-17" />
            <Cinna.DatePicker controlSize="large" defaultValue="2026-12-31" />
          </Cinna.Space>
        ),
      },
      {
        id: 'date-picker-range-limits',
        zh: {
          title: '日期限制',
          description: 'min 与 max 来自原生日期输入，可限制可选日期范围。',
          codeToggle: '查看日期限制代码',
        },
        en: {
          title: 'Date limits',
          description: 'min and max come from native date input and constrain selectable dates.',
          codeToggle: 'View date limits code',
        },
        code: `import { DatePicker } from '@cinna-design/react';

export default () => (
  <DatePicker min="2026-01-01" max="2026-12-31" defaultValue="2026-06-17" />
);`,
        render: () => <Cinna.DatePicker min="2026-01-01" max="2026-12-31" defaultValue="2026-06-17" />,
      },
      {
        id: 'date-picker-status',
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
        code: `import { DatePicker, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <DatePicker status="success" defaultValue="2026-06-17" />
    <DatePicker status="warning" defaultValue="2026-06-17" />
    <DatePicker status="error" defaultValue="2026-06-17" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.DatePicker status="success" defaultValue="2026-06-17" />
            <Cinna.DatePicker status="warning" defaultValue="2026-06-17" />
            <Cinna.DatePicker status="error" defaultValue="2026-06-17" />
          </Cinna.Space>
        ),
      },
      {
        id: 'date-picker-native-props',
        zh: {
          title: '原生属性',
          description: 'DatePicker 继承原生 input 属性，可使用 disabled、readOnly、name 等能力。',
          codeToggle: '查看原生属性代码',
        },
        en: {
          title: 'Native attributes',
          description: 'DatePicker extends native input attributes such as disabled, readOnly, and name.',
          codeToggle: 'View native attributes code',
        },
        code: `import { DatePicker, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <DatePicker name="releaseDate" defaultValue="2026-06-17" readOnly />
    <DatePicker defaultValue="2026-06-17" disabled />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.DatePicker name="releaseDate" defaultValue="2026-06-17" readOnly />
            <Cinna.DatePicker defaultValue="2026-06-17" disabled />
          </Cinna.Space>
        ),
      },
      {
        id: 'date-picker-controlled',
        zh: {
          title: '受控日期',
          description: 'value 与 onChange 可用于接入外部状态。',
          codeToggle: '查看受控日期代码',
        },
        en: {
          title: 'Controlled date',
          description: 'Use value and onChange to connect DatePicker to external state.',
          codeToggle: 'View controlled date code',
        },
        code: `import { DatePicker, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState('2026-06-17');

  return (
    <Space direction="vertical" align="flex-start">
      <DatePicker value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      <Text tone="secondary">Date: {value}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledDatePickerDemo = () => {
            const [value, setValue] = React.useState('2026-06-17');

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.DatePicker value={value} onChange={(event) => setValue(event.currentTarget.value)} />
                <Cinna.Text tone="secondary">Date: {value}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledDatePickerDemo />;
        },
      },
    ],
  };
