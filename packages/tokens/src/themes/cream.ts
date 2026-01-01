/**
 * Cream Theme
 * 화이트-베이지 조합의 따뜻한 라이트 테마
 * gonggu-match 등 밝은 배경 프로젝트용
 */

import { creamColors } from '../colors';
import { typography } from '../typography';
import { spacing } from '../spacing';
import { radius } from '../radius';
import { shadows } from '../shadows';

export const creamTheme = {
  name: 'cream',
  colors: creamColors,
  typography,
  spacing,
  radius,
  shadows,
} as const;

/** CSS 변수 생성 */
export function generateCreamCss(): string {
  const c = creamColors;
  const t = typography;
  const s = spacing;
  const r = radius;
  const sh = shadows;

  return `
:root {
  /* Background */
  --bg-main: ${c.bg.main};
  --bg-card: ${c.bg.card};
  --bg-muted: ${c.bg.muted};
  --bg-dark: ${c.bg.dark};

  /* Foreground (Text) */
  --fg-primary: ${c.fg.primary};
  --fg-secondary: ${c.fg.secondary};
  --fg-muted: ${c.fg.muted};

  /* Primary (Brand) */
  --primary: ${c.primary.DEFAULT};
  --primary-dark: ${c.primary.dark};
  --primary-light: ${c.primary.light};

  /* Semantic */
  --success: ${c.success.DEFAULT};
  --success-bg: ${c.success.bg};
  --warning: ${c.warning.DEFAULT};
  --warning-bg: ${c.warning.bg};
  --error: ${c.error.DEFAULT};
  --error-bg: ${c.error.bg};
  --info: ${c.info.DEFAULT};

  /* Border */
  --border-light: ${c.border.light};
  --border-dark: ${c.border.dark};

  /* Tailwind CSS 호환 변수 */
  --background: ${c.bg.main};
  --foreground: ${c.fg.primary};
  --card: ${c.bg.card};
  --muted: ${c.fg.muted};
  --secondary: ${c.fg.secondary};
  --border: ${c.border.light};

  /* Typography */
  --font-sans: ${t.fontFamily.sans};
  --font-mono: ${t.fontFamily.mono};
  --text-xs: ${t.fontSize.xs};
  --text-sm: ${t.fontSize.sm};
  --text-base: ${t.fontSize.base};
  --text-lg: ${t.fontSize.lg};
  --text-xl: ${t.fontSize.xl};
  --text-2xl: ${t.fontSize['2xl']};
  --text-3xl: ${t.fontSize['3xl']};

  /* Spacing */
  --spacing-xs: ${s.xs};
  --spacing-sm: ${s.sm};
  --spacing-md: ${s.md};
  --spacing-lg: ${s.lg};
  --spacing-xl: ${s.xl};
  --spacing-2xl: ${s['2xl']};
  --spacing-3xl: ${s['3xl']};

  /* Radius */
  --radius-sm: ${r.sm};
  --radius-md: ${r.md};
  --radius-lg: ${r.lg};
  --radius-xl: ${r.xl};
  --radius-full: ${r.full};

  /* Shadow */
  --shadow-sm: ${sh.sm};
  --shadow-md: ${sh.md};
  --shadow-lg: ${sh.lg};
  --shadow-dark: ${sh.dark};

  /* Transition */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
`.trim();
}

export type CreamTheme = typeof creamTheme;
