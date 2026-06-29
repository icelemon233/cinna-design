import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const spaceDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-space',
        zh: {
          title: '基本用法',
          description: '用 Space 给相邻按钮提供稳定的水平间距。',
          codeToggle: '查看基本间距代码',
        },
        en: {
          title: 'Basic spacing',
          description: 'Use Space to keep neighboring actions evenly separated.',
          codeToggle: 'View basic spacing code',
        },
        code: `import { Button, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Button>Publish</Button>
    <Button variant="cream">Preview</Button>
    <Button variant="ghost">Save draft</Button>
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.Button>Publish</Cinna.Button>
            <Cinna.Button variant="cream">Preview</Cinna.Button>
            <Cinna.Button variant="ghost">Save draft</Cinna.Button>
          </Cinna.Space>
        ),
      },
      {
        id: 'vertical-space',
        zh: {
          title: '垂直间距',
          description: 'direction="vertical" 适合纵向表单块、卡片和说明文字。',
          codeToggle: '查看垂直间距代码',
        },
        en: {
          title: 'Vertical spacing',
          description: 'Use direction="vertical" for stacked cards, form blocks, and helper copy.',
          codeToggle: 'View vertical spacing code',
        },
        code: `import { Card, Space, Text } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" size="large" block align="stretch">
    <Card title="Design review">
      <Text tone="secondary">Three details need a final pass before release.</Text>
    </Card>
    <Card title="Launch note" tone="blue">
      <Text tone="secondary">Spacing stays consistent across stacked content.</Text>
    </Card>
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" size="large" block align="stretch">
            <Cinna.Card title="Design review">
              <Cinna.Text tone="secondary">Three details need a final pass before release.</Cinna.Text>
            </Cinna.Card>
            <Cinna.Card title="Launch note" tone="blue">
              <Cinna.Text tone="secondary">Spacing stays consistent across stacked content.</Cinna.Text>
            </Cinna.Card>
          </Cinna.Space>
        ),
      },
      {
        id: 'space-size',
        zh: {
          title: '间距大小',
          description: '支持 small、medium、large，也可以传入数字作为像素间距。',
          codeToggle: '查看间距大小代码',
        },
        en: {
          title: 'Spacing size',
          description: 'Use small, medium, large, or a numeric pixel value for custom spacing.',
          codeToggle: 'View spacing size code',
        },
        code: `import { Button, Space, Text } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start" size="large">
    <Space size="small">
      <Text strong>small</Text>
      <Button size="small">S</Button>
      <Button size="small" variant="cream">S</Button>
    </Space>
    <Space size="medium">
      <Text strong>medium</Text>
      <Button>M</Button>
      <Button variant="cream">M</Button>
    </Space>
    <Space size="large">
      <Text strong>large</Text>
      <Button size="large">L</Button>
      <Button size="large" variant="cream">L</Button>
    </Space>
    <Space size={28}>
      <Text strong>28px</Text>
      <Button variant="ghost">Custom</Button>
      <Button variant="dashed">Gap</Button>
    </Space>
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start" size="large">
            <Cinna.Space size="small">
              <Cinna.Text strong>small</Cinna.Text>
              <Cinna.Button size="small">S</Cinna.Button>
              <Cinna.Button size="small" variant="cream">S</Cinna.Button>
            </Cinna.Space>
            <Cinna.Space size="medium">
              <Cinna.Text strong>medium</Cinna.Text>
              <Cinna.Button>M</Cinna.Button>
              <Cinna.Button variant="cream">M</Cinna.Button>
            </Cinna.Space>
            <Cinna.Space size="large">
              <Cinna.Text strong>large</Cinna.Text>
              <Cinna.Button size="large">L</Cinna.Button>
              <Cinna.Button size="large" variant="cream">L</Cinna.Button>
            </Cinna.Space>
            <Cinna.Space size={28}>
              <Cinna.Text strong>28px</Cinna.Text>
              <Cinna.Button variant="ghost">Custom</Cinna.Button>
              <Cinna.Button variant="dashed">Gap</Cinna.Button>
            </Cinna.Space>
          </Cinna.Space>
        ),
      },
      {
        id: 'space-align-justify',
        zh: {
          title: '对齐与分布',
          description: '使用 align 控制交叉轴对齐，justify 控制主轴分布。',
          codeToggle: '查看对齐分布代码',
        },
        en: {
          title: 'Align and justify',
          description: 'Use align for cross-axis alignment and justify for main-axis distribution.',
          codeToggle: 'View align and justify code',
        },
        code: `import { Button, Space, Text } from '@cinna-design/react';

export default () => (
  <Space
    block
    align="flex-start"
    justify="space-between"
    style={{ padding: 16, borderRadius: 18, background: '#f0fafe' }}
  >
    <Space direction="vertical" align="flex-start" size="small">
      <Text strong>Cloud card</Text>
      <Text tone="secondary">Top aligned helper copy.</Text>
    </Space>
    <Button size="large">Review</Button>
  </Space>
);`,
        render: () => (
          <Cinna.Space
            block
            align="flex-start"
            justify="space-between"
            style={{ padding: 16, borderRadius: 18, background: '#f0fafe' }}
          >
            <Cinna.Space direction="vertical" align="flex-start" size="small">
              <Cinna.Text strong>Cloud card</Cinna.Text>
              <Cinna.Text tone="secondary">Top aligned helper copy.</Cinna.Text>
            </Cinna.Space>
            <Cinna.Button size="large">Review</Cinna.Button>
          </Cinna.Space>
        ),
      },
      {
        id: 'space-wrap',
        zh: {
          title: '自动换行',
          description: '水平内容超过容器宽度时可以自然换行。',
          codeToggle: '查看自动换行代码',
        },
        en: {
          title: 'Wrap',
          description: 'Let horizontal content wrap naturally when the container becomes narrow.',
          codeToggle: 'View wrap code',
        },
        code: `import { Space, Tag } from '@cinna-design/react';

export default () => (
  <Space wrap size={10}>
    <Tag color="blue">Design</Tag>
    <Tag color="butter">Token</Tag>
    <Tag color="pistachio">Release</Tag>
    <Tag color="strawberry">Urgent</Tag>
    <Tag color="lavender">Docs</Tag>
    <Tag color="cream">Story</Tag>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap size={10}>
            <Cinna.Tag color="blue">Design</Cinna.Tag>
            <Cinna.Tag color="butter">Token</Cinna.Tag>
            <Cinna.Tag color="pistachio">Release</Cinna.Tag>
            <Cinna.Tag color="strawberry">Urgent</Cinna.Tag>
            <Cinna.Tag color="lavender">Docs</Cinna.Tag>
            <Cinna.Tag color="cream">Story</Cinna.Tag>
          </Cinna.Space>
        ),
      },
      {
        id: 'space-split',
        zh: {
          title: '分隔符',
          description: '使用 split 为相邻项插入分隔元素。',
          codeToggle: '查看分隔符代码',
        },
        en: {
          title: 'Split',
          description: 'Use split to insert a separator between neighboring items.',
          codeToggle: 'View split code',
        },
        code: `import { Divider, Space, Text } from '@cinna-design/react';

export default () => (
  <Space split={<Divider vertical />}>
    <Text>Overview</Text>
    <Text>Activity</Text>
    <Text tone="error">Archive</Text>
  </Space>
);`,
        render: () => (
          <Cinna.Space split={<Cinna.Divider vertical />}>
            <Cinna.Text>Overview</Cinna.Text>
            <Cinna.Text>Activity</Cinna.Text>
            <Cinna.Text tone="error">Archive</Cinna.Text>
          </Cinna.Space>
        ),
      },
    ],
  };
