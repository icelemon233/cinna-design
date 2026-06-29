import { ButtonExamplePreview } from '../../docs/buttonPreviews';
import type { ButtonExample, ComponentDocExample, SiteLanguage } from '../../types';
import { CodeBlock } from './CodeBlock';

export const ComponentExampleBlock = ({
  example,
  language,
  isButton,
}: {
  example: ComponentDocExample | ButtonExample;
  language: SiteLanguage;
  isButton?: boolean;
}) => {
  const copy = language === 'zh' ? example.zh : example.en;
  const surfaceClassName = isButton ? '' : (example as ComponentDocExample).surfaceClassName ?? '';

  return (
    <article className="component-example">
      <div className="component-example__head">
        <h4 className="component-example__title">{copy.title}</h4>
        <p className="component-example__description">{copy.description}</p>
      </div>
      <div className={['demo-surface', isButton ? 'button-example-surface' : 'component-example-surface', surfaceClassName].filter(Boolean).join(' ')}>
        {isButton ? <ButtonExamplePreview id={example.id} /> : (example as ComponentDocExample).render()}
      </div>
      <details className="component-example__code">
        <summary>{copy.codeToggle}</summary>
        <CodeBlock code={example.code} />
      </details>
    </article>
  );
};
