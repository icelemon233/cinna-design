import type { ReactNode } from 'react';

const codeTokenPattern =
  /(\/\*[\s\S]*?\*\/|\/\/.*|`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|<\/?[A-Z][A-Za-z0-9]*\b|@[a-z-]+|#(?:[0-9a-fA-F]{3,8})\b|\b(?:import|from|export|default|function|const|let|return|type|interface|extends|new|true|false|null|undefined)\b|\b[A-Z][A-Za-z0-9]*\b|\b\d+(?:\.\d+)?\b)/g;

const getCodeTokenClassName = (token: string) => {
  if (token.startsWith('//') || token.startsWith('/*')) return 'code-token code-token--comment';
  if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) return 'code-token code-token--string';
  if (token.startsWith('<') || token.startsWith('@')) return 'code-token code-token--tag';
  if (token.startsWith('#')) return 'code-token code-token--color';
  if (/^\d/.test(token)) return 'code-token code-token--number';
  if (/^(import|from|export|default|function|const|let|return|type|interface|extends|new|true|false|null|undefined)$/.test(token)) {
    return 'code-token code-token--keyword';
  }
  return 'code-token code-token--symbol';
};

const HighlightedCode = ({ code }: { code: string }) => {
  const trimmedCode = code.trim();
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of trimmedCode.matchAll(codeTokenPattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) nodes.push(trimmedCode.slice(lastIndex, index));

    nodes.push(
      <span key={`${token}-${key}`} className={getCodeTokenClassName(token)}>
        {token}
      </span>
    );
    lastIndex = index + token.length;
    key += 1;
  }

  if (lastIndex < trimmedCode.length) nodes.push(trimmedCode.slice(lastIndex));

  return <>{nodes}</>;
};

export const CodeBlock = ({ code, className = 'code-block' }: { code: string; className?: string }) => (
  <pre className={className}>
    <code>
      <HighlightedCode code={code} />
    </code>
  </pre>
);
