import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const messageDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-message',
        zh: {
          title: '基础提示',
          description: 'content 是提示内容，默认使用 info 状态。',
          codeToggle: '查看基础提示代码',
        },
        en: {
          title: 'Basic message',
          description: 'content is the message body, with info status by default.',
          codeToggle: 'View basic message code',
        },
        code: `import { Message } from '@cinna-design/react';

export default () => <Message content="Saved successfully." />;`,
        render: () => <Cinna.Message content="Saved successfully." />,
      },
      {
        id: 'message-types',
        zh: {
          title: '状态类型',
          description: 'type 支持 info、success、warning 和 error 四种反馈状态。',
          codeToggle: '查看状态类型代码',
        },
        en: {
          title: 'Status types',
          description: 'type supports info, success, warning, and error feedback states.',
          codeToggle: 'View message status code',
        },
        code: `import { Message, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Message type="success" content="Published." />
    <Message type="info" content="Draft restored." />
    <Message type="warning" content="Review recommended." />
    <Message type="error" content="Sync failed." />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.Message type="success" content="Published." />
            <Cinna.Message type="info" content="Draft restored." />
            <Cinna.Message type="warning" content="Review recommended." />
            <Cinna.Message type="error" content="Sync failed." />
          </Cinna.Space>
        ),
      },
      {
        id: 'message-custom-icon',
        zh: {
          title: '自定义图标',
          description: 'icon 可替换默认状态图标。',
          codeToggle: '查看自定义图标代码',
        },
        en: {
          title: 'Custom icon',
          description: 'Use icon to replace the default status icon.',
          codeToggle: 'View custom message icon code',
        },
        code: `import { Message } from '@cinna-design/react';

export default () => <Message icon="i" content="Custom icon content." />;`,
        render: () => <Cinna.Message icon="i" content="Custom icon content." />,
      },
      {
        id: 'message-closable',
        zh: {
          title: '可关闭',
          description: 'closable 显示关闭按钮，点击后会卸载当前提示。',
          codeToggle: '查看可关闭代码',
        },
        en: {
          title: 'Closable',
          description: 'closable shows a close button and removes the current message when clicked.',
          codeToggle: 'View closable message code',
        },
        code: `import { Message } from '@cinna-design/react';

export default () => (
  <Message closable content="This message can be dismissed." onClose={() => console.log('closed')} />
);`,
        render: () => <Cinna.Message closable content="This message can be dismissed." onClose={() => undefined} />,
      },
      {
        id: 'message-inline-stack',
        zh: {
          title: '组合排列',
          description: 'Message 是普通 React 组件，可以和布局组件一起组成局部提示区。',
          codeToggle: '查看组合排列代码',
        },
        en: {
          title: 'Stacked messages',
          description: 'Message is a normal React component and can be composed with layout components.',
          codeToggle: 'View stacked message code',
        },
        code: `import { Message, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Message type="success" content="Assets uploaded." />
    <Message type="warning" content="Two files need review." />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.Message type="success" content="Assets uploaded." />
            <Cinna.Message type="warning" content="Two files need review." />
          </Cinna.Space>
        ),
      },
    ],
  };
