import { useEffect, useState } from 'react';

const getCurrentRoute = () => window.location.hash.replace(/^#\/?/, '') || 'home';

export const useRoute = () => {
  const [route, setRoute] = useState(getCurrentRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getCurrentRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (key: string) => {
    window.location.hash = key === 'home' ? '/' : `/${key}`;
  };

  return { route, navigate };
};
