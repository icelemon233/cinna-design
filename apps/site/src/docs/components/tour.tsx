import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const tourDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-tour',
        zh: {
          title: '基础引导',
          description: 'steps 提供每一步的 title 与 description，组件内置上一步、下一步和完成按钮。',
          codeToggle: '查看基础引导代码',
        },
        en: {
          title: 'Basic tour',
          description: 'steps provide title and description for each step, with built-in previous, next, and done buttons.',
          codeToggle: 'View basic tour code',
        },
        code: `import { Tour } from '@cinna-design/react';

const steps = [
  { title: 'Choose template', description: 'Start from a saved recipe template.' },
  { title: 'Review details', description: 'Check timing, price, and inventory.' },
  { title: 'Publish', description: 'Share the update with customers.' },
];

export default () => <Tour steps={steps} />;`,
        render: () => (
          <Cinna.Tour
            steps={[
              { title: 'Choose template', description: 'Start from a saved recipe template.' },
              { title: 'Review details', description: 'Check timing, price, and inventory.' },
              { title: 'Publish', description: 'Share the update with customers.' },
            ]}
          />
        ),
      },
      {
        id: 'tour-open',
        zh: {
          title: '控制显隐',
          description: 'open 可控制引导是否渲染。',
          codeToggle: '查看控制显隐代码',
        },
        en: {
          title: 'Controlled visibility',
          description: 'Use open to control whether the tour is rendered.',
          codeToggle: 'View tour visibility code',
        },
        code: `import { Button, Space, Tour } from '@cinna-design/react';
import { useState } from 'react';

const steps = [{ title: 'Welcome', description: 'Open the guide when users need help.' }];

export default () => {
  const [open, setOpen] = useState(true);

  return (
    <Space direction="vertical" align="flex-start">
      <Button onClick={() => setOpen(true)}>Show tour</Button>
      <Tour open={open} steps={steps} onClose={() => setOpen(false)} />
    </Space>
  );
};`,
        render: () => {
          const TourOpenDemo = () => {
            const [open, setOpen] = React.useState(true);

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Button onClick={() => setOpen(true)}>Show tour</Cinna.Button>
                <Cinna.Tour
                  open={open}
                  steps={[{ title: 'Welcome', description: 'Open the guide when users need help.' }]}
                  onClose={() => setOpen(false)}
                />
              </Cinna.Space>
            );
          };

          return <TourOpenDemo />;
        },
      },
      {
        id: 'tour-controlled-current',
        zh: {
          title: '受控步骤',
          description: 'current 与 onChange 可把当前步骤同步给外部状态。',
          codeToggle: '查看受控步骤代码',
        },
        en: {
          title: 'Controlled step',
          description: 'Use current and onChange to sync the active step with external state.',
          codeToggle: 'View controlled tour code',
        },
        code: `import { Space, Text, Tour } from '@cinna-design/react';
import { useState } from 'react';

const steps = [
  { title: 'Draft', description: 'Prepare content.' },
  { title: 'Review', description: 'Confirm changes.' },
  { title: 'Release', description: 'Publish safely.' },
];

export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <Space direction="vertical" align="flex-start">
      <Tour steps={steps} current={current} onChange={setCurrent} />
      <Text tone="secondary">Current step: {current + 1}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledTourDemo = () => {
            const [current, setCurrent] = React.useState(0);

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Tour
                  steps={[
                    { title: 'Draft', description: 'Prepare content.' },
                    { title: 'Review', description: 'Confirm changes.' },
                    { title: 'Release', description: 'Publish safely.' },
                  ]}
                  current={current}
                  onChange={setCurrent}
                />
                <Cinna.Text tone="secondary">Current step: {current + 1}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledTourDemo />;
        },
      },
      {
        id: 'tour-close',
        zh: {
          title: '关闭回调',
          description: '完成最后一步时会触发 onClose，可用于记录引导结束。',
          codeToggle: '查看关闭回调代码',
        },
        en: {
          title: 'Close callback',
          description: 'Finishing the last step triggers onClose, useful for recording completion.',
          codeToggle: 'View tour close code',
        },
        code: `import { Space, Text, Tour } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [status, setStatus] = useState('In progress');

  return (
    <Space direction="vertical" align="flex-start">
      <Tour
        steps={[{ title: 'Finish guide', description: 'Click Done to close.' }]}
        onClose={() => setStatus('Finished')}
      />
      <Text tone="secondary">{status}</Text>
    </Space>
  );
};`,
        render: () => {
          const TourCloseDemo = () => {
            const [status, setStatus] = React.useState('In progress');

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Tour
                  steps={[{ title: 'Finish guide', description: 'Click Done to close.' }]}
                  onClose={() => setStatus('Finished')}
                />
                <Cinna.Text tone="secondary">{status}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <TourCloseDemo />;
        },
      },
      {
        id: 'tour-title-only',
        zh: {
          title: '仅标题步骤',
          description: 'description 可选，适合简短的步骤提示。',
          codeToggle: '查看仅标题步骤代码',
        },
        en: {
          title: 'Title-only steps',
          description: 'description is optional for short step prompts.',
          codeToggle: 'View title-only tour code',
        },
        code: `import { Tour } from '@cinna-design/react';

export default () => (
  <Tour
    steps={[
      { title: 'Open menu' },
      { title: 'Choose item' },
      { title: 'Save changes' },
    ]}
  />
);`,
        render: () => (
          <Cinna.Tour
            steps={[
              { title: 'Open menu' },
              { title: 'Choose item' },
              { title: 'Save changes' },
            ]}
          />
        ),
      },
    ],
  };
