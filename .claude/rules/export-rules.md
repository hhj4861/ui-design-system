# Export Rules

Studio UI의 모듈 export 규칙입니다.

## Export 계층 구조

```
@studio-ui/react
├── '.'                       # 메인 컴포넌트
├── './components/ui'         # 공통 UI
├── './components/auth'       # 인증 컴포넌트
├── './components/speedclinic' # SpeedClinic 전용
├── './components/stockpulse'  # StockPulse 전용
├── './providers'             # Provider 컴포넌트
└── './lib/utils'             # 유틸리티

@studio-ui/tokens
├── '.'                       # 토큰 export
├── './themes'                # 테마 모듈
└── './css/{theme}.css'       # CSS 파일
```

---

## 메인 Export (src/index.ts)

자주 사용하는 컴포넌트만 메인에서 export:

```typescript
// src/index.ts

// 기본 UI 컴포넌트
export { Button, type ButtonProps } from './components/ui/button';
export { Input, type InputProps } from './components/ui/input';
export { Card, type CardProps } from './components/ui/card';
export { Skeleton } from './components/ui/skeleton';

// Provider
export { ThemeProvider } from './providers/theme-provider';

// 유틸리티
export { cn } from './lib/utils';
```

---

## 카테고리별 Export

### components/ui/index.ts

모든 UI 컴포넌트를 export:

```typescript
// 기본 컴포넌트
export { Button, type ButtonProps, buttonVariants } from './button';
export { Input, type InputProps } from './input';
export { Card, type CardProps } from './card';

// Form 관련
export { Form, FormField, FormItem, FormLabel, FormMessage } from './form';
export { Label, type LabelProps } from './label';

// Overlay
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';

// Layout
export { Separator } from './separator';
export { Skeleton } from './skeleton';
export { Badge, type BadgeProps, badgeVariants } from './badge';

// 추가 컴포넌트
export { Progress, type ProgressProps } from './progress';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './sheet';
```

### components/stockpulse/index.ts

프로젝트 전용 컴포넌트:

```typescript
// Layout
export { GlassCard, type GlassCardProps } from './glass-card';
export { CategoryCard, type CategoryCardProps } from './category-card';

// Score & Progress
export { ScoreCircle, type ScoreCircleProps } from './score-circle';
export { ScoreBar, type ScoreBarProps } from './score-bar';
export { GradeBadge, type GradeBadgeProps } from './grade-badge';

// Data Display
export { StatGrid, type StatGridProps } from './stat-grid';
export { PriceDisplay, type PriceDisplayProps } from './price-display';
export { VerdictBadge, type VerdictBadgeProps } from './verdict-badge';

// Animation
export { Marquee, type MarqueeProps } from './marquee';

// Analysis Components
export { SixLensNav, defaultLensItems, type SixLensNavProps } from './six-lens-nav';
export { ScoreDashboard, type ScoreDashboardProps } from './score-dashboard';
export { StrategyCard, type StrategyCardProps } from './strategy-card';
export { AnalysisCard, type AnalysisCardProps } from './analysis-card';

// Theme utilities
export { stockpulseTheme, getScoreGrade, getScoreColor } from './theme';
```

---

## Export 규칙

### 1. 컴포넌트와 타입 함께 export

```typescript
// ✅ 올바름
export { Button, type ButtonProps } from './button';

// ❌ 타입 누락
export { Button } from './button';
```

### 2. Variants도 export

```typescript
// ✅ variants 사용 가능하게
export { Button, buttonVariants } from './button';
```

### 3. Named export 사용

```typescript
// ✅ Named export
export { Button } from './button';

// ❌ Default export
export { default as Button } from './button';
```

### 4. Re-export 패턴

```typescript
// ✅ 명시적 re-export
export { Button } from './button';
export { Input } from './input';

// ⚠️ 와일드카드 (파일이 많을 때만)
export * from './button';
```

---

## package.json exports 설정

### @studio-ui/react

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./components/ui": {
      "types": "./dist/components/ui/index.d.ts",
      "import": "./dist/components/ui/index.js"
    },
    "./components/auth": {
      "types": "./dist/components/auth/index.d.ts",
      "import": "./dist/components/auth/index.js"
    },
    "./components/speedclinic": {
      "types": "./dist/components/speedclinic/index.d.ts",
      "import": "./dist/components/speedclinic/index.js"
    },
    "./components/stockpulse": {
      "types": "./dist/components/stockpulse/index.d.ts",
      "import": "./dist/components/stockpulse/index.js"
    },
    "./providers": {
      "types": "./dist/providers/index.d.ts",
      "import": "./dist/providers/index.js"
    },
    "./lib/utils": {
      "types": "./dist/lib/utils.d.ts",
      "import": "./dist/lib/utils.js"
    }
  }
}
```

### @studio-ui/tokens

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./themes": {
      "types": "./dist/themes/index.d.ts",
      "import": "./dist/themes/index.js"
    },
    "./css/studio.css": "./dist/css/studio.css",
    "./css/cream.css": "./dist/css/cream.css",
    "./css/speedclinic.css": "./dist/css/speedclinic.css",
    "./css/stockpulse.css": "./dist/css/stockpulse.css"
  }
}
```

---

## 새 경로 추가 시

1. 컴포넌트/모듈 파일 생성
2. 해당 index.ts에 export 추가
3. package.json exports에 경로 추가 (새 카테고리인 경우)
4. 빌드 및 테스트
