import { useEffect, useState } from 'react';
import { docsNavItems, getComponentCategoryLabel } from '../docs/navigation';
import { siteI18n } from '../i18n';
import type { DocsNavSortMode, SiteLanguage } from '../types';
import { ApiTable } from '../components/site/ApiTable';
import { Mascot } from '../components/site/BrandAssets';
import { ComponentExamples } from '../components/site/ComponentExamples';
import { DocsSidebar } from '../components/site/DocsSidebar';
import { DocsTitleMeta } from '../components/site/DocsTitleMeta';
import { LanguageSwitch } from '../components/site/LanguageSwitch';

export const ComponentPage = ({
  activeKey,
  language,
  setLanguage,
  navigate,
  sortMode,
  setSortMode,
}: {
  activeKey: string;
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  navigate: (key: string) => void;
  sortMode: DocsNavSortMode;
  setSortMode: (mode: DocsNavSortMode) => void;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const item = docsNavItems.find((entry) => entry.key === activeKey) ?? docsNavItems[0];
  const copy = siteI18n[language].ui;

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [item.key]);

  return (
    <div className="docs-layout">
      <DocsSidebar
        activeKey={item.key}
        language={language}
        navigate={navigate}
        sortMode={sortMode}
        setSortMode={setSortMode}
      />
      <header className="docs-mobile-bar">
        <button type="button" onClick={() => navigate('home')} aria-label="Back home">
          <Mascot className="docs-mobile-bar__mascot" size={32} />
        </button>
        <span>{item.name}</span>
        <div className="docs-mobile-bar__actions">
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open component menu">
            {copy.menu}
          </button>
        </div>
      </header>
      {mobileOpen ? (
        <div className="mobile-drawer">
          <button className="mobile-drawer__mask" type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
          <DocsSidebar
            activeKey={item.key}
            language={language}
            navigate={navigate}
            sortMode={sortMode}
            setSortMode={setSortMode}
          />
        </div>
      ) : null}
      <main className="docs-main">
        <div className="docs-page-toolbar">
          <LanguageSwitch language={language} setLanguage={setLanguage} />
        </div>
        <div className="docs-title-card">
          <p className="eyebrow">{copy.componentDocs}</p>
          <h1>
            {item.name} <span>{getComponentCategoryLabel(item, language)}</span>
          </h1>
          <DocsTitleMeta item={item} language={language} />
        </div>
        <ComponentExamples route={item.key} language={language} />
        <ApiTable route={item.key} language={language} />
      </main>
    </div>
  );
};
