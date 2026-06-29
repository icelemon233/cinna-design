import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const flexDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-flex',
        zh: {
          title: '基本布局',
          description: 'Flex 用于块级内容的水平排列和对齐。',
          codeToggle: '查看基本布局代码',
        },
        en: {
          title: 'Basic layout',
          description: 'Use Flex for block-level horizontal layout and alignment.',
          codeToggle: 'View basic layout code',
        },
        code: `import { Button, Flex } from '@cinna-design/react';

export default () => (
  <Flex gap="medium">
    <Button>Primary</Button>
    <Button variant="cream">Default</Button>
    <Button variant="dashed">Dashed</Button>
    <Button variant="text">Text</Button>
  </Flex>
);`,
        render: () => (
          <Cinna.Flex gap="medium">
            <Cinna.Button>Primary</Cinna.Button>
            <Cinna.Button variant="cream">Default</Cinna.Button>
            <Cinna.Button variant="dashed">Dashed</Cinna.Button>
            <Cinna.Button variant="text">Text</Cinna.Button>
          </Cinna.Flex>
        ),
      },
      {
        id: 'flex-align-justify',
        zh: {
          title: '主轴与交叉轴对齐',
          description: '使用 justify 与 align 控制内容在主轴和交叉轴上的位置。',
          codeToggle: '查看对齐代码',
        },
        en: {
          title: 'Justify and align',
          description: 'Control placement on the main axis and cross axis with justify and align.',
          codeToggle: 'View justify and align code',
        },
        code: `import { Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex vertical gap="medium">
    <Flex justify="space-between" align="center" style={{ minHeight: 72, padding: 12, borderRadius: 18, background: '#f0fafe' }}>
      <Text strong>space-between</Text>
      <Text tone="secondary">center aligned</Text>
    </Flex>
    <Flex justify="flex-end" align="flex-start" style={{ minHeight: 72, padding: 12, borderRadius: 18, background: '#fff8ee' }}>
      <Text tone="secondary">flex-end / flex-start</Text>
    </Flex>
  </Flex>
);`,
        render: () => (
          <Cinna.Flex vertical gap="medium">
            <Cinna.Flex justify="space-between" align="center" style={{ minHeight: 72, padding: 12, borderRadius: 18, background: '#f0fafe' }}>
              <Cinna.Text strong>space-between</Cinna.Text>
              <Cinna.Text tone="secondary">center aligned</Cinna.Text>
            </Cinna.Flex>
            <Cinna.Flex justify="flex-end" align="flex-start" style={{ minHeight: 72, padding: 12, borderRadius: 18, background: '#fff8ee' }}>
              <Cinna.Text tone="secondary">flex-end / flex-start</Cinna.Text>
            </Cinna.Flex>
          </Cinna.Flex>
        ),
      },
      {
        id: 'vertical-flex',
        zh: {
          title: '垂直方向',
          description: 'vertical 会把主轴切换为纵向，适合信息块堆叠。',
          codeToggle: '查看垂直方向代码',
        },
        en: {
          title: 'Vertical direction',
          description: 'Use vertical to switch the main axis for stacked information blocks.',
          codeToggle: 'View vertical direction code',
        },
        code: `import { Card, Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex vertical gap="large">
    <Card title="Morning batch" tone="blue">
      <Text tone="secondary">Cards can stack with one consistent vertical rhythm.</Text>
    </Card>
    <Card title="Afternoon batch" tone="pistachio">
      <Text tone="secondary">The container controls spacing without wrapper markup.</Text>
    </Card>
  </Flex>
);`,
        render: () => (
          <Cinna.Flex vertical gap="large">
            <Cinna.Card title="Morning batch" tone="blue">
              <Cinna.Text tone="secondary">Cards can stack with one consistent vertical rhythm.</Cinna.Text>
            </Cinna.Card>
            <Cinna.Card title="Afternoon batch" tone="pistachio">
              <Cinna.Text tone="secondary">The container controls spacing without wrapper markup.</Cinna.Text>
            </Cinna.Card>
          </Cinna.Flex>
        ),
      },
      {
        id: 'flex-gap',
        zh: {
          title: '设置间隙',
          description: '支持 small、medium、large，也可以传入数字。',
          codeToggle: '查看间隙代码',
        },
        en: {
          title: 'Gap',
          description: 'Use small, medium, large, or a numeric value for custom gaps.',
          codeToggle: 'View gap code',
        },
        code: `import { Button, Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex vertical gap="large" align="flex-start">
    <Flex gap="small" align="center">
      <Text strong style={{ width: 72 }}>small</Text>
      <Button size="small">A</Button>
      <Button size="small">B</Button>
    </Flex>
    <Flex gap="large" align="center">
      <Text strong style={{ width: 72 }}>large</Text>
      <Button>A</Button>
      <Button>B</Button>
    </Flex>
    <Flex gap={30} align="center">
      <Text strong style={{ width: 72 }}>30px</Text>
      <Button variant="ghost">A</Button>
      <Button variant="ghost">B</Button>
    </Flex>
  </Flex>
);`,
        render: () => (
          <Cinna.Flex vertical gap="large" align="flex-start">
            <Cinna.Flex gap="small" align="center">
              <Cinna.Text strong style={{ width: 72 }}>small</Cinna.Text>
              <Cinna.Button size="small">A</Cinna.Button>
              <Cinna.Button size="small">B</Cinna.Button>
            </Cinna.Flex>
            <Cinna.Flex gap="large" align="center">
              <Cinna.Text strong style={{ width: 72 }}>large</Cinna.Text>
              <Cinna.Button>A</Cinna.Button>
              <Cinna.Button>B</Cinna.Button>
            </Cinna.Flex>
            <Cinna.Flex gap={30} align="center">
              <Cinna.Text strong style={{ width: 72 }}>30px</Cinna.Text>
              <Cinna.Button variant="ghost">A</Cinna.Button>
              <Cinna.Button variant="ghost">B</Cinna.Button>
            </Cinna.Flex>
          </Cinna.Flex>
        ),
      },
      {
        id: 'flex-wrap',
        zh: {
          title: '自动换行',
          description: 'Flex 可以让一组块级元素在窄容器中自然折行。',
          codeToggle: '查看自动换行代码',
        },
        en: {
          title: 'Wrap',
          description: 'Let block-level items wrap naturally inside narrow containers.',
          codeToggle: 'View wrap code',
        },
        code: `import { Flex, Tag } from '@cinna-design/react';

export default () => (
  <Flex wrap gap={12}>
    <Tag color="blue">Dashboard</Tag>
    <Tag color="butter">Metrics</Tag>
    <Tag color="pistachio">Stable</Tag>
    <Tag color="strawberry">Incident</Tag>
    <Tag color="lavender">Review</Tag>
    <Tag color="cream">Release</Tag>
  </Flex>
);`,
        render: () => (
          <Cinna.Flex wrap gap={12}>
            <Cinna.Tag color="blue">Dashboard</Cinna.Tag>
            <Cinna.Tag color="butter">Metrics</Cinna.Tag>
            <Cinna.Tag color="pistachio">Stable</Cinna.Tag>
            <Cinna.Tag color="strawberry">Incident</Cinna.Tag>
            <Cinna.Tag color="lavender">Review</Cinna.Tag>
            <Cinna.Tag color="cream">Release</Cinna.Tag>
          </Cinna.Flex>
        ),
      },
      {
        id: 'inline-composition',
        zh: {
          title: '内联组合',
          description: 'inline 适合把头像、文字和操作排成紧凑行内单元。',
          codeToggle: '查看内联组合代码',
        },
        en: {
          title: 'Inline composition',
          description: 'Use inline for compact rows with avatars, copy, and actions.',
          codeToggle: 'View inline composition code',
        },
        code: `import { Avatar, Button, Flex, Text } from '@cinna-design/react';

export default () => (
  <Flex inline gap="medium" align="center">
    <Avatar size={40}>CD</Avatar>
    <Flex vertical gap={4}>
      <Text strong>Cinna Design</Text>
      <Text tone="secondary">Ready for review</Text>
    </Flex>
    <Button size="small" variant="cream">Open</Button>
  </Flex>
);`,
        render: () => (
          <Cinna.Flex inline gap="medium" align="center">
            <Cinna.Avatar size={40}>CD</Cinna.Avatar>
            <Cinna.Flex vertical gap={4}>
              <Cinna.Text strong>Cinna Design</Cinna.Text>
              <Cinna.Text tone="secondary">Ready for review</Cinna.Text>
            </Cinna.Flex>
            <Cinna.Button size="small" variant="cream">Open</Cinna.Button>
          </Cinna.Flex>
        ),
      },
    ],
  };
