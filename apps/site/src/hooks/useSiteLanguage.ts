import { useEffect, useState } from 'react';
import type { SiteLanguage } from '../types';

const languageStorageKey = 'cinna-site-language';

const getStoredLanguage = (): SiteLanguage => {
  const storedLanguage = window.localStorage.getItem(languageStorageKey);
  return storedLanguage === 'en' || storedLanguage === 'zh' ? storedLanguage : 'zh';
};

export const useSiteLanguage = () => {
  const [language, setLanguage] = useState<SiteLanguage>(getStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  return { language, setLanguage };
};
