import type { ComponentDocConfig } from '../../types';
import { typographyDoc } from './typography';
import { dividerDoc } from './divider';
import { spaceDoc } from './space';
import { flexDoc } from './flex';
import { gridDoc } from './grid';
import { layoutDoc } from './layout';
import { splitterDoc } from './splitter';
import { breadcrumbDoc } from './breadcrumb';
import { tabsDoc } from './tabs';
import { stepsDoc } from './steps';
import { paginationDoc } from './pagination';
import { menuDoc } from './menu';
import { anchorDoc } from './anchor';
import { affixDoc } from './affix';
import { floatButtonDoc } from './float-button';
import { inputDoc } from './input';
import { textareaDoc } from './textarea';
import { inputNumberDoc } from './input-number';
import { selectDoc } from './select';
import { autoCompleteDoc } from './auto-complete';
import { cascaderDoc } from './cascader';
import { checkboxDoc } from './checkbox';
import { radioDoc } from './radio';
import { switchDoc } from './switch';
import { sliderDoc } from './slider';
import { rateDoc } from './rate';
import { segmentedDoc } from './segmented';
import { datePickerDoc } from './date-picker';
import { timePickerDoc } from './time-picker';
import { colorPickerDoc } from './color-picker';
import { mentionsDoc } from './mentions';
import { treeSelectDoc } from './tree-select';
import { uploadDoc } from './upload';
import { formDoc } from './form';
import { transferDoc } from './transfer';
import { cardDoc } from './card';
import { avatarDoc } from './avatar';
import { badgeDoc } from './badge';
import { tagDoc } from './tag';
import { tableDoc } from './table';
import { listDoc } from './list';
import { descriptionsDoc } from './descriptions';
import { statisticDoc } from './statistic';
import { timelineDoc } from './timeline';
import { collapseDoc } from './collapse';
import { calendarDoc } from './calendar';
import { carouselDoc } from './carousel';
import { imageDoc } from './image';
import { treeDoc } from './tree';
import { watermarkDoc } from './watermark';
import { emptyDoc } from './empty';
import { alertDoc } from './alert';
import { messageDoc } from './message';
import { notificationDoc } from './notification';
import { progressDoc } from './progress';
import { skeletonDoc } from './skeleton';
import { resultDoc } from './result';
import { spinDoc } from './spin';
import { loadingDoc } from './loading';
import { popupDoc } from './popup';
import { modalDoc } from './modal';
import { drawerDoc } from './drawer';
import { tourDoc } from './tour';

export const componentDocConfigs: Record<string, ComponentDocConfig> = {
  typography: typographyDoc,
  divider: dividerDoc,
  space: spaceDoc,
  flex: flexDoc,
  grid: gridDoc,
  layout: layoutDoc,
  splitter: splitterDoc,
  breadcrumb: breadcrumbDoc,
  tabs: tabsDoc,
  steps: stepsDoc,
  pagination: paginationDoc,
  menu: menuDoc,
  anchor: anchorDoc,
  affix: affixDoc,
  'float-button': floatButtonDoc,
  input: inputDoc,
  textarea: textareaDoc,
  'input-number': inputNumberDoc,
  select: selectDoc,
  'auto-complete': autoCompleteDoc,
  cascader: cascaderDoc,
  checkbox: checkboxDoc,
  radio: radioDoc,
  switch: switchDoc,
  slider: sliderDoc,
  rate: rateDoc,
  segmented: segmentedDoc,
  'date-picker': datePickerDoc,
  'time-picker': timePickerDoc,
  'color-picker': colorPickerDoc,
  mentions: mentionsDoc,
  'tree-select': treeSelectDoc,
  upload: uploadDoc,
  form: formDoc,
  transfer: transferDoc,
  card: cardDoc,
  avatar: avatarDoc,
  badge: badgeDoc,
  tag: tagDoc,
  table: tableDoc,
  list: listDoc,
  descriptions: descriptionsDoc,
  statistic: statisticDoc,
  timeline: timelineDoc,
  collapse: collapseDoc,
  calendar: calendarDoc,
  carousel: carouselDoc,
  image: imageDoc,
  tree: treeDoc,
  watermark: watermarkDoc,
  empty: emptyDoc,
  alert: alertDoc,
  message: messageDoc,
  notification: notificationDoc,
  progress: progressDoc,
  skeleton: skeletonDoc,
  result: resultDoc,
  spin: spinDoc,
  loading: loadingDoc,
  popup: popupDoc,
  modal: modalDoc,
  drawer: drawerDoc,
  tour: tourDoc,
};
