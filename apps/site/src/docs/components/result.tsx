import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const resultDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-result',
        zh: {
          title: '基础结果',
          description: 'title 展示主要结果，subTitle 展示补充说明。',
          codeToggle: '查看基础结果代码',
        },
        en: {
          title: 'Basic result',
          description: 'title renders the main result and subTitle renders supporting copy.',
          codeToggle: 'View basic result code',
        },
        code: `import { Result } from '@cinna-design/react';

export default () => (
  <Result title="All changes saved" subTitle="The draft can be reopened from your workspace." />
);`,
        render: () => <Cinna.Result title="All changes saved" subTitle="The draft can be reopened from your workspace." />,
      },
      {
        id: 'result-status',
        zh: {
          title: '状态类型',
          description: 'status 支持 info、success、warning 和 error 四种反馈状态。',
          codeToggle: '查看状态类型代码',
        },
        en: {
          title: 'Status types',
          description: 'status supports info, success, warning, and error feedback states.',
          codeToggle: 'View result status code',
        },
        code: `import { Result, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Result status="success" title="Published" />
    <Result status="warning" title="Needs review" />
    <Result status="error" title="Publish failed" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch">
            <Cinna.Result status="success" title="Published" />
            <Cinna.Result status="warning" title="Needs review" />
            <Cinna.Result status="error" title="Publish failed" />
          </Cinna.Space>
        ),
      },
      {
        id: 'result-extra',
        zh: {
          title: '操作区',
          description: 'extra 可放置按钮，帮助用户继续处理结果后的下一步。',
          codeToggle: '查看操作区代码',
        },
        en: {
          title: 'Actions',
          description: 'Use extra for buttons that help users continue after the result.',
          codeToggle: 'View result actions code',
        },
        code: `import { Button, Result, Space } from '@cinna-design/react';

export default () => (
  <Result
    status="success"
    title="Menu published"
    subTitle="Customers can now see the latest seasonal menu."
    extra={
      <Space>
        <Button>Preview</Button>
        <Button variant="primary">Share</Button>
      </Space>
    }
  />
);`,
        render: () => (
          <Cinna.Result
            status="success"
            title="Menu published"
            subTitle="Customers can now see the latest seasonal menu."
            extra={
              <Cinna.Space>
                <Cinna.Button>Preview</Cinna.Button>
                <Cinna.Button variant="primary">Share</Cinna.Button>
              </Cinna.Space>
            }
          />
        ),
      },
      {
        id: 'result-custom-icon',
        zh: {
          title: '自定义图标',
          description: 'icon 可替换默认状态图标。',
          codeToggle: '查看自定义图标代码',
        },
        en: {
          title: 'Custom icon',
          description: 'Use icon to replace the default status icon.',
          codeToggle: 'View result icon code',
        },
        code: `import { Result } from '@cinna-design/react';

export default () => <Result icon="OK" title="Custom icon result" />;`,
        render: () => <Cinna.Result icon="OK" title="Custom icon result" />,
      },
      {
        id: 'result-subtitle',
        zh: {
          title: '长说明',
          description: 'subTitle 支持 ReactNode，可承载更完整的结果说明。',
          codeToggle: '查看长说明代码',
        },
        en: {
          title: 'Long description',
          description: 'subTitle accepts ReactNode for richer result details.',
          codeToggle: 'View result subtitle code',
        },
        code: `import { Result, Text } from '@cinna-design/react';

export default () => (
  <Result
    status="warning"
    title="Some fields need attention"
    subTitle={<Text tone="secondary">Check price, pickup time, and inventory before publishing.</Text>}
  />
);`,
        render: () => (
          <Cinna.Result
            status="warning"
            title="Some fields need attention"
            subTitle={<Cinna.Text tone="secondary">Check price, pickup time, and inventory before publishing.</Cinna.Text>}
          />
        ),
      },
    ],
  };
