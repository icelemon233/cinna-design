import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const descriptionsDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-descriptions',
        zh: {
          title: '基本描述列表',
          description: 'items 用于展示一组只读键值信息。',
          codeToggle: '查看基本描述列表代码',
        },
        en: {
          title: 'Basic descriptions',
          description: 'Use items to display a readonly set of key-value information.',
          codeToggle: 'View basic descriptions code',
        },
        code: `import { Descriptions } from '@cinna-design/react';

const items = [
  { label: 'Component', children: 'Table' },
  { label: 'Owner', children: 'Docs team' },
  { label: 'Status', children: 'Review' },
];

export default () => <Descriptions items={items} />;`,
        render: () => (
          <Cinna.Descriptions
            items={[
              { label: 'Component', children: 'Table' },
              { label: 'Owner', children: 'Docs team' },
              { label: 'Status', children: 'Review' },
            ]}
          />
        ),
      },
      {
        id: 'descriptions-column',
        zh: {
          title: '列数控制',
          description: 'column 指定每行展示的描述项数量，适合稳定详情页布局。',
          codeToggle: '查看列数控制代码',
        },
        en: {
          title: 'Column count',
          description: 'column controls how many items appear per row for stable detail layouts.',
          codeToggle: 'View column count code',
        },
        code: `import { Descriptions } from '@cinna-design/react';

const items = [
  { label: 'Package', children: '@cinna-design/react' },
  { label: 'Version', children: '0.2.0' },
  { label: 'Theme', children: 'Cloud soft' },
  { label: 'Mode', children: 'Docs' },
];

export default () => <Descriptions column={2} items={items} />;`,
        render: () => (
          <Cinna.Descriptions
            column={2}
            items={[
              { label: 'Package', children: '@cinna-design/react' },
              { label: 'Version', children: '0.2.0' },
              { label: 'Theme', children: 'Cloud soft' },
              { label: 'Mode', children: 'Docs' },
            ]}
          />
        ),
      },
      {
        id: 'descriptions-rich-content',
        zh: {
          title: '富内容',
          description: 'children 可传入任意 ReactNode，用于标签、按钮或强调文本。',
          codeToggle: '查看富内容代码',
        },
        en: {
          title: 'Rich content',
          description: 'children accepts any ReactNode for tags, buttons, or emphasized text.',
          codeToggle: 'View rich content code',
        },
        code: `import { Button, Descriptions, Tag, Text } from '@cinna-design/react';

const items = [
  { label: 'Status', children: <Tag color="pistachio">Ready</Tag> },
  { label: 'Score', children: <Text strong>98%</Text> },
  { label: 'Action', children: <Button size="small" variant="text">Open</Button> },
];

export default () => <Descriptions column={3} items={items} />;`,
        render: () => (
          <Cinna.Descriptions
            column={3}
            items={[
              { label: 'Status', children: <Cinna.Tag color="pistachio">Ready</Cinna.Tag> },
              { label: 'Score', children: <Cinna.Text strong>98%</Cinna.Text> },
              { label: 'Action', children: <Cinna.Button size="small" variant="text">Open</Cinna.Button> },
            ]}
          />
        ),
      },
      {
        id: 'descriptions-size',
        zh: {
          title: '尺寸密度',
          description: 'size 支持 small、medium 和 large，用于不同信息密度的详情区。',
          codeToggle: '查看尺寸密度代码',
        },
        en: {
          title: 'Size density',
          description: 'size supports small, medium, and large for different detail densities.',
          codeToggle: 'View size density code',
        },
        code: `import { Descriptions, Space } from '@cinna-design/react';

const items = [
  { label: 'Name', children: 'Cinna' },
  { label: 'Tone', children: 'Soft' },
];

export default () => (
  <Space direction="vertical" align="stretch">
    <Descriptions size="small" items={items} />
    <Descriptions size="large" items={items} />
  </Space>
);`,
        render: () => {
          const items = [
            { label: 'Name', children: 'Cinna' },
            { label: 'Tone', children: 'Soft' },
          ];

          return (
            <Cinna.Space direction="vertical" align="stretch">
              <Cinna.Descriptions size="small" items={items} />
              <Cinna.Descriptions size="large" items={items} />
            </Cinna.Space>
          );
        },
      },
      {
        id: 'descriptions-borderless',
        zh: {
          title: '无边框',
          description: 'bordered={false} 可去掉外框，用在卡片内部或轻量详情区。',
          codeToggle: '查看无边框代码',
        },
        en: {
          title: 'Borderless',
          description: 'bordered={false} removes the frame for card interiors or lightweight details.',
          codeToggle: 'View borderless code',
        },
        code: `import { Card, Descriptions } from '@cinna-design/react';

const items = [
  { label: 'Release', children: 'June notes' },
  { label: 'Owner', children: 'Design system' },
];

export default () => (
  <Card title="Summary">
    <Descriptions bordered={false} items={items} />
  </Card>
);`,
        render: () => (
          <Cinna.Card title="Summary">
            <Cinna.Descriptions
              bordered={false}
              items={[
                { label: 'Release', children: 'June notes' },
                { label: 'Owner', children: 'Design system' },
              ]}
            />
          </Cinna.Card>
        ),
      },
    ],
  };
