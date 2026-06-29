import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const inputDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-input',
        zh: {
          title: '基本用法',
          description: 'label 与 helperText 组合出带说明的基础输入框。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic input',
          description: 'Combine label and helperText for a described input field.',
          codeToggle: 'View basic input code',
        },
        code: `import { Input } from '@cinna-design/react';

export default () => (
  <Input
    label="Project name"
    placeholder="Cinna docs"
    helperText="Use a short, memorable name."
  />
);`,
        render: () => (
          <div style={{ width: 'min(420px, 100%)' }}>
            <Cinna.Input
              label="Project name"
              placeholder="Cinna docs"
              helperText="Use a short, memorable name."
            />
          </div>
        ),
      },
      {
        id: 'input-sizes',
        zh: {
          title: '输入框尺寸',
          description: 'size 提供 small、medium 与 large 三种尺寸。',
          codeToggle: '查看输入框尺寸代码',
        },
        en: {
          title: 'Input sizes',
          description: 'size supports small, medium, and large controls.',
          codeToggle: 'View input sizes code',
        },
        code: `import { Input, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(420px, 100%)' }}>
    <Input size="small" placeholder="Small" />
    <Input size="medium" placeholder="Medium" />
    <Input size="large" placeholder="Large" />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch" style={{ width: 'min(420px, 100%)' }}>
            <Cinna.Input size="small" placeholder="Small" />
            <Cinna.Input size="medium" placeholder="Medium" />
            <Cinna.Input size="large" placeholder="Large" />
          </Cinna.Space>
        ),
      },
      {
        id: 'input-affixes',
        zh: {
          title: '前缀与后缀',
          description: 'prefix 与 suffix 用于补充单位、图标或格式提示。',
          codeToggle: '查看前缀与后缀代码',
        },
        en: {
          title: 'Prefix and suffix',
          description: 'Use prefix and suffix for units, icons, or format hints.',
          codeToggle: 'View affix code',
        },
        code: `import { Input } from '@cinna-design/react';

export default () => (
  <Input
    label="Workspace URL"
    prefix="https://"
    suffix=".cinna.app"
    placeholder="cloud-kit"
  />
);`,
        render: () => (
          <div style={{ width: 'min(420px, 100%)' }}>
            <Cinna.Input
              label="Workspace URL"
              prefix="https://"
              suffix=".cinna.app"
              placeholder="cloud-kit"
            />
          </div>
        ),
      },
      {
        id: 'input-help-error',
        zh: {
          title: '辅助说明与错误',
          description: 'helperText 展示说明，error 会切换为错误状态并关联辅助文本。',
          codeToggle: '查看辅助说明与错误代码',
        },
        en: {
          title: 'Helper and error',
          description: 'helperText renders guidance, while error switches the field into an invalid state.',
          codeToggle: 'View helper and error code',
        },
        code: `import { Input, Space } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch" style={{ width: 'min(420px, 100%)' }}>
    <Input label="Alias" helperText="Shown in internal dashboards." placeholder="North star" />
    <Input label="Slug" error="Only lowercase letters and hyphens are supported." value="Cloud Docs!" readOnly />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="stretch" style={{ width: 'min(420px, 100%)' }}>
            <Cinna.Input label="Alias" helperText="Shown in internal dashboards." placeholder="North star" />
            <Cinna.Input label="Slug" error="Only lowercase letters and hyphens are supported." value="Cloud Docs!" readOnly />
          </Cinna.Space>
        ),
      },
      {
        id: 'input-disabled',
        zh: {
          title: '禁用状态',
          description: 'disabled 会禁用输入并让字段进入不可编辑状态。',
          codeToggle: '查看禁用状态代码',
        },
        en: {
          title: 'Disabled',
          description: 'disabled prevents editing and marks the field as unavailable.',
          codeToggle: 'View disabled code',
        },
        code: `import { Input } from '@cinna-design/react';

export default () => (
  <Input label="Owner" value="Design system team" disabled />
);`,
        render: () => (
          <div style={{ width: 'min(420px, 100%)' }}>
            <Cinna.Input label="Owner" value="Design system team" disabled />
          </div>
        ),
      },
      {
        id: 'input-native-props',
        zh: {
          title: '原生属性',
          description: 'Input 继承原生 input 属性，可直接使用 type、maxLength、readOnly 等能力。',
          codeToggle: '查看原生属性代码',
        },
        en: {
          title: 'Native attributes',
          description: 'Input extends native input attributes such as type, maxLength, and readOnly.',
          codeToggle: 'View native attributes code',
        },
        code: `import { Input } from '@cinna-design/react';

export default () => (
  <Input
    label="Contact email"
    type="email"
    maxLength={32}
    defaultValue="team@cinna.app"
    fullWidth={false}
  />
);`,
        render: () => (
          <Cinna.Input
            label="Contact email"
            type="email"
            maxLength={32}
            defaultValue="team@cinna.app"
            fullWidth={false}
          />
        ),
      },
    ],
  };
