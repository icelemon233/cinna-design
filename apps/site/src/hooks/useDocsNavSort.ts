import { useState } from 'react';
import { docsNavSortStorageKey } from '../docs/navigation';
import type { DocsNavSortMode } from '../types';

const getDocsNavSortMode = (): DocsNavSortMode => {
  const storedMode = window.localStorage.getItem(docsNavSortStorageKey);
  return storedMode === 'az' || storedMode === 'za' || storedMode === 'default' ? storedMode : 'default';
};

export const useDocsNavSort = () => {
  const [mode, setModeState] = useState<DocsNavSortMode>(getDocsNavSortMode);

  const setMode = (nextMode: DocsNavSortMode) => {
    window.localStorage.setItem(docsNavSortStorageKey, nextMode);
    setModeState(nextMode);
  };

  return { mode, setMode };
};
