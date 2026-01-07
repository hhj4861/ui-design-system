# Breaking Change Rules

디자인 시스템에서 Breaking Change를 방지하기 위한 규칙입니다.

## 절대 금지 사항

### 1. Export 경로 변경 금지

```typescript
// 기존 경로
import { Button } from '@studio-ui/react';
import { GlassCard } from '@studio-ui/react/components/stockpulse';

// 이 경로는 절대 변경하지 않음
```

### 2. Props 변경 금지

```typescript
// 금지: required → optional 변경
interface ButtonProps {
  variant: string;  // ❌ 기존이 required면 유지
}

// 금지: 이름 변경
interface ButtonProps {
  buttonVariant?: string;  // ❌ variant → buttonVariant 금지
}

// 금지: 타입 변경
interface ButtonProps {
  size?: number;  // ❌ 기존이 string이면 변경 금지
}
```

### 3. 컴포넌트 이름 변경/삭제 금지

```typescript
// 금지
export { PrimaryButton as Button };  // ❌ Button → PrimaryButton
export { GlassCard };                 // ❌ 삭제 금지
```

### 4. CSS 변수 이름 변경 금지

```css
/* 금지 */
--bg-color: #fff;      /* ❌ --background → --bg-color */
--text-color: #000;    /* ❌ --foreground → --text-color */
```

### 5. variant 옵션 제거 금지

```typescript
// 금지
const buttonVariants = cva("...", {
  variants: {
    variant: {
      default: "...",
      // primary: "...",  ❌ 기존 옵션 제거 금지
    },
  },
});
```

---

## 허용되는 변경

### 1. 새 optional Props 추가

```typescript
interface ButtonProps {
  variant?: "default" | "primary";  // 기존
  loading?: boolean;                 // ✅ 새 optional prop
  iconLeft?: React.ReactNode;        // ✅ 새 optional prop
}
```

### 2. 새 variant 옵션 추가

```typescript
const buttonVariants = cva("...", {
  variants: {
    variant: {
      default: "...",
      primary: "...",
      secondary: "...",  // ✅ 새 옵션 추가
    },
  },
});
```

### 3. 새 컴포넌트 추가

```typescript
// ✅ 새 파일 생성
// components/ui/dropdown.tsx
export const Dropdown = () => { ... };

// ✅ index.ts에 export 추가
export { Dropdown } from './dropdown';
```

### 4. 새 CSS 변수 추가

```css
:root {
  --background: #fff;      /* 기존 유지 */
  --foreground: #000;      /* 기존 유지 */
  --success: #22c55e;      /* ✅ 새 변수 추가 */
}
```

### 5. 새 테마 추가

```typescript
// ✅ themes/newtheme.ts 생성
export const newthemeTheme = { ... };

// ✅ themes/index.ts에 추가
export * from './newtheme';
```

---

## 변경 전 확인 체크리스트

작업 전 반드시 확인:

```
[ ] 기존 export 경로가 유지되는가?
[ ] 기존 Props가 그대로인가?
[ ] 새 Props는 optional인가?
[ ] 기존 컴포넌트 이름이 유지되는가?
[ ] 기존 CSS 변수가 유지되는가?
[ ] 기존 variant 옵션이 유지되는가?
```

---

## 버전 관리 가이드

### Patch (0.0.x)
- 버그 수정
- 문서 수정
- 내부 리팩토링 (API 변경 없음)

### Minor (0.x.0)
- 새 컴포넌트 추가
- 새 Props 추가 (optional)
- 새 variant 추가
- 새 테마 추가

### Major (x.0.0)
- Breaking changes (최대한 피할 것)
- Props 변경/제거
- 컴포넌트 제거
- export 경로 변경

---

## 긴급 상황 대처

만약 Breaking Change가 불가피한 경우:

1. **마이그레이션 가이드 작성**
2. **Deprecation 기간 제공** (최소 1 minor 버전)
3. **CHANGELOG에 명확히 기록**

```typescript
/**
 * @deprecated Use `NewComponent` instead. Will be removed in v2.0.0
 */
export const OldComponent = () => { ... };
```
