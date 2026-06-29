import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const avatarDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-avatar',
        zh: {
          title: '字符头像',
          description: 'children 可直接作为头像内容，适合展示姓名缩写或对象标识。',
          codeToggle: '查看字符头像代码',
        },
        en: {
          title: 'Text avatar',
          description: 'Use children as avatar content for initials or object marks.',
          codeToggle: 'View text avatar code',
        },
        code: `import { Avatar, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Avatar>C</Avatar>
    <Avatar>UI</Avatar>
    <Avatar>7</Avatar>
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.Avatar>C</Cinna.Avatar>
            <Cinna.Avatar>UI</Cinna.Avatar>
            <Cinna.Avatar>7</Cinna.Avatar>
          </Cinna.Space>
        ),
      },
      {
        id: 'avatar-image',
        zh: {
          title: '图片头像',
          description: 'src 和 alt 用于展示图片类头像，并保留替代文本。',
          codeToggle: '查看图片头像代码',
        },
        en: {
          title: 'Image avatar',
          description: 'Use src and alt for image avatars with accessible fallback text.',
          codeToggle: 'View image avatar code',
        },
        code: `import { Avatar } from '@cinna-design/react';

const avatarSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect width="96" height="96" rx="24" fill="%23f0fafe"/%3E%3Ccircle cx="48" cy="42" r="22" fill="%23a8dff1"/%3E%3Cpath d="M20 82c7-18 48-18 56 0" fill="%23f6c96d"/%3E%3C/svg%3E';

export default () => <Avatar src={avatarSrc} alt="Cloud user" size="large" />;`,
        render: () => {
          const avatarSrc =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect width="96" height="96" rx="24" fill="%23f0fafe"/%3E%3Ccircle cx="48" cy="42" r="22" fill="%23a8dff1"/%3E%3Cpath d="M20 82c7-18 48-18 56 0" fill="%23f6c96d"/%3E%3C/svg%3E';

          return <Cinna.Avatar src={avatarSrc} alt="Cloud user" size="large" />;
        },
      },
      {
        id: 'avatar-sizes',
        zh: {
          title: '头像尺寸',
          description: 'size 支持 small、medium、large，也可以传入数字作为自定义像素尺寸。',
          codeToggle: '查看头像尺寸代码',
        },
        en: {
          title: 'Avatar sizes',
          description: 'size supports small, medium, large, or a numeric pixel size.',
          codeToggle: 'View avatar sizes code',
        },
        code: `import { Avatar, Space } from '@cinna-design/react';

export default () => (
  <Space align="center">
    <Avatar size="small">S</Avatar>
    <Avatar size="medium">M</Avatar>
    <Avatar size="large">L</Avatar>
    <Avatar size={64}>64</Avatar>
  </Space>
);`,
        render: () => (
          <Cinna.Space align="center">
            <Cinna.Avatar size="small">S</Cinna.Avatar>
            <Cinna.Avatar size="medium">M</Cinna.Avatar>
            <Cinna.Avatar size="large">L</Cinna.Avatar>
            <Cinna.Avatar size={64}>64</Cinna.Avatar>
          </Cinna.Space>
        ),
      },
      {
        id: 'avatar-shapes',
        zh: {
          title: '头像形状',
          description: 'shape 支持 circle 和 square，分别用于用户头像和更明确的对象标识。',
          codeToggle: '查看头像形状代码',
        },
        en: {
          title: 'Avatar shapes',
          description: 'shape supports circle and square for people or object identities.',
          codeToggle: 'View avatar shapes code',
        },
        code: `import { Avatar, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Avatar shape="circle">C</Avatar>
    <Avatar shape="square">Kit</Avatar>
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.Avatar shape="circle">C</Cinna.Avatar>
            <Cinna.Avatar shape="square">Kit</Cinna.Avatar>
          </Cinna.Space>
        ),
      },
      {
        id: 'avatar-icon-badge',
        zh: {
          title: '图标与徽标',
          description: 'icon 可作为头像内容，也可以与 Badge 组合展示状态或数量。',
          codeToggle: '查看图标与徽标代码',
        },
        en: {
          title: 'Icon and badge',
          description: 'icon can render avatar content, and Badge can add status or counts.',
          codeToggle: 'View icon badge code',
        },
        code: `import { Avatar, Badge, Space } from '@cinna-design/react';

export default () => (
  <Space>
    <Avatar icon="*" />
    <Badge dot status="success">
      <Avatar>C</Avatar>
    </Badge>
    <Badge count={3}>
      <Avatar shape="square">QA</Avatar>
    </Badge>
  </Space>
);`,
        render: () => (
          <Cinna.Space>
            <Cinna.Avatar icon="*" />
            <Cinna.Badge dot status="success">
              <Cinna.Avatar>C</Cinna.Avatar>
            </Cinna.Badge>
            <Cinna.Badge count={3}>
              <Cinna.Avatar shape="square">QA</Cinna.Avatar>
            </Cinna.Badge>
          </Cinna.Space>
        ),
      },
    ],
  };
