---
name: design-system
description: Studio UI 디자인 시스템 스킬. 컴포넌트 생성, 테마 관리, 토큰 정의에 사용한다.
---

# Design System Skill

Studio UI 디자인 시스템을 위한 가이드라인과 템플릿을 제공합니다.

## 패키지 구조

```
packages/
├── tokens/          # @studio-ui/tokens
│   └── src/
│       ├── themes/  # 테마별 CSS 변수
│       └── index.ts
│
└── react/           # @studio-ui/react
    └── src/
        ├── components/
        │   ├── ui/         # 공통 컴포넌트
        │   ├── auth/       # 인증 컴포넌트
        │   ├── speedclinic/ # SpeedClinic 전용
        │   └── stockpulse/  # StockPulse 전용
        ├── providers/
        └── lib/
```

## 테마 목록

| 테마 | 스타일 | Primary | Background |
|------|--------|---------|------------|
| studio | Cream/Beige | `#c9a87c` | `#fafaf9` |
| cream | Tailwind 호환 | `#c9a87c` | `#fdfdf9` |
| speedclinic | Mint 악센트 | `#48f08b` | `#ffffff` |
| stockpulse | Dark Violet | `#8b5cf6` | `#09090b` |

---

## 컴포넌트 작성 템플릿

### 기본 컴포넌트

```tsx
import * as React from "react";
import { cn } from "../../lib/utils";

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary";
}

function ComponentName(
  { className, variant = "default", ...props }: ComponentNameProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        "base-classes",
        variant === "primary" && "primary-classes",
        className
      )}
      {...props}
    />
  );
}

ComponentName.displayName = "ComponentName";

const ForwardedComponentName = React.forwardRef(ComponentName);
export { ForwardedComponentName as ComponentName };
```

### CVA Variant 컴포넌트

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const componentVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        primary: "bg-primary text-primary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

function ComponentName(
  { className, variant, size, ...props }: ComponentNameProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  );
}

ComponentName.displayName = "ComponentName";

const ForwardedComponentName = React.forwardRef(ComponentName);
export { ForwardedComponentName as ComponentName };
```

---

## 테마 작성 템플릿

```typescript
// packages/tokens/src/themes/{theme-name}.ts

export const themeNameTheme = {
  name: 'theme-name',
  colors: {
    background: '#ffffff',
    foreground: '#09090b',
    card: '#ffffff',
    cardForeground: '#09090b',
    primary: '#your-color',
    primaryForeground: '#fafafa',
    secondary: '#f4f4f5',
    secondaryForeground: '#18181b',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    accent: '#your-accent',
    accentForeground: '#18181b',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#your-color',
    radius: '0.5rem',
  },
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
  --border: ${c.border};
  --input: ${c.input};
  --ring: ${c.ring};
  --radius: ${c.radius};
}`;
}
```

---

## StockPulse 스타일 가이드

### Glass Morphism

```typescript
className="
  bg-white/5
  backdrop-blur-md
  border border-white/10
  rounded-xl
"
```

### Glow Effects

```typescript
// Text Glow
className="text-shadow-[0_0_8px_rgba(139,92,246,0.8)]"

// Box Glow
className="shadow-[0_0_20px_rgba(139,92,246,0.5)]"
```

### Score Colors

```typescript
const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return '#22c55e'; // green
  if (percentage >= 60) return '#8b5cf6'; // violet
  if (percentage >= 40) return '#fbbf24'; // amber
  return '#ef4444'; // red
};
```

---

## 빌드 명령어

```bash
# 전체 빌드 (순서 중요!)
pnpm build:tokens && pnpm build:react

# 클린 빌드
pnpm clean && pnpm build:tokens && pnpm build:react

# 개발 모드
pnpm dev
```

## 체크리스트

### 컴포넌트 추가 시

```
[ ] Props 인터페이스 정의 (ComponentNameProps)
[ ] forwardRef 패턴 사용
[ ] displayName 설정
[ ] cn() 유틸리티 사용
[ ] index.ts에 export 추가
[ ] Breaking change 없음 확인
```

### 테마 추가 시

```
[ ] themes/{name}.ts 생성
[ ] generateCSS 함수 정의
[ ] themes/index.ts export 추가
[ ] generate-css.js 테마 목록 추가
[ ] package.json exports 추가
```
