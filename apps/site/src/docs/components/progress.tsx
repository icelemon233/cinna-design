import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const progressDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-progress',
        zh: {
          title: '线形进度',
          description: 'percent 设置当前进度，默认展示百分比文本。',
          codeToggle: '查看线形进度代码',
        },
        en: {
          title: 'Line progress',
          description: 'percent sets the current progress and shows percentage text by default.',
          codeToggle: 'View line progress code',
        },
        code: `import { Progress, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Progress percent={30} />
    <Progress percent={68} />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch">
            <Cinna.Progress percent={30} />
            <Cinna.Progress percent={68} />
          </Cinna.Space>
        ),
      },
      {
        id: 'progress-circle',
        zh: {
          title: '环形进度',
          description: 'type="circle" 展示环形进度，适合空间较独立的状态区域。',
          codeToggle: '查看环形进度代码',
        },
        en: {
          title: 'Circle progress',
          description: 'type="circle" renders circular progress for standalone status areas.',
          codeToggle: 'View circle progress code',
        },
        code: `import { Progress } from '@cinna-design/react';

export default () => <Progress type="circle" percent={72} />;`,
        render: () => <Cinna.Progress type="circle" percent={72} />,
      },
      {
        id: 'progress-status',
        zh: {
          title: '进度状态',
          description: 'status 可表达 normal、success、warning 和 error 状态。',
          codeToggle: '查看进度状态代码',
        },
        en: {
          title: 'Status',
          description: 'status supports normal, success, warning, and error states.',
          codeToggle: 'View progress status code',
        },
        code: `import { Progress, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Progress percent={100} status="success" />
    <Progress percent={82} status="warning" />
    <Progress percent={48} status="error" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch">
            <Cinna.Progress percent={100} status="success" />
            <Cinna.Progress percent={82} status="warning" />
            <Cinna.Progress percent={48} status="error" />
          </Cinna.Space>
        ),
      },
      {
        id: 'progress-hide-info',
        zh: {
          title: '隐藏文本',
          description: 'showInfo={false} 可隐藏右侧进度文本。',
          codeToggle: '查看隐藏文本代码',
        },
        en: {
          title: 'Hide text',
          description: 'Use showInfo={false} to hide the progress text.',
          codeToggle: 'View hide progress text code',
        },
        code: `import { Progress } from '@cinna-design/react';

export default () => <Progress percent={56} showInfo={false} />;`,
        render: () => <Cinna.Progress percent={56} showInfo={false} />,
      },
      {
        id: 'progress-color',
        zh: {
          title: '自定义颜色',
          description: 'strokeColor 可替换线形进度的填充色。',
          codeToggle: '查看自定义颜色代码',
        },
        en: {
          title: 'Custom color',
          description: 'strokeColor replaces the fill color for line progress.',
          codeToggle: 'View progress color code',
        },
        code: `import { Progress } from '@cinna-design/react';

export default () => <Progress percent={64} strokeColor="#d8738a" />;`,
        render: () => <Cinna.Progress percent={64} strokeColor="#d8738a" />,
      },
      {
        id: 'progress-format',
        zh: {
          title: '格式化文本',
          description: 'format 可自定义进度文本内容。',
          codeToggle: '查看格式化文本代码',
        },
        en: {
          title: 'Formatted text',
          description: 'Use format to customize the progress text.',
          codeToggle: 'View progress format code',
        },
        code: `import { Progress } from '@cinna-design/react';

export default () => <Progress percent={75} format={(percent) => \`\${percent} orders\`} />;`,
        render: () => <Cinna.Progress percent={75} format={(percent) => `${percent} orders`} />,
      },
    ],
  };
