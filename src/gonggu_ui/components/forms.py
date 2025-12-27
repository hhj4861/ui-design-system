"""
gonggu_ui/components/forms.py
폼 컴포넌트 - Native Wrapper 방식
"""
import streamlit as st
from typing import List, Tuple, Optional, Dict, Any
from gonggu_ui.core.styles import inject_css


def column_matcher(
    left_label: str,
    left_options: List[str],
    right_label: str,
    right_options: List[str],
    left_default: int = 0,
    right_default: int = 0,
    left_key: str = "left_col",
    right_key: str = "right_col",
) -> Tuple[str, str]:
    """
    컬럼 매칭 폼 (Native Wrapper)

    st.selectbox를 사용하여 State 완벽 연동

    Args:
        left_label: 왼쪽 레이블
        left_options: 왼쪽 옵션 리스트
        right_label: 오른쪽 레이블
        right_options: 오른쪽 옵션 리스트
        left_default: 왼쪽 기본 인덱스
        right_default: 오른쪽 기본 인덱스
        left_key: 왼쪽 selectbox 키
        right_key: 오른쪽 selectbox 키

    Returns:
        (왼쪽 선택값, 오른쪽 선택값)

    Example:
        >>> left, right = column_matcher(
        ...     "주문서", ["이름", "금액", "주소"],
        ...     "입금내역", ["입금자", "금액", "메모"],
        ...     left_default=0,
        ...     right_default=0,
        ... )
    """
    inject_css("""
        .matcher-label {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--fg-primary);
            margin-bottom: 0.5rem;
        }
        .matcher-link {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: var(--primary);
            padding-top: 1.5rem;
        }
    """, key="column_matcher_styles")

    col_left, col_center, col_right = st.columns([5, 1, 5])

    with col_left:
        st.markdown(f'<div class="matcher-label">🟦 {left_label}</div>', unsafe_allow_html=True)
        left_val = st.selectbox(
            left_label,
            left_options,
            index=left_default,
            key=left_key,
            label_visibility="collapsed",
        )

    with col_center:
        st.markdown('<div class="matcher-link">🔗</div>', unsafe_allow_html=True)

    with col_right:
        st.markdown(f'<div class="matcher-label">🟧 {right_label}</div>', unsafe_allow_html=True)
        right_val = st.selectbox(
            right_label,
            right_options,
            index=right_default,
            key=right_key,
            label_visibility="collapsed",
        )

    return left_val, right_val


def tab_selector(
    tabs: List[Dict[str, Any]],
    default_index: int = 0,
    key: str = "tab_selector",
) -> int:
    """
    탭 선택기 (SwipeSlider 대체)

    st.columns + st.button으로 Native 구현
    모바일에서도 안정적으로 동작

    Args:
        tabs: 탭 리스트 [{"id": "...", "icon": "👤", "label": "이름"}]
        default_index: 기본 선택 인덱스
        key: 세션 상태 키

    Returns:
        선택된 탭 인덱스

    Example:
        >>> tabs = [
        ...     {"id": "name", "icon": "👤", "label": "이름 연결"},
        ...     {"id": "amount", "icon": "💰", "label": "금액 연결"},
        ...     {"id": "add", "icon": "➕", "label": "추가"},
        ... ]
        >>> selected_idx = tab_selector(tabs)
        >>> if tabs[selected_idx]["id"] == "name":
        ...     st.write("이름 매칭 폼 표시")
    """
    inject_css("""
        .tab-container {
            margin-bottom: 1rem;
        }
    """, key="tab_selector_styles")

    state_key = f"{key}_selected"
    if state_key not in st.session_state:
        st.session_state[state_key] = default_index

    cols = st.columns(len(tabs))

    for i, tab in enumerate(tabs):
        with cols[i]:
            is_active = st.session_state[state_key] == i
            btn_type = "primary" if is_active else "secondary"

            if st.button(
                f"{tab['icon']}\n{tab['label']}",
                key=f"{key}_tab_{i}",
                type=btn_type,
                use_container_width=True,
            ):
                st.session_state[state_key] = i
                st.rerun()

    return st.session_state[state_key]


def search_input(
    placeholder: str = "검색...",
    key: str = "search",
) -> str:
    """
    검색 입력 필드

    Args:
        placeholder: 플레이스홀더 텍스트
        key: 컴포넌트 키

    Returns:
        입력된 검색어

    Example:
        >>> query = search_input(placeholder="이름으로 검색")
    """
    inject_css("""
        div[data-testid="stTextInput"] input {
            border-radius: var(--radius-full) !important;
            padding-left: 1rem !important;
        }
    """, key="search_input_styles")

    return st.text_input(
        "검색",
        placeholder=placeholder,
        key=key,
        label_visibility="collapsed",
    )
