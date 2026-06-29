import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const anchorTargets = [
  { id: 'anchor-design', title: 'Design', description: 'Review spacing and hierarchy.' },
  { id: 'anchor-code', title: 'Code', description: 'Verify props and examples.' },
  { id: 'anchor-release', title: 'Release', description: 'Run build and browser checks.' },
];

const compactTargets = [
  { id: 'anchor-overview', title: 'Overview', description: 'Read the summary and scope.' },
  { id: 'anchor-details', title: 'Details', description: 'Check states and interactions.' },
  { id: 'anchor-finish', title: 'Finish', description: 'Confirm output and notes.' },
];

const anchorLayoutStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(138px, 178px) minmax(0, 1fr)',
  gap: 24,
  alignItems: 'stretch',
  minHeight: 390,
};

const anchorPaneStyle: React.CSSProperties = {
  padding: 18,
  border: '1.5px solid rgba(230, 214, 196, .82)',
  borderRadius: 24,
  background: 'rgba(255, 252, 246, .72)',
};

const scrollPaneStyle: React.CSSProperties = {
  height: 390,
  overflow: 'auto',
  display: 'grid',
  gap: 16,
  paddingRight: 4,
  scrollBehavior: 'smooth',
};

const sectionStyle: React.CSSProperties = {
  minHeight: 172,
  display: 'grid',
  placeItems: 'center',
  padding: 18,
  border: '1.5px solid rgba(230, 214, 196, .54)',
  borderRadius: 22,
  background: 'rgba(255, 255, 255, .42)',
};

const sectionCardStyle: React.CSSProperties = {
  width: 'min(420px, 86%)',
  padding: '26px 32px',
  border: '1.5px solid rgba(230, 214, 196, .95)',
  borderRadius: 32,
  background: 'rgba(255, 252, 246, .88)',
};

const horizontalLayoutStyle: React.CSSProperties = {
  display: 'grid',
  gap: 18,
};

const horizontalAnchorPaneStyle: React.CSSProperties = {
  width: 'fit-content',
  maxWidth: '100%',
  padding: '16px 20px',
  border: '1.5px solid rgba(168, 223, 241, .82)',
  borderRadius: 28,
  background: 'linear-gradient(135deg, rgba(240, 250, 254, .96), rgba(255, 243, 206, .56))',
  boxShadow: '0 8px 22px rgba(96, 155, 185, .12)',
};

const horizontalScrollStyle: React.CSSProperties = {
  height: 282,
  overflow: 'auto',
  display: 'grid',
  gap: 14,
  paddingRight: 4,
  scrollBehavior: 'smooth',
};

const AnchorSection = ({ id, title, description }: { id: string; title: string; description: string }) => (
  <section id={id} style={sectionStyle}>
    <div style={sectionCardStyle}>
      <Cinna.Title level={5}>{title}</Cinna.Title>
      <Cinna.Text tone="secondary">{description}</Cinna.Text>
    </div>
  </section>
);

const VerticalAnchorExample = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={anchorLayoutStyle}>
      <aside style={anchorPaneStyle}>
        <Cinna.Anchor
          getContainer={() => scrollRef.current}
          items={anchorTargets.map((item) => ({ key: item.id, href: `#${item.id}`, title: item.title }))}
        />
      </aside>
      <div ref={scrollRef} style={scrollPaneStyle}>
        {anchorTargets.map((item) => <AnchorSection key={item.id} {...item} />)}
      </div>
    </div>
  );
};

const HorizontalAnchorExample = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={horizontalLayoutStyle}>
      <div style={horizontalAnchorPaneStyle}>
        <Cinna.Anchor
          direction="horizontal"
          getContainer={() => scrollRef.current}
          items={compactTargets.map((item) => ({ key: item.id, href: `#${item.id}`, title: item.title }))}
        />
      </div>
      <div ref={scrollRef} style={horizontalScrollStyle}>
        {compactTargets.map((item) => <AnchorSection key={item.id} {...item} />)}
      </div>
    </div>
  );
};

