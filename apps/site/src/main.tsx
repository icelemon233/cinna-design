import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/600.css';
import '@fontsource/quicksand/700.css';
import '@cinna-design/react/style.css';
import './styles.css';

const legacyScriptId = 'cinna-site-app';

if (!document.getElementById(legacyScriptId)) {
  const script = document.createElement('script');
  script.id = legacyScriptId;
  script.type = 'module';
  script.src = `${import.meta.env.BASE_URL}legacy-app.js`;
  document.body.appendChild(script);
}
