/**
 * Studio UI Design System - Color Tokens
 * Converted from Python tokens.py
 */

/** Studio Gold 테마 색상 (기존) */
export const studioColors = {
  // 배경
  bg: {
    main: '#f7f4f0',
    card: '#fffdfb',
    muted: '#faf8f5',
    dark: '#2d251f',
  },

  // 텍스트
  fg: {
    primary: '#2d251f',
    secondary: '#5c4a3d',
    muted: '#8b7355',
  },

  // 브랜드 (Gold)
  primary: {
    DEFAULT: '#c9a87c',
    dark: '#b8976b',
    light: '#d4b88a',
  },

  // 시맨틱
  success: {
    DEFAULT: '#4a9d6b',
    bg: '#e8f5ed',
  },
  warning: {
    DEFAULT: '#ffc107',
    bg: '#fffbeb',
  },
  error: {
    DEFAULT: '#dc3545',
    bg: '#fef2f2',
  },
  info: {
    DEFAULT: '#fd7e14',
  },

  // 테두리
  border: {
    light: '#e8e2d9',
    dark: '#d9d2c9',
  },
} as const;

/** SpeedClinic 테마 색상 (신규) */
export const speedClinicColors = {
  // 배경 (OKLCH 기반)
  bg: {
    main: 'oklch(1 0 0)',           // White
    card: 'oklch(1 0 0)',
    muted: 'oklch(0.97 0 0)',
    dark: 'oklch(0.145 0 0)',
  },

  // 텍스트
  fg: {
    primary: 'oklch(0.145 0 0)',    // Dark gray
    secondary: 'oklch(0.556 0 0)',
    muted: 'oklch(0.708 0 0)',
  },

  // 브랜드 (Black + Mint)
  primary: {
    DEFAULT: 'oklch(0.205 0 0)',    // Black
    foreground: 'oklch(0.985 0 0)', // White
  },

  // Mint 액센트
  mint: {
    DEFAULT: '#48f08b',
    light: '#e8fdf0',
    dark: '#2ed573',
  },

  // 시맨틱
  success: {
    DEFAULT: '#4a9d6b',
    bg: '#e8f5ed',
  },
  warning: {
    DEFAULT: '#ffc107',
    bg: '#fffbeb',
  },
  error: {
    DEFAULT: 'oklch(0.577 0.245 27.325)',
    bg: '#fef2f2',
  },
  info: {
    DEFAULT: '#fd7e14',
  },

  // 테두리
  border: {
    light: 'oklch(0.922 0 0)',
    dark: 'oklch(0.85 0 0)',
  },

  // 차트 색상
  chart: {
    1: 'oklch(0.646 0.222 41.116)',
    2: 'oklch(0.6 0.118 184.704)',
    3: 'oklch(0.398 0.07 227.392)',
    4: 'oklch(0.828 0.189 84.429)',
    5: 'oklch(0.769 0.188 70.08)',
  },

  // 사이드바
  sidebar: {
    DEFAULT: 'oklch(0.985 0 0)',
    foreground: 'oklch(0.145 0 0)',
    primary: 'oklch(0.205 0 0)',
    primaryForeground: 'oklch(0.985 0 0)',
    accent: 'oklch(0.97 0 0)',
    accentForeground: 'oklch(0.205 0 0)',
    border: 'oklch(0.922 0 0)',
    ring: 'oklch(0.708 0 0)',
  },
} as const;

export type StudioColors = typeof studioColors;
export type SpeedClinicColors = typeof speedClinicColors;
