import React from 'react';

export interface ConfigProviderProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Optional CSS variable overrides. Keep this small and semantic; the token
   * package remains the source of truth.
   */
  theme?: Partial<{
    primary: string;
    background: string;
    surface: string;
    text: string;
    radius: string;
  }>;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, className, style, theme }) => {
  const themeStyle = {
    ...(theme?.primary ? { '--cinna-color-primary': theme.primary } : null),
    ...(theme?.background ? { '--cinna-color-bg': theme.background } : null),
    ...(theme?.surface ? { '--cinna-color-surface': theme.surface } : null),
    ...(theme?.text ? { '--cinna-color-text': theme.text } : null),
    ...(theme?.radius ? { '--cinna-radius-md': theme.radius } : null),
    ...style,
  } as React.CSSProperties;

  return (
    <div data-cinna-theme="cloud" className={className} style={themeStyle}>
      {children}
    </div>
  );
};

ConfigProvider.displayName = 'ConfigProvider';
