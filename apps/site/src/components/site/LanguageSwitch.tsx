import { siteI18n } from '../../i18n';
import type { SiteLanguage } from '../../types';
import { SiteSegmented } from './SiteSegmented';

export const LanguageSwitch = ({
  language,
  setLanguage,
}: {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
}) => (
  <SiteSegmented
    className="language-switch"
    ariaLabel={siteI18n[language].ui.language}
    value={language}
    options={[
      { value: 'zh', label: '中' },
      { value: 'en', label: 'EN' },
    ]}
    onChange={setLanguage}
  />
);
