# Studio UI Design System

멀티 프레임워크 디자인 시스템 - Streamlit과 React 모두 지원

## 패키지 구조

```
packages/
├── tokens/      # @studio-ui/tokens - 공유 디자인 토큰
├── react/       # @studio-ui/react - React UI 컴포넌트
└── streamlit/   # studio-ui (Python) - Streamlit 컴포넌트
```

## 설치

### React 프로젝트

```bash
# ui-design-system 디렉토리에서
pnpm install

# 빌드
pnpm build
```

### Python/Streamlit 프로젝트

```bash
pip install -e ./packages/streamlit
```

---

## React 사용법

### 1. SpeedClinic에서 의존성 추가

**package.json:**

```json
{
  "dependencies": {
    "@studio-ui/tokens": "file:../ui-design-system/packages/tokens",
    "@studio-ui/react": "file:../ui-design-system/packages/react",
    "@studio-core/react": "file:../studio-core/packages/react"
  }
}
```

### 2. CSS 토큰 import

**globals.css:**

```css
@import "tailwindcss";
@import "@studio-ui/tokens/css/speedclinic.css";
```

### 3. 컴포넌트 사용

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from '@studio-ui/react';

function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>환영합니다</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="mint">새로운 기능</Badge>
        <Button variant="mint">시작하기</Button>
      </CardContent>
    </Card>
  );
}
```

### 4. 인증 통합

**providers.tsx:**

```tsx
'use client';

import { AuthProvider } from '@studio-core/react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider supabaseClient={supabase}>
      {children}
    </AuthProvider>
  );
}
```

**로그인 페이지:**

```tsx
import { useAuth } from '@studio-core/react';
import { LoginForm } from '@studio-ui/react';

function LoginPage() {
  const { signIn, isLoading, error } = useAuth();

  return (
    <LoginForm
      onSubmit={signIn}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

---

## Streamlit 사용법

```python
import streamlit as st
from studio_ui import apply_theme, PricingPlan, pricing_card

# 테마 적용
apply_theme()

# 가격 카드
plan = PricingPlan("Pro", "9,900", features=["무제한 매칭"], is_recommended=True)
if pricing_card(plan):
    st.success("Pro 선택됨!")
```

### studio-core와 함께 사용

```python
from studio_ui.components import login_form, logout_button
from studio_core.auth.streamlit import login, logout

# 로그인
result = login_form()
if result.submitted:
    login(result.email, result.password)

# 로그아웃
if logout_button():
    logout()
```

---

## 테마

### SpeedClinic 테마 (Black + Mint)

- Primary: Black (`oklch(0.205 0 0)`)
- Accent: Mint (`#48f08b`)
- 배경: White

### Studio Gold 테마

- Primary: Gold (`#c9a87c`)
- 배경: Warm beige (`#f7f4f0`)

```css
/* SpeedClinic 테마 */
@import "@studio-ui/tokens/css/speedclinic.css";

/* Studio Gold 테마 */
@import "@studio-ui/tokens/css/studio.css";
```

---

## 컴포넌트 목록

### React UI

| 컴포넌트 | 설명 |
|---------|------|
| `Button` | variant: default, outline, ghost, mint 등 |
| `Card` | CardHeader, CardTitle, CardContent, CardFooter |
| `Input` | 텍스트 입력 필드 |
| `Badge` | variant: success, warning, error, mint 등 |
| `Label` | 폼 라벨 |
| `Separator` | 구분선 |
| `LoginForm` | 로그인 폼 (Google OAuth 지원) |
| `SignupForm` | 회원가입 폼 |

### React Hooks

| Hook | 설명 |
|------|------|
| `useAuth()` | 인증 상태 및 메서드 |
| `useSession()` | 세션 정보 |
| `useTheme()` | 테마 전환 |

### Streamlit

| 컴포넌트 | 설명 |
|---------|------|
| `pricing_card()` | 가격표 카드 |
| `stats_card()` | 통계 대시보드 |
| `login_form()` | 로그인 폼 |
| `signup_form()` | 회원가입 폼 |

---

## 개발

```bash
# 의존성 설치
pnpm install

# 전체 빌드
pnpm build

# 개별 패키지 빌드
pnpm build:tokens
pnpm build:react
```

## 라이선스

MIT
