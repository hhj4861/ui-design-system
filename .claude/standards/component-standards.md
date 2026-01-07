# Component Standards

Studio UI 컴포넌트 작성 표준입니다.

## 파일 구조

```
packages/react/src/components/
├── ui/                    # 공통 UI 컴포넌트
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── index.ts          # 모든 컴포넌트 re-export
│
├── auth/                  # 인증 관련
│   ├── login-form.tsx
│   └── index.ts
│
├── speedclinic/           # SpeedClinic 전용
│   └── index.ts
│
└── stockpulse/            # StockPulse 전용
    ├── glass-card.tsx
    ├── score-circle.tsx
    └── index.ts
```

## 명명 규칙

| 항목 | 규칙 | 예시 |
|------|------|------|
| 파일명 | kebab-case | `glass-card.tsx` |
| 컴포넌트명 | PascalCase | `GlassCard` |
| Props 인터페이스 | ComponentNameProps | `GlassCardProps` |
| Variants | componentNameVariants | `buttonVariants` |

## Props 인터페이스

### 기본 패턴

```tsx
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // 추가 props
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
}
```

### CVA Variant 패턴

```tsx
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // 추가 props
  loading?: boolean;
}
```

### 특수 요소 확장

```tsx
// 버튼
extends React.ButtonHTMLAttributes<HTMLButtonElement>

// 입력
extends React.InputHTMLAttributes<HTMLInputElement>

// 링크
extends React.AnchorHTMLAttributes<HTMLAnchorElement>

// 폼
extends React.FormHTMLAttributes<HTMLFormElement>
```

## forwardRef 패턴

```tsx
function ComponentName(
  { className, ...props }: ComponentNameProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={cn("base", className)} {...props} />
  );
}

ComponentName.displayName = "ComponentName";

const ForwardedComponentName = React.forwardRef(ComponentName);
export { ForwardedComponentName as ComponentName };
```

## className 병합

항상 `cn()` 유틸리티 사용:

```tsx
import { cn } from "../../lib/utils";

// 올바른 사용
className={cn("base-class", className)}

// CVA와 함께
className={cn(componentVariants({ variant, size }), className)}
```

## Export 규칙

### index.ts에서 re-export

```tsx
// components/ui/index.ts

// 컴포넌트와 타입 모두 export
export { Button, type ButtonProps } from './button';
export { Card, type CardProps } from './card';
export { Input, type InputProps } from './input';

// variant도 export (필요시)
export { buttonVariants } from './button';
```

### 루트 index.ts

```tsx
// src/index.ts

// 메인 컴포넌트만 re-export
export { Button, Card, Input } from './components/ui';

// 세부 컴포넌트는 하위 경로로
// import { Dialog } from '@studio-ui/react/components/ui'
```

## CSS 클래스 규칙

### Tailwind CSS 우선

```tsx
// 권장
className="flex items-center gap-2 rounded-md bg-primary px-4 py-2"

// 비권장 (인라인 스타일)
style={{ display: 'flex', padding: '8px 16px' }}
```

### CSS 변수 사용

```tsx
// 테마 색상
"bg-background text-foreground"
"bg-primary text-primary-foreground"
"border-border"

// 커스텀 값
"shadow-[0_0_20px_rgba(139,92,246,0.5)]"
```

## 접근성

### 필수 속성

```tsx
// 버튼
<button type="button" aria-label="설명">

// 아이콘 버튼
<button aria-label="메뉴 열기">
  <MenuIcon aria-hidden="true" />
</button>

// 폼 요소
<input id="email" aria-describedby="email-error" />
<span id="email-error" role="alert">에러 메시지</span>
```

## 금지 사항

```yaml
금지:
  - 인라인 스타일 (특수 케이스 제외)
  - !important 사용
  - 직접 DOM 조작
  - useEffect에서 setState 남용
  - any 타입 사용

권장:
  - Tailwind 클래스
  - CSS 변수
  - React.forwardRef
  - 명확한 TypeScript 타입
```
