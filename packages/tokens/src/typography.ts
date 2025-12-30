/**
 * Studio UI Design System - Typography Tokens
 */

export const typography = {
  // 폰트 패밀리
  fontFamily: {
    sans: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Geist Mono', 'Fira Code', Consolas, monospace",
  },

  // 폰트 크기
  fontSize: {
    xs: '0.625rem',    // 10px
    sm: '0.75rem',     // 12px
    base: '0.875rem',  // 14px
    lg: '1rem',        // 16px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.75rem',  // 28px
    '4xl': '2rem',     // 32px
    '5xl': '2.5rem',   // 40px
  },

  // 폰트 굵기
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 줄 높이
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // 자간
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
} as const;

export type Typography = typeof typography;
