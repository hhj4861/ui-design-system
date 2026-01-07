# Studio UI Design System

> pnpm 모노레포 기반 멀티 프레임워크 UI 디자인 시스템

## 빠른 참조

```bash
# 설치
pnpm install

# 빌드 (순서 중요!)
pnpm build:tokens && pnpm build:react

# 개발 모드
pnpm dev

# 클린
pnpm clean
```

## 패키지 구조

```
studio-ui/
├── packages/
│   ├── tokens/          # @studio-ui/tokens - 디자인 토큰, CSS 변수
│   │   ├── src/themes/  # 테마별 토큰
│   │   └── scripts/     # CSS 생성 스크립트
│   │
│   └── react/           # @studio-ui/react - React 컴포넌트
│       └── src/
│           ├── components/
│           │   ├── ui/         # 공통 컴포넌트
│           │   ├── auth/       # 인증 컴포넌트
│           │   ├── speedclinic/ # SpeedClinic 전용
│           │   └── stockpulse/  # StockPulse 전용
│           ├── providers/       # ThemeProvider 등
│           └── lib/            # 유틸리티 (cn)
│
├── .claude/             # Claude 설정
│   ├── agents/          # 에이전트 정의
│   ├── skills/          # 스킬 정의
│   ├── standards/       # 표준 문서
│   └── rules/           # 규칙 정의
│
└── scripts/             # 빌드 스크립트
```

## 테마

| 테마 | 스타일 | 주요 색상 | 용도 |
|------|--------|----------|------|
| `studio` | Cream/Beige | `#c9a87c` | 기본 테마 |
| `cream` | Tailwind 호환 | `#c9a87c` | Tailwind 프로젝트 |
| `speedclinic` | Mint 악센트 | `#48f08b` | SpeedClinic |
| `stockpulse` | Dark Violet | `#8b5cf6` | StockPulse (주식 분석) |

## 컴포넌트 Import

```typescript
// 공통 UI
import { Button, Input, Card, Skeleton, Tabs, Sheet } from '@studio-ui/react';
import { Dialog, Form, Label, Progress } from '@studio-ui/react/components/ui';

// 인증
import { LoginForm, SignupForm } from '@studio-ui/react/components/auth';

// 프로젝트별
import { GlassCard, ScoreCircle, SixLensNav } from '@studio-ui/react/components/stockpulse';

// Provider & CSS
import { ThemeProvider } from '@studio-ui/react/providers';
import '@studio-ui/tokens/css/stockpulse.css';
```

## 핵심 규칙

### Breaking Change 방지 (최우선)
- 기존 export 경로 **절대 변경 금지**
- Props 추가는 **optional만** 허용
- 컴포넌트 삭제/이름 변경 금지

### 컴포넌트 작성
- `cn()` 유틸리티로 클래스 병합
- `cva()`로 variant 정의
- `React.forwardRef`로 ref 전달
- Props 인터페이스 명명: `ComponentNameProps`

### 빌드 순서
tokens → react (의존성 순서)

## 기술 스택

- **Package Manager:** pnpm 9.15+
- **Language:** TypeScript 5.7+
- **React:** 18 / 19 호환
- **UI Base:** Radix UI Primitives
- **Styling:** Tailwind CSS, CSS Variables
- **Utilities:** clsx, tailwind-merge, class-variance-authority, lucide-react

## 파일 컨벤션

```
컴포넌트: kebab-case.tsx (button.tsx, glass-card.tsx)
테마: kebab-case.ts (stockpulse.ts)
타입 export: ComponentNameProps
```
