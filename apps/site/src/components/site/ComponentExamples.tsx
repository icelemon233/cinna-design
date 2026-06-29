import { buttonExamples } from '../../docs/buttonDocs';
import { componentDocConfigs } from '../../docs/componentDocs';
import type { SiteLanguage } from '../../types';
import { ComponentExampleBlock } from './ComponentExampleBlock';
import { DocFrame } from './DocFrame';

export const ComponentExamples = ({ route, language }: { route: string; language: SiteLanguage }) => {
  const examples = route === 'button' ? buttonExamples : componentDocConfigs[route]?.examples ?? [];
  const isButton = route === 'button';

  return (
    <DocFrame className="demo-section demo-section--merged" icon="sample" id="basic-title" title={language === 'zh' ? '使用示例' : 'Usage'}>
      <div className="component-example-list">
        {examples.map((example) => (
          <ComponentExampleBlock key={example.id} example={example} language={language} isButton={isButton} />
        ))}
      </div>
    </DocFrame>
  );
};
