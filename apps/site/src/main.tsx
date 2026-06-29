import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/600.css';
import '@fontsource/quicksand/700.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@cinna-design/react/style.css';
import './styles.css';
import { App } from './App';
import { startSupabaseKeepAlive } from './services/supabase/keepAlive';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

startSupabaseKeepAlive();
