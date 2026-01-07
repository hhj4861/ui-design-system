# Token Standards

Studio UI 디자인 토큰 작성 표준입니다.

## 디렉토리 구조

```
packages/tokens/
├── src/
│   ├── colors.ts         # 색상 팔레트
│   ├── typography.ts     # 타이포그래피
│   ├── spacing.ts        # 간격
│   ├── radius.ts         # 모서리 반경
│   ├── shadows.ts        # 그림자
│   ├── index.ts          # 통합 export
│   └── themes/           # 프로젝트별 테마
│       ├── studio.ts
│       ├── cream.ts
│       ├── speedclinic.ts
│       ├── stockpulse.ts
│       └── index.ts
│
├── scripts/
│   └── generate-css.js   # CSS 생성 스크립트
│
└── dist/
    ├── index.js          # JS 토큰
    └── css/              # CSS 파일
        ├── studio.css
        ├── cream.css
        ├── speedclinic.css
        └── stockpulse.css
```

## CSS 변수 명명

### 표준 변수

```css
:root {
  /* 배경 */
  --background: #ffffff;
  --foreground: #09090b;

  /* 카드 */
  --card: #ffffff;
  --card-foreground: #09090b;

  /* Primary */
  --primary: #8b5cf6;
  --primary-foreground: #fafafa;

  /* Secondary */
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;

  /* Muted */
  --muted: #f4f4f5;
  --muted-foreground: #71717a;

  /* Accent */
  --accent: #f4f4f5;
  --accent-foreground: #18181b;

  /* Destructive */
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;

  /* Border & Input */
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #8b5cf6;

  /* Radius */
  --radius: 0.5rem;
}
```

### 명명 패턴

```yaml
기본 색상: --{name}
전경색: --{name}-foreground
투명도: --{name}/{opacity}  # Tailwind 문법

예시:
  --primary: #8b5cf6
  --primary-foreground: #fafafa
  bg-primary/50  # 50% 투명도
```

## 테마 파일 구조

```typescript
// themes/{theme-name}.ts

export const themeNameTheme = {
  name: 'theme-name',
  colors: {
    // 필수 색상
    background: '#ffffff',
    foreground: '#09090b',
    card: '#ffffff',
    cardForeground: '#09090b',
    primary: '#your-primary',
    primaryForeground: '#fafafa',
    secondary: '#f4f4f5',
    secondaryForeground: '#18181b',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    accent: '#f4f4f5',
    accentForeground: '#18181b',
    destructive: '#ef4444',
    destructiveForeground: '#fafafa',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#your-primary',
  },
  radius: '0.5rem',
};

export function generateThemeNameCSS(): string {
  const c = themeNameTheme.colors;
  return `:root {
  --background: ${c.background};
  --foreground: ${c.foreground};
  --card: ${c.card};
  --card-foreground: ${c.cardForeground};
  --primary: ${c.primary};
  --primary-foreground: ${c.primaryForeground};
  --secondary: ${c.secondary};
  --secondary-foreground: ${c.secondaryForeground};
  --muted: ${c.muted};
  --muted-foreground: ${c.mutedForeground};
  --accent: ${c.accent};
  --accent-foreground: ${c.accentForeground};
  --destructive: ${c.destructive};
  --destructive-foreground: ${c.destructiveForeground};
  --border: ${c.border};
  --input: ${c.input};
  --ring: ${c.ring};
  --radius: ${themeNameTheme.radius};
}`;
}
```

## 테마 유형

### Light 테마

```typescript
background: '#ffffff',    // 밝은 배경
foreground: '#09090b',    // 어두운 텍스트
card: '#ffffff',
muted: '#f4f4f5',
border: '#e4e4e7',
```

### Dark 테마 (예: stockpulse)

```typescript
background: '#09090b',    // 어두운 배경
foreground: '#fafafa',    // 밝은 텍스트
card: '#0a0a0c',
muted: '#18181b',
border: '#27272a',
```

## CSS 생성 스크립트

### generate-css.js 구조

```javascript
import fs from 'fs';
import path from 'path';
import { generateStudioCSS } from '../dist/themes/studio.js';
import { generateCreamCSS } from '../dist/themes/cream.js';
// ... more imports

const themes = {
  studio: generateStudioCSS,
  cream: generateCreamCSS,
  speedclinic: generateSpeedclinicCSS,
  stockpulse: generateStockpulseCSS,
};

// CSS 디렉토리 생성
const cssDir = path.join(process.cwd(), 'dist', 'css');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

// 각 테마 CSS 생성
for (const [name, generator] of Object.entries(themes)) {
  const css = generator();
  fs.writeFileSync(path.join(cssDir, `${name}.css`), css);
  console.log(`Generated ${name}.css`);
}
```

## 새 테마 추가 체크리스트

```
[ ] themes/{name}.ts 생성
[ ] 테마 객체 정의 ({name}Theme)
[ ] CSS 생성 함수 정의 (generate{Name}CSS)
[ ] themes/index.ts export 추가
[ ] generate-css.js import 및 themes 객체에 추가
[ ] package.json exports 추가
[ ] 빌드 실행: pnpm build:tokens
[ ] CSS 파일 생성 확인: dist/css/{name}.css
```

## 금지 사항

```yaml
금지:
  - 기존 CSS 변수 이름 변경
  - 기존 테마의 색상 값 임의 변경
  - export 경로 변경
  - 필수 CSS 변수 제거

허용:
  - 새 CSS 변수 추가
  - 새 테마 추가
  - 기존 테마에 새 변수 추가 (optional)
```
