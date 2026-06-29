import { componentApiRows, fallbackApiRows } from '../../docs/apiRows';
import { siteI18n } from '../../i18n';
import type { ApiContent, ApiRow, ApiSection, SiteLanguage } from '../../types';
import { DocFrame } from './DocFrame';

const isApiSection = (item: ApiRow | ApiSection): item is ApiSection => !Array.isArray(item);

const normalizeApiSections = (content: ApiContent): ApiSection[] => {
  if (content.length === 0) return [];
  if (isApiSection(content[0])) return content as ApiSection[];
  return [{ title: '', rows: content as ApiRow[] }];
};

export const ApiTable = ({ route, language }: { route: string; language: SiteLanguage }) => {
  const sections = normalizeApiSections(componentApiRows[route]?.[language] ?? fallbackApiRows[language]);
  const copy = siteI18n[language].ui;

  return (
    <DocFrame className="doc-block" icon="api" id="api-title" title={copy.api}>
      <div className="api-section-list">
        {sections.map((section, sectionIndex) => (
          <section key={section.title || sectionIndex} className="api-section">
            {section.title ? <h3 className="api-section__title">{section.title}</h3> : null}
            <div className="api-table" role="region" aria-label={section.title ? `${section.title} API table` : 'API table'}>
              <table>
                <thead>
                  <tr>
                    <th>{copy.apiProp}</th>
                    <th>{copy.apiDescription}</th>
                    <th>{copy.apiType}</th>
                    <th>{copy.apiDefault}</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map(([prop, description, type, defaultValue]) => (
                    <tr key={prop}>
                      <td>
                        <code>{prop}</code>
                      </td>
                      <td>{description}</td>
                      <td>
                        <code>{type}</code>
                      </td>
                      <td>
                        <code>{defaultValue}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </DocFrame>
  );
};
