/**
 * Deep Tech Glow Theme
 * 다크 배경 + 베이지 글로우 + 그라디언트 보더
 * SaaS, AI, 개발툴에 최적화된 미래지향적 테마
 */

import { deepTechGlowColors } from '../colors';
import { typography } from '../typography';
import { spacing } from '../spacing';
import { radius } from '../radius';
import { deepTechGlowShadows } from '../shadows';

export const deepTechGlowTheme = {
  name: 'deep-tech-glow',
  colors: deepTechGlowColors,
  typography,
  spacing,
  radius,
  shadows: deepTechGlowShadows,
} as const;

/** CSS 변수 생성 - Deep Tech Glow */
export function generateDeepTechGlowCss(): string {
  const c = deepTechGlowColors;
  const t = typography;
  const s = spacing;
  const r = radius;
  const sh = deepTechGlowShadows;

  return `
/*
 * Deep Tech Glow Theme
 * 다크 배경 + 베이지 글로우 + 그라디언트 보더
 */

:root {
  /* Base Radius */
  --radius: 0.5rem;

  /* Background - Deep dark tones */
  --background: ${c.bg.main};
  --surface: ${c.bg.surface};
  --foreground: ${c.fg.primary};

  /* Card & Popover */
  --card: ${c.bg.card};
  --card-foreground: ${c.fg.primary};
  --popover: ${c.bg.card};
  --popover-foreground: ${c.fg.primary};

  /* Primary - Beige Glow */
  --primary: ${c.primary.DEFAULT};
  --primary-foreground: ${c.primary.foreground};

  /* Secondary */
  --secondary: ${c.bg.elevated};
  --secondary-foreground: ${c.fg.primary};

  /* Muted */
  --muted: ${c.bg.muted};
  --muted-foreground: ${c.fg.secondary};

  /* Accent - Beige tinted */
  --accent: ${c.bg.elevated};
  --accent-foreground: ${c.primary.DEFAULT};

  /* Glow Colors */
  --glow: ${c.glow.DEFAULT};
  --glow-light: ${c.glow.light};
  --glow-dark: ${c.glow.dark};

  /* Semantic */
  --destructive: ${c.error.DEFAULT};
  --success: ${c.success.DEFAULT};
  --success-bg: ${c.success.bg};
  --warning: ${c.warning.DEFAULT};
  --warning-bg: ${c.warning.bg};
  --error: ${c.error.DEFAULT};
  --error-bg: ${c.error.bg};
  --info: ${c.info.DEFAULT};
  --info-bg: ${c.info.bg};

  /* Border & Input */
  --border: ${c.border.light};
  --input: ${c.bg.elevated};
  --ring: ${c.sidebar.ring};

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
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 4px);
  --radius-xl: calc(var(--radius) + 8px);
  --radius-2xl: calc(var(--radius) + 12px);

  /* Shadows (Glow Effects) */
  --shadow-sm: ${sh.sm};
  --shadow-md: ${sh.md};
  --shadow-lg: ${sh.lg};
  --shadow-glow: ${sh.glow};
  --shadow-glow-strong: ${sh.glowStrong};
}

/* Light mode override */
.light {
  --background: #F8F6F3;
  --surface: #FFFFFF;
  --foreground: #0B0E14;
  --card: #FFFFFF;
  --card-foreground: #0B0E14;
  --popover: #FFFFFF;
  --popover-foreground: #0B0E14;
  --primary: ${c.primary.DEFAULT};
  --primary-foreground: #FFFFFF;
  --secondary: #F0EBE5;
  --secondary-foreground: #0B0E14;
  --muted: #F0EBE5;
  --muted-foreground: #64748B;
  --accent: #F0EBE5;
  --accent-foreground: ${c.primary.DEFAULT};
  --border: ${c.border.dark};
  --input: #F0EBE5;
  --sidebar: #FFFFFF;
  --sidebar-foreground: #0B0E14;
  --sidebar-primary: ${c.primary.DEFAULT};
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #F0EBE5;
  --sidebar-accent-foreground: ${c.primary.DEFAULT};
  --sidebar-border: ${c.border.dark};
}
`.trim();
}

/** Deep Tech Glow 유틸리티 CSS */
export function generateDeepTechGlowUtilities(): string {
  return `
/* Deep Tech Glow Utility Classes */

/* Glow Effects */
.glow {
  box-shadow: 0 0 20px rgba(168, 137, 108, 0.3);
}
.glow-sm {
  box-shadow: 0 0 10px rgba(168, 137, 108, 0.2);
}
.glow-lg {
  box-shadow: 0 0 40px rgba(168, 137, 108, 0.4);
}
.glow-text {
  text-shadow: 0 0 20px rgba(168, 137, 108, 0.5);
}

/* Gradient Border */
.gradient-border {
  position: relative;
  background: var(--card);
  border-radius: var(--radius);
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, #a8896c, #c9a87c, #8b7355);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

/* Glass Effect */
.glass {
  background: rgba(21, 25, 34, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(168, 137, 108, 0.1);
}

/* Surface Elevation */
.surface-1 { background: #151922; }
.surface-2 { background: #1E2330; }
.surface-3 { background: #262D3D; }

/* Animated Glow */
.glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 137, 108, 0.3); }
  50% { box-shadow: 0 0 30px rgba(168, 137, 108, 0.5); }
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #a8896c, #c9a87c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gradient Button */
.btn-gradient {
  background: linear-gradient(135deg, #a8896c, #c9a87c);
  color: #0B0E14;
  border: none;
  transition: all 0.3s ease;
}
.btn-gradient:hover {
  box-shadow: 0 0 20px rgba(168, 137, 108, 0.4);
  transform: translateY(-1px);
}

/* Outline Glow Button */
.btn-outline-glow {
  background: transparent;
  border: 1px solid rgba(168, 137, 108, 0.4);
  color: #a8896c;
  transition: all 0.3s ease;
}
.btn-outline-glow:hover {
  border-color: #a8896c;
  box-shadow: 0 0 15px rgba(168, 137, 108, 0.3);
}

/* Card with Glow */
.card-glow {
  background: #151922;
  border: 1px solid rgba(168, 137, 108, 0.15);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}
.card-glow:hover {
  border-color: rgba(168, 137, 108, 0.3);
  box-shadow: 0 0 30px rgba(168, 137, 108, 0.15);
}
`.trim();
}

export type DeepTechGlowTheme = typeof deepTechGlowTheme;
