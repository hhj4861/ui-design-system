# Build Rules

Studio UI 빌드 관련 규칙입니다.

## 빌드 순서 (필수)

```bash
# 항상 tokens → react 순서
pnpm build:tokens && pnpm build:react
```

### 이유

`@studio-ui/react`가 `@studio-ui/tokens`에 의존하기 때문:

```
@studio-ui/react
    └── depends on → @studio-ui/tokens
```

### 잘못된 빌드

```bash
# ❌ react만 먼저 빌드
pnpm build:react

# ❌ 동시 빌드
pnpm build  # 순서 보장 안 됨
```

---

## 빌드 명령어

### 전체 빌드

```bash
# 권장
pnpm build:tokens && pnpm build:react

# 클린 빌드 (문제 발생 시)
pnpm clean && pnpm build:tokens && pnpm build:react
```

### 개별 빌드

```bash
# tokens만 변경 시
cd packages/tokens && npm run build

# react만 변경 시 (tokens 이미 빌드됨)
cd packages/react && npm run build
```

### 개발 모드

```bash
# watch 모드
pnpm dev

# 개별 watch
cd packages/tokens && npm run dev
cd packages/react && npm run dev
```

---

## 빌드 결과물

### tokens

```
packages/tokens/dist/
├── index.js              # 토큰 export
├── index.d.ts            # 타입 정의
├── themes/               # 테마 모듈
│   ├── index.js
│   ├── studio.js
│   ├── cream.js
│   ├── speedclinic.js
│   └── stockpulse.js
└── css/                  # CSS 파일
    ├── studio.css
    ├── cream.css
    ├── speedclinic.css
    └── stockpulse.css
```

### react

```
packages/react/dist/
├── index.js              # 메인 export
├── index.d.ts            # 타입 정의
├── components/
│   ├── ui/
│   │   └── index.js
│   ├── auth/
│   │   └── index.js
│   ├── speedclinic/
│   │   └── index.js
│   └── stockpulse/
│       └── index.js
├── providers/
│   └── index.js
└── lib/
    └── utils.js
```

---

## 빌드 전 확인

```
[ ] TypeScript 에러 없음 (npx tsc --noEmit)
[ ] import 경로 올바름
[ ] 순환 의존성 없음
[ ] index.ts export 추가됨
```

## 빌드 후 확인

```
[ ] dist/ 폴더 생성됨
[ ] .d.ts 파일 생성됨
[ ] CSS 파일 생성됨 (tokens)
[ ] 에러 없이 완료됨
```

---

## 트러블슈팅

### Module not found

```bash
# 클린 후 재빌드
pnpm clean && pnpm install && pnpm build:tokens && pnpm build:react
```

### CSS 파일 없음

```bash
# CSS 생성 스크립트 직접 실행
cd packages/tokens
node scripts/generate-css.js
```

### 타입 에러

```bash
# 타입 체크
cd packages/react && npx tsc --noEmit

# 일반적인 원인:
# - React import: import * as React from "react"
# - 상대 경로 확인: "../../lib/utils"
# - Props 타입 누락
```

### pnpm 관련

```bash
# 워크스페이스 재설정
rm -rf node_modules
rm -rf packages/*/node_modules
pnpm install
```
