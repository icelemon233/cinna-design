import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const skeletonDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-skeleton',
        zh: {
          title: '基础骨架',
          description: '默认展示标题占位和三行段落占位，并带有加载动画。',
          codeToggle: '查看基础骨架代码',
        },
        en: {
          title: 'Basic skeleton',
          description: 'By default, Skeleton shows a title placeholder, three rows, and loading animation.',
          codeToggle: 'View basic skeleton code',
        },
        code: `import { Skeleton } from '@cinna-design/react';

export default () => <Skeleton />;`,
        render: () => <Cinna.Skeleton />,
      },
      {
        id: 'skeleton-rows',
        zh: {
          title: '段落行数',
          description: 'rows 控制段落占位行数。',
          codeToggle: '查看段落行数代码',
        },
        en: {
          title: 'Rows',
          description: 'Use rows to control the number of paragraph placeholder lines.',
          codeToggle: 'View skeleton rows code',
        },
        code: `import { Skeleton } from '@cinna-design/react';

export default () => <Skeleton rows={5} />;`,
        render: () => <Cinna.Skeleton rows={5} />,
      },
      {
        id: 'skeleton-avatar',
        zh: {
          title: '头像占位',
          description: 'avatar 可在左侧增加头像占位，适合列表或用户卡片。',
          codeToggle: '查看头像占位代码',
        },
        en: {
          title: 'Avatar placeholder',
          description: 'Use avatar to add a leading avatar placeholder for lists or profile cards.',
          codeToggle: 'View skeleton avatar code',
        },
        code: `import { Skeleton } from '@cinna-design/react';

export default () => <Skeleton avatar rows={3} />;`,
        render: () => <Cinna.Skeleton avatar rows={3} />,
      },
      {
        id: 'skeleton-inactive',
        zh: {
          title: '静态占位',
          description: 'active={false} 关闭骨架动画，适合低干扰的占位区域。',
          codeToggle: '查看静态占位代码',
        },
        en: {
          title: 'Static placeholder',
          description: 'Use active={false} to disable animation in quieter placeholder areas.',
          codeToggle: 'View static skeleton code',
        },
        code: `import { Skeleton } from '@cinna-design/react';

export default () => <Skeleton active={false} />;`,
        render: () => <Cinna.Skeleton active={false} />,
      },
      {
        id: 'skeleton-title',
        zh: {
          title: '隐藏标题',
          description: 'title={false} 只保留段落行占位。',
          codeToggle: '查看隐藏标题代码',
        },
        en: {
          title: 'Hide title',
          description: 'Use title={false} to render only paragraph placeholder rows.',
          codeToggle: 'View hide skeleton title code',
        },
        code: `import { Skeleton } from '@cinna-design/react';

export default () => <Skeleton title={false} rows={4} />;`,
        render: () => <Cinna.Skeleton title={false} rows={4} />,
      },
      {
        id: 'skeleton-round',
        zh: {
          title: '圆角形态',
          description: 'round 让头像、标题和段落占位呈现更圆润的形态。',
          codeToggle: '查看圆角形态代码',
        },
        en: {
          title: 'Rounded shape',
          description: 'round makes the avatar, title, and rows use a softer rounded shape.',
          codeToggle: 'View rounded skeleton code',
        },
        code: `import { Skeleton } from '@cinna-design/react';

export default () => <Skeleton avatar round rows={3} />;`,
        render: () => <Cinna.Skeleton avatar round rows={3} />,
      },
    ],
  };