const AffixAnchorExample = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={anchorLayoutStyle}>
      <aside style={anchorPaneStyle}>
        <Cinna.Anchor
          affix
          offsetTop={16}
          getContainer={() => scrollRef.current}
          items={[
            { key: 'affix-plan', href: '#anchor-affix-plan', title: 'Plan' },
            { key: 'affix-build', href: '#anchor-affix-build', title: 'Build' },
            { key: 'affix-ship', href: '#anchor-affix-ship', title: 'Ship' },
          ]}
        />
      </aside>
      <div ref={scrollRef} style={scrollPaneStyle}>
        <AnchorSection id="anchor-affix-plan" title="Plan" description="This anchor sticks when the page scrolls." />
        <AnchorSection id="anchor-affix-build" title="Build" description="offsetTop controls the sticky top distance." />
        <AnchorSection id="anchor-affix-ship" title="Ship" description="Omit affix to keep it in normal document flow." />
      </div>
    </div>
  );
};

const OffsetAnchorExample = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={anchorLayoutStyle}>
      <aside style={anchorPaneStyle}>
        <Cinna.Anchor
          targetOffset={28}
          getContainer={() => scrollRef.current}
          items={[
            { key: 'offset-one', href: '#anchor-offset-one', title: 'First block' },
            { key: 'offset-two', href: '#anchor-offset-two', title: 'Second block' },
            { key: 'offset-three', href: '#anchor-offset-three', title: 'Third block' },
          ]}
        />
      </aside>
      <div ref={scrollRef} style={scrollPaneStyle}>
        <AnchorSection id="anchor-offset-one" title="First block" description="The target leaves a small offset from the pane top." />
        <AnchorSection id="anchor-offset-two" title="Second block" description="Use this when the pane has sticky inner controls." />
        <AnchorSection id="anchor-offset-three" title="Third block" description="The scroll remains inside this example window." />
      </div>
    </div>
  );
};

const RichAnchorExample = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={anchorLayoutStyle}>
      <aside style={anchorPaneStyle}>
        <Cinna.Anchor
          getContainer={() => scrollRef.current}
          items={[
            { key: 'stable', href: '#anchor-rich-stable', title: <Cinna.Text tone="success">Stable</Cinna.Text> },
            { key: 'draft', href: '#anchor-rich-draft', title: <Cinna.Text tone="warning">Draft</Cinna.Text> },
            { key: 'risk', href: '#anchor-rich-risk', title: <Cinna.Text tone="error">Needs review</Cinna.Text> },
          ]}
        />
      </aside>
      <div ref={scrollRef} style={scrollPaneStyle}>
        <AnchorSection id="anchor-rich-stable" title="Stable" description="Ready for repeated use." />
        <AnchorSection id="anchor-rich-draft" title="Draft" description="Still being adjusted." />
        <AnchorSection id="anchor-rich-risk" title="Needs review" description="Check copy and behavior again." />
      </div>
    </div>
  );
};

const CustomTargetAnchorExample = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <div style={anchorLayoutStyle}>
      <aside style={anchorPaneStyle}>
        <Cinna.Anchor
          targetOffset={18}
          getContainer={() => scrollRef.current}
          items={[
            { key: 'brief', href: '#custom-brief-link', title: 'Brief', anchorTarget: '[data-anchor-point="brief"]' },
            { key: 'timeline', href: '#custom-timeline-link', title: 'Timeline', anchorTarget: '[data-anchor-point="timeline"]', targetOffset: 34 },
            { key: 'summary', href: '#custom-summary-link', title: 'Summary', anchorTarget: '[data-anchor-point="summary"]' },
          ]}
        />
      </aside>
      <div ref={scrollRef} style={scrollPaneStyle}>
        <section data-anchor-point="brief" style={sectionStyle}>
          <div style={sectionCardStyle}>
            <Cinna.Title level={5}>Brief</Cinna.Title>
            <Cinna.Text tone="secondary">This target is found by a custom selector.</Cinna.Text>
          </div>
        </section>
        <section data-anchor-point="timeline" style={sectionStyle}>
          <div style={sectionCardStyle}>
            <Cinna.Title level={5}>Timeline</Cinna.Title>
            <Cinna.Text tone="secondary">This item uses its own target offset.</Cinna.Text>
          </div>
        </section>
        <section data-anchor-point="summary" style={sectionStyle}>
          <div style={sectionCardStyle}>
            <Cinna.Title level={5}>Summary</Cinna.Title>
            <Cinna.Text tone="secondary">The href remains only the active identity.</Cinna.Text>
          </div>
        </section>
      </div>
    </div>
  );
};

