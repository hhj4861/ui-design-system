/**
 * StockPulse Theme - Dark Violet
 * stock-analyzer 프로젝트 스타일
 *
 * 색상 조합:
 * - 배경: #09090b (매우 어두운 다크)
 * - 액센트: #8b5cf6 (Violet)
 * - 텍스트: #fafafa (화이트)
 * - Glass morphism 효과
 */

import { typography } from '../typography';
import { spacing } from '../spacing';
import { radius } from '../radius';

/** StockPulse 전용 색상 팔레트 */
export const stockpulseColors = {
  // 배경
  bg: {
    main: '#09090b',
    card: '#0a0a0c',
    muted: '#18181b',
    glass: 'rgba(15, 15, 18, 0.8)',
    glassSolid: 'rgba(15, 15, 18, 0.95)',
  },
  // 전경 (텍스트)
  fg: {
    primary: '#fafafa',
    secondary: '#a1a1aa',
    muted: '#71717a',
  },
  // 브랜드 컬러 (Violet)
  violet: {
    DEFAULT: '#8b5cf6',
    light: '#a78bfa',
    dark: '#7c3aed',
    glow: 'rgba(139, 92, 246, 0.5)',
  },
  // Semantic
  success: {
    DEFAULT: '#22c55e',
    light: '#10b981',
  },
  warning: {
    DEFAULT: '#f59e0b',
    light: '#fbbf24',
  },
  error: {
    DEFAULT: '#ef4444',
    light: '#f97316',
  },
  info: {
    DEFAULT: '#3b82f6',
  },
  // 보더
  border: {
    DEFAULT: '#27272a',
    light: 'rgba(255, 255, 255, 0.05)',
    violet: 'rgba(139, 92, 246, 0.2)',
  },
  // 차트
  chart: {
    1: '#8b5cf6', // violet
    2: '#22c55e', // green
    3: '#fbbf24', // amber
    4: '#ec4899', // pink
    5: '#ef4444', // red
  },
  // 사이드바
  sidebar: {
    DEFAULT: '#09090b',
    foreground: '#fafafa',
    primary: '#8b5cf6',
    primaryForeground: '#fafafa',
    accent: '#18181b',
    accentForeground: '#fafafa',
    border: '#27272a',
    ring: '#8b5cf6',
  },
} as const;

/** StockPulse 테마 객체 */
export const stockpulseTheme = {
  name: 'stockpulse',
  variant: 'dark-violet',
  colors: stockpulseColors,
  typography,
  spacing,
  radius,
} as const;

/** CSS 변수 생성 - StockPulse Dark Violet */
export function generateStockpulseCss(): string {
  const c = stockpulseColors;
  const t = typography;
  const s = spacing;

  return `
/* StockPulse Theme - Dark Violet */
.theme-stockpulse,
[data-theme="stockpulse"] {
  /* Base Radius */
  --radius: 0.75rem;

  /* Background */
  --background: ${c.bg.main};
  --foreground: ${c.fg.primary};
  --card: ${c.bg.card};
  --card-foreground: ${c.fg.primary};
  --popover: ${c.bg.card};
  --popover-foreground: ${c.fg.primary};

  /* Primary (Violet) */
  --primary: ${c.violet.DEFAULT};
  --primary-foreground: ${c.fg.primary};

  /* Secondary */
  --secondary: ${c.bg.muted};
  --secondary-foreground: ${c.fg.primary};

  /* Muted */
  --muted: ${c.bg.muted};
  --muted-foreground: ${c.fg.secondary};

  /* Accent (Violet) */
  --accent: ${c.violet.DEFAULT};
  --accent-foreground: ${c.fg.primary};

  /* Semantic */
  --destructive: ${c.error.DEFAULT};
  --success: ${c.success.DEFAULT};
  --warning: ${c.warning.DEFAULT};
  --error: ${c.error.DEFAULT};
  --info: ${c.info.DEFAULT};

  /* Border & Input */
  --border: ${c.border.DEFAULT};
  --input: ${c.bg.muted};
  --ring: ${c.violet.DEFAULT};

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

  /* StockPulse 전용 */
  --glass-bg: ${c.bg.glass};
  --glass-bg-solid: ${c.bg.glassSolid};
  --glass-border: ${c.border.light};
  --violet-glow: ${c.violet.glow};

  color-scheme: dark;
}
`.trim();
}

/** Glass Morphism 유틸리티 CSS */
export function generateStockpulseUtilities(): string {
  return `
/* StockPulse Utilities */

/* Glass Card */
.glass-card {
  background: var(--glass-bg-solid, rgba(15, 15, 18, 0.95));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.05));
  border-radius: var(--radius-lg);
  transition: border-color 0.2s;
}

@media (min-width: 768px) {
  .glass-card {
    background: var(--glass-bg, rgba(15, 15, 18, 0.8));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

.glass-card:hover {
  border-color: rgba(139, 92, 246, 0.2);
}

/* Glow Effects */
.text-glow-violet {
  text-shadow:
    0 0 8px rgba(139, 92, 246, 0.8),
    0 0 16px rgba(139, 92, 246, 0.5),
    0 0 24px rgba(139, 92, 246, 0.3);
}

/* Marquee Animation */
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee-scroll 25s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

/* Scrollbar */
.theme-stockpulse ::-webkit-scrollbar,
[data-theme="stockpulse"] ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.theme-stockpulse ::-webkit-scrollbar-track,
[data-theme="stockpulse"] ::-webkit-scrollbar-track {
  background: transparent;
}

.theme-stockpulse ::-webkit-scrollbar-thumb,
[data-theme="stockpulse"] ::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 4px;
}

.theme-stockpulse ::-webkit-scrollbar-thumb:hover,
[data-theme="stockpulse"] ::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}
`.trim();
}

export type StockPulseTheme = typeof stockpulseTheme;
export type StockPulseColors = typeof stockpulseColors;
