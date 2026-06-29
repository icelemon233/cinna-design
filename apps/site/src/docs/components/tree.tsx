import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const treeDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-tree',
        zh: {
          title: '基本树',
          description: 'treeData 使用 key、title 和 children 描述层级结构。',
          codeToggle: '查看基本树代码',
        },
        en: {
          title: 'Basic tree',
          description: 'Use key, title, and children in treeData to describe hierarchy.',
          codeToggle: 'View basic tree code',
        },
        code: `import { Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'bakery',
    title: 'Bakery',
    children: [
      { key: 'cakes', title: 'Cakes' },
      { key: 'drinks', title: 'Drinks' },
    ],
  },
];

export default () => <Tree treeData={treeData} />;`,
        render: () => (
          <Cinna.Tree
            treeData={[
              {
                key: 'bakery',
                title: 'Bakery',
                children: [
                  { key: 'cakes', title: 'Cakes' },
                  { key: 'drinks', title: 'Drinks' },
                ],
              },
            ]}
          />
        ),
      },
      {
        id: 'tree-expanded',
        zh: {
          title: '默认展开',
          description: 'defaultExpandedKeys 指定初始展开的分支节点。',
          codeToggle: '查看默认展开代码',
        },
        en: {
          title: 'Default expanded',
          description: 'Use defaultExpandedKeys to set initially expanded branch nodes.',
          codeToggle: 'View default expanded tree code',
        },
        code: `import { Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'workspace',
    title: 'Workspace',
    children: [
      {
        key: 'docs',
        title: 'Docs',
        children: [
          { key: 'intro', title: 'Intro' },
          { key: 'release', title: 'Release notes' },
        ],
      },
      { key: 'assets', title: 'Assets' },
    ],
  },
];

export default () => <Tree treeData={treeData} defaultExpandedKeys={['workspace', 'docs']} />;`,
        render: () => (
          <Cinna.Tree
            defaultExpandedKeys={['workspace', 'docs']}
            treeData={[
              {
                key: 'workspace',
                title: 'Workspace',
                children: [
                  {
                    key: 'docs',
                    title: 'Docs',
                    children: [
                      { key: 'intro', title: 'Intro' },
                      { key: 'release', title: 'Release notes' },
                    ],
                  },
                  { key: 'assets', title: 'Assets' },
                ],
              },
            ]}
          />
        ),
      },
      {
        id: 'tree-selectable',
        zh: {
          title: '可选节点',
          description: 'selectable 开启叶子节点选择，defaultSelectedKey 设置默认选中项。',
          codeToggle: '查看可选节点代码',
        },
        en: {
          title: 'Selectable nodes',
          description: 'Use selectable for leaf selection and defaultSelectedKey for the initial selected item.',
          codeToggle: 'View selectable tree code',
        },
        code: `import { Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'menu',
    title: 'Menu',
    children: [
      { key: 'classic', title: 'Classic set' },
      { key: 'seasonal', title: 'Seasonal set' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} selectable defaultSelectedKey="seasonal" />
);`,
        render: () => (
          <Cinna.Tree
            selectable
            defaultSelectedKey="seasonal"
            treeData={[
              {
                key: 'menu',
                title: 'Menu',
                children: [
                  { key: 'classic', title: 'Classic set' },
                  { key: 'seasonal', title: 'Seasonal set' },
                ],
              },
            ]}
          />
        ),
      },
      {
        id: 'tree-controlled',
        zh: {
          title: '受控选中',
          description: 'selectedKey 与 onSelect 可把当前选择同步给外部状态。',
          codeToggle: '查看受控选中代码',
        },
        en: {
          title: 'Controlled selection',
          description: 'Use selectedKey and onSelect to sync the current selection with external state.',
          codeToggle: 'View controlled tree code',
        },
        code: `import { Space, Text, Tree } from '@cinna-design/react';
import { useState } from 'react';

const treeData = [
  {
    key: 'regions',
    title: 'Regions',
    children: [
      { key: 'north', title: 'North shop' },
      { key: 'south', title: 'South shop' },
    ],
  },
];

export default () => {
  const [selected, setSelected] = useState('north');

  return (
    <Space direction="vertical" align="flex-start">
      <Tree treeData={treeData} selectable selectedKey={selected} onSelect={setSelected} />
      <Text tone="secondary">Selected: {selected}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledTreeDemo = () => {
            const [selected, setSelected] = React.useState('north');

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Tree
                  selectable
                  selectedKey={selected}
                  onSelect={setSelected}
                  treeData={[
                    {
                      key: 'regions',
                      title: 'Regions',
                      children: [
                        { key: 'north', title: 'North shop' },
                        { key: 'south', title: 'South shop' },
                      ],
                    },
                  ]}
                />
                <Cinna.Text tone="secondary">Selected: {selected}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledTreeDemo />;
        },
      },
      {
        id: 'tree-rich-title',
        zh: {
          title: '节点标题内容',
          description: 'title 支持 ReactNode，可组合文本与轻量标记。',
          codeToggle: '查看节点标题代码',
        },
        en: {
          title: 'Node title content',
          description: 'title accepts ReactNode, so text can be combined with lightweight markers.',
          codeToggle: 'View tree title code',
        },
        code: `import { Tag, Tree } from '@cinna-design/react';

const treeData = [
  {
    key: 'pipeline',
    title: 'Pipeline',
    children: [
      { key: 'ready', title: <>Ready <Tag color="pistachio">12</Tag></> },
      { key: 'blocked', title: <>Blocked <Tag color="strawberry">3</Tag></> },
    ],
  },
];

export default () => <Tree treeData={treeData} selectable />;`,
        render: () => (
          <Cinna.Tree
            selectable
            treeData={[
              {
                key: 'pipeline',
                title: 'Pipeline',
                children: [
                  {
                    key: 'ready',
                    title: (
                      <>
                        Ready <Cinna.Tag color="pistachio">12</Cinna.Tag>
                      </>
                    ),
                  },
                  {
                    key: 'blocked',
                    title: (
                      <>
                        Blocked <Cinna.Tag color="strawberry">3</Cinna.Tag>
                      </>
                    ),
                  },
                ],
              },
            ]}
          />
        ),
      },
    ],
  };
