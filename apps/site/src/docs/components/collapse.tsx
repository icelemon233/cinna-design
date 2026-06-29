import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const collapseDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-collapse',
        zh: {
          title: '基本折叠面板',
          description: 'items 定义每个面板，defaultActiveKey 设置默认展开项。',
          codeToggle: '查看基本折叠面板代码',
        },
        en: {
          title: 'Basic collapse',
          description: 'items defines panels, and defaultActiveKey sets initially open panels.',
          codeToggle: 'View basic collapse code',
        },
        code: `import { Collapse } from '@cinna-design/react';

const items = [
  { key: 'usage', label: 'Usage examples', children: 'Each example has a preview and collapsible code.' },
  { key: 'api', label: 'API notes', children: 'Only document props currently supported by the component.' },
];

export default () => <Collapse defaultActiveKey="usage" items={items} />;`,
        render: () => (
          <Cinna.Collapse
            defaultActiveKey="usage"
            items={[
              { key: 'usage', label: 'Usage examples', children: 'Each example has a preview and collapsible code.' },
              { key: 'api', label: 'API notes', children: 'Only document props currently supported by the component.' },
            ]}
          />
        ),
      },
      {
        id: 'collapse-accordion',
        zh: {
          title: '手风琴模式',
          description: 'accordion 会让同一时间只保留一个面板展开。',
          codeToggle: '查看手风琴模式代码',
        },
        en: {
          title: 'Accordion mode',
          description: 'accordion keeps only one panel open at a time.',
          codeToggle: 'View accordion code',
        },
        code: `import { Collapse } from '@cinna-design/react';

export default () => (
  <Collapse
    accordion
    defaultActiveKey="one"
    items={[
      { key: 'one', label: 'Step one', children: 'Read the component API.' },
      { key: 'two', label: 'Step two', children: 'Create focused examples.' },
      { key: 'three', label: 'Step three', children: 'Verify route switching.' },
    ]}
  />
);`,
        render: () => (
          <Cinna.Collapse
            accordion
            defaultActiveKey="one"
            items={[
              { key: 'one', label: 'Step one', children: 'Read the component API.' },
              { key: 'two', label: 'Step two', children: 'Create focused examples.' },
              { key: 'three', label: 'Step three', children: 'Verify route switching.' },
            ]}
          />
        ),
      },
      {
        id: 'collapse-extra-disabled',
        zh: {
          title: '额外内容与禁用项',
          description: 'extra 放在面板标题右侧，disabled 禁止该面板切换。',
          codeToggle: '查看额外内容代码',
        },
        en: {
          title: 'Extra content and disabled item',
          description: 'extra renders on the right side of the header, and disabled prevents toggling.',
          codeToggle: 'View extra disabled code',
        },
        code: `import { Collapse, Tag } from '@cinna-design/react';

export default () => (
  <Collapse
    defaultActiveKey={['ready']}
    items={[
      { key: 'ready', label: 'Ready panel', extra: <Tag color="pistachio">Ready</Tag>, children: 'This panel is available.' },
      { key: 'locked', label: 'Locked panel', extra: <Tag color="cream">Locked</Tag>, disabled: true, children: 'Disabled content.' },
    ]}
  />
);`,
        render: () => (
          <Cinna.Collapse
            defaultActiveKey={['ready']}
            items={[
              { key: 'ready', label: 'Ready panel', extra: <Cinna.Tag color="pistachio">Ready</Cinna.Tag>, children: 'This panel is available.' },
              { key: 'locked', label: 'Locked panel', extra: <Cinna.Tag color="cream">Locked</Cinna.Tag>, disabled: true, children: 'Disabled content.' },
            ]}
          />
        ),
      },
      {
        id: 'collapse-controlled',
        zh: {
          title: '受控展开',
          description: 'activeKey 与 onChange 可用于接入外部展开状态。',
          codeToggle: '查看受控展开代码',
        },
        en: {
          title: 'Controlled active keys',
          description: 'Use activeKey and onChange to connect open panels to external state.',
          codeToggle: 'View controlled collapse code',
        },
        code: `import { Collapse, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [active, setActive] = useState(['docs']);

  return (
    <Space direction="vertical" align="stretch">
      <Collapse
        activeKey={active}
        onChange={setActive}
        items={[
          { key: 'docs', label: 'Docs', children: 'Documentation panel.' },
          { key: 'tests', label: 'Tests', children: 'Verification panel.' },
        ]}
      />
      <Text tone="secondary">Open: {active.join(', ') || 'none'}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledCollapseDemo = () => {
            const [active, setActive] = React.useState(['docs']);

            return (
              <Cinna.Space direction="vertical" align="stretch">
                <Cinna.Collapse
                  activeKey={active}
                  onChange={setActive}
                  items={[
                    { key: 'docs', label: 'Docs', children: 'Documentation panel.' },
                    { key: 'tests', label: 'Tests', children: 'Verification panel.' },
                  ]}
                />
                <Cinna.Text tone="secondary">Open: {active.join(', ') || 'none'}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledCollapseDemo />;
        },
      },
      {
        id: 'collapse-borderless',
        zh: {
          title: '无边框',
          description: 'bordered={false} 去掉外框，适合放在卡片或页面区块内部。',
          codeToggle: '查看无边框代码',
        },
        en: {
          title: 'Borderless',
          description: 'bordered={false} removes the frame for cards or page sections.',
          codeToggle: 'View borderless collapse code',
        },
        code: `import { Card, Collapse } from '@cinna-design/react';

export default () => (
  <Card title="Compact notes">
    <Collapse
      bordered={false}
      defaultActiveKey="note"
      items={[{ key: 'note', label: 'Note', children: 'Quiet supporting content.' }]}
    />
  </Card>
);`,
        render: () => (
          <Cinna.Card title="Compact notes">
            <Cinna.Collapse
              bordered={false}
              defaultActiveKey="note"
              items={[{ key: 'note', label: 'Note', children: 'Quiet supporting content.' }]}
            />
          </Cinna.Card>
        ),
      },
    ],
  };
