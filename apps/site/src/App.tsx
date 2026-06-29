import { useMemo } from 'react';
import { docsNavItems } from './docs/navigation';
import { useDocsNavSort } from './hooks/useDocsNavSort';
import { useRoute } from './hooks/useRoute';
import { useSiteLanguage } from './hooks/useSiteLanguage';
import { ComponentPage } from './pages/ComponentPage';
import { HomePage } from './pages/HomePage';

const routeAliases: Record<string, string> = {
  dropdown: 'popup',
};

export const App = () => {
  const { language, setLanguage } = useSiteLanguage();
  const { route, navigate } = useRoute();
  const { mode: sortMode, setMode: setSortMode } = useDocsNavSort();
  const normalizedRoute = routeAliases[route] ?? route;
  const activeKey = useMemo(() => (docsNavItems.some((item) => item.key === normalizedRoute) ? normalizedRoute : undefined), [normalizedRoute]);

  return activeKey ? (
    <ComponentPage
      activeKey={activeKey}
      language={language}
      setLanguage={setLanguage}
      navigate={navigate}
      sortMode={sortMode}
      setSortMode={setSortMode}
    />
  ) : (
    <HomePage language={language} setLanguage={setLanguage} navigate={navigate} />
  );
};