export const anchorDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'anchor-with-content',
      zh: {
        title: '与内容区组合',
        description: '把 Anchor 放在内容旁边，可以为长文档提供快速入口；点击只滚动右侧内容窗口。',
        codeToggle: '查看内容区组合代码',
      },
      en: {
        title: 'With content',
        description: 'Place Anchor beside content; clicking only scrolls the content pane on the right.',
        codeToggle: 'View content composition code',
      },
      code: `import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

const items = [
  { id: 'anchor-design', title: 'Design', description: 'Review spacing and hierarchy.' },
  { id: 'anchor-code', title: 'Code', description: 'Verify props and examples.' },
  { id: 'anchor-release', title: 'Release', description: 'Run build and browser checks.' },
];

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <aside style={{ padding: 18, border: '1px solid #ead8c0', borderRadius: 24 }}>
        <Anchor
          getContainer={() => scrollRef.current}
          items={items.map((item) => ({ key: item.id, href: '#' + item.id, title: item.title }))}
        />
      </aside>
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto', display: 'grid', gap: 16 }}>
        {items.map((item) => (
          <section id={item.id} key={item.id} style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}>
            <div style={{ padding: 24, border: '1px solid #ead8c0', borderRadius: 28 }}>
              <Title level={5}>{item.title}</Title>
              <Text tone="secondary">{item.description}</Text>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};`,
      render: () => <VerticalAnchorExample />,
    },
    {
      id: 'horizontal-anchor',
      zh: {
        title: '横向排布',
        description: 'direction="horizontal" 可把锚点横向排列，适合较短的页内目录。',
        codeToggle: '查看横向排布代码',
      },
      en: {
        title: 'Horizontal direction',
        description: 'Use direction="horizontal" for a short in-page index.',
        codeToggle: 'View horizontal direction code',
      },
      code: `import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

const items = [
  { id: 'anchor-overview', title: 'Overview', description: 'Read the summary and scope.' },
  { id: 'anchor-details', title: 'Details', description: 'Check states and interactions.' },
  { id: 'anchor-finish', title: 'Finish', description: 'Confirm output and notes.' },
];

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        style={{
          width: 'fit-content',
          maxWidth: '100%',
          padding: '16px 20px',
          border: '1.5px solid rgba(168, 223, 241, .82)',
          borderRadius: 28,
          background: 'linear-gradient(135deg, rgba(240, 250, 254, .96), rgba(255, 243, 206, .56))',
          boxShadow: '0 8px 22px rgba(96, 155, 185, .12)',
        }}
      >
        <Anchor
          direction="horizontal"
          getContainer={() => scrollRef.current}
          items={items.map((item) => ({ key: item.id, href: '#' + item.id, title: item.title }))}
        />
      </div>
      <div ref={scrollRef} style={{ height: 280, overflow: 'auto', display: 'grid', gap: 14 }}>
        {items.map((item) => (
          <section id={item.id} key={item.id} style={{ minHeight: 150, display: 'grid', placeItems: 'center' }}>
            <div style={{ padding: 24, border: '1px solid #ead8c0', borderRadius: 28 }}>
              <Title level={5}>{item.title}</Title>
              <Text tone="secondary">{item.description}</Text>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};`,
      render: () => <HorizontalAnchorExample />,
    },
    {
      id: 'anchor-with-offset',
      zh: {
        title: '目标偏移',
        description: 'targetOffset 用于控制目标滚动后距离容器顶部的留白。',
        codeToggle: '查看目标偏移代码',
      },
      en: {
        title: 'Target offset',
        description: 'Use targetOffset to keep space above the target after scrolling.',
        codeToggle: 'View target offset code',
      },
      code: `import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

const items = [
  { id: 'anchor-offset-one', title: 'First block' },
  { id: 'anchor-offset-two', title: 'Second block' },
  { id: 'anchor-offset-three', title: 'Third block' },
];

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <Anchor
        targetOffset={28}
        getContainer={() => scrollRef.current}
        items={items.map((item) => ({ key: item.id, href: '#' + item.id, title: item.title }))}
      />
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto', display: 'grid', gap: 16 }}>
        {items.map((item) => (
          <section id={item.id} key={item.id} style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}>
            <div style={{ padding: 24, border: '1px solid #ead8c0', borderRadius: 28 }}>
              <Title level={5}>{item.title}</Title>
              <Text tone="secondary">The target keeps top spacing after scrolling.</Text>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};`,
      render: () => <OffsetAnchorExample />,
    },
    {
      id: 'anchor-affix-mode',
      zh: {
        title: '固定吸附',
        description: '默认随页面内容一起滚动；设置 affix 后会固定吸附，offsetTop 控制距离顶部的位置。',
        codeToggle: '查看固定吸附代码',
      },
      en: {
        title: 'Sticky mode',
        description: 'By default Anchor follows page flow. Set affix to make it sticky, with offsetTop controlling the top distance.',
        codeToggle: 'View sticky mode code',
      },
      code: `import { useRef } from 'react';
import { Anchor } from '@cinna-design/react';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Anchor
      affix
      offsetTop={16}
      getContainer={() => scrollRef.current}
      items={[
        { key: 'plan', href: '#anchor-affix-plan', title: 'Plan' },
        { key: 'build', href: '#anchor-affix-build', title: 'Build' },
        { key: 'ship', href: '#anchor-affix-ship', title: 'Ship' },
      ]}
    />
  );
};`,
      render: () => <AffixAnchorExample />,
    },
    {
      id: 'anchor-custom-target',
      zh: {
        title: '自定义锚定点',
        description: 'anchorTarget 可以把锚点链接和真实滚动目标分开，支持选择器、元素或返回元素的函数。',
        codeToggle: '查看自定义锚定点代码',
      },
      en: {
        title: 'Custom anchor target',
        description: 'Use anchorTarget to separate the link identity from the real scroll target.',
        codeToggle: 'View custom anchor target code',
      },
      code: `import { useRef } from 'react';
import { Anchor } from '@cinna-design/react';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <Anchor
        targetOffset={18}
        getContainer={() => scrollRef.current}
        items={[
          {
            key: 'brief',
            href: '#custom-brief-link',
            title: 'Brief',
            anchorTarget: '[data-anchor-point="brief"]',
          },
          {
            key: 'timeline',
            href: '#custom-timeline-link',
            title: 'Timeline',
            anchorTarget: '[data-anchor-point="timeline"]',
            targetOffset: 34,
          },
        ]}
      />
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto' }}>
        <section data-anchor-point="brief">Brief content</section>
        <section data-anchor-point="timeline">Timeline content</section>
      </div>
    </div>
  );
};`,
      render: () => <CustomTargetAnchorExample />,
    },
    {
      id: 'anchor-rich-title',
      zh: {
        title: '自定义标题内容',
        description: 'title 支持 ReactNode，可以加入文本强调或状态颜色。',
        codeToggle: '查看自定义标题代码',
      },
      en: {
        title: 'Custom title content',
        description: 'title accepts ReactNode, so it can include emphasis or status color.',
        codeToggle: 'View custom title code',
      },
      code: `import { useRef } from 'react';
import { Anchor, Text, Title } from '@cinna-design/react';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px minmax(0, 1fr)', gap: 24 }}>
      <Anchor
        getContainer={() => scrollRef.current}
        items={[
          { key: 'stable', href: '#anchor-rich-stable', title: <Text tone="success">Stable</Text> },
          { key: 'draft', href: '#anchor-rich-draft', title: <Text tone="warning">Draft</Text> },
          { key: 'risk', href: '#anchor-rich-risk', title: <Text tone="error">Needs review</Text> },
        ]}
      />
      <div ref={scrollRef} style={{ height: 360, overflow: 'auto', display: 'grid', gap: 16 }}>
        <section id="anchor-rich-stable" style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}><Title level={5}>Stable</Title></section>
        <section id="anchor-rich-draft" style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}><Title level={5}>Draft</Title></section>
        <section id="anchor-rich-risk" style={{ minHeight: 160, display: 'grid', placeItems: 'center' }}><Title level={5}>Needs review</Title></section>
      </div>
    </div>
  );
};`,
      render: () => <RichAnchorExample />,
    },
  ],
};
