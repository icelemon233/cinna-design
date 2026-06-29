import * as Cinna from '@cinna-design/react';
import { siteI18n } from '../i18n';
import type { SiteLanguage } from '../types';
import { Mascot } from '../components/site/BrandAssets';
import { CodeBlock } from '../components/site/CodeBlock';
import { LanguageSwitch } from '../components/site/LanguageSwitch';

export const HomePage = ({
  language,
  setLanguage,
  navigate,
}: {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  navigate: (key: string) => void;
}) => {
  const copy = siteI18n[language].ui;
  const installCode = `// ${copy.installComment}
pnpm add @cinna-design/react`;
  const usageCode = `import { Button } from '@cinna-design/react';
import '@cinna-design/react/style.css';

export default () => <Button>${language === 'zh' ? '云朵按钮' : 'Cloud button'}</Button>;`;

  return (
    <main className="site-shell">
      <section className="hero home-panel" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="Main navigation">
          <div className="topbar__actions">
            <LanguageSwitch language={language} setLanguage={setLanguage} />
          </div>
        </nav>
        <div className="hero__mascot" aria-hidden="true">
          <Mascot className="hero__mascot-image" />
        </div>
        <div className="hero__content">
          <p className="eyebrow">{copy.packageIntro}</p>
          <h1 id="hero-title">{copy.themeCardTitle}</h1>
          <p className="hero__copy">{copy.storyIntro}</p>
          {copy.storyBody ? <p className="hero__copy">{copy.storyBody}</p> : null}
          <blockquote className="hero__quote">{copy.storyQuote}</blockquote>
          <div className="hero__actions">
            <Cinna.Button size="large" icon="*" onClick={() => navigate('button')}>
              {copy.getStarted}
            </Cinna.Button>
          </div>
        </div>
        <button
          className="scroll-cue"
          type="button"
          onClick={() => document.getElementById('install-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <span>{copy.scrollHint}</span>
          <span aria-hidden="true"><Cinna.Icon name="arrow-tail-down" size={22} /></span>
        </button>
      </section>
      <section className="home-section home-section--install" aria-labelledby="install-title">
        <div className="home-section__head home-section__head--center">
          <h2 id="install-title">{copy.install}</h2>
        </div>
        <CodeBlock className="home-code home-code--wide" code={installCode} />
      </section>
      <section className="home-section home-section--usage" aria-labelledby="home-usage-title">
        <div className="home-section__head home-section__head--center">
          <h2 id="home-usage-title">{copy.usageExample}</h2>
        </div>
        <CodeBlock className="home-code home-code--wide" code={usageCode} />
      </section>
      <footer className="site-footer">
        <span>{copy.footerLicense}</span>
        <span>{copy.brandPowered}</span>
      </footer>
    </main>
  );
};
