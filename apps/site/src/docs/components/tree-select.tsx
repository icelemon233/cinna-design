import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const treeSelectDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-tree-select',
        zh: {
          title: '基本用法',
          description: 'treeData 提供树形数据，组件会展示可选择的节点。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic tree select',
          description: 'treeData provides hierarchical data and renders selectable nodes.',
          codeToggle: 'View basic tree select code',
        },
        code: `import { TreeSelect } from '@cinna-design/react';

const treeData = [
  {
    key: 'docs',
    title: 'Docs',
    children: [
      { key: 'overview', title: 'Overview' },
      { key: 'changelog', title: 'Changelog' },
    ],
  },
  { key: 'tokens', title: 'Tokens' },
];

export default () => <TreeSelect treeData={treeData} placeholder="Choose node" />;`,
        render: () => (
          <Cinna.TreeSelect
            treeData={[
              {
                key: 'docs',
                title: 'Docs',
                children: [
                  { key: 'overview', title: 'Overview' },
                  { key: 'changelog', title: 'Changelog' },
                ],
              },
              { key: 'tokens', title: 'Tokens' },
            ]}
            placeholder="Choose node"
          />
        ),
      },
      {
        id: 'tree-select-default-value',
        zh: {
          title: '默认选中',
          description: 'defaultValue 使用节点 key，展示内容会保留树层级缩进。',
          codeToggle: '查看默认选中代码',
        },
        en: {
          title: 'Default value',
          description: 'defaultValue uses the node key and keeps indentation in the displayed label.',
          codeToggle: 'View default value code',
        },
        code: `import { TreeSelect } from '@cinna-design/react';

const treeData = [
  {
    key: 'surface',
    title: 'Surface',
    children: [
      { key: 'card', title: 'Card' },
      { key: 'modal', title: 'Modal' },
    ],
  },
];

export default () => <TreeSelect treeData={treeData} defaultValue="modal" />;`,
        render: () => (
          <Cinna.TreeSelect
            treeData={[
              {
                key: 'surface',
                title: 'Surface',
                children: [
                  { key: 'card', title: 'Card' },
                  { key: 'modal', title: 'Modal' },
                ],
              },
            ]}
            defaultValue="modal"
          />
        ),
      },
      {
        id: 'tree-select-clearable',
        zh: {
          title: '可清除',
          description: 'allowClear 在已有选中值时提供清除入口。',
          codeToggle: '查看可清除代码',
        },
        en: {
          title: 'Clearable',
          description: 'allowClear provides a clear action when a value is selected.',
          codeToggle: 'View clearable code',
        },
        code: `import { TreeSelect } from '@cinna-design/react';

const treeData = [
  { key: 'design', title: 'Design' },
  { key: 'engineering', title: 'Engineering' },
];

export default () => <TreeSelect allowClear treeData={treeData} defaultValue="design" />;`,
        render: () => (
          <Cinna.TreeSelect
            allowClear
            treeData={[
              { key: 'design', title: 'Design' },
              { key: 'engineering', title: 'Engineering' },
            ]}
            defaultValue="design"
          />
        ),
      },
      {
        id: 'tree-select-controlled',
        zh: {
          title: '受控选择',
          description: 'value 与 onChange 可用于接入外部状态。',
          codeToggle: '查看受控选择代码',
        },
        en: {
          title: 'Controlled selection',
          description: 'Use value and onChange to connect TreeSelect to external state.',
          codeToggle: 'View controlled selection code',
        },
        code: `import { Space, Text, TreeSelect } from '@cinna-design/react';
import { useState } from 'react';

const treeData = [
  {
    key: 'library',
    title: 'Library',
    children: [
      { key: 'components', title: 'Components' },
      { key: 'patterns', title: 'Patterns' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState('components');

  return (
    <Space direction="vertical" align="flex-start">
      <TreeSelect treeData={treeData} value={value} onChange={setValue} />
      <Text tone="secondary">Selected: {value}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledTreeSelectDemo = () => {
            const [value, setValue] = React.useState('components');

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.TreeSelect
                  treeData={[
                    {
                      key: 'library',
                      title: 'Library',
                      children: [
                        { key: 'components', title: 'Components' },
                        { key: 'patterns', title: 'Patterns' },
                      ],
                    },
                  ]}
                  value={value}
                  onChange={setValue}
                />
                <Cinna.Text tone="secondary">Selected: {value}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledTreeSelectDemo />;
        },
      },
    ],
  };
