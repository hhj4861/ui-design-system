/**
 * CSS 파일 생성 스크립트
 * TypeScript에서 CSS 변수 파일을 생성합니다
 */

import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist', 'css');

// 테마 CSS 정의 (빌드 시점에 생성)
const studioCss = `
:root {
  /* Background */
  --bg-main: #f7f4f0;
  --bg-card: #fffdfb;
  --bg-muted: #faf8f5;
  --bg-dark: #2d251f;

  /* Foreground (Text) */
  --fg-primary: #2d251f;
  --fg-secondary: #5c4a3d;
  --fg-muted: #8b7355;

  /* Primary (Brand) */
  --primary: #c9a87c;
  --primary-dark: #b8976b;
  --primary-light: #d4b88a;

  /* Semantic */
  --success: #4a9d6b;
  --success-bg: #e8f5ed;
  --warning: #ffc107;
  --warning-bg: #fffbeb;
  --error: #dc3545;
  --error-bg: #fef2f2;
  --info: #fd7e14;

  /* Border */
  --border-light: #e8e2d9;
  --border-dark: #d9d2c9;

  /* Typography */
  --font-sans: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Geist Mono', 'Fira Code', Consolas, monospace;
  --text-xs: 0.625rem;
  --text-sm: 0.75rem;
  --text-base: 0.875rem;
  --text-lg: 1rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.75rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 2.5rem;
  --spacing-3xl: 3rem;

  /* Radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(201, 168, 124, 0.3);
  --shadow-lg: 0 8px 24px rgba(201, 168, 124, 0.4);
  --shadow-dark: 0 8px 24px rgba(0, 0, 0, 0.08);

  /* Transition */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
`.trim();

const creamCss = `
:root {
  /* Background */
  --bg-main: #fffdfb;
  --bg-card: #faf8f5;
  --bg-muted: #f7f4f0;
  --bg-dark: #2d251f;

  /* Foreground (Text) */
  --fg-primary: #2d251f;
  --fg-secondary: #5c4a3d;
  --fg-muted: #8b7355;

  /* Primary (Brand) */
  --primary: #c9a87c;
  --primary-dark: #b8976b;
  --primary-light: #d4b88a;

  /* Semantic */
  --success: #4a9d6b;
  --success-bg: #e8f5ed;
  --warning: #ffc107;
  --warning-bg: #fffbeb;
  --error: #dc3545;
  --error-bg: #fef2f2;
  --info: #fd7e14;

  /* Border */
  --border-light: #e8e2d9;
  --border-dark: #d9d2c9;

  /* Tailwind CSS 호환 변수 */
  --background: #fffdfb;
  --foreground: #2d251f;
  --card: #faf8f5;
  --muted: #8b7355;
  --secondary: #5c4a3d;
  --border: #e8e2d9;

  /* Typography */
  --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Geist Mono', 'Fira Code', Consolas, monospace;
  --text-xs: 0.625rem;
  --text-sm: 0.75rem;
  --text-base: 0.875rem;
  --text-lg: 1rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.75rem;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 2.5rem;
  --spacing-3xl: 3rem;

  /* Radius */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(201, 168, 124, 0.3);
  --shadow-lg: 0 8px 24px rgba(201, 168, 124, 0.4);
  --shadow-dark: 0 8px 24px rgba(0, 0, 0, 0.08);

  /* Transition */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
`.trim();

const speedClinicCss = `
:root {
  /* Base Radius */
  --radius: 0.625rem;

  /* Background */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* Primary (Black) */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);

  /* Secondary */
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);

  /* Muted */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);

  /* Accent */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);

  /* SpeedClinic Mint */
  --mint: #48f08b;
  --mint-light: #e8fdf0;
  --mint-dark: #2ed573;

  /* Semantic */
  --destructive: oklch(0.577 0.245 27.325);
  --success: #4a9d6b;
  --success-bg: #e8f5ed;
  --warning: #ffc107;
  --warning-bg: #fffbeb;
  --error: oklch(0.577 0.245 27.325);
  --error-bg: #fef2f2;
  --info: #fd7e14;

  /* Border & Input */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Chart Colors */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  /* Sidebar */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  /* Radius */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
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

const stockpulseCss = `
/* StockPulse Theme - Dark Violet */
.theme-stockpulse,
[data-theme="stockpulse"] {
  --radius: 0.75rem;
  --background: #09090b;
  --foreground: #fafafa;
  --card: #0a0a0c;
  --card-foreground: #fafafa;
  --popover: #0a0a0c;
  --popover-foreground: #fafafa;
  --primary: #8b5cf6;
  --primary-foreground: #fafafa;
  --secondary: #18181b;
  --secondary-foreground: #fafafa;
  --muted: #18181b;
  --muted-foreground: #a1a1aa;
  --accent: #8b5cf6;
  --accent-foreground: #fafafa;
  --destructive: #ef4444;
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
  --border: #27272a;
  --input: #18181b;
  --ring: #8b5cf6;
  --chart-1: #8b5cf6;
  --chart-2: #22c55e;
  --chart-3: #fbbf24;
  --chart-4: #ec4899;
  --chart-5: #ef4444;
  --sidebar: #09090b;
  --sidebar-foreground: #fafafa;
  --sidebar-primary: #8b5cf6;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-accent: #18181b;
  --sidebar-accent-foreground: #fafafa;
  --sidebar-border: #27272a;
  --sidebar-ring: #8b5cf6;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --glass-bg: rgba(15, 15, 18, 0.8);
  --glass-bg-solid: rgba(15, 15, 18, 0.95);
  --glass-border: rgba(255, 255, 255, 0.05);
  --violet-glow: rgba(139, 92, 246, 0.5);
  color-scheme: dark;
}

.theme-stockpulse .glass-card,
[data-theme="stockpulse"] .glass-card {
  background: var(--glass-bg-solid);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: border-color 0.2s;
}

@media (min-width: 768px) {
  .theme-stockpulse .glass-card,
  [data-theme="stockpulse"] .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

.theme-stockpulse .glass-card:hover,
[data-theme="stockpulse"] .glass-card:hover {
  border-color: rgba(139, 92, 246, 0.2);
}

.theme-stockpulse .text-glow-violet,
[data-theme="stockpulse"] .text-glow-violet {
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.8), 0 0 16px rgba(139, 92, 246, 0.5);
}

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

async function main() {
  // CSS 디렉토리 생성
  await mkdir(distDir, { recursive: true });

  // CSS 파일 생성
  await writeFile(join(distDir, 'studio.css'), studioCss);
  await writeFile(join(distDir, 'cream.css'), creamCss);
  await writeFile(join(distDir, 'speedclinic.css'), speedClinicCss);
  await writeFile(join(distDir, 'stockpulse.css'), stockpulseCss);

  console.log('CSS files generated successfully!');
  console.log(`  - ${join(distDir, 'studio.css')}`);
  console.log(`  - ${join(distDir, 'cream.css')}`);
  console.log(`  - ${join(distDir, 'speedclinic.css')}`);
  console.log(`  - ${join(distDir, 'stockpulse.css')}`);
}

main().catch(console.error);
