"""
studio_ui/components/navigation.py
네비게이션 컴포넌트 - Streamlit Sidebar 방식 (Cloud 호환)
"""
import streamlit as st
from typing import List, Dict, Optional


def gnb(
    logo_icon: str = "G",
    logo_text: str = "공구매칭",
    menu_items: Optional[List[Dict[str, str]]] = None,
    landing_page: str = "landing",
):
    """
    GNB (Global Navigation Bar) - Streamlit Sidebar 방식
    - 상단 바: 로고 표시
    - 메뉴: Streamlit sidebar 사용
    """
    if menu_items is None:
        menu_items = [
            {"label": "매칭하기", "page": "matching"},
        ]

    # 상단 바 스타일 + 로고
    st.markdown(f"""
    <style>
        .gnb-bar {{
            position: fixed;
            top: 0; left: 0; right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            padding: 1rem 1.5rem;
            z-index: 1000003;
            display: flex;
            justify-content: center;
            align-items: center;
        }}
        .gnb-logo {{
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
        }}
        .gnb-logo-icon {{
            width: 2.25rem;
            height: 2.25rem;
            background: linear-gradient(135deg, #c9a87c, #b8976b);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1rem;
        }}
        .gnb-logo-text {{
            font-size: 1.25rem;
            font-weight: 700;
            color: #2d251f;
        }}
        .gnb-spacer {{ height: 70px; }}

        /* Sidebar 스타일 커스텀 */
        [data-testid="stSidebar"] {{
            background: #fffdfb;
        }}
        [data-testid="stSidebar"] [data-testid="stMarkdownContainer"] p {{
            font-size: 1rem;
        }}
    </style>
    <div class="gnb-bar">
        <div class="gnb-logo">
            <div class="gnb-logo-icon">{logo_icon}</div>
            <span class="gnb-logo-text">{logo_text}</span>
        </div>
    </div>
    <div class="gnb-spacer"></div>
    """, unsafe_allow_html=True)

    # Sidebar 메뉴
    with st.sidebar:
        # 사이드바 헤더
        st.markdown(f"""
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; padding: 0.5rem 0;">
            <div style="width: 1.75rem; height: 1.75rem; background: linear-gradient(135deg, #c9a87c, #b8976b); border-radius: 0.4rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.75rem;">{logo_icon}</div>
            <span style="font-size: 1.125rem; font-weight: 700; color: #2d251f;">{logo_text}</span>
        </div>
        """, unsafe_allow_html=True)

        # 홈 버튼
        if st.button("🏠 홈", key="sidebar_home", use_container_width=True):
            st.session_state.page = landing_page
            st.rerun()

        st.divider()

        # 메뉴 아이템들
        for idx, item in enumerate(menu_items):
            if st.button(item["label"], key=f"sidebar_menu_{idx}", use_container_width=True):
                st.session_state.page = item["page"]
                if "section" in item:
                    st.session_state.target_section = item["section"]
                st.rerun()


def gnb_simple(
    logo_icon: str = "G",
    logo_text: str = "공구매칭",
):
    """
    간단한 GNB - 상단 바만 표시 (메뉴 없음)
    """
    st.markdown(f"""
    <style>
        .gnb-bar {{
            position: fixed;
            top: 0; left: 0; right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            padding: 1rem 1.5rem;
            z-index: 1000003;
            display: flex;
            justify-content: center;
            align-items: center;
        }}
        .gnb-logo {{
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }}
        .gnb-logo-icon {{
            width: 2.25rem;
            height: 2.25rem;
            background: linear-gradient(135deg, #c9a87c, #b8976b);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1rem;
        }}
        .gnb-logo-text {{
            font-size: 1.25rem;
            font-weight: 700;
            color: #2d251f;
        }}
        .gnb-spacer {{ height: 70px; }}
    </style>
    <div class="gnb-bar">
        <div class="gnb-logo">
            <div class="gnb-logo-icon">{logo_icon}</div>
            <span class="gnb-logo-text">{logo_text}</span>
        </div>
    </div>
    <div class="gnb-spacer"></div>
    """, unsafe_allow_html=True)


# 하위 호환성
def gnb_html(*args, **kwargs) -> str:
    return ""
