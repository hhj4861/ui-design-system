# studio-ui

Streamlit 범용 디자인 시스템 - Native Wrapper 기반

## Installation

```bash
pip install studio-ui
```

## Usage

```python
from studio_ui import apply_theme, tab_selector, container, gnb

# 테마 적용
apply_theme()

# 컴포넌트 사용
gnb(title="My App")
```

## Components

- `apply_theme()` - 디자인 시스템 테마 적용
- `gnb()` - 글로벌 네비게이션 바
- `tab_selector()` - 탭 선택기
- `container()` - 컨테이너
- `section_header()` - 섹션 헤더
- `swipe_slider()` - 스와이프 슬라이더
- `action_card()` - 액션 카드
- `label_badge()` - 라벨 뱃지
- `link_icon()` - 링크 아이콘

## License

MIT