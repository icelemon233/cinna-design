import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/600.css';
import '@fontsource/quicksand/700.css';
import '@cinna-design/react/style.css';
import './styles.css';

const legacyScriptId = 'cinna-site-app';
const legacyVersion = import.meta.env.VITE_CINNA_LEGACY_VERSION;
const legacyVersionQuery = legacyVersion ? `?v=${encodeURIComponent(legacyVersion)}` : '';

if (!document.getElementById(legacyScriptId)) {
  const script = document.createElement('script');
  script.id = legacyScriptId;
  script.type = 'module';
  script.src = `${import.meta.env.BASE_URL}legacy-app.js${legacyVersionQuery}`;
  document.body.appendChild(script);
}
