export const buttonThemes = {
  sky: {
    color: '#2f3542',
    backgroundColor: '#a8dff1',
    borderColor: 'rgba(61, 142, 170, 0.28)',
    shadow: '0 5px 0 #6bbbd7',
    activeShadow: '0 2px 0 #6bbbd7',
  },
  butter: {
    color: '#3b2c25',
    backgroundColor: '#f6c96d',
    borderColor: 'rgba(126, 84, 31, 0.18)',
    shadow: '0 5px 0 #dca94e',
    activeShadow: '0 2px 0 #dca94e',
  },
  berry: {
    color: '#fff8f8',
    backgroundColor: '#df6677',
    borderColor: 'rgba(152, 54, 72, 0.24)',
    shadow: '0 5px 0 #b84d5d',
    activeShadow: '0 2px 0 #b84d5d',
  },
  mint: {
    color: '#263a30',
    backgroundColor: '#9bcb8e',
    borderColor: 'rgba(74, 130, 79, 0.24)',
    shadow: '0 5px 0 #72b866',
    activeShadow: '0 2px 0 #72b866',
  },
  grape: {
    color: '#ffffff',
    backgroundColor: '#7a6ff0',
    borderColor: '#5f56d9',
    shadow: '0 5px 0 #5b52c8',
    activeShadow: '0 2px 0 #5b52c8',
  },
  peach: {
    color: '#4a2f2b',
    backgroundColor: '#ffb199',
    borderColor: 'rgba(202, 108, 83, 0.28)',
    shadow: '0 5px 0 #e48770',
    activeShadow: '0 2px 0 #e48770',
  },
  cream: {
    color: '#46332a',
    backgroundColor: '#fff8ee',
    borderColor: '#e6d6c4',
    shadow: '0 4px 0 #dcc7ad',
    activeShadow: '0 2px 0 #dcc7ad',
  },
  cocoa: {
    color: '#fff8ee',
    backgroundColor: '#7c5746',
    borderColor: 'rgba(70, 51, 42, 0.34)',
    shadow: '0 5px 0 #5d4136',
    activeShadow: '0 2px 0 #5d4136',
  },
  ocean: {
    color: '#f8fdff',
    backgroundColor: '#3d8eaa',
    borderColor: '#2d7189',
    shadow: '0 5px 0 #2d7189',
    activeShadow: '0 2px 0 #2d7189',
  },
  blossom: {
    color: '#5a2d3b',
    backgroundColor: '#ffc8d6',
    borderColor: 'rgba(210, 105, 130, 0.32)',
    shadow: '0 5px 0 #ea8a98',
    activeShadow: '0 2px 0 #ea8a98',
  },
} as const;

export type ButtonThemeName = keyof typeof buttonThemes;

export interface ButtonTheme {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  shadow?: string;
  activeShadow?: string;
}

export type ButtonThemeInput = ButtonThemeName | ButtonTheme;

interface ButtonThemeStyleOptions extends ButtonTheme {
  theme?: ButtonThemeInput;
}

export const resolveButtonTheme = (theme?: ButtonThemeInput): ButtonTheme => {
  if (!theme) return {};
  if (typeof theme === 'string') return buttonThemes[theme] ?? {};
  return theme;
};

export const getButtonThemeStyles = ({
  theme,
  color,
  backgroundColor,
  borderColor,
  shadow,
  activeShadow,
}: ButtonThemeStyleOptions) => {
  const themeStyles = resolveButtonTheme(theme);
  const resolved = theme
    ? {
        color,
        backgroundColor,
        borderColor,
        shadow,
        activeShadow,
        ...themeStyles,
      }
    : {
        color,
        backgroundColor,
        borderColor,
        shadow,
        activeShadow,
      };

  return {
    ...(resolved.color ? { '--button-color': resolved.color } : null),
    ...(resolved.backgroundColor
      ? {
          '--button-bg': resolved.backgroundColor,
          '--button-bg-hover': resolved.backgroundColor,
          '--button-bg-active': resolved.backgroundColor,
        }
      : null),
    ...(resolved.borderColor ? { '--button-border': resolved.borderColor } : null),
    ...(resolved.shadow ? { '--button-shadow': resolved.shadow } : null),
    ...(resolved.activeShadow ? { '--button-shadow-active': resolved.activeShadow } : null),
  };
};
