import type { DocsNavSortMode, SiteLanguage } from '../../types';
import { SiteSegmented } from './SiteSegmented';

export const DocsNavSort = ({
  language,
  mode,
  setMode,
}: {
  language: SiteLanguage;
  mode: DocsNavSortMode;
  setMode: (mode: DocsNavSortMode) => void;
}) => {
  const copy = language === 'zh'
    ? { label: '导航排序', default: '默认' }
    : { label: 'Navigation order', default: 'Default' };

  return (
    <SiteSegmented
      className="docs-nav-sort"
      ariaLabel={copy.label}
      value={mode}
      options={[
        { value: 'default', label: copy.default },
        { value: 'az', label: 'A-Z' },
        { value: 'za', label: 'Z-A' },
      ]}
      onChange={setMode}
    />
  );
};
