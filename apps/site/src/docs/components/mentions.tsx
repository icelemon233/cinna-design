import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const mentionsDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-mentions',
        zh: {
          title: '基本用法',
          description: '通过 options 提供可插入的提及对象。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic mentions',
          description: 'Use options to provide mention targets that can be inserted.',
          codeToggle: 'View basic mentions code',
        },
        code: `import { Mentions } from '@cinna-design/react';

export default () => (
  <Mentions options={['icelemon', 'design', 'release']} placeholder="Write a note" />
);`,
        render: () => (
          <div style={{ width: 'min(520px, 100%)' }}>
            <Cinna.Mentions options={['icelemon', 'design', 'release']} placeholder="Write a note" />
          </div>
        ),
      },
      {
        id: 'mentions-prefix',
        zh: {
          title: '自定义前缀',
          description: 'prefix 可把触发字符改成 # 等业务标记。',
          codeToggle: '查看自定义前缀代码',
        },
        en: {
          title: 'Custom prefix',
          description: 'prefix can change the mention mark to symbols such as #.',
          codeToggle: 'View custom prefix code',
        },
        code: `import { Mentions } from '@cinna-design/react';

export default () => (
  <Mentions
    prefix="#"
    options={[
      { label: 'docs', value: 'docs' },
      { label: 'bug', value: 'bug' },
      { label: 'release', value: 'release' },
    ]}
    defaultValue="Tag this update"
  />
);`,
        render: () => (
          <div style={{ width: 'min(520px, 100%)' }}>
            <Cinna.Mentions
              prefix="#"
              options={[
                { label: 'docs', value: 'docs' },
                { label: 'bug', value: 'bug' },
                { label: 'release', value: 'release' },
              ]}
              defaultValue="Tag this update"
            />
          </div>
        ),
      },
      {
        id: 'mentions-count-auto-size',
        zh: {
          title: '字数与自适应',
          description: 'Mentions 继承 TextArea 的 showCount、maxLength 与 autoSize 能力。',
          codeToggle: '查看字数与自适应代码',
        },
        en: {
          title: 'Count and auto size',
          description: 'Mentions inherits showCount, maxLength, and autoSize from TextArea.',
          codeToggle: 'View count and auto size code',
        },
        code: `import { Mentions } from '@cinna-design/react';

export default () => (
  <Mentions
    autoSize
    showCount
    maxLength={120}
    options={['docs', 'tokens']}
    defaultValue="Thanks @docs for the update."
  />
);`,
        render: () => (
          <div style={{ width: 'min(520px, 100%)' }}>
            <Cinna.Mentions
              autoSize
              showCount
              maxLength={120}
              options={['docs', 'tokens']}
              defaultValue="Thanks @docs for the update."
            />
          </div>
        ),
      },
      {
        id: 'mentions-status',
        zh: {
          title: '校验状态',
          description: 'status 可展示警告或错误状态。',
          codeToggle: '查看校验状态代码',
        },
        en: {
          title: 'Validation status',
          description: 'status can show warning or error feedback.',
          codeToggle: 'View validation status code',
        },
        code: `import { Mentions, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(520px, 100%)' }}>
    <Mentions status="warning" options={['review']} defaultValue="Need @review" />
    <Mentions status="error" options={['owner']} defaultValue="Missing @owner" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch" style={{ width: 'min(520px, 100%)' }}>
            <Cinna.Mentions status="warning" options={['review']} defaultValue="Need @review" />
            <Cinna.Mentions status="error" options={['owner']} defaultValue="Missing @owner" />
          </Cinna.Space>
        ),
      },
      {
        id: 'mentions-select',
        zh: {
          title: '选择回调',
          description: 'onSelect 会在点击候选项时返回选中的 value。',
          codeToggle: '查看选择回调代码',
        },
        en: {
          title: 'Select callback',
          description: 'onSelect returns the selected value when an option is clicked.',
          codeToggle: 'View select callback code',
        },
        code: `import { Mentions, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [selected, setSelected] = useState('none');

  return (
    <Space direction="vertical" align="flex-start" style={{ width: 'min(520px, 100%)' }}>
      <Mentions options={['design', 'review', 'ship']} onSelect={setSelected} />
      <Text tone="secondary">Selected: {selected}</Text>
    </Space>
  );
};`,
        render: () => {
          const MentionsSelectDemo = () => {
            const [selected, setSelected] = React.useState('none');

            return (
              <Cinna.Space direction="vertical" align="flex-start" style={{ width: 'min(520px, 100%)' }}>
                <Cinna.Mentions options={['design', 'review', 'ship']} onSelect={setSelected} />
                <Cinna.Text tone="secondary">Selected: {selected}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <MentionsSelectDemo />;
        },
      },
    ],
  };
