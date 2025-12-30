"""
studio_ui/components/action_card.py
액션 버튼이 있는 카드 컴포넌트
"""
import streamlit as st
from contextlib import contextmanager
from typing import Optional, Callable


@contextmanager
def action_card(
    title: str,
    key: str,
    on_delete: Optional[Callable] = None,
    deletable: bool = False,
):
    """
    액션 버튼이 있는 카드 컴포넌트

    Args:
        title: 카드 타이틀 (이모지 포함 가능)
        key: 고유 키
        on_delete: 삭제 버튼 클릭 시 호출할 콜백 함수
        deletable: True이면 삭제 버튼 표시 (on_delete가 None이어도)

    Example:
        >>> with action_card("🔧 커스텀 매칭", key="card_1", on_delete=lambda: delete_item()):
        ...     st.selectbox("주문서", options)
        ...     st.selectbox("입금내역", options)
    """
    # 삭제 버튼 표시 여부
    show_delete = on_delete is not None or deletable

    # 카드 컨테이너
    with st.container(border=True):
        # 삭제 버튼 (타이틀 위에 배치)
        if show_delete:
            delete_clicked = st.button("🗑️", key=f"del_{key}", help=None)
            if delete_clicked and on_delete:
                on_delete()
                st.rerun()

        # 헤더 영역
        st.markdown(f"**{title}**")

        # 카드 내용 영역
        yield


def action_card_style():
    """
    action_card의 전역 스타일을 적용합니다.
    apply_theme()에서 호출하거나 별도로 호출할 수 있습니다.
    """
    import streamlit.components.v1 as components

    # JavaScript로 삭제 버튼 스타일 적용
    components.html('''
    <script>
    function styleDeleteButtons() {
        // 🗑️ 이모지가 있는 버튼 찾기
        const buttons = window.parent.document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.textContent.includes('🗑️')) {
                btn.style.background = 'transparent';
                btn.style.border = 'none';
                btn.style.boxShadow = 'none';
                btn.style.padding = '2px 6px';
                btn.style.minHeight = 'auto';
                btn.style.fontSize = '28px';
                btn.style.cursor = 'pointer';
            }
        });
    }

    // 초기 실행 및 DOM 변경 감지
    setTimeout(styleDeleteButtons, 100);
    setTimeout(styleDeleteButtons, 300);
    setTimeout(styleDeleteButtons, 600);

    // MutationObserver로 DOM 변경 감지
    const observer = new MutationObserver(() => {
        styleDeleteButtons();
    });
    observer.observe(window.parent.document.body, { childList: true, subtree: true });
    </script>
    ''', height=0)
