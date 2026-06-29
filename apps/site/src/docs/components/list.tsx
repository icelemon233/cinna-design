import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const listDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-list',
        zh: {
          title: '基本列表',
          description: 'dataSource 提供列表数据，renderItem 决定每一项如何展示。',
          codeToggle: '查看基本列表代码',
        },
        en: {
          title: 'Basic list',
          description: 'dataSource provides list data, and renderItem controls each row.',
          codeToggle: 'View basic list code',
        },
        code: `import { List, Text } from '@cinna-design/react';

const items = ['Button', 'Input', 'Card'];

export default () => (
  <List dataSource={items} renderItem={(item) => <Text strong>{item}</Text>} />
);`,
        render: () => (
          <Cinna.List
            dataSource={['Button', 'Input', 'Card']}
            renderItem={(item) => <Cinna.Text strong>{item}</Cinna.Text>}
          />
        ),
      },
      {
        id: 'list-header-footer',
        zh: {
          title: '头部与底部',
          description: 'header 和 footer 可补充列表标题、统计信息或批量操作入口。',
          codeToggle: '查看头部与底部代码',
        },
        en: {
          title: 'Header and footer',
          description: 'header and footer can add titles, summaries, or batch action areas.',
          codeToggle: 'View header footer code',
        },
        code: `import { List, Tag } from '@cinna-design/react';

const items = ['Docs review', 'Token polish', 'Release note'];

export default () => (
  <List
    header="Current checklist"
    footer="3 tasks"
    dataSource={items}
    renderItem={(item) => <Tag color="blue">{item}</Tag>}
  />
);`,
        render: () => (
          <Cinna.List
            header="Current checklist"
            footer="3 tasks"
            dataSource={['Docs review', 'Token polish', 'Release note']}
            renderItem={(item) => <Cinna.Tag color="blue">{item}</Cinna.Tag>}
          />
        ),
      },
      {
        id: 'list-vertical',
        zh: {
          title: '纵向条目',
          description: 'itemLayout="vertical" 适合展示标题、说明和标签等多行内容。',
          codeToggle: '查看纵向条目代码',
        },
        en: {
          title: 'Vertical items',
          description: 'itemLayout="vertical" fits multi-line content such as title, description, and tags.',
          codeToggle: 'View vertical list code',
        },
        code: `import { List, Tag, Text } from '@cinna-design/react';

const items = [
  { title: 'Usage examples', desc: 'Merge basic and advanced demos.', tag: 'Docs' },
  { title: 'API polish', desc: 'Keep descriptions compact and readable.', tag: 'Copy' },
];

export default () => (
  <List
    itemLayout="vertical"
    dataSource={items}
    renderItem={(item) => (
      <>
        <Text strong>{item.title}</Text>
        <Text tone="secondary">{item.desc}</Text>
        <Tag color="pistachio">{item.tag}</Tag>
      </>
    )}
  />
);`,
        render: () => {
          const items = [
            { title: 'Usage examples', desc: 'Merge basic and advanced demos.', tag: 'Docs' },
            { title: 'API polish', desc: 'Keep descriptions compact and readable.', tag: 'Copy' },
          ];

          return (
            <Cinna.List
              itemLayout="vertical"
              dataSource={items}
              renderItem={(item) => (
                <>
                  <Cinna.Text strong>{item.title}</Cinna.Text>
                  <Cinna.Text tone="secondary">{item.desc}</Cinna.Text>
                  <Cinna.Tag color="pistachio">{item.tag}</Cinna.Tag>
                </>
              )}
            />
          );
        },
      },
      {
        id: 'list-horizontal-actions',
        zh: {
          title: '横向操作区',
          description: '默认横向布局适合在条目右侧放置状态或操作。',
          codeToggle: '查看横向操作区代码',
        },
        en: {
          title: 'Horizontal actions',
          description: 'The default horizontal layout works well for status or actions on the right.',
          codeToggle: 'View horizontal action code',
        },
        code: `import { Button, List, Space, Text } from '@cinna-design/react';

const items = [
  { name: 'Button docs', status: 'Ready' },
  { name: 'Table docs', status: 'Review' },
];

export default () => (
  <List
    dataSource={items}
    renderItem={(item) => (
      <>
        <Space direction="vertical" size="small" align="flex-start">
          <Text strong>{item.name}</Text>
          <Text tone="secondary">{item.status}</Text>
        </Space>
        <Button size="small" variant="text">Open</Button>
      </>
    )}
  />
);`,
        render: () => {
          const items = [
            { name: 'Button docs', status: 'Ready' },
            { name: 'Table docs', status: 'Review' },
          ];

          return (
            <Cinna.List
              dataSource={items}
              renderItem={(item) => (
                <>
                  <Cinna.Space direction="vertical" size="small" align="flex-start">
                    <Cinna.Text strong>{item.name}</Cinna.Text>
                    <Cinna.Text tone="secondary">{item.status}</Cinna.Text>
                  </Cinna.Space>
                  <Cinna.Button size="small" variant="text">Open</Cinna.Button>
                </>
              )}
            />
          );
        },
      },
      {
        id: 'list-borderless-native',
        zh: {
          title: '无边框与原生属性',
          description: 'bordered={false} 去掉外框，List 也继承原生 div 属性。',
          codeToggle: '查看无边框代码',
        },
        en: {
          title: 'Borderless and native attributes',
          description: 'bordered={false} removes the frame, and List extends native div attributes.',
          codeToggle: 'View borderless code',
        },
        code: `import { List, Text } from '@cinna-design/react';

export default () => (
  <List
    bordered={false}
    aria-label="Quiet notes"
    dataSource={['Quiet note', 'Inline update']}
    renderItem={(item) => <Text tone="secondary">{item}</Text>}
  />
);`,
        render: () => (
          <Cinna.List
            bordered={false}
            aria-label="Quiet notes"
            dataSource={['Quiet note', 'Inline update']}
            renderItem={(item) => <Cinna.Text tone="secondary">{item}</Cinna.Text>}
          />
        ),
      },
    ],
  };
