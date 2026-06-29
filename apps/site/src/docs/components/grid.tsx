import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const cellBase: React.CSSProperties = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

const cell = (background: string, minHeight?: number): React.CSSProperties => ({
  ...cellBase,
  ...(minHeight ? { minHeight } : null),
  background,
});

const palette = ['#f0fafe', '#fff8ee', '#f7ffe8', '#fff1f4', '#f7f2ff', '#eef8ff'];
const gutterCells = Array.from({ length: 24 }, (_, index) => index + 1);

const GutterSliderDemo = () => {
  const [horizontal, setHorizontal] = React.useState(24);
  const [vertical, setVertical] = React.useState(16);

  return (
    <Cinna.Space direction="vertical" block size="large">
      <Cinna.Space direction="vertical" block>
        <Cinna.Text strong>Horizontal gutter: {horizontal}px</Cinna.Text>
        <Cinna.Slider
          min={0}
          max={48}
          step={1}
          value={horizontal}
          onChange={(event) => setHorizontal(Number(event.currentTarget.value))}
          marks={{ 0: '0', 24: '24', 48: '48' }}
        />
      </Cinna.Space>
      <Cinna.Space direction="vertical" block>
        <Cinna.Text strong>Vertical gutter: {vertical}px</Cinna.Text>
        <Cinna.Slider
          min={0}
          max={40}
          step={1}
          value={vertical}
          onChange={(event) => setVertical(Number(event.currentTarget.value))}
          marks={{ 0: '0', 16: '16', 40: '40' }}
        />
      </Cinna.Space>
      <Cinna.Row gutter={[horizontal, vertical]}>
        {gutterCells.map((item) => (
          <Cinna.Col key={item} span={4}>
            <div style={cell(palette[(item - 1) % palette.length])}>{item}</div>
          </Cinna.Col>
        ))}
      </Cinna.Row>
    </Cinna.Space>
  );
};

