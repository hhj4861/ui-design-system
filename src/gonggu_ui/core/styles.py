"""
gonggu_ui/core/styles.py
전역 CSS 주입 유틸리티
"""
import streamlit as st
from typing import Optional
from .theme import Theme, DEFAULT_THEME


def apply_theme(theme: Optional[Theme] = None) -> None:
    """
    테마를 Streamlit 앱에 적용

    Args:
        theme: 적용할 테마 (기본: DEFAULT_THEME)

    Example:
        >>> from gonggu_ui import apply_theme
        >>> apply_theme()  # 기본 테마 적용

        >>> from gonggu_ui import apply_theme, DARK_THEME
        >>> apply_theme(DARK_THEME)  # 다크 테마 적용
    """
    # 중복 적용 방지
    if "_gonggu_theme_applied" in st.session_state:
        return

    theme = theme or DEFAULT_THEME

    css = f"""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');

    {theme.to_css_vars()}

    /* 기본 폰트 */
    html, body, [class*="css"] {{
        font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }}

    /* 앱 배경 */
    .stApp {{
        background: var(--bg-main) !important;
    }}

    /* 상단 여백 조정 */
    .stApp {{ margin-top: -90px !important; }}

    .main .block-container {{
        padding: 0 1.5rem 2rem !important;
        max-width: 1100px;
        margin: 0 auto;
    }}

    /* Streamlit 기본 요소 숨김 */
    #MainMenu, footer, header {{ visibility: hidden; height: 0 !important; }}
    .stDeployButton {{ display: none; }}

    /* Primary Button */
    .stButton > button[kind="primary"] {{
        background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
        color: white !important;
        border: none !important;
        border-radius: var(--radius-full) !important;
        padding: 0.75rem 2rem !important;
        font-weight: 600 !important;
        box-shadow: var(--shadow-md);
        transition: all var(--transition-normal);
    }}

    .stButton > button[kind="primary"]:hover {{
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }}

    /* Secondary Button */
    .stButton > button[kind="secondary"] {{
        background: transparent !important;
        color: var(--fg-primary) !important;
        border: 1px solid var(--border-light) !important;
        border-radius: var(--radius-full) !important;
        padding: 0.75rem 2rem !important;
        transition: all var(--transition-normal);
    }}

    .stButton > button[kind="secondary"]:hover {{
        border-color: var(--primary) !important;
        color: var(--primary) !important;
    }}

    /* Container with border */
    div[data-testid="stVerticalBlock"] > div:has(> div[data-testid="stVerticalBlockBorderWrapper"]) {{
        background: var(--bg-card);
        border-radius: var(--radius-lg);
    }}

    /* Selectbox */
    .stSelectbox > div > div {{
        background: var(--bg-card) !important;
        border-color: var(--border-light) !important;
        border-radius: var(--radius-md) !important;
    }}

    /* File Uploader */
    .stFileUploader > div {{
        background: var(--bg-card) !important;
        border: 2px dashed var(--border-light) !important;
        border-radius: var(--radius-lg) !important;
    }}

    .stFileUploader > div:hover {{
        border-color: var(--primary) !important;
    }}
    </style>
    """

    st.markdown(css, unsafe_allow_html=True)
    st.session_state["_gonggu_theme_applied"] = True


def inject_css(css: str, key: Optional[str] = None) -> None:
    """
    CSS를 한 번만 주입 (중복 방지)

    Args:
        css: 주입할 CSS 문자열
        key: 중복 방지용 키 (None이면 CSS 해시 사용)

    Example:
        >>> inject_css('''
        ...     .my-class { color: red; }
        ... ''', key="my_styles")
    """
    cache_key = f"_css_{key or hash(css)}"
    if cache_key not in st.session_state:
        st.markdown(f"<style>{css}</style>", unsafe_allow_html=True)
        st.session_state[cache_key] = True
