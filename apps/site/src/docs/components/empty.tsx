import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const emptyDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-empty',
        zh: {
          title: '基础空状态',
          description: '不传属性时会展示默认描述，用于列表或面板暂无数据的场景。',
          codeToggle: '查看基础空状态代码',
        },
        en: {
          title: 'Basic empty state',
          description: 'Without props, Empty shows the default description for empty lists or panels.',
          codeToggle: 'View basic empty code',
        },
        code: `import { Empty } from '@cinna-design/react';

export default () => <Empty />;`,
        render: () => <Cinna.Empty />,
      },
      {
        id: 'empty-description',
        zh: {
          title: '自定义描述',
          description: 'description 可替换默认说明文本。',
          codeToggle: '查看自定义描述代码',
        },
        en: {
          title: 'Custom description',
          description: 'Use description to replace the default helper text.',
          codeToggle: 'View empty description code',
        },
        code: `import { Empty } from '@cinna-design/react';

export default () => <Empty description="No recipes match the current filters." />;`,
        render: () => <Cinna.Empty description="No recipes match the current filters." />,
      },
      {
        id: 'empty-image',
        zh: {
          title: '自定义图形',
          description: 'image 接收 ReactNode，可替换默认空状态图形区域。',
          codeToggle: '查看自定义图形代码',
        },
        en: {
          title: 'Custom image',
          description: 'image accepts ReactNode and replaces the default visual area.',
          codeToggle: 'View empty image code',
        },
        code: `import { Empty } from '@cinna-design/react';

export default () => (
  <Empty
    image={<span className="demo-empty-mark">0</span>}
    description="No batches are waiting."
  />
);`,
        render: () => <Cinna.Empty image={<span className="demo-empty-mark">0</span>} description="No batches are waiting." />,
      },
      {
        id: 'empty-actions',
        zh: {
          title: '操作区',
          description: 'actions 可放置按钮或其他操作，帮助用户从空状态继续下一步。',
          codeToggle: '查看操作区代码',
        },
        en: {
          title: 'Actions',
          description: 'Use actions for buttons or commands that help users continue.',
          codeToggle: 'View empty actions code',
        },
        code: `import { Button, Empty } from '@cinna-design/react';

export default () => (
  <Empty
    description="No drafts yet."
    actions={<Button variant="primary">Create draft</Button>}
  />
);`,
        render: () => <Cinna.Empty description="No drafts yet." actions={<Cinna.Button variant="primary">Create draft</Cinna.Button>} />,
      },
      {
        id: 'empty-children',
        zh: {
          title: '子内容兜底',
          description: '未传 actions 时，children 会作为空状态下方的补充内容。',
          codeToggle: '查看子内容代码',
        },
        en: {
          title: 'Children fallback',
          description: 'When actions is not set, children render as supporting content below the empty state.',
          codeToggle: 'View empty children code',
        },
        code: `import { Empty, Text } from '@cinna-design/react';

export default () => (
  <Empty description="Nothing selected">
    <Text tone="secondary">Choose a row to preview details.</Text>
  </Empty>
);`,
        render: () => (
          <Cinna.Empty description="Nothing selected">
            <Cinna.Text tone="secondary">Choose a row to preview details.</Cinna.Text>
          </Cinna.Empty>
        ),
      },
    ],
  };
