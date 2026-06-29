import { getImportCode } from '../../docs/navigation';
import { siteI18n } from '../../i18n';
import type { DocsNavItem, SiteLanguage } from '../../types';

export const DocsTitleMeta = ({ item, language }: { item: DocsNavItem; language: SiteLanguage }) => {
  const copy = siteI18n[language].ui;
  const githubUrl = 'https://github.com/icelemon233/cinna-design';

  return (
    <div className="docs-title-meta" aria-label={language === 'zh' ? '组件快速信息' : 'Component quick information'}>
      <div className="docs-title-meta__row">
        <span className="docs-title-meta__label">{copy.docInfoUsage}</span>
        <code className="docs-title-meta__import">{getImportCode(item)}</code>
      </div>
      <div className="docs-title-meta__row">
        <span className="docs-title-meta__label">{copy.docInfoFeedback}</span>
        <a className="docs-title-meta__item" href={`${githubUrl}/tree/main/packages/react/src/components`} rel="noreferrer" target="_blank">
          <span className="docs-title-meta__glyph">GH</span>
          <span>components/{item.key}</span>
        </a>
        <a className="docs-title-meta__item" href={`${githubUrl}/issues/new?title=${encodeURIComponent(`[${item.name}] `)}`} rel="noreferrer" target="_blank">
          <span className="docs-title-meta__glyph">!</span>
          <span>{copy.docInfoSubmitIssue}</span>
        </a>
      </div>
      <div className="docs-title-meta__row">
        <span className="docs-title-meta__label">{copy.docInfoDocs}</span>
        <span className="docs-title-meta__item">
          <span className="docs-title-meta__glyph">AI</span>
          <span>{copy.docInfoLlms}</span>
        </span>
        <a className="docs-title-meta__item" href={`${githubUrl}/releases`} rel="noreferrer" target="_blank">
          <span className="docs-title-meta__glyph">Log</span>
          <span>{copy.docInfoChangelog}</span>
        </a>
      </div>
    </div>
  );
};
