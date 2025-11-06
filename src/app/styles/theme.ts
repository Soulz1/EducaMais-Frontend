import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#62A59D',
    primaryMid: '#3B7E76',
    primaryLight: '#93C6C0',

    secondary: '#F2994A',
    secondaryLight: '#F9C89A',
    secondaryDark: '#CA7124',

    info: '#2F80ED',
    success: '#27AE60',
    warning: '#E2B93B',
    danger: '#EB5757',

    text: {
      primary: '#000000',
      secondary: '#6B7280',
      muted: '#E0E0E0',
      inverse: '#FFFFFF',
    },

    background: '#F9FAFB',
    surface: '#FFFFFF',
    border: '#E5E7EB',
  },

  typography: {
    fontFamily: "'Tailwind', sans-serif",
    baseFontSize: '16px',

    headings: {
      h1: { fontSize: '56px', lineHeight: '61.6px', fontWeight: 700 },
      h2: { fontSize: '48px', lineHeight: '52.8px', fontWeight: 700 },
      h3: { fontSize: '40px', lineHeight: '44px', fontWeight: 700 },
      h4: { fontSize: '32px', lineHeight: '35.2px', fontWeight: 700 },
      h5: { fontSize: '24px', lineHeight: '26.4px', fontWeight: 700 },
      h6: { fontSize: '20px', lineHeight: '22px', fontWeight: 700 },
    },

    body: {
      largeBold: { fontSize: '20px', lineHeight: '28px', fontWeight: 700 },
      large: { fontSize: '20px', lineHeight: '28px', fontWeight: 400 },

      mediumBold: { fontSize: '18px', lineHeight: '25.2px', fontWeight: 700 },
      medium: { fontSize: '18px', lineHeight: '25.2px', fontWeight: 400 },

      smallBold: { fontSize: '16px', lineHeight: '22.4px', fontWeight: 700 },
      small: { fontSize: '16px', lineHeight: '22.4px', fontWeight: 400 },
    },

    headingWeight: 600,
    bodyWeight: 400,
  },

  spacing: {
    scale: (factor: number) => `${0.25 * factor}rem`,
    levels: {
      '8': '8px',
      '16': '16px',
      '24': '24px',
      '32': '32px',
      '40': '40px',
      '56': '56px',
      '72': '72px',
      '80': '80px',
      '96': '96px',
      '120': '120px',
    },
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.10)',
    lg: '0 10px 15px rgba(0,0,0,0.15)',
    card: '0 8px 20px rgba(16,24,40,0.08)',
  },
};