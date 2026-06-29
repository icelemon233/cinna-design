import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const typographyDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-typography',
        zh: {
          title: '基础排版',
          description: '使用 Title 与 Paragraph 构建稳定的标题和段落层级。',
          codeToggle: '查看基础排版代码',
        },
        en: {
          title: 'Basic typography',
          description: 'Use Title and Paragraph to build clear heading and body hierarchy.',
          codeToggle: 'View basic typography code',
        },
        code: `import { Paragraph, Title, Typography } from '@cinna-design/react';

export default () => (
  <Typography>
    <Title level={3}>Cloud-soft release notes</Title>
    <Paragraph>
      Cinna typography keeps product copy warm, readable, and calm across dense documentation pages.
    </Paragraph>
  </Typography>
);`,
        render: () => (
          <Cinna.Typography>
            <Cinna.Title level={3}>Cloud-soft release notes</Cinna.Title>
            <Cinna.Paragraph>
              Cinna typography keeps product copy warm, readable, and calm across dense documentation pages.
            </Cinna.Paragraph>
          </Cinna.Typography>
        ),
      },
      {
        id: 'title-levels',
        zh: {
          title: '标题层级',
          description: '使用 level 表达页面、区块和局部说明的层级。',
          codeToggle: '查看标题层级代码',
        },
        en: {
          title: 'Title levels',
          description: 'Use level to express page, section, and local heading hierarchy.',
          codeToggle: 'View title level code',
        },
        code: `import { Space, Title } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Title level={1}>Level 1</Title>
    <Title level={2}>Level 2</Title>
    <Title level={3}>Level 3</Title>
    <Title level={4}>Level 4</Title>
    <Title level={5}>Level 5</Title>
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.Title level={1}>Level 1</Cinna.Title>
            <Cinna.Title level={2}>Level 2</Cinna.Title>
            <Cinna.Title level={3}>Level 3</Cinna.Title>
            <Cinna.Title level={4}>Level 4</Cinna.Title>
            <Cinna.Title level={5}>Level 5</Cinna.Title>
          </Cinna.Space>
        ),
      },
      {
        id: 'text-styles',
        zh: {
          title: '文本样式与语义色',
          description: '覆盖加粗、标记、代码、下划线、删除线和状态语义。',
          codeToggle: '查看文本样式代码',
        },
        en: {
          title: 'Text styles and tones',
          description: 'Cover strong, mark, code, underline, delete, and semantic tones.',
          codeToggle: 'View text style code',
        },
        code: `import { Space, Text } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Text strong>Strong</Text>
    <Text mark>Marked</Text>
    <Text code>token.color</Text>
    <Text underline>Underline</Text>
    <Text delete>Deleted</Text>
    <Text tone="success">Success</Text>
    <Text tone="warning">Warning</Text>
    <Text tone="error">Error</Text>
    <Text disabled>Disabled</Text>
    <Text link href="#usage">Link</Text>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap>
            <Cinna.Text strong>Strong</Cinna.Text>
            <Cinna.Text mark>Marked</Cinna.Text>
            <Cinna.Text code>token.color</Cinna.Text>
            <Cinna.Text underline>Underline</Cinna.Text>
            <Cinna.Text delete>Deleted</Cinna.Text>
            <Cinna.Text tone="success">Success</Cinna.Text>
            <Cinna.Text tone="warning">Warning</Cinna.Text>
            <Cinna.Text tone="error">Error</Cinna.Text>
            <Cinna.Text disabled>Disabled</Cinna.Text>
            <Cinna.Text link href="#usage">Link</Cinna.Text>
          </Cinna.Space>
        ),
      },
      {
        id: 'compact-muted',
        zh: {
          title: '紧凑与弱化',
          description: '用于表单说明、卡片辅助信息等低层级内容，保持信息密度但不抢主视觉。',
          codeToggle: '查看紧凑弱化代码',
        },
        en: {
          title: 'Compact and muted',
          description: 'Use compact and muted copy for helper text and secondary card content.',
          codeToggle: 'View compact muted code',
        },
        code: `import { Paragraph, Text, Typography } from '@cinna-design/react';

export default () => (
  <Typography compact muted>
    <Paragraph>Draft saved 2 minutes ago.</Paragraph>
    <Text tone="secondary">Helper copy stays quiet but readable.</Text>
  </Typography>
);`,
        render: () => (
          <Cinna.Typography compact muted>
            <Cinna.Paragraph>Draft saved 2 minutes ago.</Cinna.Paragraph>
            <Cinna.Text tone="secondary">Helper copy stays quiet but readable.</Cinna.Text>
          </Cinna.Typography>
        ),
      },
      {
        id: 'ellipsis-expand',
        zh: {
          title: '省略与展开',
          description: '使用 ellipsis 控制最多展示行数，并提供展开和收起操作。',
          codeToggle: '查看省略展开代码',
        },
        en: {
          title: 'Ellipsis and expand',
          description: 'Use ellipsis to limit visible lines and provide expand or collapse actions.',
          codeToggle: 'View ellipsis code',
        },
        surfaceClassName: 'typography-example-surface',
        code: `import { Paragraph, Typography } from '@cinna-design/react';

export default () => (
  <Typography compact>
    <Paragraph ellipsis={{ rows: 2, expandable: true, moreText: '展开', lessText: '收起' }}>
      Long release notes can stay tidy in dense layouts. Keep the first two lines visible, then let readers expand the rest when they need the full context.
    </Paragraph>
  </Typography>
);`,
        render: () => (
          <Cinna.Typography compact>
            <Cinna.Paragraph ellipsis={{ rows: 2, expandable: true, moreText: '展开', lessText: '收起' }}>
              Long release notes can stay tidy in dense layouts. Keep the first two lines visible, then let readers expand the rest when they need the full context.
            </Cinna.Paragraph>
          </Cinna.Typography>
        ),
      },
      {
        id: 'copyable-text',
        zh: {
          title: '复制按钮',
          description: 'copyable 会在文本后追加主题风格的复制操作，适合令牌、链接和固定说明。',
          codeToggle: '查看复制按钮代码',
        },
        en: {
          title: 'Copy button',
          description: 'copyable appends a themed copy action for tokens, links, and fixed messages.',
          codeToggle: 'View copyable code',
        },
        surfaceClassName: 'typography-example-surface',
        code: `import { Paragraph, Text, Typography } from '@cinna-design/react';

export default () => (
  <Typography compact>
    <Text code copyable={{ text: 'token.color.cloud.500', copyText: '复制', copiedText: '已复制' }}>
      token.color.cloud.500
    </Text>
    <Paragraph copyable={{ text: 'Ready for review', copyText: '复制', copiedText: '已复制' }}>
      Ready for review
    </Paragraph>
  </Typography>
);`,
        render: () => (
          <Cinna.Typography compact>
            <Cinna.Text code copyable={{ text: 'token.color.cloud.500', copyText: '复制', copiedText: '已复制' }}>
              token.color.cloud.500
            </Cinna.Text>
            <Cinna.Paragraph copyable={{ text: 'Ready for review', copyText: '复制', copiedText: '已复制' }}>
              Ready for review
            </Cinna.Paragraph>
          </Cinna.Typography>
        ),
      },
    ],
  };
