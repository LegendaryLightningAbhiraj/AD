// FOCUSLY custom colours
export const COLORS = {
  background: '#101114',
  surface: '#1B1D23',
  card: '#23252D',
  primary: '#A6F36A',
  text: '#FFFFFF',
  secondary: '#A0A2AC',
  border: '#30323A',
  danger: '#FF6868',
};

// Border radius
export const RADIUS = {
  small: 10,
  medium: 16,
  large: 24,
};

// Shared spacing
export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 24,
  six: 32,
};

// Maximum content width
export const MaxContentWidth = 640;

// Light and dark themes
export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#101114',
    textSecondary: '#666666',
    backgroundElement: '#F0F0F0',
    tint: '#527D28',
    link: '#527D28',
    linkPrimary: '#3C87F7',
  },

  dark: {
    background: COLORS.background,
    text: COLORS.text,
    textSecondary: COLORS.secondary,
    backgroundElement: COLORS.surface,
    tint: COLORS.primary,
    link: COLORS.primary,
    linkPrimary: '#75AFFF',
  },
};

export type ThemeColor = keyof typeof Colors.light;