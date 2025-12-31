"""
studio_ui/components/navigation.py
네비게이션 컴포넌트 - Streamlit 네이티브 방식 (Cloud 호환)
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
    GNB (Global Navigation Bar) - Streamlit 네이티브 방식
    Streamlit Cloud 호환을 위해 st.button 사용
    """
    if menu_items is None:
        menu_items = [
            {"label": "매칭하기", "page": "matching"},
        ]

    # 메뉴 열림 상태 관리
    if "gnb_menu_open" not in st.session_state:
        st.session_state.gnb_menu_open = False

    # GNB 스타일
    st.markdown("""
    <style>
        /* 상단 바 */
        .gnb-bar {
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
        }
        .gnb-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .gnb-logo-icon {
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
        }
        .gnb-logo-text {
            font-size: 1.25rem;
            font-weight: 700;
            color: #2d251f;
        }
        .gnb-spacer { height: 70px; }

        /* 햄버거 버튼 스타일 오버라이드 */
        div[data-testid="stButton"] button.hamburger-btn {
            position: fixed !important;
            top: 1rem !important;
            right: 1.5rem !important;
            width: 40px !important;
            height: 40px !important;
            padding: 0 !important;
            background: transparent !important;
            border: none !important;
            z-index: 1000004 !important;
            min-height: 0 !important;
        }

        /* 메뉴 버튼 스타일 */
        .menu-buttons button {
            width: 100%;
            text-align: left;
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            padding: 0.875rem 0 !important;
            background: transparent !important;
            border: none !important;
            color: #2d251f !important;
        }
        .menu-buttons button:hover {
            color: #c9a87c !important;
        }
    </style>
    """, unsafe_allow_html=True)

    # 상단 바 (로고만, 클릭 불가)
    st.markdown(f"""
    <div class="gnb-bar">
        <div class="gnb-logo">
            <div class="gnb-logo-icon">{logo_icon}</div>
            <span class="gnb-logo-text">{logo_text}</span>
        </div>
    </div>
    <div class="gnb-spacer"></div>
    """, unsafe_allow_html=True)

    # 햄버거 메뉴 버튼 (우측 상단)
    col1, col2 = st.columns([10, 1])
    with col2:
        if st.button("☰", key="gnb_hamburger", help="메뉴"):
            st.session_state.gnb_menu_open = not st.session_state.gnb_menu_open
            st.rerun()

    # 메뉴 열림 상태일 때 풀스크린 메뉴 표시
    if st.session_state.gnb_menu_open:
        # 풀스크린 오버레이
        st.markdown("""
        <style>
            .fullscreen-menu {
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: #fffdfb;
                z-index: 1000010;
                padding: 5rem 2rem 2rem;
            }
            .menu-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 2rem;
            }
            .menu-logo-sm {
                width: 1.75rem;
                height: 1.75rem;
                background: linear-gradient(135deg, #c9a87c, #b8976b);
                border-radius: 0.4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                font-size: 0.75rem;
            }
            .menu-logo-text-sm {
                font-size: 1.125rem;
                font-weight: 700;
                color: #2d251f;
            }
            section[data-testid="stSidebar"] {
                display: none !important;
            }
        </style>
        """, unsafe_allow_html=True)

        # 메뉴 컨테이너
        menu_container = st.container()
        with menu_container:
            # 닫기 버튼
            close_col1, close_col2 = st.columns([10, 1])
            with close_col2:
                if st.button("✕", key="gnb_close"):
                    st.session_state.gnb_menu_open = False
                    st.rerun()

            # 메뉴 헤더
            st.markdown(f"""
            <div class="menu-header">
                <div class="menu-logo-sm">{logo_icon}</div>
                <span class="menu-logo-text-sm">{logo_text}</span>
            </div>
            """, unsafe_allow_html=True)

            # 홈 버튼
            if st.button("🏠 홈", key="gnb_home", use_container_width=True):
                st.session_state.page = landing_page
                st.session_state.gnb_menu_open = False
                st.rerun()

            # 메뉴 아이템들
            for idx, item in enumerate(menu_items):
                if st.button(item["label"], key=f"gnb_menu_{idx}", use_container_width=True):
                    st.session_state.page = item["page"]
                    if "section" in item:
                        st.session_state.target_section = item["section"]
                    st.session_state.gnb_menu_open = False
                    st.rerun()


def gnb_simple(
    logo_icon: str = "G",
    logo_text: str = "공구매칭",
    menu_items: Optional[List[Dict[str, str]]] = None,
    landing_page: str = "landing",
):
    """
    간단한 GNB - 상단 바만 표시 (메뉴 없음)
    """
    # GNB 스타일
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


# 하위 호환성을 위한 함수
def gnb_html(
    logo_icon: str = "G",
    logo_text: str = "공구매칭",
    menu_items: Optional[List[Dict[str, str]]] = None,
    landing_page: str = "landing",
) -> str:
    """
    GNB HTML 문자열 반환 (레거시 호환용 - 사용 비권장)
    """
    return ""  # Streamlit Cloud에서 HTML 링크가 동작하지 않으므로 빈 문자열 반환
