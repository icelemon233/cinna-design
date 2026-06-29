import { useState } from 'react';
import { Button } from '@cinna-design/react';
import {
  docsNavCategories,
  docsNavItems,
  matchesDocsNavSearch,
  sortDocsNavItems,
} from '../../docs/navigation';
import { siteI18n } from '../../i18n';
import type { DocsNavItem, DocsNavSortMode, SiteLanguage } from '../../types';
import { Mascot } from './BrandAssets';
import { DocsNavSort } from './DocsNavSort';

const navRippleParticleColors = ['#73c4e0', '#f6c96d', '#ef8f8f', '#9bcb8e', '#b9a7ea', '#f3a7d0', '#78bdd4'];

export const DocsSidebar = ({
  activeKey,
  language,
  navigate,
  sortMode,
  setSortMode,
}: {
  activeKey: string;
  language: SiteLanguage;
  navigate: (key: string) => void;
  sortMode: DocsNavSortMode;
  setSortMode: (mode: DocsNavSortMode) => void;
}) => {
  const [search, setSearch] = useState('');
  const copy = siteI18n[language].ui;
  const searchValue = search.trim().toLowerCase();
  const matchedItems = docsNavItems.filter((item) => matchesDocsNavSearch(item, searchValue, language));
  const groupedItems = sortMode === 'default'
    ? docsNavCategories
      .map((category) => ({
        category,
        items: sortDocsNavItems(matchedItems.filter((item) => item.category === category.id), 'az'),
      }))
      .filter((group) => group.items.length > 0)
    : [];
  const sortedItems = sortMode === 'default' ? [] : sortDocsNavItems(matchedItems, sortMode);
  const renderItem = (item: DocsNavItem) => (
    <Button
      key={item.key}
      variant="ghost"
      shape="default"
      className={item.key === activeKey ? 'docs-nav__item docs-nav__item--active' : 'docs-nav__item'}
      aria-current={item.key === activeKey ? 'page' : undefined}
      rippleEffects={['particles']}
      rippleParticleColors={navRippleParticleColors}
      rippleParticleOpacity={0.82}
      borderColor={item.key === activeKey ? 'rgba(61, 142, 170, .32)' : 'rgba(168, 223, 241, .7)'}
      onClick={() => navigate(item.key)}
    >
      <span>
        {item.name}
        {language === 'zh' ? <small>{item.zhName}</small> : null}
      </span>
    </Button>
  );

  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar__top">
        <button className="docs-brand" type="button" onClick={() => navigate('home')}>
          <Mascot className="docs-brand__mascot" size={34} />
          <span>Cinna Design</span>
        </button>
        <label className="docs-nav-search">
          <span aria-hidden="true">⌕</span>
          <input value={search} placeholder={copy.searchNav} onChange={(event) => setSearch(event.currentTarget.value)} />
        </label>
      </div>
      <nav className="docs-nav" aria-label="Component navigation">
        {matchedItems.length === 0 ? (
          <p className="docs-nav__empty">{copy.noResults}</p>
        ) : sortMode === 'default' ? (
          groupedItems.map(({ category, items }) => (
            <div key={category.id} className="docs-nav__group">
              <div className="docs-nav__label">{category[language]}</div>
              {items.map(renderItem)}
            </div>
          ))
        ) : (
          <div className="docs-nav__group docs-nav__group--sorted">
            {sortedItems.map(renderItem)}
          </div>
        )}
      </nav>
      <div className="docs-sidebar__sort">
        <DocsNavSort language={language} mode={sortMode} setMode={setSortMode} />
      </div>
    </aside>
  );
};
