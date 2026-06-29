import React from 'react';
import * as Cinna from '@cinna-design/react';
import type { ComponentDocConfig } from '../../types';

const popupMenuItems = [
  { key: 'edit', label: 'Edit' },
  { key: 'copy', label: 'Copy' },
  { key: 'archive', label: 'Archive' },
];

export const popupDoc: ComponentDocConfig = {
  examples: [
    {
      id: 'popup-tooltip-basic',
      zh: {
        title: '文字提示',
        description: 'mode="tooltip" 用于短提示，默认悬浮触发并显示在上方。',
        codeToggle: '查看文字提示代码',
      },
      en: {
        title: 'Hint',
        description: 'Use mode="tooltip" for short hints. It opens on hover and appears above by default.',
        codeToggle: 'View hint code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="tooltip" title="Preview recipe details" placement="top">
    <Button>Hover me</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="tooltip" title="Preview recipe details" placement="top">
          <Cinna.Button>Hover me</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-tooltip-placement',
      zh: {
        title: '文字提示方向',
        description: 'placement 支持 top、bottom、left 和 right。',
        codeToggle: '查看文字提示方向代码',
      },
      en: {
        title: 'Hint placement',
        description: 'placement supports top, bottom, left, and right.',
        codeToggle: 'View hint placement code',
      },
      code: `import { Button, Popup, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Popup mode="tooltip" placement="top" title="Top"><Button>Top</Button></Popup>
    <Popup mode="tooltip" placement="bottom" title="Bottom"><Button>Bottom</Button></Popup>
    <Popup mode="tooltip" placement="left" title="Left"><Button>Left</Button></Popup>
    <Popup mode="tooltip" placement="right" title="Right"><Button>Right</Button></Popup>
  </Space>
);`,
      render: () => (
        <Cinna.Space wrap>
          <Cinna.Popup mode="tooltip" placement="top" title="Top"><Cinna.Button>Top</Cinna.Button></Cinna.Popup>
          <Cinna.Popup mode="tooltip" placement="bottom" title="Bottom"><Cinna.Button>Bottom</Cinna.Button></Cinna.Popup>
          <Cinna.Popup mode="tooltip" placement="left" title="Left"><Cinna.Button>Left</Cinna.Button></Cinna.Popup>
          <Cinna.Popup mode="tooltip" placement="right" title="Right"><Cinna.Button>Right</Cinna.Button></Cinna.Popup>
        </Cinna.Space>
      ),
    },
    {
      id: 'popup-tooltip-click',
      zh: {
        title: '文字提示点击触发',
        description: 'trigger="click" 时点击目标元素切换提示显隐。',
        codeToggle: '查看文字提示点击触发代码',
      },
      en: {
        title: 'Hint click trigger',
        description: 'With trigger="click", clicking the target toggles the hint.',
        codeToggle: 'View hint click trigger code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="tooltip" trigger="click" title="Clicked hint">
    <Button>Click me</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="tooltip" trigger="click" title="Clicked hint">
          <Cinna.Button>Click me</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-tooltip-node',
      zh: {
        title: '文字提示内容',
        description: 'title 支持 ReactNode，可放入轻量文本组合。',
        codeToggle: '查看文字提示内容代码',
      },
      en: {
        title: 'Hint content',
        description: 'title accepts ReactNode for lightweight text composition.',
        codeToggle: 'View hint content code',
      },
      code: `import { Popup, Text } from '@cinna-design/react';

export default () => (
  <Popup mode="tooltip" title={<Text tone="secondary">Updated 2 minutes ago</Text>}>
    <span>Last sync</span>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="tooltip" title={<Cinna.Text tone="secondary">Updated 2 minutes ago</Cinna.Text>}>
          <span>Last sync</span>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-tooltip-inline-text',
      zh: {
        title: '文本目标',
        description: 'Popup 可以包裹按钮、文本或其他行内目标。',
        codeToggle: '查看文本目标代码',
      },
      en: {
        title: 'Text target',
        description: 'Popup can wrap buttons, text, or other inline targets.',
        codeToggle: 'View text target code',
      },
      code: `import { Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="tooltip" title="Metric definition">
    <span style={{ textDecoration: 'underline' }}>Conversion rate</span>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="tooltip" title="Metric definition">
          <span style={{ textDecoration: 'underline' }}>Conversion rate</span>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-menu-click',
      zh: {
        title: '点击菜单',
        description: 'mode="menu" 用于承载一组相关操作，默认点击按钮式触发器后展开。',
        codeToggle: '查看点击菜单代码',
      },
      en: {
        title: 'Click menu',
        description: 'Use mode="menu" for related actions. It opens from a button trigger by default.',
        codeToggle: 'View click menu code',
      },
      code: `import { Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="menu"
    label="Actions"
    items={[
      { key: 'edit', label: 'Edit' },
      { key: 'copy', label: 'Copy' },
      { key: 'archive', label: 'Archive' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Popup
          mode="menu"
          label="Actions"
          items={popupMenuItems}
        />
      ),
    },
    {
      id: 'popup-menu-hover',
      zh: {
        title: '悬浮菜单',
        description: 'trigger="hover" 会让菜单在悬浮触发器时出现。',
        codeToggle: '查看悬浮菜单代码',
      },
      en: {
        title: 'Hover menu',
        description: 'Use trigger="hover" to reveal the menu while hovering the trigger.',
        codeToggle: 'View hover menu code',
      },
      code: `import { Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="menu"
    trigger="hover"
    label="Hover actions"
    items={[
      { key: 'preview', label: 'Preview' },
      { key: 'share', label: 'Share' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Popup
          mode="menu"
          trigger="hover"
          label="Hover actions"
          items={[
            { key: 'preview', label: 'Preview' },
            { key: 'share', label: 'Share' },
          ]}
        />
      ),
    },
    {
      id: 'popup-menu-placement',
      zh: {
        title: '菜单位置',
        description: 'align 控制左右对齐，placement 可以让菜单向上、向左或向右弹出。',
        codeToggle: '查看菜单位置代码',
      },
      en: {
        title: 'Menu placement',
        description: 'Use align for left, center, or right alignment, and placement for opening direction.',
        codeToggle: 'View menu placement code',
      },
      code: `import { Popup, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Popup mode="menu" trigger="hover" align="left" label="Left" items={[{ key: 'one', label: 'Left aligned' }]} />
    <Popup mode="menu" trigger="hover" align="center" label="Center" items={[{ key: 'one', label: 'Centered' }]} />
    <Popup mode="menu" trigger="hover" align="right" label="Right" items={[{ key: 'one', label: 'Right aligned' }]} />
    <Popup mode="menu" trigger="hover" placement="top" label="Open up" items={[{ key: 'one', label: 'Upward menu' }]} />
  </Space>
);`,
      render: () => (
        <Cinna.Space wrap>
          <Cinna.Popup mode="menu" trigger="hover" align="left" label="Left" items={[{ key: 'one', label: 'Left aligned' }]} />
          <Cinna.Popup mode="menu" trigger="hover" align="center" label="Center" items={[{ key: 'one', label: 'Centered' }]} />
          <Cinna.Popup mode="menu" trigger="hover" align="right" label="Right" items={[{ key: 'one', label: 'Right aligned' }]} />
          <Cinna.Popup mode="menu" trigger="hover" placement="top" label="Open up" items={[{ key: 'one', label: 'Upward menu' }]} />
        </Cinna.Space>
      ),
    },
    {
      id: 'popup-menu-arrow',
      zh: {
        title: '带箭头菜单',
        description: 'arrow 会在菜单和触发器之间展示一个小三角。',
        codeToggle: '查看带箭头菜单代码',
      },
      en: {
        title: 'Arrow menu',
        description: 'Use arrow to show a small pointer between the trigger and menu.',
        codeToggle: 'View arrow menu code',
      },
      code: `import { Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="menu"
    trigger="hover"
    arrow
    label="With arrow"
    items={[
      { key: 'preview', label: 'Preview' },
      { key: 'download', label: 'Download' },
    ]}
  />
);`,
      render: () => (
        <Cinna.Popup
          mode="menu"
          trigger="hover"
          arrow
          label="With arrow"
          items={[
            { key: 'preview', label: 'Preview' },
            { key: 'download', label: 'Download' },
          ]}
        />
      ),
    },
    {
      id: 'popup-menu-divider-disabled',
      zh: {
        title: '分割线和禁用项',
        description: '菜单中可以加入分割线，也可以禁用暂不可用的操作。',
        codeToggle: '查看分割线和禁用项代码',
      },
      en: {
        title: 'Divider and disabled item',
        description: 'Add dividers between action groups and disable unavailable actions.',
        codeToggle: 'View divider and disabled item code',
      },
      code: `import { Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="menu"
    trigger="hover"
    label="Release"
    items={[
      { key: 'draft', label: 'Save draft' },
      { key: 'schedule', label: 'Schedule' },
      { type: 'divider' },
      { key: 'publish', label: 'Publish', disabled: true },
    ]}
  />
);`,
      render: () => (
        <Cinna.Popup
          mode="menu"
          trigger="hover"
          label="Release"
          items={[
            { key: 'draft', label: 'Save draft' },
            { key: 'schedule', label: 'Schedule' },
            { type: 'divider' },
            { key: 'publish', label: 'Publish', disabled: true },
          ]}
        />
      ),
    },
    {
      id: 'popup-menu-context',
      zh: {
        title: '右键菜单',
        description: 'trigger="contextMenu" 会在鼠标右键位置打开菜单。',
        codeToggle: '查看右键菜单代码',
      },
      en: {
        title: 'Context menu',
        description: 'Use trigger="contextMenu" to open the menu at the right-click position.',
        codeToggle: 'View context menu code',
      },
      code: `import { Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="menu"
    trigger="contextMenu"
    label="Right click"
    items={[
      { key: 'refresh', label: 'Refresh' },
      { key: 'rename', label: 'Rename' },
      { type: 'divider' },
      { key: 'delete', label: 'Delete', disabled: true },
    ]}
  />
);`,
      render: () => (
        <Cinna.Popup
          mode="menu"
          trigger="contextMenu"
          label="Right click"
          items={[
            { key: 'refresh', label: 'Refresh' },
            { key: 'rename', label: 'Rename' },
            { type: 'divider' },
            { key: 'delete', label: 'Delete', disabled: true },
          ]}
        />
      ),
    },
    {
      id: 'popup-menu-custom',
      zh: {
        title: '自定义菜单内容',
        description: 'menu 可传入自定义节点，适合轻量信息和操作组合。',
        codeToggle: '查看自定义菜单内容代码',
      },
      en: {
        title: 'Custom menu content',
        description: 'Use menu for custom nodes that combine information and actions.',
        codeToggle: 'View custom menu content code',
      },
      code: `import { Button, Popup, Space, Text } from '@cinna-design/react';

export default () => (
  <Popup
    mode="menu"
    trigger="hover"
    label="Status"
    menu={
      <Space direction="vertical" align="flex-start">
        <Text strong>Build is ready</Text>
        <Text tone="secondary">3 checks passed.</Text>
        <Button size="small" variant="cream">Open report</Button>
      </Space>
    }
  />
);`,
      render: () => (
        <Cinna.Popup
          mode="menu"
          trigger="hover"
          label="Status"
          menu={
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.Text strong>Build is ready</Cinna.Text>
              <Cinna.Text tone="secondary">3 checks passed.</Cinna.Text>
              <Cinna.Button size="small" variant="cream">Open report</Cinna.Button>
            </Cinna.Space>
          }
        />
      ),
    },
    {
      id: 'popup-menu-styled',
      zh: {
        title: '菜单样式',
        description: 'styles 可以调整菜单浮层、菜单项文字、悬浮色、分割线和触发器样式。',
        codeToggle: '查看菜单样式代码',
      },
      en: {
        title: 'Menu styles',
        description: 'styles can tune the menu panel, item text, hover color, divider, and trigger.',
        codeToggle: 'View menu styles code',
      },
      code: `import { Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="menu"
    label="Styled menu"
    trigger="hover"
    arrow
    items={[
      { key: 'preview', label: 'Preview' },
      { key: 'duplicate', label: 'Duplicate' },
      { type: 'divider' },
      { key: 'publish', label: 'Publish' },
    ]}
    styles={{
      backgroundColor: '#fffaf0',
      borderColor: '#f1c779',
      menuColor: '#6a4a2f',
      menuFontSize: 15,
      menuHoverBackgroundColor: '#f9e4a8',
      dividerColor: '#d99b45',
    }}
  />
);`,
      render: () => (
        <Cinna.Popup
          mode="menu"
          label="Styled menu"
          trigger="hover"
          arrow
          items={[
            { key: 'preview', label: 'Preview' },
            { key: 'duplicate', label: 'Duplicate' },
            { type: 'divider' },
            { key: 'publish', label: 'Publish' },
          ]}
          styles={{
            backgroundColor: '#fffaf0',
            borderColor: '#f1c779',
            menuColor: '#6a4a2f',
            menuFontSize: 15,
            menuHoverBackgroundColor: '#f9e4a8',
            dividerColor: '#d99b45',
          }}
        />
      ),
    },
    {
      id: 'popup-popover-basic',
      zh: {
        title: '内容浮层',
        description: 'mode="popover" 展示标题和正文，默认悬浮触发。',
        codeToggle: '查看内容浮层代码',
      },
      en: {
        title: 'Content panel',
        description: 'Use mode="popover" for a heading and body. It opens on hover by default.',
        codeToggle: 'View content panel code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="popover" title="Batch detail" content="12 items are ready for pickup.">
    <Button>Hover me</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="popover" title="Batch detail" content="12 items are ready for pickup.">
          <Cinna.Button>Hover me</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-popover-content-only',
      zh: {
        title: '仅内容浮层',
        description: 'title 可选，只有 content 时会展示更轻量的气泡内容。',
        codeToggle: '查看仅内容浮层代码',
      },
      en: {
        title: 'Content only',
        description: 'title is optional, so content alone creates a lighter panel.',
        codeToggle: 'View content-only panel code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="popover" content="Quick status note.">
    <Button>Hover note</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="popover" content="Quick status note.">
          <Cinna.Button>Hover note</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-popover-placement',
      zh: {
        title: '内容浮层方向',
        description: 'placement 支持 top、bottom、left 和 right。',
        codeToggle: '查看内容浮层方向代码',
      },
      en: {
        title: 'Content panel placement',
        description: 'placement supports top, bottom, left, and right.',
        codeToggle: 'View content panel placement code',
      },
      code: `import { Button, Popup, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Popup mode="popover" placement="top" content="Top"><Button>Top</Button></Popup>
    <Popup mode="popover" placement="bottom" content="Bottom"><Button>Bottom</Button></Popup>
    <Popup mode="popover" placement="left" content="Left"><Button>Left</Button></Popup>
    <Popup mode="popover" placement="right" content="Right"><Button>Right</Button></Popup>
  </Space>
);`,
      render: () => (
        <Cinna.Space wrap>
          <Cinna.Popup mode="popover" placement="top" content="Top"><Cinna.Button>Top</Cinna.Button></Cinna.Popup>
          <Cinna.Popup mode="popover" placement="bottom" content="Bottom"><Cinna.Button>Bottom</Cinna.Button></Cinna.Popup>
          <Cinna.Popup mode="popover" placement="left" content="Left"><Cinna.Button>Left</Cinna.Button></Cinna.Popup>
          <Cinna.Popup mode="popover" placement="right" content="Right"><Cinna.Button>Right</Cinna.Button></Cinna.Popup>
        </Cinna.Space>
      ),
    },
    {
      id: 'popup-popover-click',
      zh: {
        title: '内容浮层点击触发',
        description: 'trigger="click" 时点击目标元素切换浮层显隐。',
        codeToggle: '查看内容浮层点击触发代码',
      },
      en: {
        title: 'Content panel click trigger',
        description: 'With trigger="click", clicking the target toggles the panel.',
        codeToggle: 'View content panel click trigger code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="popover" trigger="click" title="Click panel" content="Click again to close.">
    <Button>Click me</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="popover" trigger="click" title="Click panel" content="Click again to close.">
          <Cinna.Button>Click me</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-popover-rich-content',
      zh: {
        title: '组合内容浮层',
        description: 'content 支持 ReactNode，可组合文本与操作。',
        codeToggle: '查看组合内容浮层代码',
      },
      en: {
        title: 'Composed content panel',
        description: 'content accepts ReactNode, so text and actions can be composed.',
        codeToggle: 'View composed content panel code',
      },
      code: `import { Button, Popup, Space, Text } from '@cinna-design/react';

export default () => (
  <Popup
    mode="popover"
    trigger="click"
    title="Recipe card"
    content={
      <Space direction="vertical" align="flex-start">
        <Text tone="secondary">Three pending edits.</Text>
        <Button size="small">Open</Button>
      </Space>
    }
  >
    <Button>Open panel</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup
          mode="popover"
          trigger="click"
          title="Recipe card"
          content={
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.Text tone="secondary">Three pending edits.</Cinna.Text>
              <Cinna.Button size="small">Open</Cinna.Button>
            </Cinna.Space>
          }
        >
          <Cinna.Button>Open panel</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-popover-styled',
      zh: {
        title: '内容浮层样式',
        description: 'styles 可以分别设置浮层背景、边框、标题和正文样式。',
        codeToggle: '查看内容浮层样式代码',
      },
      en: {
        title: 'Content panel styles',
        description: 'styles can tune the panel background, border, title, and body.',
        codeToggle: 'View content panel styles code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="popover"
    title="Cloud note"
    content="The next build will start after the current queue clears."
    placement="right"
    styles={{
      backgroundColor: '#effaff',
      borderColor: '#9bd4e8',
      titleColor: '#245f77',
      titleFontSize: 18,
      contentColor: '#4c6f78',
      contentFontSize: 14,
      radius: 16,
    }}
  >
    <Button>Hover note</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup
          mode="popover"
          title="Cloud note"
          content="The next build will start after the current queue clears."
          placement="right"
          styles={{
            backgroundColor: '#effaff',
            borderColor: '#9bd4e8',
            titleColor: '#245f77',
            titleFontSize: 18,
            contentColor: '#4c6f78',
            contentFontSize: 14,
            radius: 16,
          }}
        >
          <Cinna.Button>Hover note</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-confirm-basic',
      zh: {
        title: '确认浮层',
        description: 'mode="confirm" 点击目标后弹出确认框，title 展示确认标题。',
        codeToggle: '查看确认浮层代码',
      },
      en: {
        title: 'Confirmation panel',
        description: 'Use mode="confirm" to open a confirmation panel on click, with title as the heading.',
        codeToggle: 'View confirmation panel code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="confirm" title="Delete this draft?">
    <Button>Delete</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="confirm" title="Delete this draft?">
          <Cinna.Button>Delete</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-confirm-description',
      zh: {
        title: '确认说明',
        description: 'description 可补充操作影响，适合破坏性或不可逆操作。',
        codeToggle: '查看确认说明代码',
      },
      en: {
        title: 'Confirmation description',
        description: 'Use description to add impact details for destructive or irreversible actions.',
        codeToggle: 'View confirmation description code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="confirm"
    title="Archive recipe?"
    description="Archived recipes can be restored from settings."
  >
    <Button>Archive</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup
          mode="confirm"
          title="Archive recipe?"
          description="Archived recipes can be restored from settings."
        >
          <Cinna.Button>Archive</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-confirm-button-text',
      zh: {
        title: '确认按钮文案',
        description: 'okText 与 cancelText 可替换确认和取消按钮文本。',
        codeToggle: '查看确认按钮文案代码',
      },
      en: {
        title: 'Confirmation button text',
        description: 'Use okText and cancelText to replace confirm and cancel button copy.',
        codeToggle: 'View confirmation button text code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup mode="confirm" title="Publish now?" okText="Publish" cancelText="Later">
    <Button variant="primary">Publish</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup mode="confirm" title="Publish now?" okText="Publish" cancelText="Later">
          <Cinna.Button variant="primary">Publish</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-confirm-placement',
      zh: {
        title: '确认浮层方向',
        description: '确认模式同样支持 placement 控制弹出方向。',
        codeToggle: '查看确认浮层方向代码',
      },
      en: {
        title: 'Confirmation placement',
        description: 'Confirm mode also supports placement for panel direction.',
        codeToggle: 'View confirmation placement code',
      },
      code: `import { Button, Popup, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Popup mode="confirm" placement="top" title="Confirm top?"><Button>Top</Button></Popup>
    <Popup mode="confirm" placement="bottom" title="Confirm bottom?"><Button>Bottom</Button></Popup>
  </Space>
);`,
      render: () => (
        <Cinna.Space wrap>
          <Cinna.Popup mode="confirm" placement="top" title="Confirm top?"><Cinna.Button>Top</Cinna.Button></Cinna.Popup>
          <Cinna.Popup mode="confirm" placement="bottom" title="Confirm bottom?"><Cinna.Button>Bottom</Cinna.Button></Cinna.Popup>
        </Cinna.Space>
      ),
    },
    {
      id: 'popup-confirm-callbacks',
      zh: {
        title: '确认回调',
        description: 'onConfirm 与 onCancel 分别在点击确认和取消时触发。',
        codeToggle: '查看确认回调代码',
      },
      en: {
        title: 'Confirmation callbacks',
        description: 'onConfirm and onCancel run when the confirm or cancel button is clicked.',
        codeToggle: 'View confirmation callbacks code',
      },
      code: `import { Button, Popup, Space, Text } from '@cinna-design/react';
import { useState } from 'react';

export default () => {
  const [status, setStatus] = useState('Waiting');

  return (
    <Space direction="vertical" align="flex-start">
      <Popup
        mode="confirm"
        title="Apply changes?"
        onConfirm={() => setStatus('Confirmed')}
        onCancel={() => setStatus('Canceled')}
      >
        <Button>Apply</Button>
      </Popup>
      <Text tone="secondary">{status}</Text>
    </Space>
  );
};`,
      render: () => {
        const ConfirmCallbacksDemo = () => {
          const [status, setStatus] = React.useState('Waiting');

          return (
            <Cinna.Space direction="vertical" align="flex-start">
              <Cinna.Popup
                mode="confirm"
                title="Apply changes?"
                onConfirm={() => setStatus('Confirmed')}
                onCancel={() => setStatus('Canceled')}
              >
                <Cinna.Button>Apply</Cinna.Button>
              </Cinna.Popup>
              <Cinna.Text tone="secondary">{status}</Cinna.Text>
            </Cinna.Space>
          );
        };

        return <ConfirmCallbacksDemo />;
      },
    },
    {
      id: 'popup-confirm-styled',
      zh: {
        title: '确认浮层样式',
        description: '确认和取消按钮可以直接沿用 Button 的主题与自定义参数。',
        codeToggle: '查看确认浮层样式代码',
      },
      en: {
        title: 'Confirmation styles',
        description: 'Confirm and cancel actions accept Button theme and customization props.',
        codeToggle: 'View confirmation styles code',
      },
      code: `import { Button, Popup } from '@cinna-design/react';

export default () => (
  <Popup
    mode="confirm"
    title="Publish changes?"
    description="This will update the public version."
    okText="Publish"
    cancelText="Later"
    okButtonProps={{ theme: 'berry' }}
    cancelButtonProps={{ theme: 'cream' }}
    styles={{
      backgroundColor: '#fff7f8',
      borderColor: '#f0a7b1',
      titleColor: '#8a3442',
      contentColor: '#7c5360',
    }}
  >
    <Button theme="berry">Publish</Button>
  </Popup>
);`,
      render: () => (
        <Cinna.Popup
          mode="confirm"
          title="Publish changes?"
          description="This will update the public version."
          okText="Publish"
          cancelText="Later"
          okButtonProps={{ theme: 'berry' }}
          cancelButtonProps={{ theme: 'cream' }}
          styles={{
            backgroundColor: '#fff7f8',
            borderColor: '#f0a7b1',
            titleColor: '#8a3442',
            contentColor: '#7c5360',
          }}
        >
          <Cinna.Button theme="berry">Publish</Cinna.Button>
        </Cinna.Popup>
      ),
    },
    {
      id: 'popup-trigger-placement',
      zh: {
        title: '触发与位置',
        description: 'trigger 支持点击、悬浮和右键，placement 支持上下左右，align 控制菜单相对触发器的对齐。',
        codeToggle: '查看触发与位置代码',
      },
      en: {
        title: 'Trigger and placement',
        description: 'trigger supports click, hover, and context menu. placement supports all four directions.',
        codeToggle: 'View trigger and placement code',
      },
      code: `import { Button, Popup, Space } from '@cinna-design/react';

export default () => (
  <Space wrap>
    <Popup mode="menu" label="Left" trigger="hover" align="left" items={[{ key: 'one', label: 'Left aligned' }]} />
    <Popup mode="menu" label="Top" trigger="hover" placement="top" items={[{ key: 'one', label: 'Open upward' }]} />
    <Popup mode="popover" trigger="click" placement="left" content="Click to toggle.">
      <Button>Click panel</Button>
    </Popup>
    <Popup mode="menu" label="Right click" trigger="contextMenu" items={[{ key: 'refresh', label: 'Refresh' }]} />
  </Space>
);`,
      render: () => (
        <Cinna.Space wrap>
          <Cinna.Popup mode="menu" label="Left" trigger="hover" align="left" items={[{ key: 'one', label: 'Left aligned' }]} />
          <Cinna.Popup mode="menu" label="Top" trigger="hover" placement="top" items={[{ key: 'one', label: 'Open upward' }]} />
          <Cinna.Popup mode="popover" trigger="click" placement="left" content="Click to toggle.">
            <Cinna.Button>Click panel</Cinna.Button>
          </Cinna.Popup>
          <Cinna.Popup mode="menu" label="Right click" trigger="contextMenu" items={[{ key: 'refresh', label: 'Refresh' }]} />
        </Cinna.Space>
      ),
    },
  ],
};
