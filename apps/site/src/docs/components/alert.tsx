import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const alertDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-alert',
        zh: {
          title: '基础提示',
          description: 'message 是主要提示内容，默认使用 info 信息状态。',
          codeToggle: '查看基础提示代码',
        },
        en: {
          title: 'Basic alert',
          description: 'message is the main alert content, with info status by default.',
          codeToggle: 'View basic alert code',
        },
        code: `import { Alert } from '@cinna-design/react';

export default () => <Alert message="Recipe saved to drafts." />;`,
        render: () => <Cinna.Alert message="Recipe saved to drafts." />,
      },
      {
        id: 'alert-types',
        zh: {
          title: '状态类型',
          description: 'type 支持 info、success、warning 和 error 四种状态。',
          codeToggle: '查看状态类型代码',
        },
        en: {
          title: 'Status types',
          description: 'type supports info, success, warning, and error.',
          codeToggle: 'View alert status code',
        },
        code: `import { Alert, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Alert type="success" message="Batch approved." />
    <Alert type="info" message="New review note available." />
    <Alert type="warning" message="Stock is running low." />
    <Alert type="error" message="Publish failed." />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch">
            <Cinna.Alert type="success" message="Batch approved." />
            <Cinna.Alert type="info" message="New review note available." />
            <Cinna.Alert type="warning" message="Stock is running low." />
            <Cinna.Alert type="error" message="Publish failed." />
          </Cinna.Space>
        ),
      },
      {
        id: 'alert-description',
        zh: {
          title: '辅助说明',
          description: 'description 用于补充更完整的上下文。',
          codeToggle: '查看辅助说明代码',
        },
        en: {
          title: 'Description',
          description: 'Use description to add richer context below the main message.',
          codeToggle: 'View alert description code',
        },
        code: `import { Alert } from '@cinna-design/react';

export default () => (
  <Alert
    type="warning"
    message="Delivery window changed"
    description="The next pickup slot starts at 16:30. Please confirm before publishing."
  />
);`,
        render: () => (
          <Cinna.Alert
            type="warning"
            message="Delivery window changed"
            description="The next pickup slot starts at 16:30. Please confirm before publishing."
          />
        ),
      },
      {
        id: 'alert-icon',
        zh: {
          title: '图标控制',
          description: 'showIcon 可隐藏默认图标，icon 可替换为自定义内容。',
          codeToggle: '查看图标控制代码',
        },
        en: {
          title: 'Icon control',
          description: 'Use showIcon to hide the default icon, or icon to provide custom content.',
          codeToggle: 'View alert icon code',
        },
        code: `import { Alert, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Alert showIcon={false} message="Text-only update." />
    <Alert type="success" icon="OK" message="Custom icon content." />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch">
            <Cinna.Alert showIcon={false} message="Text-only update." />
            <Cinna.Alert type="success" icon="OK" message="Custom icon content." />
          </Cinna.Space>
        ),
      },
      {
        id: 'alert-closable',
        zh: {
          title: '可关闭',
          description: 'closable 显示关闭按钮，closeText 可替换关闭按钮内容。',
          codeToggle: '查看可关闭代码',
        },
        en: {
          title: 'Closable',
          description: 'closable shows the close button, and closeText replaces its content.',
          codeToggle: 'View closable alert code',
        },
        code: `import { Alert } from '@cinna-design/react';

export default () => (
  <Alert
    closable
    closeText="Dismiss"
    message="This alert can be closed."
    onClose={() => console.log('closed')}
  />
);`,
        render: () => <Cinna.Alert closable closeText="Dismiss" message="This alert can be closed." onClose={() => undefined} />,
      },
      {
        id: 'alert-action-banner',
        zh: {
          title: '操作与公告',
          description: 'action 可放置操作区，banner 适合页面顶部公告式提示。',
          codeToggle: '查看操作与公告代码',
        },
        en: {
          title: 'Action and banner',
          description: 'Use action for commands and banner for page-level notices.',
          codeToggle: 'View alert action code',
        },
        code: `import { Alert, Button } from '@cinna-design/react';

export default () => (
  <Alert
    banner
    type="warning"
    message="Scheduled maintenance tonight."
    action={<Button size="small">Details</Button>}
  />
);`,
        render: () => (
          <Cinna.Alert
            banner
            type="warning"
            message="Scheduled maintenance tonight."
            action={<Cinna.Button size="small">Details</Cinna.Button>}
          />
        ),
      },
    ],
  };
