import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const imageDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-image',
        zh: {
          title: '基础图片',
          description: 'src 与 alt 使用原生图片属性，组件会自动套用圆角与响应式宽度。',
          codeToggle: '查看基础图片代码',
        },
        en: {
          title: 'Basic image',
          description: 'Use native src and alt attributes, with rounded and responsive rendering by default.',
          codeToggle: 'View basic image code',
        },
        code: `import { Image } from '@cinna-design/react';

const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="180"%3E%3Crect width="280" height="180" rx="28" fill="%23f0fafe"/%3E%3Ccircle cx="92" cy="78" r="34" fill="%23a8dff1"/%3E%3Cpath d="M38 148c38-46 74-46 112 0 24-30 52-38 92 0" fill="%23f6c96d"/%3E%3C/svg%3E';

export default () => <Image src={imageSrc} alt="Dessert card" width={240} />;`,
        render: () => (
          <Cinna.Image
            src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="180"%3E%3Crect width="280" height="180" rx="28" fill="%23f0fafe"/%3E%3Ccircle cx="92" cy="78" r="34" fill="%23a8dff1"/%3E%3Cpath d="M38 148c38-46 74-46 112 0 24-30 52-38 92 0" fill="%23f6c96d"/%3E%3C/svg%3E'}
            alt="Dessert card"
            width={240}
          />
        ),
      },
      {
        id: 'image-caption',
        zh: {
          title: '图片说明',
          description: 'caption 可在图片下方补充简短说明。',
          codeToggle: '查看图片说明代码',
        },
        en: {
          title: 'Caption',
          description: 'Use caption to add short supporting copy below an image.',
          codeToggle: 'View image caption code',
        },
        code: `import { Image } from '@cinna-design/react';

const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="180"%3E%3Crect width="280" height="180" rx="28" fill="%23fff8ee"/%3E%3Cpath d="M60 130h160l-18 26H78z" fill="%23a8dff1"/%3E%3Cpath d="M82 118c8-42 108-42 116 0z" fill="%23f6c96d"/%3E%3Ccircle cx="112" cy="82" r="14" fill="%23ef8f8f"/%3E%3C/svg%3E';

export default () => (
  <Image src={imageSrc} alt="Seasonal cake" width={240} caption="Seasonal cake preview" />
);`,
        render: () => (
          <Cinna.Image
            src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="180"%3E%3Crect width="280" height="180" rx="28" fill="%23fff8ee"/%3E%3Cpath d="M60 130h160l-18 26H78z" fill="%23a8dff1"/%3E%3Cpath d="M82 118c8-42 108-42 116 0z" fill="%23f6c96d"/%3E%3Ccircle cx="112" cy="82" r="14" fill="%23ef8f8f"/%3E%3C/svg%3E'}
            alt="Seasonal cake"
            width={240}
            caption="Seasonal cake preview"
          />
        ),
      },
      {
        id: 'image-fallback',
        zh: {
          title: '加载失败兜底',
          description: 'fallback 会在图片加载失败时替换为备用地址，同时仍可使用 onError。',
          codeToggle: '查看兜底图片代码',
        },
        en: {
          title: 'Fallback',
          description: 'fallback replaces the source when loading fails, and onError is still available.',
          codeToggle: 'View image fallback code',
        },
        code: `import { Image } from '@cinna-design/react';

const fallback =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="180"%3E%3Crect width="280" height="180" rx="28" fill="%23f7fdff"/%3E%3Ctext x="140" y="96" text-anchor="middle" fill="%233d8eaa" font-size="22" font-family="Arial" font-weight="700"%3EFallback%3C/text%3E%3C/svg%3E';

export default () => (
  <Image src="/missing-dessert.png" fallback={fallback} alt="Fallback preview" width={240} />
);`,
        render: () => (
          <Cinna.Image
            src="/missing-dessert.png"
            fallback={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="280" height="180"%3E%3Crect width="280" height="180" rx="28" fill="%23f7fdff"/%3E%3Ctext x="140" y="96" text-anchor="middle" fill="%233d8eaa" font-size="22" font-family="Arial" font-weight="700"%3EFallback%3C/text%3E%3C/svg%3E'}
            alt="Fallback preview"
            width={240}
          />
        ),
      },
      {
        id: 'image-preview',
        zh: {
          title: '点击预览',
          description: 'preview 开启后，点击图片会打开简洁的全屏预览层。',
          codeToggle: '查看点击预览代码',
        },
        en: {
          title: 'Click preview',
          description: 'Enable preview to open a simple full-screen preview when the image is clicked.',
          codeToggle: 'View image preview code',
        },
        code: `import { Image } from '@cinna-design/react';

const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="360" height="220"%3E%3Crect width="360" height="220" rx="32" fill="%23fff8ee"/%3E%3Ccircle cx="180" cy="102" r="58" fill="%23a8dff1"/%3E%3Cpath d="M104 168c32-54 120-54 152 0z" fill="%23f6c96d"/%3E%3C/svg%3E';

export default () => <Image preview src={imageSrc} alt="Previewable dessert" width={260} />;`,
        render: () => (
          <Cinna.Image
            preview
            src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="360" height="220"%3E%3Crect width="360" height="220" rx="32" fill="%23fff8ee"/%3E%3Ccircle cx="180" cy="102" r="58" fill="%23a8dff1"/%3E%3Cpath d="M104 168c32-54 120-54 152 0z" fill="%23f6c96d"/%3E%3C/svg%3E'}
            alt="Previewable dessert"
            width={260}
          />
        ),
      },
      {
        id: 'image-native-size',
        zh: {
          title: '尺寸与原生属性',
          description: 'width、height、loading 等图片原生属性可以直接传入。',
          codeToggle: '查看尺寸代码',
        },
        en: {
          title: 'Size and native attributes',
          description: 'Native image attributes such as width, height, and loading can be passed directly.',
          codeToggle: 'View image size code',
        },
        code: `import { Image } from '@cinna-design/react';

const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="220" height="140"%3E%3Crect width="220" height="140" rx="24" fill="%23f0fafe"/%3E%3Cpath d="M44 104h132l-12 18H56z" fill="%23f6c96d"/%3E%3Cpath d="M70 96c10-36 70-36 80 0z" fill="%23a8dff1"/%3E%3C/svg%3E';

export default () => (
  <Image src={imageSrc} alt="Fixed image" width={180} height={116} loading="lazy" />
);`,
        render: () => (
          <Cinna.Image
            src={'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="220" height="140"%3E%3Crect width="220" height="140" rx="24" fill="%23f0fafe"/%3E%3Cpath d="M44 104h132l-12 18H56z" fill="%23f6c96d"/%3E%3Cpath d="M70 96c10-36 70-36 80 0z" fill="%23a8dff1"/%3E%3C/svg%3E'}
            alt="Fixed image"
            width={180}
            height={116}
            loading="lazy"
          />
        ),
      },
    ],
  };
