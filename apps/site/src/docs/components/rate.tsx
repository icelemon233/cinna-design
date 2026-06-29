import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const rateDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-rate',
        zh: {
          title: '基本用法',
          description: '用于对对象进行快速评分。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic rate',
          description: 'Use it for quick rating interactions.',
          codeToggle: 'View basic rate code',
        },
        code: `import { Rate } from '@cinna-design/react';

export default () => <Rate defaultValue={3} />;`,
        render: () => <Cinna.Rate defaultValue={3} />,
      },
      {
        id: 'rate-count',
        zh: {
          title: '评分数量',
          description: 'count 可调整评分项总数。',
          codeToggle: '查看评分数量代码',
        },
        en: {
          title: 'Rating count',
          description: 'count adjusts the total number of rating items.',
          codeToggle: 'View rating count code',
        },
        code: `import { Rate } from '@cinna-design/react';

export default () => <Rate count={7} defaultValue={4} />;`,
        render: () => <Cinna.Rate count={7} defaultValue={4} />,
      },
      {
        id: 'rate-clear',
        zh: {
          title: '允许清除',
          description: 'allowClear 允许再次点击当前分值后清空选择。',
          codeToggle: '查看允许清除代码',
        },
        en: {
          title: 'Allow clear',
          description: 'allowClear lets users click the current value again to clear it.',
          codeToggle: 'View allow clear code',
        },
        code: `import { Rate } from '@cinna-design/react';

export default () => <Rate allowClear defaultValue={3} />;`,
        render: () => <Cinna.Rate allowClear defaultValue={3} />,
      },
      {
        id: 'rate-character',
        zh: {
          title: '自定义字符',
          description: 'character 可替换默认评分字符，也可以按序号返回不同内容。',
          codeToggle: '查看自定义字符代码',
        },
        en: {
          title: 'Custom character',
          description: 'character replaces the default rating mark and can vary by index.',
          codeToggle: 'View custom character code',
        },
        code: `import { Rate, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Rate character="+" defaultValue={3} />
    <Rate character={(index) => index} defaultValue={4} />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.Rate character="+" defaultValue={3} />
            <Cinna.Rate character={(index) => index} defaultValue={4} />
          </Cinna.Space>
        ),
      },
      {
        id: 'rate-disabled-controlled',
        zh: {
          title: '禁用与受控',
          description: 'disabled 阻止交互，value 与 onChange 可接入外部状态。',
          codeToggle: '查看禁用与受控代码',
        },
        en: {
          title: 'Disabled and controlled',
          description: 'disabled prevents interaction, while value and onChange connect external state.',
          codeToggle: 'View disabled and controlled code',
        },
        code: `import { Rate, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(2);

  return (
    <Space direction="vertical" align="flex-start">
      <Rate defaultValue={4} disabled />
      <Rate value={value} onChange={setValue} />
      <Text tone="secondary">Rating: {value}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledRateDemo = () => {
            const [value, setValue] = React.useState(2);

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Rate defaultValue={4} disabled />
                <Cinna.Rate value={value} onChange={setValue} />
                <Cinna.Text tone="secondary">Rating: {value}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledRateDemo />;
        },
      },
    ],
  };
