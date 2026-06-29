import { siteI18n } from '../i18n';
import type { DocsNavCategoryId, DocsNavItem, DocsNavSortMode, SiteLanguage } from '../types';

export const docsNavSortStorageKey = 'cinna-docs-nav-sort-mode';

export const docsNavCategories: Array<{ id: DocsNavCategoryId; zh: string; en: string }> = [
  { id: 'general', zh: '通用', en: 'General' },
  { id: 'layout', zh: '布局', en: 'Layout' },
  { id: 'navigation', zh: '导航', en: 'Navigation' },
  { id: 'data-entry', zh: '数据录入', en: 'Data Entry' },
  { id: 'data-display', zh: '数据展示', en: 'Data Display' },
  { id: 'feedback', zh: '反馈', en: 'Feedback' },
  { id: 'overlay', zh: '浮层', en: 'Overlay' },
];

export const docsNavItems: DocsNavItem[] = [
  { key: 'button', name: 'Button', zhName: '按钮', category: 'general' },
  { key: 'typography', name: 'Typography', zhName: '排版', category: 'general' },
  { key: 'float-button', name: 'FloatButton', zhName: '悬浮按钮', category: 'general' },
  { key: 'divider', name: 'Divider', zhName: '分割线', category: 'layout' },
  { key: 'space', name: 'Space', zhName: '间距', category: 'layout' },
  { key: 'flex', name: 'Flex', zhName: '弹性布局', category: 'layout' },
  { key: 'grid', name: 'Grid', zhName: '栅格', category: 'layout' },
  { key: 'layout', name: 'Layout', zhName: '页面布局', category: 'layout' },
  { key: 'splitter', name: 'Splitter', zhName: '分割面板', category: 'layout' },
  { key: 'breadcrumb', name: 'Breadcrumb', zhName: '面包屑', category: 'navigation' },
  { key: 'tabs', name: 'Tabs', zhName: '标签页', category: 'navigation' },
  { key: 'steps', name: 'Steps', zhName: '步骤条', category: 'navigation' },
  { key: 'pagination', name: 'Pagination', zhName: '分页', category: 'navigation' },
  { key: 'menu', name: 'Menu', zhName: '菜单', category: 'navigation' },
  { key: 'anchor', name: 'Anchor', zhName: '锚点', category: 'navigation' },
  { key: 'affix', name: 'Affix', zhName: '固钉', category: 'navigation' },
  { key: 'input', name: 'Input', zhName: '输入框', category: 'data-entry' },
  { key: 'textarea', name: 'TextArea', zhName: '文本域', category: 'data-entry' },
  { key: 'input-number', name: 'InputNumber', zhName: '数字输入', category: 'data-entry' },
  { key: 'select', name: 'Select', zhName: '选择器', category: 'data-entry' },
  { key: 'auto-complete', name: 'AutoComplete', zhName: '自动完成', category: 'data-entry' },
  { key: 'cascader', name: 'Cascader', zhName: '级联选择', category: 'data-entry' },
  { key: 'checkbox', name: 'Checkbox', zhName: '复选框', category: 'data-entry' },
  { key: 'radio', name: 'Radio', zhName: '单选框', category: 'data-entry' },
  { key: 'switch', name: 'Switch', zhName: '开关', category: 'data-entry' },
  { key: 'slider', name: 'Slider', zhName: '滑动输入条', category: 'data-entry' },
  { key: 'rate', name: 'Rate', zhName: '评分', category: 'data-entry' },
  { key: 'segmented', name: 'Segmented', zhName: '分段控制', category: 'data-entry' },
  { key: 'date-picker', name: 'DatePicker', zhName: '日期选择', category: 'data-entry' },
  { key: 'time-picker', name: 'TimePicker', zhName: '时间选择', category: 'data-entry' },
  { key: 'color-picker', name: 'ColorPicker', zhName: '颜色选择', category: 'data-entry' },
  { key: 'mentions', name: 'Mentions', zhName: '提及', category: 'data-entry' },
  { key: 'tree-select', name: 'TreeSelect', zhName: '树选择', category: 'data-entry' },
  { key: 'upload', name: 'Upload', zhName: '上传', category: 'data-entry' },
  { key: 'form', name: 'Form', zhName: '表单', category: 'data-entry' },
  { key: 'transfer', name: 'Transfer', zhName: '穿梭框', category: 'data-entry' },
  { key: 'card', name: 'Card', zhName: '卡片', category: 'data-display' },
  { key: 'avatar', name: 'Avatar', zhName: '头像', category: 'data-display' },
  { key: 'badge', name: 'Badge', zhName: '徽标数', category: 'data-display' },
  { key: 'tag', name: 'Tag', zhName: '标签', category: 'data-display' },
  { key: 'table', name: 'Table', zhName: '表格', category: 'data-display' },
  { key: 'list', name: 'List', zhName: '列表', category: 'data-display' },
  { key: 'descriptions', name: 'Descriptions', zhName: '描述列表', category: 'data-display' },
  { key: 'statistic', name: 'Statistic', zhName: '统计数值', category: 'data-display' },
  { key: 'timeline', name: 'Timeline', zhName: '时间线', category: 'data-display' },
  { key: 'collapse', name: 'Collapse', zhName: '折叠面板', category: 'data-display' },
  { key: 'calendar', name: 'Calendar', zhName: '日历', category: 'data-display' },
  { key: 'carousel', name: 'Carousel', zhName: '走马灯', category: 'data-display' },
  { key: 'image', name: 'Image', zhName: '图片', category: 'data-display' },
  { key: 'tree', name: 'Tree', zhName: '树', category: 'data-display' },
  { key: 'watermark', name: 'Watermark', zhName: '水印', category: 'data-display' },
  { key: 'empty', name: 'Empty', zhName: '空状态', category: 'feedback' },
  { key: 'alert', name: 'Alert', zhName: '警告提示', category: 'feedback' },
  { key: 'message', name: 'Message', zhName: '全局提示', category: 'feedback' },
  { key: 'notification', name: 'Notification', zhName: '通知提醒框', category: 'feedback' },
  { key: 'progress', name: 'Progress', zhName: '进度条', category: 'feedback' },
  { key: 'skeleton', name: 'Skeleton', zhName: '骨架屏', category: 'feedback' },
  { key: 'result', name: 'Result', zhName: '结果页', category: 'feedback' },
  { key: 'spin', name: 'Spin', zhName: '加载中', category: 'feedback' },
  { key: 'loading', name: 'Loading', zhName: '加载', category: 'feedback' },
  { key: 'popup', name: 'Popup', zhName: '弹出层', category: 'overlay' },
  { key: 'modal', name: 'Modal', zhName: '对话框', category: 'overlay' },
  { key: 'drawer', name: 'Drawer', zhName: '抽屉', category: 'overlay' },
  { key: 'tour', name: 'Tour', zhName: '漫游式引导', category: 'overlay' },
];

export const matchesDocsNavSearch = (item: DocsNavItem, searchValue: string, language: SiteLanguage) => {
  if (!searchValue) return true;

  const label = language === 'zh' ? `${item.name} ${item.zhName}` : item.name;
  return label.toLowerCase().includes(searchValue);
};

export const sortDocsNavItems = (items: DocsNavItem[], mode: DocsNavSortMode | 'az' = 'az') => {
  const direction = mode === 'za' ? -1 : 1;

  return [...items].sort((a, b) => direction * a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
};

export const getComponentCategoryLabel = (item: DocsNavItem, language: SiteLanguage) => {
  if (language === 'zh') return item.zhName;
  return siteI18n[language].groups[item.category] ?? item.category;
};

export const getImportCode = (item: DocsNavItem) => {
  if (item.key === 'grid') return "import { Grid, Row, Col } from '@cinna-design/react';";
  if (item.key === 'layout') return "import { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter } from '@cinna-design/react';";
  return `import { ${item.name} } from '@cinna-design/react';`;
};
