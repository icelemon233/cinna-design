import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const cardDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-card',
        zh: {
          title: '基本卡片',
          description: 'Card 用于承载一组相对独立的信息，默认带有柔和背景和内边距。',
          codeToggle: '查看基本卡片代码',
        },
        en: {
          title: 'Basic card',
          description: 'Use Card to hold an independent piece of content with soft surface and padding.',
          codeToggle: 'View basic card code',
        },
        code: `import { Card, Text } from '@cinna-design/react';

export default () => (
  <Card>
    <Text tone="secondary">A calm surface for notes, summaries, and compact modules.</Text>
  </Card>
);`,
        render: () => (
          <Cinna.Card>
            <Cinna.Text tone="secondary">A calm surface for notes, summaries, and compact modules.</Cinna.Text>
          </Cinna.Card>
        ),
      },
      {
        id: 'card-title-extra',
        zh: {
          title: '标题与扩展区域',
          description: 'title 放在卡片头部左侧，extra 适合放状态、链接或轻量操作。',
          codeToggle: '查看标题与扩展区域代码',
        },
        en: {
          title: 'Title and extra',
          description: 'title renders on the left of the header, while extra fits status, links, or light actions.',
          codeToggle: 'View title extra code',
        },
        code: `import { Button, Card, Text } from '@cinna-design/react';

export default () => (
  <Card title="Release card" extra={<Button variant="text">Edit</Button>}>
    <Text tone="secondary">Review the final copy before publishing.</Text>
  </Card>
);`,
        render: () => (
          <Cinna.Card title="Release card" extra={<Cinna.Button variant="text">Edit</Cinna.Button>}>
            <Cinna.Text tone="secondary">Review the final copy before publishing.</Cinna.Text>
          </Cinna.Card>
        ),
      },
      {
        id: 'card-tones',
        zh: {
          title: '卡片色调',
          description: 'tone 提供 cream、blue、butter、strawberry、pistachio 和 lavender 六种柔和色调。',
          codeToggle: '查看卡片色调代码',
        },
        en: {
          title: 'Card tones',
          description: 'tone supports cream, blue, butter, strawberry, pistachio, and lavender surfaces.',
          codeToggle: 'View card tones code',
        },
        code: `import { Card, Space, Text } from '@cinna-design/react';

export default () => (
  <Space wrap align="stretch">
    <Card tone="cream" title="Cream"><Text>Default</Text></Card>
    <Card tone="blue" title="Blue"><Text>Info</Text></Card>
    <Card tone="butter" title="Butter"><Text>Warm</Text></Card>
    <Card tone="pistachio" title="Pistachio"><Text>Fresh</Text></Card>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap align="stretch">
            <Cinna.Card tone="cream" title="Cream"><Cinna.Text>Default</Cinna.Text></Cinna.Card>
            <Cinna.Card tone="blue" title="Blue"><Cinna.Text>Info</Cinna.Text></Cinna.Card>
            <Cinna.Card tone="butter" title="Butter"><Cinna.Text>Warm</Cinna.Text></Cinna.Card>
            <Cinna.Card tone="pistachio" title="Pistachio"><Cinna.Text>Fresh</Cinna.Text></Cinna.Card>
          </Cinna.Space>
        ),
      },
      {
        id: 'card-interactive',
        zh: {
          title: '可交互卡片',
          description: 'interactive 会启用 hover 浮起效果，适合列表入口或可点击模块。',
          codeToggle: '查看可交互卡片代码',
        },
        en: {
          title: 'Interactive card',
          description: 'interactive enables the hover lift for list entries or clickable modules.',
          codeToggle: 'View interactive card code',
        },
        code: `import { Card, Space, Text } from '@cinna-design/react';

export default () => (
  <Space wrap align="stretch">
    <Card interactive title="Docs">
      <Text tone="secondary">Open the documentation hub.</Text>
    </Card>
    <Card interactive tone="strawberry" title="Issues">
      <Text tone="secondary">Review blockers before release.</Text>
    </Card>
  </Space>
);`,
        render: () => (
          <Cinna.Space wrap align="stretch">
            <Cinna.Card interactive title="Docs">
              <Cinna.Text tone="secondary">Open the documentation hub.</Cinna.Text>
            </Cinna.Card>
            <Cinna.Card interactive tone="strawberry" title="Issues">
              <Cinna.Text tone="secondary">Review blockers before release.</Cinna.Text>
            </Cinna.Card>
          </Cinna.Space>
        ),
      },
      {
        id: 'card-padded-native',
        zh: {
          title: '留白与原生属性',
          description: 'padded={false} 可关闭内置留白，Card 也继承原生 div 属性。',
          codeToggle: '查看留白与原生属性代码',
        },
        en: {
          title: 'Padding and native attributes',
          description: 'padded={false} removes built-in padding, and Card extends native div attributes.',
          codeToggle: 'View padding native code',
        },
        code: `import { Card } from '@cinna-design/react';

export default () => (
  <Card
    padded={false}
    title="Custom body"
    style={{ width: 260 }}
  >
    <div style={{ padding: 18, background: '#f0fafe' }}>Custom inner layout</div>
  </Card>
);`,
        render: () => (
          <Cinna.Card padded={false} title="Custom body" style={{ width: 260 }}>
            <div style={{ padding: 18, background: '#f0fafe' }}>Custom inner layout</div>
          </Cinna.Card>
        ),
      },
    ],
  };
