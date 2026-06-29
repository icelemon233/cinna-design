import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const resourceOptions = [
  { label: 'Docs', value: 'docs', description: 'Guides and API' },
  { label: 'Design tokens', value: 'tokens', description: 'Color and radius' },
  { label: 'Icons', value: 'icons', description: 'UI symbols' },
  { label: 'Components', value: 'components', description: 'Reusable controls' },
  { label: 'Changelog', value: 'changelog', description: 'Release notes' },
];

export const autoCompleteDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'basic-auto-complete',
      zh: {
        title: '基本用法',
        description: '输入内容后展示匹配建议，用户仍然可以保留任意自由输入。',
        codeToggle: '查看基本用法代码',
      },
      en: {
        title: 'Basic usage',
        description: 'Typing shows matching suggestions while still allowing free text.',
        codeToggle: 'View basic usage code',
      },
      code: `import { AutoComplete } from '@cinna-design/react';

const options = ['docs', 'design', 'tokens', 'icons', 'components'];

export default () => (
  <AutoComplete options={options} placeholder="Search resources" />
);`,
      render: () => (
        <Cinna.AutoComplete
          options={['docs', 'design', 'tokens', 'icons', 'components']}
          placeholder="Search resources"
        />
      ),
    },
    {
      id: 'auto-complete-rich-options',
      zh: {
        title: '对象选项',
        description: '选项支持 label、value、description、disabled 和单项样式。',
        codeToggle: '查看对象选项代码',
      },
      en: {
        title: 'Rich options',
        description: 'Options support label, value, description, disabled state, and item styles.',
        codeToggle: 'View rich options code',
      },
      code: `import { AutoComplete } from '@cinna-design/react';

const options = [
  { label: 'Docs', value: 'docs', description: 'Guides and API' },
  { label: 'Design tokens', value: 'tokens', description: 'Color and radius' },
  { label: 'Private notes', value: 'private', disabled: true },
];

export default () => (
  <AutoComplete options={options} placeholder="Choose a resource" />
);`,
      render: () => (
        <Cinna.AutoComplete
          options={[
            { label: 'Docs', value: 'docs', description: 'Guides and API' },
            { label: 'Design tokens', value: 'tokens', description: 'Color and radius' },
            { label: 'Private notes', value: 'private', disabled: true },
          ]}
          placeholder="Choose a resource"
        />
      ),
    },
    {
      id: 'auto-complete-search-filter',
      zh: {
        title: '搜索与筛选',
        description: 'onSearch 监听输入内容，filterOption 可以接管匹配逻辑。',
        codeToggle: '查看搜索与筛选代码',
      },
      en: {
        title: 'Search and filter',
        description: 'Use onSearch for input changes and filterOption to customize matching.',
        codeToggle: 'View search and filter code',
      },
      code: `import { AutoComplete, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const options = [
  { label: 'Docs', value: 'docs' },
  { label: 'Design tokens', value: 'tokens' },
  { label: 'Components', value: 'components' },
];

export default () => {
  const [keyword, setKeyword] = useState('');

  return (
    <Space direction="vertical" align="flex-start">
      <AutoComplete
        options={options}
        placeholder="Try do or token"
        onSearch={setKeyword}
        filterOption={(input, option) =>
          option.value.includes(input.toLowerCase()) ||
          String(option.label).toLowerCase().includes(input.toLowerCase())
        }
      />
      <Text tone="secondary">Searching: {keyword || 'empty'}</Text>
    </Space>
  );
};`,
      render: () => {
        const AutoCompleteSearchDemo = () => {
          const [keyword, setKeyword] = React.useState('');

          return (
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.AutoComplete
                options={resourceOptions}
                placeholder="Try do or token"
                onSearch={setKeyword}
                filterOption={(input, option) =>
                  option.value.includes(input.toLowerCase()) ||
                  String(option.label).toLowerCase().includes(input.toLowerCase())
                }
              />
              <Cinna.Text tone="secondary">Searching: {keyword || 'empty'}</Cinna.Text>
            </Cinna.Space>
          );
        };

        return <AutoCompleteSearchDemo />;
      },
    },
    {
      id: 'auto-complete-controlled-open',
      zh: {
        title: '受控展开与空状态',
        description: 'open 和 onOpenChange 控制弹层，notFoundContent 定义无匹配内容。',
        codeToggle: '查看受控展开代码',
      },
      en: {
        title: 'Controlled open and empty state',
        description: 'Control the popup with open and onOpenChange, and customize empty content.',
        codeToggle: 'View controlled open code',
      },
      code: `import { AutoComplete, Button, Space } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space align="center">
      <AutoComplete
        open={open}
        onOpenChange={setOpen}
        options={['docs', 'tokens']}
        placeholder="Controlled popup"
        notFoundContent="No matching resource"
      />
      <Button size="small" onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
    </Space>
  );
};`,
      render: () => {
        const AutoCompleteControlledDemo = () => {
          const [open, setOpen] = React.useState(false);

          return (
            <Cinna.Space align="center" wrap>
              <Cinna.AutoComplete
                open={open}
                onOpenChange={setOpen}
                options={['docs', 'tokens']}
                placeholder="Controlled popup"
                notFoundContent="No matching resource"
              />
              <Cinna.Button size="small" onClick={() => setOpen((value) => !value)}>
                Toggle
              </Cinna.Button>
            </Cinna.Space>
          );
        };

        return <AutoCompleteControlledDemo />;
      },
    },
    {
      id: 'auto-complete-size-variant-status',
      zh: {
        title: '尺寸、形态与状态',
        description: 'controlSize 控制高度，variant 和 status 用于不同输入语义。',
        codeToggle: '查看尺寸与状态代码',
      },
      en: {
        title: 'Size, variant, and status',
        description: 'Use controlSize for height, while variant and status express input state.',
        codeToggle: 'View size and status code',
      },
      code: `import { AutoComplete, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(420px, 100%)' }}>
    <AutoComplete controlSize="small" options={['small']} placeholder="Small" />
    <AutoComplete variant="filled" options={['filled']} placeholder="Filled" />
    <AutoComplete variant="underlined" status="warning" options={['warning']} placeholder="Warning" />
    <AutoComplete status="error" options={['error']} placeholder="Error" />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="stretch" style={{ width: 'min(420px, 100%)' }}>
          <Cinna.AutoComplete controlSize="small" options={['small']} placeholder="Small" />
          <Cinna.AutoComplete variant="filled" options={['filled']} placeholder="Filled" />
          <Cinna.AutoComplete variant="underlined" status="warning" options={['warning']} placeholder="Warning" />
          <Cinna.AutoComplete status="error" options={['error']} placeholder="Error" />
        </Cinna.Space>
      ),
    },
    {
      id: 'auto-complete-keyboard-backfill',
      zh: {
        title: '键盘选择与回填',
        description: '方向键移动高亮项，Enter 选择；backfill 会在键盘移动时临时回填输入框。',
        codeToggle: '查看键盘选择代码',
      },
      en: {
        title: 'Keyboard and backfill',
        description: 'Arrow keys move the active option and Enter selects it; backfill previews the active value.',
        codeToggle: 'View keyboard code',
      },
      code: `import { AutoComplete } from '@cinna-design/react';

export default () => (
  <AutoComplete
    backfill
    defaultActiveFirstOption
    options={['docs', 'design', 'tokens', 'components']}
    placeholder="Use arrow keys"
  />
);`,
      render: () => (
        <Cinna.AutoComplete
          backfill
          defaultActiveFirstOption
          options={['docs', 'design', 'tokens', 'components']}
          placeholder="Use arrow keys"
        />
      ),
    },
    {
      id: 'auto-complete-popup-style',
      zh: {
        title: '弹层与语义样式',
        description: 'popupRender 可包裹弹层内容，classNames 和 styles 可定制关键语义节点。',
        codeToggle: '查看弹层样式代码',
      },
      en: {
        title: 'Popup and semantic styles',
        description: 'Use popupRender to wrap popup content, and classNames/styles for semantic nodes.',
        codeToggle: 'View popup style code',
      },
      code: `import { AutoComplete } from '@cinna-design/react';

export default () => (
  <AutoComplete
    allowClear={{ clearIcon: '×' }}
    popupMatchInputWidth={360}
    options={[
      { label: 'Docs', value: 'docs', description: 'Stable content' },
      { label: 'Design tokens', value: 'tokens', description: 'Theme source' },
    ]}
    placeholder="Styled popup"
    popupRender={(node) => (
      <div style={{ display: 'grid', gap: 8 }}>
        {node}
        <small style={{ color: '#8a6c5f', fontWeight: 800 }}>2 resources</small>
      </div>
    )}
    styles={{
      popup: { borderColor: '#73c4e0' },
      option: { color: '#46332a' },
    }}
  />
);`,
      render: () => (
        <Cinna.AutoComplete
          allowClear={{ clearIcon: '×' }}
          popupMatchInputWidth={360}
          options={[
            { label: 'Docs', value: 'docs', description: 'Stable content' },
            { label: 'Design tokens', value: 'tokens', description: 'Theme source' },
          ]}
          placeholder="Styled popup"
          popupRender={(node) => (
            <div style={{ display: 'grid', gap: 8 }}>
              {node}
              <small style={{ color: '#8a6c5f', fontWeight: 800 }}>2 resources</small>
            </div>
          )}
          styles={{
            popup: { borderColor: '#73c4e0' },
            option: { color: '#46332a' },
          }}
        />
      ),
    },
  ],
};
