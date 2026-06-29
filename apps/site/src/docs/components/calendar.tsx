import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

export const calendarDoc: ComponentDocConfig = {
    examples: [
      {
        id: 'basic-calendar',
        zh: {
          title: '基本日历',
          description: 'Calendar 默认展示当前月份，也可以通过 defaultValue 指定初始日期。',
          codeToggle: '查看基本日历代码',
        },
        en: {
          title: 'Basic calendar',
          description: 'Calendar shows the current month by default, or use defaultValue for the initial date.',
          codeToggle: 'View basic calendar code',
        },
        code: `import { Calendar } from '@cinna-design/react';

export default () => <Calendar defaultValue={new Date(2026, 5, 15)} />;`,
        render: () => <Cinna.Calendar defaultValue={new Date(2026, 5, 15)} />,
      },
      {
        id: 'calendar-controlled',
        zh: {
          title: '受控日期',
          description: 'value 与 onChange 可用于接入外部日期状态。',
          codeToggle: '查看受控日期代码',
        },
        en: {
          title: 'Controlled date',
          description: 'Use value and onChange to connect the selected date to external state.',
          codeToggle: 'View controlled date code',
        },
        code: `import { Calendar, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [date, setDate] = useState(new Date(2026, 5, 15));

  return (
    <Space direction="vertical" align="flex-start">
      <Calendar value={date} onChange={setDate} />
      <Text tone="secondary">Selected: {date.toLocaleDateString()}</Text>
    </Space>
  );
};`,
        render: () => {
          const ControlledCalendarDemo = () => {
            const [date, setDate] = React.useState(new Date(2026, 5, 15));

            return (
              <Cinna.Space direction="vertical" align="flex-start">
                <Cinna.Calendar value={date} onChange={setDate} />
                <Cinna.Text tone="secondary">Selected: {date.toLocaleDateString()}</Cinna.Text>
              </Cinna.Space>
            );
          };

          return <ControlledCalendarDemo />;
        },
      },
      {
        id: 'calendar-month-navigation',
        zh: {
          title: '月份切换',
          description: '默认头部提供上月和下月按钮，切换月份时也会触发 onChange。',
          codeToggle: '查看月份切换代码',
        },
        en: {
          title: 'Month navigation',
          description: 'The default header includes previous and next buttons, and month changes trigger onChange.',
          codeToggle: 'View month navigation code',
        },
        code: `import { Calendar } from '@cinna-design/react';

export default () => (
  <Calendar
    defaultValue={new Date(2026, 0, 1)}
    onChange={(date) => console.log(date)}
  />
);`,
        render: () => <Cinna.Calendar defaultValue={new Date(2026, 0, 1)} onChange={() => undefined} />,
      },
      {
        id: 'calendar-custom-header',
        zh: {
          title: '自定义头部',
          description: 'headerRender 可替换默认头部内容，展示当前日历上下文。',
          codeToggle: '查看自定义头部代码',
        },
        en: {
          title: 'Custom header',
          description: 'headerRender replaces the default header with current calendar context.',
          codeToggle: 'View custom header code',
        },
        code: `import { Calendar, Tag } from '@cinna-design/react';

export default () => (
  <Calendar
    defaultValue={new Date(2026, 5, 15)}
    headerRender={(date) => (
      <>
        <strong>{date.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</strong>
        <Tag color="butter">Custom</Tag>
      </>
    )}
  />
);`,
        render: () => (
          <Cinna.Calendar
            defaultValue={new Date(2026, 5, 15)}
            headerRender={(date) => (
              <>
                <strong>{date.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</strong>
                <Cinna.Tag color="butter">Custom</Cinna.Tag>
              </>
            )}
          />
        ),
      },
      {
        id: 'calendar-fullscreen',
        zh: {
          title: '撑满容器',
          description: 'fullscreen 会让日历占满容器宽度，适合嵌入面板或详情区。',
          codeToggle: '查看撑满容器代码',
        },
        en: {
          title: 'Fill container',
          description: 'fullscreen makes the calendar fill its container width for panels or detail sections.',
          codeToggle: 'View fullscreen code',
        },
        code: `import { Calendar } from '@cinna-design/react';

export default () => (
  <div style={{ width: 'min(620px, 100%)' }}>
    <Calendar fullscreen defaultValue={new Date(2026, 5, 15)} />
  </div>
);`,
        render: () => (
          <div style={{ width: 'min(620px, 100%)' }}>
            <Cinna.Calendar fullscreen defaultValue={new Date(2026, 5, 15)} />
          </div>
        ),
      },
    ],
  };
