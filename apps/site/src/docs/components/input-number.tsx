import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const inputNumberDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-input-number',
        zh: {
          title: '基本用法',
          description: '用于录入标准数字值，并提供默认增减控制。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic input number',
          description: 'Use it to enter numeric values with default step controls.',
          codeToggle: 'View basic input number code',
        },
        code: `import { InputNumber } from '@cinna-design/react';

export default () => <InputNumber defaultValue={3} />;`,
        render: () => <Cinna.InputNumber defaultValue={3} />,
      },
      {
        id: 'input-number-sizes',
        zh: {
          title: '控件尺寸',
          description: 'controlSize 提供 small、medium 与 large 三种高度。',
          codeToggle: '查看控件尺寸代码',
        },
        en: {
          title: 'Control sizes',
          description: 'controlSize supports small, medium, and large heights.',
          codeToggle: 'View control sizes code',
        },
        code: `import { InputNumber, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <InputNumber controlSize="small" defaultValue={1} />
    <InputNumber controlSize="medium" defaultValue={2} />
    <InputNumber controlSize="large" defaultValue={3} />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.InputNumber controlSize="small" defaultValue={1} />
            <Cinna.InputNumber controlSize="medium" defaultValue={2} />
            <Cinna.InputNumber controlSize="large" defaultValue={3} />
          </Cinna.Space>
        ),
      },
      {
        id: 'input-number-range-step',
        zh: {
          title: '范围与步长',
          description: 'min、max 与 step 用于约束数值范围和每次变化幅度。',
          codeToggle: '查看范围与步长代码',
        },
        en: {
          title: 'Range and step',
          description: 'Use min, max, and step to constrain the value and each change.',
          codeToggle: 'View range and step code',
        },
        code: `import { InputNumber } from '@cinna-design/react';

export default () => (
  <InputNumber min={0} max={100} step={5} defaultValue={40} />
);`,
        render: () => <Cinna.InputNumber min={0} max={100} step={5} defaultValue={40} />,
      },
      {
        id: 'input-number-without-controls',
        zh: {
          title: '隐藏控制按钮',
          description: 'controls={false} 会保留数字输入能力，但隐藏两侧增减按钮。',
          codeToggle: '查看隐藏控制按钮代码',
        },
        en: {
          title: 'Without controls',
          description: 'controls={false} keeps numeric input while hiding the step buttons.',
          codeToggle: 'View controls code',
        },
        code: `import { InputNumber } from '@cinna-design/react';

export default () => <InputNumber controls={false} defaultValue={18} />;`,
        render: () => <Cinna.InputNumber controls={false} defaultValue={18} />,
      },
      {
        id: 'input-number-disabled',
        zh: {
          title: '禁用状态',
          description: 'disabled 会同时禁用输入框与增减按钮。',
          codeToggle: '查看禁用状态代码',
        },
        en: {
          title: 'Disabled',
          description: 'disabled prevents both typing and step button interaction.',
          codeToggle: 'View disabled code',
        },
        code: `import { InputNumber } from '@cinna-design/react';

export default () => <InputNumber defaultValue={8} disabled />;`,
        render: () => <Cinna.InputNumber defaultValue={8} disabled />,
      },
      {
        id: 'input-number-native-props',
        zh: {
          title: '原生属性',
          description: 'InputNumber 继承原生 input 属性，可使用 placeholder、readOnly、name 等能力。',
          codeToggle: '查看原生属性代码',
        },
        en: {
          title: 'Native attributes',
          description: 'InputNumber extends native input attributes such as placeholder, readOnly, and name.',
          codeToggle: 'View native attributes code',
        },
        code: `import { InputNumber } from '@cinna-design/react';

export default () => (
  <InputNumber
    controls={false}
    name="capacity"
    placeholder="Capacity"
    readOnly
    value={24}
  />
);`,
        render: () => (
          <Cinna.InputNumber
            controls={false}
            name="capacity"
            placeholder="Capacity"
            readOnly
            value={24}
          />
        ),
      },
    ],
  };
