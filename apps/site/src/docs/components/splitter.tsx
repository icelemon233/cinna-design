import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const panelStyle: React.CSSProperties = {
  display: 'grid',
  alignContent: 'start',
  gap: 8,
};

export const splitterDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'basic-splitter',
      zh: {
        title: '基本用法',
        description: '使用 Splitter.Panel 定义面板，拖动中间分割线调整左右区域大小。',
        codeToggle: '查看基本用法代码',
      },
      en: {
        title: 'Basic splitter',
        description: 'Use Splitter.Panel for panels and drag the separator to resize the left and right areas.',
        codeToggle: 'View basic splitter code',
      },
      code: `import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter>
    <Splitter.Panel defaultSize="38%" min={140}>
      Project list
    </Splitter.Panel>
    <Splitter.Panel min={180}>
      Workspace
    </Splitter.Panel>
  </Splitter>
);`,
      render: () => (
        <Cinna.Splitter>
          <Cinna.Splitter.Panel defaultSize="38%" min={140}>
            <div style={panelStyle}>
              <Cinna.Text strong>Project list</Cinna.Text>
              <Cinna.Text tone="secondary">Drag the separator to resize.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
          <Cinna.Splitter.Panel min={180}>
            <div style={panelStyle}>
              <Cinna.Text strong>Workspace</Cinna.Text>
              <Cinna.Text tone="secondary">The content area keeps its minimum width.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
        </Cinna.Splitter>
      ),
    },
    {
      id: 'vertical-splitter',
      zh: {
        title: '垂直方向',
        description: 'orientation="vertical" 可改为上下分割，拖动横向分割线调整高度。',
        codeToggle: '查看垂直方向代码',
      },
      en: {
        title: 'Vertical direction',
        description: 'Use orientation="vertical" to split top and bottom areas by height.',
        codeToggle: 'View vertical splitter code',
      },
      code: `import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter orientation="vertical" style={{ height: 300 }}>
    <Splitter.Panel defaultSize="44%" min={96}>
      Preview
    </Splitter.Panel>
    <Splitter.Panel min={96}>
      Notes
    </Splitter.Panel>
  </Splitter>
);`,
      render: () => (
        <Cinna.Splitter orientation="vertical" style={{ height: 300 }}>
          <Cinna.Splitter.Panel defaultSize="44%" min={96}>
            <div style={panelStyle}>
              <Cinna.Text strong>Preview</Cinna.Text>
              <Cinna.Text tone="secondary">Top panel.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
          <Cinna.Splitter.Panel min={96}>
            <div style={panelStyle}>
              <Cinna.Text strong>Notes</Cinna.Text>
              <Cinna.Text tone="secondary">Bottom panel.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
        </Cinna.Splitter>
      ),
    },
    {
      id: 'disabled-splitter',
      zh: {
        title: '禁用拖拽',
        description: '设置 disabled 可禁用全部分割线；设置 Panel 的 resizable={false} 可禁用相邻分割线。',
        codeToggle: '查看禁用拖拽代码',
      },
      en: {
        title: 'Disabled drag',
        description: 'Use disabled for every separator, or resizable={false} on a panel to disable the adjacent separator.',
        codeToggle: 'View disabled drag code',
      },
      code: `import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter>
    <Splitter.Panel defaultSize="42%" resizable={false}>
      Locked panel
    </Splitter.Panel>
    <Splitter.Panel>
      Stable panel
    </Splitter.Panel>
  </Splitter>
);`,
      render: () => (
        <Cinna.Splitter>
          <Cinna.Splitter.Panel defaultSize="42%" resizable={false}>
            <div style={panelStyle}>
              <Cinna.Text strong>Locked panel</Cinna.Text>
              <Cinna.Text tone="secondary">This side disables the adjacent dragger.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
          <Cinna.Splitter.Panel>
            <div style={panelStyle}>
              <Cinna.Text strong>Stable panel</Cinna.Text>
              <Cinna.Text tone="secondary">The separator shows a disabled state.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
        </Cinna.Splitter>
      ),
    },
    {
      id: 'complex-splitter',
      zh: {
        title: '复杂组合',
        description: '嵌套水平与垂直 Splitter，可组合出编辑器、预览区和侧边栏。',
        codeToggle: '查看复杂组合代码',
      },
      en: {
        title: 'Complex composition',
        description: 'Nest horizontal and vertical splitters to compose editors, previews, and side panels.',
        codeToggle: 'View complex composition code',
      },
      code: `import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter style={{ height: 320 }}>
    <Splitter.Panel defaultSize="30%" min={140}>
      Navigator
    </Splitter.Panel>
    <Splitter.Panel min={260}>
      <Splitter orientation="vertical">
        <Splitter.Panel defaultSize="58%" min={120}>
          Editor
        </Splitter.Panel>
        <Splitter.Panel min={96}>
          Console
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);`,
      render: () => (
        <Cinna.Splitter style={{ height: 320 }}>
          <Cinna.Splitter.Panel defaultSize="30%" min={140}>
            <div style={panelStyle}>
              <Cinna.Text strong>Navigator</Cinna.Text>
              <Cinna.Text tone="secondary">Left-right drag.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
          <Cinna.Splitter.Panel min={260}>
            <Cinna.Splitter orientation="vertical" style={{ height: '100%' }}>
              <Cinna.Splitter.Panel defaultSize="58%" min={120}>
                <div style={panelStyle}>
                  <Cinna.Text strong>Editor</Cinna.Text>
                  <Cinna.Text tone="secondary">Top-bottom drag.</Cinna.Text>
                </div>
              </Cinna.Splitter.Panel>
              <Cinna.Splitter.Panel min={96}>
                <div style={panelStyle}>
                  <Cinna.Text strong>Console</Cinna.Text>
                  <Cinna.Text tone="secondary">Nested panel.</Cinna.Text>
                </div>
              </Cinna.Splitter.Panel>
            </Cinna.Splitter>
          </Cinna.Splitter.Panel>
        </Cinna.Splitter>
      ),
    },
    {
      id: 'lazy-splitter',
      zh: {
        title: '延迟渲染',
        description: 'lazy 模式会在拖动时显示预览分割线，松开后再提交尺寸变化，减少重复渲染。',
        codeToggle: '查看延迟渲染代码',
      },
      en: {
        title: 'Lazy rendering',
        description: 'With lazy enabled, a preview separator is shown while size updates are committed after release.',
        codeToggle: 'View lazy resize code',
      },
      code: `import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter lazy>
    <Splitter.Panel defaultSize="46%" min={160}>
      Heavy chart
    </Splitter.Panel>
    <Splitter.Panel min={160}>
      Detail table
    </Splitter.Panel>
  </Splitter>
);`,
      render: () => (
        <Cinna.Splitter lazy>
          <Cinna.Splitter.Panel defaultSize="46%" min={160}>
            <div style={panelStyle}>
              <Cinna.Text strong>Heavy chart</Cinna.Text>
              <Cinna.Text tone="secondary">Rendering waits until pointer release.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
          <Cinna.Splitter.Panel min={160}>
            <div style={panelStyle}>
              <Cinna.Text strong>Detail table</Cinna.Text>
              <Cinna.Text tone="secondary">Useful for heavier content.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
        </Cinna.Splitter>
      ),
    },
    {
      id: 'custom-divider-splitter',
      zh: {
        title: '自定义分割线',
        description: 'divider 可控制颜色、虚实线、线条厚度和可拖动区域宽度；分割线不承载文字。',
        codeToggle: '查看自定义分割线代码',
      },
      en: {
        title: 'Custom separator',
        description: 'Use divider for color, line style, thickness, and hit area; the separator does not carry text.',
        codeToggle: 'View custom separator code',
      },
      code: `import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter divider={{ color: '#73c4e0', dashed: false, thickness: 3, size: 18 }}>
    <Splitter.Panel defaultSize="45%" min={150}>
      Left panel
    </Splitter.Panel>
    <Splitter.Panel min={150}>
      Right panel
    </Splitter.Panel>
  </Splitter>
);`,
      render: () => (
        <Cinna.Splitter divider={{ color: '#73c4e0', dashed: false, thickness: 3, size: 18 }}>
          <Cinna.Splitter.Panel defaultSize="45%" min={150}>
            <div style={panelStyle}>
              <Cinna.Text strong>Left panel</Cinna.Text>
              <Cinna.Text tone="secondary">Custom color and line thickness.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
          <Cinna.Splitter.Panel min={150}>
            <div style={panelStyle}>
              <Cinna.Text strong>Right panel</Cinna.Text>
              <Cinna.Text tone="secondary">No text is placed inside the separator.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
        </Cinna.Splitter>
      ),
    },
    {
      id: 'double-click-reset-splitter',
      zh: {
        title: '双击重置',
        description: '默认支持双击分割线恢复初始尺寸，也可以通过 resetOnDoubleClick 关闭。',
        codeToggle: '查看双击重置代码',
      },
      en: {
        title: 'Double-click reset',
        description: 'Double-click the separator to restore initial sizes, or disable it with resetOnDoubleClick.',
        codeToggle: 'View double-click reset code',
      },
      code: `import { Splitter } from '@cinna-design/react';

export default () => (
  <Splitter>
    <Splitter.Panel defaultSize="34%" min={130}>
      Source
    </Splitter.Panel>
    <Splitter.Panel min={180}>
      Result
    </Splitter.Panel>
  </Splitter>
);`,
      render: () => (
        <Cinna.Splitter>
          <Cinna.Splitter.Panel defaultSize="34%" min={130}>
            <div style={panelStyle}>
              <Cinna.Text strong>Source</Cinna.Text>
              <Cinna.Text tone="secondary">Double-click the separator.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
          <Cinna.Splitter.Panel min={180}>
            <div style={panelStyle}>
              <Cinna.Text strong>Result</Cinna.Text>
              <Cinna.Text tone="secondary">The panels reset to their defaults.</Cinna.Text>
            </div>
          </Cinna.Splitter.Panel>
        </Cinna.Splitter>
      ),
    },
  ],
};
