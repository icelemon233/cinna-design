import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const affixDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'affix-top',
        zh: {
          title: '顶部固钉',
          description: 'offsetTop 用于设置元素吸附到容器顶部时的距离。',
          codeToggle: '查看顶部固钉代码',
        },
        en: {
          title: 'Top affix',
          description: 'Use offsetTop to set the distance from the top edge while sticky.',
          codeToggle: 'View top affix code',
        },
        code: `import { Affix, Button } from '@cinna-design/react';

export default () => (
  <div style={{ height: 160, overflow: 'auto', padding: 12, borderRadius: 18, background: '#f0fafe' }}>
    <Affix offsetTop={12}>
      <Button size="small">Sticky top action</Button>
    </Affix>
    <div style={{ height: 240, paddingTop: 24 }}>Scroll this area</div>
  </div>
);`,
        render: () => (
          <div style={{ height: 160, overflow: 'auto', padding: 12, borderRadius: 18, background: '#f0fafe' }}>
            <Cinna.Affix offsetTop={12}>
              <Cinna.Button size="small">Sticky top action</Cinna.Button>
            </Cinna.Affix>
            <div style={{ height: 240, paddingTop: 24 }}>Scroll this area</div>
          </div>
        ),
      },
      {
        id: 'affix-bottom',
        zh: {
          title: '底部固钉',
          description: 'offsetBottom 用于设置元素吸附到底部时的距离。',
          codeToggle: '查看底部固钉代码',
        },
        en: {
          title: 'Bottom affix',
          description: 'Use offsetBottom to set the distance from the bottom edge while sticky.',
          codeToggle: 'View bottom affix code',
        },
        code: `import { Affix, Button } from '@cinna-design/react';

export default () => (
  <div style={{ height: 160, overflow: 'auto', padding: 12, borderRadius: 18, background: '#fff8ee' }}>
    <div style={{ height: 220 }}>Long content</div>
    <Affix offsetBottom={12}>
      <Button size="small" variant="cream">Sticky bottom action</Button>
    </Affix>
  </div>
);`,
        render: () => (
          <div style={{ height: 160, overflow: 'auto', padding: 12, borderRadius: 18, background: '#fff8ee' }}>
            <div style={{ height: 220 }}>Long content</div>
            <Cinna.Affix offsetBottom={12}>
              <Cinna.Button size="small" variant="cream">Sticky bottom action</Cinna.Button>
            </Cinna.Affix>
          </div>
        ),
      },
      {
        id: 'affix-toolbar',
        zh: {
          title: '固定工具条',
          description: '把常用操作放入 Affix，可以在长内容滚动时保持可见。',
          codeToggle: '查看固定工具条代码',
        },
        en: {
          title: 'Sticky toolbar',
          description: 'Place common actions in Affix so they remain visible while content scrolls.',
          codeToggle: 'View sticky toolbar code',
        },
        code: `import { Affix, Button, Space } from '@cinna-design/react';

export default () => (
  <div style={{ height: 170, overflow: 'auto', padding: 12, borderRadius: 18, background: '#fffcf6' }}>
    <Affix offsetTop={8}>
      <Space wrap style={{ padding: 8, borderRadius: 16, background: '#ffffffcc' }}>
        <Button size="small">Save</Button>
        <Button size="small" variant="cream">Preview</Button>
      </Space>
    </Affix>
    <div style={{ height: 240, paddingTop: 28 }}>Editable document content</div>
  </div>
);`,
        render: () => (
          <div style={{ height: 170, overflow: 'auto', padding: 12, borderRadius: 18, background: '#fffcf6' }}>
            <Cinna.Affix offsetTop={8}>
              <Cinna.Space wrap style={{ padding: 8, borderRadius: 16, background: '#ffffffcc' }}>
                <Cinna.Button size="small">Save</Cinna.Button>
                <Cinna.Button size="small" variant="cream">Preview</Cinna.Button>
              </Cinna.Space>
            </Cinna.Affix>
            <div style={{ height: 240, paddingTop: 28 }}>Editable document content</div>
          </div>
        ),
      },
      {
        id: 'affix-side-summary',
        zh: {
          title: '固定摘要',
          description: '也可以把提示、目录或摘要放在滚动区域的可视范围内。',
          codeToggle: '查看固定摘要代码',
        },
        en: {
          title: 'Sticky summary',
          description: 'Use it for hints, navigation, or summaries within a scrolling area.',
          codeToggle: 'View sticky summary code',
        },
        code: `import { Affix, Card, Text } from '@cinna-design/react';

export default () => (
  <div style={{ height: 210, overflow: 'auto', padding: 14, borderRadius: 18, background: '#f7ffe8' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 220px', gap: 16, alignItems: 'start' }}>
      <div style={{ display: 'grid', gap: 12 }}>
        <Card tone="cream" title="Long review content">
          <Text tone="secondary">Read through the review details in the main column.</Text>
        </Card>
        <Card tone="cream" title="Checklist">
          <Text tone="secondary">Confirm copy, spacing, status, and handoff notes.</Text>
        </Card>
        <div style={{ height: 120 }} />
      </div>
      <Affix offsetTop={12}>
        <Card tone="pistachio" title="Review note">
          <Text tone="secondary">Keep this note visible while reading.</Text>
        </Card>
      </Affix>
    </div>
  </div>
);`,
        render: () => (
          <div style={{ height: 210, overflow: 'auto', padding: 14, borderRadius: 18, background: '#f7ffe8' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 220px', gap: 16, alignItems: 'start' }}>
              <div style={{ display: 'grid', gap: 12 }}>
                <Cinna.Card tone="cream" title="Long review content">
                  <Cinna.Text tone="secondary">Read through the review details in the main column.</Cinna.Text>
                </Cinna.Card>
                <Cinna.Card tone="cream" title="Checklist">
                  <Cinna.Text tone="secondary">Confirm copy, spacing, status, and handoff notes.</Cinna.Text>
                </Cinna.Card>
                <div style={{ height: 120 }} />
              </div>
              <Cinna.Affix offsetTop={12}>
                <Cinna.Card tone="pistachio" title="Review note">
                  <Cinna.Text tone="secondary">Keep this note visible while reading.</Cinna.Text>
                </Cinna.Card>
              </Cinna.Affix>
            </div>
          </div>
        ),
      },
    ],
  };