export const gridDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'row-col-gutter',
      zh: {
        title: 'Row、Col 与 gutter',
        description: 'Row 是一行，Col 是列，Col 的 span 按 24 等分计算；gutter 是列之间的留白，常用 16、24、32，密集工具区可用 8。',
        codeToggle: '查看 Row、Col 与 gutter 代码',
      },
      en: {
        title: 'Row, Col, and gutter',
        description: 'Row creates a line, Col creates columns, and span is measured on a 24-column grid. Use gutter for column spacing: 16, 24, 32 are comfortable; 8 fits dense tool areas.',
        codeToggle: 'View Row, Col, and gutter code',
      },
      code: `import { Col, Row } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Row gutter={16}>
    <Col span={12}><div style={{ ...cell, background: '#f0fafe' }}>span 12</div></Col>
    <Col span={8}><div style={{ ...cell, background: '#fff8ee' }}>span 8</div></Col>
    <Col span={4}><div style={{ ...cell, background: '#fff1f4' }}>span 4</div></Col>
  </Row>
);`,
      render: () => (
        <Cinna.Row gutter={16}>
          <Cinna.Col span={12}><div style={cell('#f0fafe')}>span 12</div></Cinna.Col>
          <Cinna.Col span={8}><div style={cell('#fff8ee')}>span 8</div></Cinna.Col>
          <Cinna.Col span={4}><div style={cell('#fff1f4')}>span 4</div></Cinna.Col>
        </Cinna.Row>
      ),
    },
    {
      id: 'grid-gutter',
      zh: {
        title: '水平与垂直间距',
        description: 'gutter 可传入数字或 CSS 长度；需要行间距时使用 [水平间距, 垂直间距]。内容卡片较多时，24/16 是比较稳妥的组合。',
        codeToggle: '查看间距代码',
      },
      en: {
        title: 'Horizontal and vertical gutters',
        description: 'gutter accepts a number or CSS length. Use [horizontal, vertical] when rows also need spacing; 24/16 is a steady choice for card-heavy layouts.',
        codeToggle: 'View gutter code',
      },
      code: `import { Col, Row } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Row gutter={[24, 16]}>
    <Col span={6}><div style={{ ...cell, background: '#f0fafe' }}>A</div></Col>
    <Col span={6}><div style={{ ...cell, background: '#fff8ee' }}>B</div></Col>
    <Col span={6}><div style={{ ...cell, background: '#f7ffe8' }}>C</div></Col>
    <Col span={6}><div style={{ ...cell, background: '#fff1f4' }}>D</div></Col>
    <Col span={8}><div style={{ ...cell, background: '#f7f2ff' }}>E</div></Col>
    <Col span={8}><div style={{ ...cell, background: '#eef8ff' }}>F</div></Col>
  </Row>
);`,
      render: () => (
        <Cinna.Row gutter={[24, 16]}>
          <Cinna.Col span={6}><div style={cell(palette[0])}>A</div></Cinna.Col>
          <Cinna.Col span={6}><div style={cell(palette[1])}>B</div></Cinna.Col>
          <Cinna.Col span={6}><div style={cell(palette[2])}>C</div></Cinna.Col>
          <Cinna.Col span={6}><div style={cell(palette[3])}>D</div></Cinna.Col>
          <Cinna.Col span={8}><div style={cell(palette[4])}>E</div></Cinna.Col>
          <Cinna.Col span={8}><div style={cell(palette[5])}>F</div></Cinna.Col>
        </Cinna.Row>
      ),
    },
    {
      id: 'grid-gutter-slider',
      zh: {
        title: '动态调整 gutter',
        description: '用滑动输入条观察水平和垂直 gutter 对栅格的影响；这里固定展示四行六列，每列 span 为 4。',
        codeToggle: '查看动态 gutter 代码',
      },
      en: {
        title: 'Adjust gutter dynamically',
        description: 'Use sliders to see how horizontal and vertical gutters affect the grid. This demo keeps four rows and six columns, with span 4 for every column.',
        codeToggle: 'View dynamic gutter code',
      },
      code: `import { Col, Row, Slider, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

const palette = ['#f0fafe', '#fff8ee', '#f7ffe8', '#fff1f4', '#f7f2ff', '#eef8ff'];
const cells = Array.from({ length: 24 }, (_, index) => index + 1);

export default () => {
  const [horizontal, setHorizontal] = useState(24);
  const [vertical, setVertical] = useState(16);

  return (
    <Space direction="vertical" block size="large">
      <Space direction="vertical" block>
        <Text strong>Horizontal gutter: {horizontal}px</Text>
        <Slider min={0} max={48} step={1} value={horizontal} onChange={(event) => setHorizontal(Number(event.currentTarget.value))} />
      </Space>
      <Space direction="vertical" block>
        <Text strong>Vertical gutter: {vertical}px</Text>
        <Slider min={0} max={40} step={1} value={vertical} onChange={(event) => setVertical(Number(event.currentTarget.value))} />
      </Space>
      <Row gutter={[horizontal, vertical]}>
        {cells.map((item) => (
          <Col key={item} span={4}>
            <div style={{ ...cell, background: palette[(item - 1) % palette.length] }}>{item}</div>
          </Col>
        ))}
      </Row>
    </Space>
  );
};`,
      render: () => <GutterSliderDemo />,
    },
    {
      id: 'grid-offset-order',
      zh: {
        title: '偏移与排序',
        description: 'offset 用来在左侧留出栅格空位，order 用来调整视觉顺序。它们适合少量重点布局，不建议替代内容本身的自然顺序。',
        codeToggle: '查看偏移与排序代码',
      },
      en: {
        title: 'Offset and order',
        description: 'Use offset to reserve grid space on the left, and order to adjust visual order. They are best for small layout adjustments.',
        codeToggle: 'View offset and order code',
      },
      code: `import { Col, Row, Space } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Space direction="vertical" block size="large">
    <Row gutter={16}>
      <Col span={8} offset={4}><div style={{ ...cell, background: '#f0fafe' }}>offset 4 / span 8</div></Col>
      <Col span={8}><div style={{ ...cell, background: '#fff8ee' }}>span 8</div></Col>
    </Row>
    <Row gutter={16}>
      <Col span={6} order={3}><div style={{ ...cell, background: '#f0fafe' }}>1 / order 3</div></Col>
      <Col span={6} order={2}><div style={{ ...cell, background: '#fff8ee' }}>2 / order 2</div></Col>
      <Col span={6} order={1}><div style={{ ...cell, background: '#f7ffe8' }}>3 / order 1</div></Col>
    </Row>
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" block size="large">
          <Cinna.Row gutter={16}>
            <Cinna.Col span={8} offset={4}><div style={cell('#f0fafe')}>offset 4 / span 8</div></Cinna.Col>
            <Cinna.Col span={8}><div style={cell('#fff8ee')}>span 8</div></Cinna.Col>
          </Cinna.Row>
          <Cinna.Row gutter={16}>
            <Cinna.Col span={6} order={3}><div style={cell('#f0fafe')}>1 / order 3</div></Cinna.Col>
            <Cinna.Col span={6} order={2}><div style={cell('#fff8ee')}>2 / order 2</div></Cinna.Col>
            <Cinna.Col span={6} order={1}><div style={cell('#f7ffe8')}>3 / order 1</div></Cinna.Col>
          </Cinna.Row>
        </Cinna.Space>
      ),
    },
    {
      id: 'grid-align-flex',
      zh: {
        title: '对齐与弹性填充',
        description: 'Row 的 justify 和 align 控制排列；Col 的 flex 可让某一列吸收剩余空间，适合工具栏或详情页头部。',
        codeToggle: '查看对齐与填充代码',
      },
      en: {
        title: 'Alignment and flexible fill',
        description: 'Use Row justify and align for placement, and Col flex when one column should absorb the remaining space.',
        codeToggle: 'View alignment and fill code',
      },
      code: `import { Col, Row } from '@cinna-design/react';

const cell = {
  minHeight: 48,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Row gutter={16} align="stretch" style={{ padding: 12, borderRadius: 18, background: '#fffcf6' }}>
    <Col flex="120px"><div style={{ ...cell, background: '#f0fafe' }}>120px</div></Col>
    <Col flex="1"><div style={{ ...cell, minHeight: 72, background: '#fff8ee' }}>fills remaining space</div></Col>
    <Col flex="96px"><div style={{ ...cell, background: '#f7ffe8' }}>96px</div></Col>
  </Row>
);`,
      render: () => (
        <Cinna.Row gutter={16} align="stretch" style={{ padding: 12, borderRadius: 18, background: '#fffcf6' }}>
          <Cinna.Col flex="120px"><div style={cell('#f0fafe')}>120px</div></Cinna.Col>
          <Cinna.Col flex="1"><div style={cell('#fff8ee', 72)}>fills remaining space</div></Cinna.Col>
          <Cinna.Col flex="96px"><div style={cell('#f7ffe8')}>96px</div></Cinna.Col>
        </Cinna.Row>
      ),
    },
    {
      id: 'simple-grid',
      zh: {
        title: '更简单的 Grid',
        description: '只是做等宽卡片或自适应列表时，可以直接用 Grid 声明 columns 和 gap；需要 24 等分、offset、order、flex 时再使用 Row 和 Col。',
        codeToggle: '查看简单 Grid 代码',
      },
      en: {
        title: 'Simpler Grid',
        description: 'For equal-width cards or adaptive lists, use Grid with columns and gap. Switch to Row and Col when you need 24-column spans, offset, order, or flex.',
        codeToggle: 'View simpler Grid code',
      },
      code: `import { Grid } from '@cinna-design/react';

const cell = {
  minHeight: 64,
  padding: '14px 16px',
  borderRadius: 16,
  fontWeight: 900,
};

export default () => (
  <Grid minColumnWidth={180} gap={[24, 16]}>
    <div style={{ ...cell, background: '#f0fafe' }}>Overview</div>
    <div style={{ ...cell, background: '#fff8ee' }}>Metrics</div>
    <div style={{ ...cell, background: '#f7ffe8' }}>Review</div>
    <div style={{ ...cell, background: '#fff1f4' }}>Release</div>
  </Grid>
);`,
      render: () => (
        <Cinna.Grid minColumnWidth={180} gap={[24, 16]}>
          <div style={cell('#f0fafe', 64)}>Overview</div>
          <div style={cell('#fff8ee', 64)}>Metrics</div>
          <div style={cell('#f7ffe8', 64)}>Review</div>
          <div style={cell('#fff1f4', 64)}>Release</div>
        </Cinna.Grid>
      ),
    },
  ],
};
