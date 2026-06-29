import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const notificationDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-notification',
        zh: {
          title: '基础通知',
          description: 'title 展示通知标题，content 展示通知正文。',
          codeToggle: '查看基础通知代码',
        },
        en: {
          title: 'Basic notification',
          description: 'title renders the notification heading and content renders the body.',
          codeToggle: 'View basic notification code',
        },
        code: `import { Notification } from '@cinna-design/react';

export default () => (
  <Notification title="Review ready" content="The tasting notes are ready for approval." />
);`,
        render: () => <Cinna.Notification title="Review ready" content="The tasting notes are ready for approval." />,
      },
      {
        id: 'notification-types',
        zh: {
          title: '状态类型',
          description: 'type 可表达成功、信息、警告和错误状态。',
          codeToggle: '查看状态类型代码',
        },
        en: {
          title: 'Status types',
          description: 'Use type to express success, info, warning, and error states.',
          codeToggle: 'View notification status code',
        },
        code: `import { Notification, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Notification type="success" title="Published" content="The menu is live." />
    <Notification type="warning" title="Low stock" content="Check butter inventory before noon." />
    <Notification type="error" title="Sync failed" content="Retry after checking the network." />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch">
            <Cinna.Notification type="success" title="Published" content="The menu is live." />
            <Cinna.Notification type="warning" title="Low stock" content="Check butter inventory before noon." />
            <Cinna.Notification type="error" title="Sync failed" content="Retry after checking the network." />
          </Cinna.Space>
        ),
      },
      {
        id: 'notification-icon',
        zh: {
          title: '自定义图标',
          description: 'icon 可替换标题前的默认状态图标。',
          codeToggle: '查看自定义图标代码',
        },
        en: {
          title: 'Custom icon',
          description: 'Use icon to replace the default status icon before the title.',
          codeToggle: 'View notification icon code',
        },
        code: `import { Notification } from '@cinna-design/react';

export default () => (
  <Notification icon="!" title="Manual review" content="One item needs a second pass." />
);`,
        render: () => <Cinna.Notification icon="!" title="Manual review" content="One item needs a second pass." />,
      },
      {
        id: 'notification-actions',
        zh: {
          title: '操作按钮',
          description: 'actions 可放置通知下方的操作区。',
          codeToggle: '查看操作按钮代码',
        },
        en: {
          title: 'Actions',
          description: 'Use actions to render a command area inside the notification.',
          codeToggle: 'View notification actions code',
        },
        code: `import { Button, Notification, Space } from '@cinna-design/react';

export default () => (
  <Notification
    title="Pending approval"
    content="Two recipes are waiting for review."
    actions={
      <Space size="small">
        <Button size="small">Later</Button>
        <Button size="small" variant="primary">Review</Button>
      </Space>
    }
  />
);`,
        render: () => (
          <Cinna.Notification
            title="Pending approval"
            content="Two recipes are waiting for review."
            actions={
              <Cinna.Space size="small">
                <Cinna.Button size="small">Later</Cinna.Button>
                <Cinna.Button size="small" variant="primary">
                  Review
                </Cinna.Button>
              </Cinna.Space>
            }
          />
        ),
      },
      {
        id: 'notification-closable',
        zh: {
          title: '可关闭',
          description: 'closable 显示关闭按钮，关闭后会卸载当前通知。',
          codeToggle: '查看可关闭代码',
        },
        en: {
          title: 'Closable',
          description: 'closable shows a close button and removes the current notification when clicked.',
          codeToggle: 'View closable notification code',
        },
        code: `import { Notification } from '@cinna-design/react';

export default () => (
  <Notification
    closable
    title="Dismissible note"
    content="This notification can be closed."
    onClose={() => console.log('closed')}
  />
);`,
        render: () => (
          <Cinna.Notification closable title="Dismissible note" content="This notification can be closed." onClose={() => undefined} />
        ),
      },
    ],
  };
