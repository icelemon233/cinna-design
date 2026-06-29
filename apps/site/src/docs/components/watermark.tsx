import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const watermarkDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-watermark',
        zh: {
          title: '基础水印',
          description: 'content 设置文字水印，children 是需要被覆盖的内容区域。',
          codeToggle: '查看基础水印代码',
        },
        en: {
          title: 'Basic watermark',
          description: 'Use content for the watermark text and children for the covered area.',
          codeToggle: 'View basic watermark code',
        },
        code: `import { Card, Paragraph, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Cinna Design">
    <Card title="Private recipe">
      <Paragraph>Only visible inside the selected workspace.</Paragraph>
    </Card>
  </Watermark>
);`,
        render: () => (
          <Cinna.Watermark content="Cinna Design">
            <Cinna.Card title="Private recipe">
              <Cinna.Paragraph>Only visible inside the selected workspace.</Cinna.Paragraph>
            </Cinna.Card>
          </Cinna.Watermark>
        ),
      },
      {
        id: 'watermark-rotate',
        zh: {
          title: '旋转角度',
          description: 'rotate 控制水印文本的倾斜角度。',
          codeToggle: '查看旋转角度代码',
        },
        en: {
          title: 'Rotation',
          description: 'Use rotate to control the watermark text angle.',
          codeToggle: 'View watermark rotation code',
        },
        code: `import { Card, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Draft" rotate={-28}>
    <Card title="Launch checklist">Packaging, QA, and release notes.</Card>
  </Watermark>
);`,
        render: () => (
          <Cinna.Watermark content="Draft" rotate={-28}>
            <Cinna.Card title="Launch checklist">Packaging, QA, and release notes.</Cinna.Card>
          </Cinna.Watermark>
        ),
      },
      {
        id: 'watermark-gap',
        zh: {
          title: '水印间距',
          description: 'gap 调整水印文本之间的重复间隔。',
          codeToggle: '查看水印间距代码',
        },
        en: {
          title: 'Gap',
          description: 'Use gap to adjust the repeated spacing between watermark text.',
          codeToggle: 'View watermark gap code',
        },
        code: `import { Card, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Internal" gap={84}>
    <Card title="Ops note">Batch 42 is ready for inspection.</Card>
  </Watermark>
);`,
        render: () => (
          <Cinna.Watermark content="Internal" gap={84}>
            <Cinna.Card title="Ops note">Batch 42 is ready for inspection.</Cinna.Card>
          </Cinna.Watermark>
        ),
      },
      {
        id: 'watermark-opacity',
        zh: {
          title: '透明度',
          description: 'opacity 控制水印可见强度，适合在内容密集区域降低干扰。',
          codeToggle: '查看透明度代码',
        },
        en: {
          title: 'Opacity',
          description: 'Use opacity to control visibility and reduce noise in dense content areas.',
          codeToggle: 'View watermark opacity code',
        },
        code: `import { Card, Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Quiet mark" opacity={0.14}>
    <Card title="Review panel">A softer watermark for dense reading.</Card>
  </Watermark>
);`,
        render: () => (
          <Cinna.Watermark content="Quiet mark" opacity={0.14}>
            <Cinna.Card title="Review panel">A softer watermark for dense reading.</Cinna.Card>
          </Cinna.Watermark>
        ),
      },
      {
        id: 'watermark-container',
        zh: {
          title: '限定区域',
          description: '通过 style 设置容器尺寸，水印只覆盖当前 Watermark 区域。',
          codeToggle: '查看限定区域代码',
        },
        en: {
          title: 'Bounded area',
          description: 'Set the container size through style so the watermark covers only this area.',
          codeToggle: 'View bounded watermark code',
        },
        code: `import { Watermark } from '@cinna-design/react';

export default () => (
  <Watermark content="Bounded" style={{ minHeight: 150, padding: 18 }}>
    <div className="demo-watermark-panel">
      Watermark stays inside this panel.
    </div>
  </Watermark>
);`,
        render: () => (
          <Cinna.Watermark content="Bounded" style={{ minHeight: 150, padding: 18 }}>
            <div className="demo-watermark-panel">Watermark stays inside this panel.</div>
          </Cinna.Watermark>
        ),
      },
    ],
  };
