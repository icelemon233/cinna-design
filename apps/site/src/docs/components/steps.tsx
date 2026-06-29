import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const ClickableStepsExample = () => {
  const [current, setCurrent] = React.useState(1);

  return (
    <Cinna.Steps
      clickable
      current={current}
      onChange={setCurrent}
      items={[
        { title: 'Create', description: 'Prepare the draft' },
        { title: 'Review', description: 'Check details' },
        { title: 'Publish', description: 'Ship changes' },
      ]}
    />
  );
};

export const stepsDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'basic-steps',
      zh: {
        title: '基本用法',
        description: '把有先后关系的任务拆成清晰的阶段，current 之前的步骤会自动进入完成状态。',
        codeToggle: '查看基本用法代码',
      },
      en: {
        title: 'Basic steps',
        description: 'Break an ordered task into clear stages. Steps before current become finished automatically.',
        codeToggle: 'View basic steps code',
      },
      code: `import { Icon, Steps } from '@cinna-design/react';

export default () => (
  <Steps
    current={1}
    items={[
      { title: 'Create' },
      { title: 'Review' },
      { title: 'Publish' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Steps
          current={1}
          items={[
            { title: 'Create' },
            { title: 'Review' },
            { title: 'Publish' },
          ]}
        />
      ),
    },
    {
      id: 'clickable-steps',
      zh: {
        title: '可点击步骤',
        description: 'clickable 让步骤可以切换，点击某一步后，它之前的步骤会展示为完成状态。',
        codeToggle: '查看可点击步骤代码',
      },
      en: {
        title: 'Clickable steps',
        description: 'Use clickable to switch steps. Previous steps render as finished after selection.',
        codeToggle: 'View clickable steps code',
      },
      code: `import { Steps } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Steps
      clickable
      current={current}
      onChange={setCurrent}
      items={[
        { title: 'Create', description: 'Prepare the draft' },
        { title: 'Review', description: 'Check details' },
        { title: 'Publish', description: 'Ship changes' },
      ]}
    />
  );
};`,
      render: () => <ClickableStepsExample />,
    },
    {
      id: 'status-steps',
      zh: {
        title: '步骤状态',
        description: 'status 可覆盖自动状态，清晰区分完成、进行中、加载中、异常和等待。',
        codeToggle: '查看步骤状态代码',
      },
      en: {
        title: 'Step status',
        description: 'Use status to override automatic progress with finish, process, loading, error, or wait.',
        codeToggle: 'View step status code',
      },
      code: `import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    current={2}
    items={[
      { title: 'Upload', status: 'finish' },
      { title: 'Validate', status: 'finish' },
      { title: 'Build', status: 'loading', description: 'Token mismatch' },
      { title: 'Deploy', status: 'error' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Steps
          current={2}
          items={[
            { title: 'Upload', status: 'finish' },
            { title: 'Validate', status: 'finish' },
            { title: 'Build', status: 'loading', description: 'Token mismatch' },
            { title: 'Deploy', status: 'error' },
          ]}
        />
      ),
    },
    {
      id: 'vertical-steps',
      zh: {
        title: '竖向步骤条',
        description: 'direction="vertical" 会真正纵向排列，适合说明较长或空间较窄的流程。',
        codeToggle: '查看竖向步骤条代码',
      },
      en: {
        title: 'Vertical steps',
        description: 'direction="vertical" stacks steps vertically for narrow areas or longer descriptions.',
        codeToggle: 'View vertical steps code',
      },
      code: `import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    direction="vertical"
    current={1}
    items={[
      { title: 'Collect feedback', description: 'Read notes from the release room.' },
      { title: 'Update component', description: 'Adjust styles and examples.' },
      { title: 'Verify docs', description: 'Run build and browser checks.' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Steps
          direction="vertical"
          current={1}
          items={[
            { title: 'Collect feedback', description: 'Read notes from the release room.' },
            { title: 'Update component', description: 'Adjust styles and examples.' },
            { title: 'Verify docs', description: 'Run build and browser checks.' },
          ]}
        />
      ),
    },
    {
      id: 'size-steps',
      zh: {
        title: '尺寸对比',
        description: 'small、medium、large 会同时调整序号容器、标题和描述的视觉层级。',
        codeToggle: '查看尺寸对比代码',
      },
      en: {
        title: 'Size comparison',
        description: 'small, medium, and large adjust marker, title, and description hierarchy together.',
        codeToggle: 'View size comparison code',
      },
      code: `import { Space, Steps } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Steps size="small" current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
    <Steps current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
    <Steps size="large" current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="stretch">
          <Cinna.Steps size="small" current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
          <Cinna.Steps current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
          <Cinna.Steps size="large" current={1} items={[{ title: 'Queued' }, { title: 'Running' }, { title: 'Done' }]} />
        </Cinna.Space>
      ),
    },
    {
      id: 'logo-label-steps',
      zh: {
        title: '图标与标签位置',
        description: 'logo 或 icon 可以替换默认序号，labelPlacement 控制标题放在右侧或下方。',
        codeToggle: '查看图标与标签位置代码',
      },
      en: {
        title: 'Icon and label placement',
        description: 'logo or icon replaces the default number. labelPlacement puts labels beside or below markers.',
        codeToggle: 'View icon and label placement code',
      },
      code: `import { Space, Steps } from '@cinna-design/react';

export default () => (
  <Space direction="vertical" align="stretch">
    <Steps
      current={1}
      items={[
        { title: 'Cloud', logo: '☁' },
        { title: 'Cat', logo: 'ฅ' },
        { title: 'Done', logo: '✓' },
      ]}
    />
    <Steps
      labelPlacement="bottom"
      current={1}
      items={[
        { title: 'Cloud', icon: '☁' },
        { title: 'Cat', icon: 'ฅ' },
        { title: 'Done', icon: '✓' },
      ]}
    />
  </Space>
);`,
      render: () => (
        <Cinna.Space direction="vertical" align="stretch">
          <Cinna.Steps
            current={1}
            items={[
              { title: 'Cloud', logo: '☁' },
              { title: 'Cat', logo: 'ฅ' },
              { title: 'Done', logo: '✓' },
            ]}
          />
          <Cinna.Steps
            labelPlacement="bottom"
            current={1}
            items={[
              { title: 'Cloud', icon: '☁' },
              { title: 'Cat', icon: 'ฅ' },
              { title: 'Done', icon: '✓' },
            ]}
          />
        </Cinna.Space>
      ),
    },
    {
      id: 'underline-steps',
      zh: {
        title: '下划线高亮',
        description: 'underline 会在当前步骤标题下方增加主题下划线。',
        codeToggle: '查看下划线高亮代码',
      },
      en: {
        title: 'Underline highlight',
        description: 'underline adds a themed underline below the current step title.',
        codeToggle: 'View underline highlight code',
      },
      code: `import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    underline
    current={1}
    items={[
      { title: 'Draft' },
      { title: 'Review' },
      { title: 'Release' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Steps
          underline
          current={1}
          items={[
            { title: 'Draft' },
            { title: 'Review' },
            { title: 'Release' },
          ]}
        />
      ),
    },
    {
      id: 'minimal-steps',
      zh: {
        title: '最小简化版',
        description: 'type="minimal" 只展示圆点进度和当前步骤的一组标题描述。',
        codeToggle: '查看最小简化版代码',
      },
      en: {
        title: 'Minimal steps',
        description: 'type="minimal" renders only dots and one title-description summary for the current step.',
        codeToggle: 'View minimal steps code',
      },
      code: `import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    type="minimal"
    current={1}
    items={[
      { title: 'Queued', description: 'Waiting for resources.' },
      { title: 'Running', description: 'Building the current package.' },
      { title: 'Done', description: 'Ready for verification.' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Steps
          type="minimal"
          current={1}
          items={[
            { title: 'Queued', description: 'Waiting for resources.' },
            { title: 'Running', description: 'Building the current package.' },
            { title: 'Done', description: 'Ready for verification.' },
          ]}
        />
      ),
    },
    {
      id: 'custom-steps',
      zh: {
        title: '自定义外观',
        description: '可自定义序号容器形状、字体、颜色、主副标题字体，以及步骤之间的连接符和数量。',
        codeToggle: '查看自定义外观代码',
      },
      en: {
        title: 'Custom appearance',
        description: 'Customize marker shape, fonts, colors, title typography, and connector content or count.',
        codeToggle: 'View custom appearance code',
      },
      code: `import { Steps } from '@cinna-design/react';

export default () => (
  <Steps
    current={1}
    markerShape="rounded"
    connector={<Icon name="chevron-right" size={12} />}
    connectorCount={4}
    connectorColor="#df6677"
    markerFontSize={15}
    markerBackgroundColor="#ffe8a8"
    markerBorderColor="#d8984f"
    titleFontSize={18}
    titleColor="#46332a"
    subTitleColor="#3d8eaa"
    descriptionColor="#8a6c5f"
    items={[
      { title: 'Token', subTitle: 'A', description: 'Choose theme seed' },
      { title: 'Recipe', subTitle: 'B', description: 'Apply custom connector' },
      { title: 'Preview', subTitle: 'C', description: 'Check the final state' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Steps
          current={1}
          markerShape="rounded"
          connector={<Cinna.Icon name="chevron-right" size={12} />}
          connectorCount={4}
          connectorColor="#df6677"
          markerFontSize={15}
          markerBackgroundColor="#ffe8a8"
          markerBorderColor="#d8984f"
          titleFontSize={18}
          titleColor="#46332a"
          subTitleColor="#3d8eaa"
          descriptionColor="#8a6c5f"
          items={[
            { title: 'Token', subTitle: 'A', description: 'Choose theme seed' },
            { title: 'Recipe', subTitle: 'B', description: 'Apply custom connector' },
            { title: 'Preview', subTitle: 'C', description: 'Check the final state' },
          ]}
        />
      ),
    },
  ],
};
