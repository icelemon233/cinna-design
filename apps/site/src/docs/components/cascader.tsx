import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { CascaderValue } from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const docsOptions = [
  {
    label: 'Docs',
    value: 'docs',
    children: [
      { label: 'Overview', value: 'overview' },
      { label: 'Changelog', value: 'changelog' },
      { label: 'API', value: 'api' },
    ],
  },
  {
    label: 'Assets',
    value: 'assets',
    children: [
      { label: 'Icons', value: 'icons' },
      { label: 'Tokens', value: 'tokens' },
    ],
  },
];

const teamOptions = [
  {
    label: 'Product',
    value: 'product',
    children: [
      { label: 'Research', value: 'research' },
      { label: 'Design', value: 'design' },
    ],
  },
  {
    label: 'Engineering',
    value: 'engineering',
    children: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Quality', value: 'quality', disabled: true },
    ],
  },
];

export const cascaderDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'basic-cascader',
      zh: {
        title: '基本用法',
        description: '级联选择按列展开，每一级选项都保留在同一个弹层中完成选择。',
        codeToggle: '查看基本用法代码',
      },
      en: {
        title: 'Basic usage',
        description: 'Cascader expands by columns and keeps every level inside the same popup.',
        codeToggle: 'View basic usage code',
      },
      code: `import { Cascader, Icon } from '@cinna-design/react';

const options = [
  {
    label: 'Docs',
    value: 'docs',
    children: [
      { label: 'Overview', value: 'overview' },
      { label: 'Changelog', value: 'changelog' },
    ],
  },
  {
    label: 'Assets',
    value: 'assets',
    children: [{ label: 'Icons', value: 'icons' }],
  },
];

export default () => <Cascader options={options} placeholder="Choose path" />;`,
      render: () => <Cinna.Cascader options={docsOptions} placeholder="Choose path" />,
    },
    {
      id: 'cascader-default-display',
      zh: {
        title: '默认值与展示',
        description: 'defaultValue 推荐传路径数组，displayRender 可控制选中后的回填内容。',
        codeToggle: '查看默认值与展示代码',
      },
      en: {
        title: 'Default value and display',
        description: 'Use a path array as defaultValue, and customize selected display with displayRender.',
        codeToggle: 'View default display code',
      },
      code: `import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    options={options}
    defaultValue={['docs', 'api']}
    displayRender={(labels) => labels.join(' / ')}
  />
);`,
      render: () => (
        <Cinna.Cascader
          options={docsOptions}
          defaultValue={['docs', 'api']}
          displayRender={(labels) => labels.join(' / ')}
        />
      ),
    },
    {
      id: 'cascader-hover-disabled',
      zh: {
        title: '移入展开与禁用项',
        description: 'expandTrigger="hover" 可移入展开子级，disabled 可禁用单个路径节点。',
        codeToggle: '查看移入展开代码',
      },
      en: {
        title: 'Hover expand and disabled options',
        description: 'Use expandTrigger="hover" to reveal children and disabled to lock a node.',
        codeToggle: 'View hover expand code',
      },
      code: `import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    expandTrigger="hover"
    options={options}
    placeholder="Hover to expand"
  />
);`,
      render: () => (
        <Cinna.Cascader
          expandTrigger="hover"
          options={teamOptions}
          placeholder="Hover to expand"
        />
      ),
    },
    {
      id: 'cascader-change-on-select',
      zh: {
        title: '选择即改变',
        description: 'changeOnSelect 允许选择非叶子节点，并在每一级选择后立即触发变更。',
        codeToggle: '查看选择即改变代码',
      },
      en: {
        title: 'Change on select',
        description: 'changeOnSelect allows selecting parent nodes and emits changes at each level.',
        codeToggle: 'View change on select code',
      },
      code: `import { Cascader, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState([]);

  return (
    <Space direction="vertical" align="flex-start">
      <Cascader changeOnSelect options={options} onChange={(next) => setValue(next)} />
      <Text tone="secondary">Selected: {value.join(' / ') || 'none'}</Text>
    </Space>
  );
};`,
      render: () => {
        const ChangeOnSelectDemo = () => {
          const [value, setValue] = React.useState<CascaderValue>([]);

          return (
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.Cascader changeOnSelect options={teamOptions} onChange={(next) => setValue(next as CascaderValue)} />
              <Cinna.Text tone="secondary">Selected: {value.join(' / ') || 'none'}</Cinna.Text>
            </Cinna.Space>
          );
        };

        return <ChangeOnSelectDemo />;
      },
    },
    {
      id: 'cascader-multiple-tags',
      zh: {
        title: '多选与标签',
        description: 'multiple 支持选择多条路径，maxTagCount 和 tagRender 控制标签展示。',
        codeToggle: '查看多选代码',
      },
      en: {
        title: 'Multiple selection and tags',
        description: 'multiple selects several paths, while maxTagCount and tagRender control tag display.',
        codeToggle: 'View multiple code',
      },
      code: `import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    multiple
    maxTagCount={2}
    options={options}
    defaultValue={[
      ['docs', 'api'],
      ['assets', 'icons'],
    ]}
  />
);`,
      render: () => (
        <Cinna.Cascader
          multiple
          maxTagCount={2}
          options={docsOptions}
          defaultValue={[
            ['docs', 'api'],
            ['assets', 'icons'],
          ]}
        />
      ),
    },
    {
      id: 'cascader-search',
      zh: {
        title: '搜索路径',
        description: 'showSearch 可在弹层中搜索完整路径，也可以传入 filter、sort 和 render 定制结果。',
        codeToggle: '查看搜索路径代码',
      },
      en: {
        title: 'Path search',
        description: 'showSearch searches full paths and can customize filter, sort, and render.',
        codeToggle: 'View path search code',
      },
      code: `import { Cascader } from '@cinna-design/react';

export default () => (
  <Cascader
    showSearch={{
      filter: (input, path) =>
        path.some((option) => String(option.label).toLowerCase().includes(input.toLowerCase())),
      render: (_, path) => path.map((option) => option.label).join(' -> '),
    }}
    options={options}
    placeholder="Search path"
  />
);`,
      render: () => (
        <Cinna.Cascader
          showSearch={{
            filter: (input, path) =>
              path.some((option) => String(option.label).toLowerCase().includes(input.toLowerCase())),
            render: (_, path) => path.map((option) => option.label).join(' -> '),
          }}
          options={docsOptions}
          placeholder="Search path"
        />
      ),
    },
    {
      id: 'cascader-load-field-names',
      zh: {
        title: '动态加载与字段名',
        description: 'isLeaf=false 会展示可展开状态，loadData 用于接入异步加载；fieldNames 可适配不同数据结构。',
        codeToggle: '查看动态加载代码',
      },
      en: {
        title: 'Lazy loading and field names',
        description: 'isLeaf=false marks expandable nodes for loadData, and fieldNames adapts custom data shapes.',
        codeToggle: 'View lazy loading code',
      },
      code: `import { Cascader } from '@cinna-design/react';

const options = [
  {
    name: 'Workspace',
    id: 'workspace',
    isLeaf: false,
  },
];

export default () => (
  <Cascader
    fieldNames={{ label: 'name', value: 'id', children: 'nodes' }}
    options={options}
    loadData={() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { name: 'Design kit', id: 'design-kit' },
            { name: 'Release notes', id: 'release-notes' },
          ]);
        }, 900);
      })}
  />
);`,
      render: () => (
        <Cinna.Cascader
          fieldNames={{ label: 'name', value: 'id', children: 'nodes' }}
          options={[
            {
              name: 'Workspace',
              id: 'workspace',
              isLeaf: false,
            },
          ]}
          loadData={() =>
            new Promise((resolve) => {
              window.setTimeout(() => {
                resolve([
                  { name: 'Design kit', id: 'design-kit' },
                  { name: 'Release notes', id: 'release-notes' },
                ]);
              }, 900);
            })}
        />
      ),
    },
    {
      id: 'cascader-variant-popup',
      zh: {
        title: '形态、状态与弹层',
        description: 'variant、status、prefix、suffixIcon、popupRender 和语义样式可组合定制展示。',
        codeToggle: '查看形态与弹层代码',
      },
      en: {
        title: 'Variant, status, and popup',
        description: 'Combine variant, status, prefix, suffixIcon, popupRender, and semantic styles.',
        codeToggle: 'View variant and popup code',
      },
      code: `import { Cascader, Icon } from '@cinna-design/react';

export default () => (
  <Cascader
    variant="filled"
    status="warning"
    prefix="☁"
    suffixIcon={<Icon name="chevron-down" size={13} />}
    options={options}
    popupRender={(menus) => (
      <div style={{ display: 'grid', gap: 8 }}>
        {menus}
        <small style={{ color: '#8a6c5f', fontWeight: 800 }}>Choose one path</small>
      </div>
    )}
    styles={{ popup: { borderColor: '#73c4e0' } }}
  />
);`,
      render: () => (
        <Cinna.Cascader
          variant="filled"
          status="warning"
          prefix="☁"
          suffixIcon={<Cinna.Icon name="chevron-down" size={13} />}
          options={docsOptions}
          popupRender={(menus) => (
            <div style={{ display: 'grid', gap: 8 }}>
              {menus}
              <small style={{ color: '#8a6c5f', fontWeight: 800 }}>Choose one path</small>
            </div>
          )}
          styles={{ popup: { borderColor: '#73c4e0' } }}
        />
      ),
    },
    {
      id: 'cascader-placement',
      zh: {
        title: '弹层位置',
        description: 'placement 用于单独控制弹层相对选择框的左对齐或右对齐。',
        codeToggle: '查看弹层位置代码',
      },
      en: {
        title: 'Popup placement',
        description: 'Use placement to align the popup to the left or right edge of the control.',
        codeToggle: 'View popup placement code',
      },
      code: `import { Cascader, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Cascader placement="bottomLeft" options={options} placeholder="Bottom left" />
    <Cascader placement="bottomRight" options={options} placeholder="Bottom right" />
  </Space>
);`,
      render: () => (
        <Cinna.Space wrap>
          <Cinna.Cascader placement="bottomLeft" options={docsOptions} placeholder="Bottom left" />
          <Cinna.Cascader placement="bottomRight" options={docsOptions} placeholder="Bottom right" />
        </Cinna.Space>
      ),
    },
  ],
};
