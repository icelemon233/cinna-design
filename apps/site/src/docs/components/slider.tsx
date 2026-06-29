import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const sliderDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-slider',
        zh: {
          title: '基本用法',
          description: '用于在连续数值区间内选择一个值。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic slider',
          description: 'Use it to choose one value within a continuous numeric range.',
          codeToggle: 'View basic slider code',
        },
        code: `import { Slider } from '@cinna-design/react';

export default () => <Slider defaultValue={36} />;`,
        render: () => (
          <div style={{ width: 'min(460px, 100%)' }}>
            <Cinna.Slider defaultValue={36} />
          </div>
        ),
      },
      {
        id: 'slider-range-step',
        zh: {
          title: '范围与步长',
          description: 'min、max 与 step 来自原生 range 属性，用于约束可选值。',
          codeToggle: '查看范围与步长代码',
        },
        en: {
          title: 'Range and step',
          description: 'min, max, and step come from native range attributes to constrain values.',
          codeToggle: 'View range and step code',
        },
        code: `import { Slider } from '@cinna-design/react';

export default () => (
  <Slider min={0} max={10} step={2} defaultValue={4} showValue />
);`,
        render: () => (
          <div style={{ width: 'min(460px, 100%)' }}>
            <Cinna.Slider min={0} max={10} step={2} defaultValue={4} showValue />
          </div>
        ),
      },
      {
        id: 'slider-show-value',
        zh: {
          title: '展示当前值',
          description: 'showValue 会在滑块下方显示当前值。',
          codeToggle: '查看展示当前值代码',
        },
        en: {
          title: 'Show current value',
          description: 'showValue displays the current value below the slider.',
          codeToggle: 'View show value code',
        },
        code: `import { Slider } from '@cinna-design/react';

export default () => <Slider showValue defaultValue={64} />;`,
        render: () => (
          <div style={{ width: 'min(460px, 100%)' }}>
            <Cinna.Slider showValue defaultValue={64} />
          </div>
        ),
      },
      {
        id: 'slider-marks',
        zh: {
          title: '刻度标记',
          description: 'marks 用于在滑轨下方展示关键刻度。',
          codeToggle: '查看刻度标记代码',
        },
        en: {
          title: 'Marks',
          description: 'marks renders important scale labels under the track.',
          codeToggle: 'View marks code',
        },
        code: `import { Slider } from '@cinna-design/react';

export default () => (
  <Slider
    defaultValue={50}
    marks={{ 0: '0', 50: '50', 100: '100' }}
  />
);`,
        render: () => (
          <div style={{ width: 'min(460px, 100%)' }}>
            <Cinna.Slider defaultValue={50} marks={{ 0: '0', 50: '50', 100: '100' }} />
          </div>
        ),
      },
      {
        id: 'slider-tooltip-controlled',
        zh: {
          title: '提示与受控状态',
          description: 'tooltip 展示当前值，value 与 onChange 可接入外部状态。',
          codeToggle: '查看提示与受控状态代码',
        },
        en: {
          title: 'Value hint and controlled value',
          description: 'tooltip displays the current value, while value and onChange connect external state.',
          codeToggle: 'View value hint and controlled code',
        },
        code: `import { Slider, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState('28');

  return (
    <Space direction="vertical" align="stretch" style={{ width: 'min(460px, 100%)' }}>
      <Slider
        tooltip
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Text tone="secondary">Value: {value}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledSliderDemo = () => {
            const [value, setValue] = React.useState('28');

            return (
              <Cinna.Space direction="vertical" align="stretch" style={{ width: 'min(460px, 100%)' }}>
                <Cinna.Slider
                  tooltip
                  value={value}
                  onChange={(event) => setValue(event.currentTarget.value)}
                />
                <Cinna.Text tone="secondary">Value: {value}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledSliderDemo />;
        },
      },
    ],
  };
