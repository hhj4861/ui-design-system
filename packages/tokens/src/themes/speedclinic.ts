/**
 * SpeedClinic Theme
 * Black + Mint 브랜드 색상 (OKLCH 기반)
 */

import { speedClinicColors } from '../colors';
import { typography } from '../typography';
import { spacing } from '../spacing';
import { radius } from '../radius';
import { speedClinicShadows } from '../shadows';

export const speedClinicTheme = {
  name: 'speedclinic',
  colors: speedClinicColors,
  typography,
  spacing,
  radius,
  shadows: speedClinicShadows,
} as const;

/** CSS 변수 생성 - SpeedClinic 전용 */
export function generateSpeedClinicCss(): string {
  const c = speedClinicColors;
  const t = typography;
  const s = spacing;
  const r = radius;
  const sh = speedClinicShadows;

  return `
:root {
  /* Base Radius */
  --radius: 0.625rem;

  /* Background */
  --background: ${c.bg.main};
  --foreground: ${c.fg.primary};
  --card: ${c.bg.card};
  --card-foreground: ${c.fg.primary};
  --popover: ${c.bg.card};
  --popover-foreground: ${c.fg.primary};

  /* Primary (Black) */
  --primary: ${c.primary.DEFAULT};
  --primary-foreground: ${c.primary.foreground};

  /* Secondary */
  --secondary: ${c.bg.muted};
  --secondary-foreground: ${c.primary.DEFAULT};

  /* Muted */
  --muted: ${c.bg.muted};
  --muted-foreground: ${c.fg.secondary};

  /* Accent */
  --accent: ${c.bg.muted};
  --accent-foreground: ${c.primary.DEFAULT};

  /* SpeedClinic Mint */
  --mint: ${c.mint.DEFAULT};
  --mint-light: ${c.mint.light};
  --mint-dark: ${c.mint.dark};

  /* Semantic */
  --destructive: ${c.error.DEFAULT};
  --success: ${c.success.DEFAULT};
  --success-bg: ${c.success.bg};
  --warning: ${c.warning.DEFAULT};
  --warning-bg: ${c.warning.bg};
  --error: ${c.error.DEFAULT};
  --error-bg: ${c.error.bg};
  --info: ${c.info.DEFAULT};

  /* Border & Input */
  --border: ${c.border.light};
  --input: ${c.border.light};
  --ring: oklch(0.708 0 0);

  /* Chart Colors */
  --chart-1: ${c.chart[1]};
  --chart-2: ${c.chart[2]};
  --chart-3: ${c.chart[3]};
  --chart-4: ${c.chart[4]};
  --chart-5: ${c.chart[5]};

  /* Sidebar */
  --sidebar: ${c.sidebar.DEFAULT};
  --sidebar-foreground: ${c.sidebar.foreground};
  --sidebar-primary: ${c.sidebar.primary};
  --sidebar-primary-foreground: ${c.sidebar.primaryForeground};
  --sidebar-accent: ${c.sidebar.accent};
  --sidebar-accent-foreground: ${c.sidebar.accentForeground};
  --sidebar-border: ${c.sidebar.border};
  --sidebar-ring: ${c.sidebar.ring};

  /* Typography */
  --font-sans: ${t.fontFamily.sans};
  --font-mono: ${t.fontFamily.mono};

  /* Spacing */
  --spacing-xs: ${s.xs};
  --spacing-sm: ${s.sm};
  --spacing-md: ${s.md};
  --spacing-lg: ${s.lg};
  --spacing-xl: ${s.xl};

  /* Radius */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);

  /* Shadow */
  --shadow-sm: ${sh.sm};
  --shadow-md: ${sh.md};
  --shadow-lg: ${sh.lg};
}

/* Dark Mode */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
`.trim();
}

export type SpeedClinicTheme = typeof speedClinicTheme;
