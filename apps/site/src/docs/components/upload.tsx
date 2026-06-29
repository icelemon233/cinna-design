import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const uploadDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-upload',
        zh: {
          title: '基本用法',
          description: 'label 设置触发按钮文案，选择文件后会在本地列表中展示文件名。',
          codeToggle: '查看基本用法代码',
        },
        en: {
          title: 'Basic upload',
          description: 'label sets the trigger text, and selected files appear in the local list.',
          codeToggle: 'View basic upload code',
        },
        code: `import { Upload } from '@cinna-design/react';

export default () => <Upload label="Choose file" />;`,
        render: () => <Cinna.Upload label="Choose file" />,
      },
      {
        id: 'upload-hint',
        zh: {
          title: '提示说明',
          description: 'hint 用于展示文件大小、格式或业务说明。',
          codeToggle: '查看提示说明代码',
        },
        en: {
          title: 'Hint',
          description: 'hint describes file size, type, or business guidance.',
          codeToggle: 'View hint code',
        },
        code: `import { Upload } from '@cinna-design/react';

export default () => (
  <Upload
    label="Upload changelog"
    hint="Markdown or text files under 2 MB."
    accept=".md,.txt"
  />
);`,
        render: () => (
          <Cinna.Upload
            label="Upload changelog"
            hint="Markdown or text files under 2 MB."
            accept=".md,.txt"
          />
        ),
      },
      {
        id: 'upload-multiple',
        zh: {
          title: '类型与多选',
          description: 'accept 与 multiple 来自原生 file input，用于限制类型和允许多选。',
          codeToggle: '查看类型与多选代码',
        },
        en: {
          title: 'Type and multiple',
          description: 'accept and multiple come from native file input for type limits and multi-select.',
          codeToggle: 'View type and multiple code',
        },
        code: `import { Upload } from '@cinna-design/react';

export default () => (
  <Upload
    label="Upload images"
    accept="image/*"
    multiple
    hint="Select one or more images."
  />
);`,
        render: () => (
          <Cinna.Upload
            label="Upload images"
            accept="image/*"
            multiple
            hint="Select one or more images."
          />
        ),
      },
      {
        id: 'upload-hidden-list',
        zh: {
          title: '隐藏列表',
          description: 'showUploadList={false} 会隐藏本地文件名列表。',
          codeToggle: '查看隐藏列表代码',
        },
        en: {
          title: 'Hidden list',
          description: 'showUploadList={false} hides the local filename list.',
          codeToggle: 'View hidden list code',
        },
        code: `import { Upload } from '@cinna-design/react';

export default () => <Upload label="Import file" showUploadList={false} />;`,
        render: () => <Cinna.Upload label="Import file" showUploadList={false} />,
      },
      {
        id: 'upload-button-props',
        zh: {
          title: '按钮属性与禁用',
          description: 'buttonProps 可传给触发按钮内容，disabled 会禁用原生文件输入。',
          codeToggle: '查看按钮属性与禁用代码',
        },
        en: {
          title: 'Button props and disabled',
          description: 'buttonProps goes to the trigger content, while disabled disables the native input.',
          codeToggle: 'View button props and disabled code',
        },
        code: `import { Space, Upload } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="flex-start">
    <Upload label="Primary upload" buttonProps={{ title: 'Upload report' }} />
    <Upload label="Disabled upload" disabled />
  </Space>
);`,
        render: () => (
          <Cinna.Space direction="vertical" align="flex-start">
            <Cinna.Upload label="Primary upload" buttonProps={{ title: 'Upload report' }} />
            <Cinna.Upload label="Disabled upload" disabled />
          </Cinna.Space>
        ),
      },
    ],
  };
