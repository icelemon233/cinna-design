import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const tagDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-tag',
        zh: {
          title: '基本标签',
          description: 'Tag 用于标记属性、状态或分类信息。',
          codeToggle: '查看基本标签代码',
        },
        en: {
          title: 'Basic tag',
          description: 'Use Tag to mark attributes, statuses, or categories.',
          codeToggle: 'View basic tag code',
        },
        code: `import { Space, Tag } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Tag>Cloud</Tag>
    <Tag color="cream">Draft</Tag>
    <Tag color="pistachio">Ready</Tag>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap>
            <Cinna.Tag>Cloud</Cinna.Tag>
            <Cinna.Tag color="cream">Draft</Cinna.Tag>
            <Cinna.Tag color="pistachio">Ready</Cinna.Tag>
          </Cinna.Space>
        ),
      },
      {
        id: 'tag-colors',
        zh: {
          title: '标签色',
          description: 'color 提供六种柔和色彩，适合分类、优先级和状态区分。',
          codeToggle: '查看标签色代码',
        },
        en: {
          title: 'Tag colors',
          description: 'color provides six soft tones for categories, priority, and status.',
          codeToggle: 'View tag color code',
        },
        code: `import { Space, Tag } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Tag color="blue">Blue</Tag>
    <Tag color="butter">Butter</Tag>
    <Tag color="strawberry">Strawberry</Tag>
    <Tag color="pistachio">Pistachio</Tag>
    <Tag color="lavender">Lavender</Tag>
    <Tag color="cream">Cream</Tag>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap>
            <Cinna.Tag color="blue">Blue</Cinna.Tag>
            <Cinna.Tag color="butter">Butter</Cinna.Tag>
            <Cinna.Tag color="strawberry">Strawberry</Cinna.Tag>
            <Cinna.Tag color="pistachio">Pistachio</Cinna.Tag>
            <Cinna.Tag color="lavender">Lavender</Cinna.Tag>
            <Cinna.Tag color="cream">Cream</Cinna.Tag>
          </Cinna.Space>
        ),
      },
      {
        id: 'tag-closable',
        zh: {
          title: '可关闭标签',
          description: 'closable 会显示关闭按钮，关闭后标签会从页面中移除。',
          codeToggle: '查看可关闭标签代码',
        },
        en: {
          title: 'Closable tag',
          description: 'closable shows a close button and removes the tag after closing.',
          codeToggle: 'View closable tag code',
        },
        code: `import { Space, Tag } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Tag closable>Removable</Tag>
    <Tag color="strawberry" closable>Issue</Tag>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap>
            <Cinna.Tag closable>Removable</Cinna.Tag>
            <Cinna.Tag color="strawberry" closable>Issue</Cinna.Tag>
          </Cinna.Space>
        ),
      },
      {
        id: 'tag-borderless-icon',
        zh: {
          title: '图标与无边框',
          description: 'icon 可添加前置标识，bordered={false} 可降低视觉重量。',
          codeToggle: '查看图标与无边框代码',
        },
        en: {
          title: 'Icon and borderless',
          description: 'icon adds a leading mark, while bordered={false} lowers visual weight.',
          codeToggle: 'View icon borderless code',
        },
        code: `import { Space, Tag } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Tag icon="*" color="blue">Featured</Tag>
    <Tag bordered={false} color="lavender">Quiet</Tag>
    <Tag icon="!" bordered={false} color="butter">Notice</Tag>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap>
            <Cinna.Tag icon="*" color="blue">Featured</Cinna.Tag>
            <Cinna.Tag bordered={false} color="lavender">Quiet</Cinna.Tag>
            <Cinna.Tag icon="!" bordered={false} color="butter">Notice</Cinna.Tag>
          </Cinna.Space>
        ),
      },
      {
        id: 'tag-close-callback',
        zh: {
          title: '关闭回调',
          description: 'onClose 会在用户关闭标签时触发，适合同步外部状态。',
          codeToggle: '查看关闭回调代码',
        },
        en: {
          title: 'Close callback',
          description: 'onClose fires when the user closes a tag, useful for syncing external state.',
          codeToggle: 'View close callback code',
        },
        code: `import { Space, Tag, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [closed, setClosed] = useState(0);

  return (
    <Space direction="vertical" align="flex-start">
      <Tag closable onClose={() => setClosed((value) => value + 1)}>
        Close me
      </Tag>
      <Text tone="secondary">Closed tags: {closed}</Text>
    </Space>
  );
};`,
        render: () => {
          const TagCloseDemo = () => {
            const [closed, setClosed] = React.useState(0);

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Tag closable onClose={() => setClosed((value) => value + 1)}>
                  Close me
                </Cinna.Tag>
                <Cinna.Text tone="secondary">Closed tags: {closed}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <TagCloseDemo />;
        },
      },
    ],
  };
