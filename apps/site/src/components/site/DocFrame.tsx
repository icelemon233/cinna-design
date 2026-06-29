import type { ReactNode } from 'react';
import { DocIcon } from './BrandAssets';

export const DocFrame = ({
  id,
  title,
  icon = 'sample',
  tone = 'cream',
  className,
  children,
}: {
  id: string;
  title: string;
  icon?: 'sample' | 'usage' | 'api';
  tone?: 'cream' | 'blue' | 'butter';
  className?: string;
  children: ReactNode;
}) => (
  <section className={['cinna-doc-frame', `cinna-doc-frame--${tone}`, className ?? ''].filter(Boolean).join(' ')} aria-labelledby={id}>
    <div className="cinna-doc-frame__header">
      <span className="cinna-doc-frame__mark" aria-hidden="true">
        <DocIcon kind={icon} />
      </span>
      <h3 id={id}>{title}</h3>
    </div>
    <div className="cinna-doc-frame__body">{children}</div>
  </section>
);
