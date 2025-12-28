# studio-ui

Streamlit 범용 디자인 시스템 - Native Wrapper 기반

## 설치

```bash
pip install git+https://github.com/your-org/studio-ui.git
```

## 빠른 시작

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

## 주요 특징

- **Native Wrapper**: Streamlit 네이티브 컴포넌트 + CSS 스타일링
- **State 연동**: `st.button`, `st.selectbox` 등 완벽한 이벤트 처리
- **테마 시스템**: CSS 변수 기반 디자인 토큰
- **Tier 구조**: core → components → widgets 계층화

## 컴포넌트

### Core (Tier 1)
- `apply_theme()`: 전역 테마 적용
- `COLORS`, `TYPOGRAPHY`, `SPACING`: 디자인 토큰

### Components (Tier 2)
- `pricing_card()`: 가격표 카드
- `stats_card()`: 통계 대시보드
- `upload_card()`: 파일 업로드
- `tab_selector()`: 탭 선택기
- `column_matcher()`: 컬럼 매칭 폼

### Auth (인증)
- `login_form()`: 로그인 폼 UI
- `signup_form()`: 회원가입 폼 UI
- `logout_button()`: 로그아웃 버튼
- `user_menu()`: 사용자 드롭다운 메뉴

## studio-core와 함께 사용

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

## 라이선스

MIT
