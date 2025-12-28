"""
studio_ui/core/styles.py
전역 CSS 주입 유틸리티

⚠️ [사용중 - 수정 주의]
이 파일의 CSS는 gonggu-match (8501 포트) 등 여러 앱에서 사용 중입니다.
수정 시 모든 연관 앱의 UI에 영향을 줍니다.

주요 스타일:
- 다크모드 비활성화 및 라이트 테마 강제
- 텍스트 색상 (#2d251f)
- 파일 업로더 스타일 (골드 점선 테두리)
- 컨테이너 스타일 (border=True)
- 버튼 스타일 (Primary/Secondary)
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
        >>> from studio_ui import apply_theme
        >>> apply_theme()  # 기본 테마 적용

        >>> from studio_ui import apply_theme, DARK_THEME
        >>> apply_theme(DARK_THEME)  # 다크 테마 적용
    """
    # 매 리런마다 CSS 주입 필요 (Streamlit은 매번 페이지를 재구성)
    theme = theme or DEFAULT_THEME

    css = f"""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');

    {theme.to_css_vars()}

    /* ============================================
       다크모드 강제 비활성화 (최우선)
       ============================================ */
    :root {{
        color-scheme: light only !important;
        --text-color: #2d251f !important;
        --background-color: #f7f4f0 !important;
    }}

    /* Streamlit 다크모드 변수 오버라이드 */
    :root, [data-theme="dark"], [data-theme="light"],
    .stApp[data-theme="dark"], .stApp[data-theme="light"] {{
        --primary-color: #c9a87c !important;
        --background-color: #f7f4f0 !important;
        --secondary-background-color: #fffdfb !important;
        --text-color: #2d251f !important;
    }}

    /* ============================================
       기본 폰트 및 텍스트 (강제 적용)
       ============================================ */
    html, body, [class*="css"], .stApp, .main, .block-container {{
        font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif !important;
        color: #2d251f !important;
        background-color: #f7f4f0 !important;
    }}

    /* 전체 앱 텍스트 색상 강제 */
    .stApp, .stApp * {{
        color: #2d251f !important;
    }}

    /* 모든 텍스트 기본 색상 - 강제 적용 */
    p, span, div, label, li, td, th, a {{
        color: #2d251f !important;
    }}

    /* Streamlit 마크다운 텍스트 */
    .stMarkdown, .stMarkdown p, .stMarkdown span,
    [data-testid="stMarkdownContainer"],
    [data-testid="stMarkdownContainer"] p,
    [data-testid="stMarkdownContainer"] span {{
        color: #2d251f !important;
    }}

    /* Streamlit 텍스트 요소 */
    .stText, [data-testid="stText"] {{
        color: #2d251f !important;
    }}

    /* element-container 내부 텍스트 */
    [data-testid="element-container"] {{
        color: #2d251f !important;
    }}
    [data-testid="element-container"] * {{
        color: #2d251f !important;
    }}

    /* stVerticalBlock 내부 */
    [data-testid="stVerticalBlock"] * {{
        color: #2d251f !important;
    }}

    /* 라벨 텍스트 */
    .stTextInput label, .stSelectbox label, .stTextArea label,
    [data-testid="stWidgetLabel"], [data-testid="stWidgetLabel"] * {{
        color: #2d251f !important;
    }}

    /* 탭 텍스트 (선택 안된 탭) */
    .stTabs [data-baseweb="tab"]:not([aria-selected="true"]) {{
        color: #5a4d3f !important;
    }}
    .stTabs [data-baseweb="tab"]:not([aria-selected="true"]) * {{
        color: #5a4d3f !important;
    }}

    /* st.info, st.warning 등 내부 텍스트 */
    [data-testid="stAlert"] p, [data-testid="stAlert"] span,
    .stAlert p, .stAlert span {{
        color: inherit !important;
    }}

    /* ============================================
       앱 레이아웃
       ============================================ */
    .stApp {{
        background: var(--bg-main) !important;
    }}

    .stApp {{ margin-top: -90px !important; }}

    .main .block-container {{
        padding: 0 1.5rem 2rem !important;
        max-width: 1100px;
        margin: 0 auto;
    }}

    /* Streamlit 기본 요소 숨김 */
    #MainMenu, footer, header {{ visibility: hidden; height: 0 !important; }}
    .stDeployButton {{ display: none; }}

    /* ============================================
       제목 및 헤딩
       ============================================ */
    h1, h2, h3, h4, h5, h6,
    .stMarkdown h1, .stMarkdown h2, .stMarkdown h3 {{
        color: var(--fg-primary) !important;
        font-weight: 700 !important;
    }}

    .stTitle, [data-testid="stTitle"] {{
        color: var(--fg-primary) !important;
    }}

    /* st.subheader */
    [data-testid="stSubheader"] {{
        color: var(--fg-primary) !important;
    }}

    /* ============================================
       버튼 (색상 예외 - 최고 우선순위)
       ============================================ */
    /* 기본 버튼 스타일 */
    .stApp .stButton > button,
    .stApp button[data-testid^="stBaseButton"] {{
        color: #2d251f !important;
        background: #fffdfb !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 9999px !important;
        padding: 0.75rem 2rem !important;
        font-weight: 600 !important;
        transition: all 0.2s ease;
    }}

    /* Primary Button - 흰색 텍스트 */
    .stApp .stButton > button[kind="primary"],
    .stApp .stButton > button[data-testid="stBaseButton-primary"],
    .stApp button[kind="primary"],
    .stApp button[data-testid="stBaseButton-primary"] {{
        background: linear-gradient(135deg, #c9a87c, #b8976b) !important;
        color: white !important;
        border: none !important;
        border-radius: 9999px !important;
        padding: 0.75rem 2rem !important;
        font-weight: 600 !important;
        box-shadow: 0 4px 12px rgba(201,168,124,0.3);
        transition: all 0.2s ease;
    }}

    .stApp .stButton > button[kind="primary"] *,
    .stApp .stButton > button[data-testid="stBaseButton-primary"] *,
    .stApp button[kind="primary"] *,
    .stApp button[data-testid="stBaseButton-primary"] * {{
        color: white !important;
    }}

    .stApp .stButton > button[kind="primary"] p,
    .stApp .stButton > button[kind="primary"] span,
    .stApp .stButton > button[data-testid="stBaseButton-primary"] p,
    .stApp .stButton > button[data-testid="stBaseButton-primary"] span {{
        color: white !important;
    }}

    .stApp .stButton > button[kind="primary"]:hover,
    .stApp .stButton > button[data-testid="stBaseButton-primary"]:hover {{
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(201,168,124,0.4);
    }}

    /* Secondary Button - 진한 갈색 텍스트 */
    .stApp .stButton > button[kind="secondary"],
    .stApp .stButton > button[data-testid="stBaseButton-secondary"],
    .stApp button[kind="secondary"],
    .stApp button[data-testid="stBaseButton-secondary"] {{
        background: #fffdfb !important;
        color: #2d251f !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 9999px !important;
        padding: 0.75rem 2rem !important;
        transition: all 0.2s ease;
    }}

    .stApp .stButton > button[kind="secondary"] *,
    .stApp .stButton > button[data-testid="stBaseButton-secondary"] *,
    .stApp button[kind="secondary"] * {{
        color: #2d251f !important;
    }}

    .stApp .stButton > button[kind="secondary"]:hover,
    .stApp .stButton > button[data-testid="stBaseButton-secondary"]:hover {{
        border-color: #c9a87c !important;
        color: #c9a87c !important;
        background: #faf8f5 !important;
    }}

    .stApp .stButton > button[kind="secondary"]:hover *,
    .stApp .stButton > button[data-testid="stBaseButton-secondary"]:hover * {{
        color: #c9a87c !important;
    }}

    /* 선택된 탭 - 흰색 텍스트 */
    .stApp .stTabs [aria-selected="true"],
    .stApp .stTabs [aria-selected="true"] * {{
        color: white !important;
    }}

    /* ============================================
       입력 필드 (Text Input)
       ============================================ */
    /* 텍스트 입력 컨테이너 */
    .stApp div[data-testid="stTextInput"] > div {{
        background: #faf8f5 !important;
    }}

    /* 텍스트 입력 필드 */
    .stApp div[data-testid="stTextInput"] input,
    .stApp input[type="text"],
    .stApp input[type="email"],
    .stApp input[type="password"] {{
        background: #faf8f5 !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 8px !important;
        padding: 0.875rem 1rem !important;
        font-size: 0.875rem !important;
        color: #2d251f !important;
        transition: all 0.2s ease !important;
    }}

    .stApp div[data-testid="stTextInput"] input:focus,
    .stApp input[type="text"]:focus,
    .stApp input[type="email"]:focus,
    .stApp input[type="password"]:focus {{
        border-color: #c9a87c !important;
        box-shadow: 0 0 0 3px rgba(201,168,124,0.2) !important;
        outline: none !important;
    }}

    .stApp div[data-testid="stTextInput"] input::placeholder,
    .stApp input::placeholder {{
        color: #8a7d6d !important;
    }}

    /* 입력 필드 라벨 */
    .stApp div[data-testid="stTextInput"] label,
    .stApp label {{
        color: #2d251f !important;
        font-weight: 500 !important;
    }}

    /* ============================================
       탭 (Tabs)
       ============================================ */
    .stTabs [data-baseweb="tab-list"] {{
        gap: 0.5rem;
        background: transparent;
    }}

    .stTabs [data-baseweb="tab"] {{
        background: var(--bg-card) !important;
        border: 1px solid var(--border-light) !important;
        border-radius: var(--radius-md) !important;
        color: var(--fg-secondary) !important;
        padding: 0.75rem 1.5rem !important;
        font-weight: 500 !important;
    }}

    .stTabs [data-baseweb="tab"]:hover {{
        color: var(--primary) !important;
        border-color: var(--primary) !important;
    }}

    .stTabs [aria-selected="true"] {{
        background: linear-gradient(135deg, var(--primary), var(--primary-dark)) !important;
        color: white !important;
        border-color: var(--primary) !important;
    }}

    /* 탭 하단 라인 숨김 */
    .stTabs [data-baseweb="tab-highlight"] {{
        display: none !important;
    }}

    .stTabs [data-baseweb="tab-border"] {{
        display: none !important;
    }}

    /* ============================================
       Selectbox
       ============================================ */
    .stSelectbox > div > div {{
        background: var(--bg-card) !important;
        border-color: var(--border-light) !important;
        border-radius: var(--radius-md) !important;
        color: var(--fg-primary) !important;
    }}

    .stSelectbox [data-baseweb="select"] > div {{
        background: var(--bg-card) !important;
        border-color: var(--border-light) !important;
        color: var(--fg-primary) !important;
    }}

    /* ============================================
       알림 메시지 (Info, Warning, Error, Success)
       ============================================ */
    .stAlert {{
        border-radius: var(--radius-md) !important;
    }}

    div[data-testid="stNotification"] {{
        background: var(--bg-card) !important;
        border-radius: var(--radius-md) !important;
    }}

    /* Info */
    .stInfo, div[data-testid="stNotification"][data-type="info"] {{
        background: #e8f4fc !important;
        border: 1px solid #b8daef !important;
        color: #1a5a8a !important;
    }}

    /* Warning */
    .stWarning {{
        background: var(--warning-bg) !important;
        border: 1px solid rgba(255,193,7,0.3) !important;
        color: #856404 !important;
    }}

    /* Error */
    .stError {{
        background: var(--error-bg) !important;
        border: 1px solid rgba(220,53,69,0.3) !important;
        color: var(--error) !important;
    }}

    /* Success */
    .stSuccess {{
        background: var(--success-bg) !important;
        border: 1px solid rgba(74,157,107,0.3) !important;
        color: var(--success) !important;
    }}

    /* ============================================
       코드 블록 - 따뜻한 색상 테마
       ============================================ */
    .stApp .stCode,
    .stApp [data-testid="stCode"],
    .stApp .stCodeBlock,
    .stApp pre,
    .stApp code {{
        background: #f8f5f0 !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 8px !important;
    }}

    .stApp .stCode pre,
    .stApp [data-testid="stCode"] pre,
    .stApp .stCodeBlock pre {{
        background: #f8f5f0 !important;
        padding: 1rem !important;
    }}

    .stApp .stCode code,
    .stApp [data-testid="stCode"] code,
    .stApp .stCodeBlock code {{
        color: #5c4a3d !important;
        background: transparent !important;
    }}

    /* 코드 토큰 색상 */
    .stApp .token.comment {{ color: #8b7355 !important; }}
    .stApp .token.keyword {{ color: #c9a87c !important; font-weight: 600 !important; }}
    .stApp .token.string {{ color: #6b8e6b !important; }}
    .stApp .token.function {{ color: #7a6b5a !important; }}
    .stApp .token.punctuation {{ color: #5c4a3d !important; }}
    .stApp .token.operator {{ color: #8b7355 !important; }}

    /* 복사 버튼 */
    .stApp [data-testid="stCodeCopyButton"] {{
        color: #8b7355 !important;
    }}
    .stApp [data-testid="stCodeCopyButton"]:hover {{
        color: #c9a87c !important;
    }}

    /* ============================================
       구분선 (Divider)
       ============================================ */
    hr, [data-testid="stDivider"] {{
        border-color: var(--border-light) !important;
    }}

    /* ============================================
       File Uploader
       ============================================ */
    .stApp .stFileUploader {{
        margin: 0.5rem 0 !important;
    }}

    .stApp .stFileUploader > div {{
        background: linear-gradient(135deg, #faf8f5 0%, #f5f0ea 100%) !important;
        border: 2px dashed #c9a87c !important;
        border-radius: 12px !important;
        padding: 2rem 1.5rem !important;
        transition: all 0.3s ease !important;
        box-shadow: inset 0 2px 8px rgba(201,168,124,0.08) !important;
    }}

    .stApp .stFileUploader > div:hover {{
        border-color: #b8976b !important;
        background: linear-gradient(135deg, #f5f0ea 0%, #efe8df 100%) !important;
        box-shadow: inset 0 2px 12px rgba(201,168,124,0.15) !important;
    }}

    /* File uploader 내부 텍스트 */
    .stApp .stFileUploader span,
    .stApp .stFileUploader p,
    .stApp .stFileUploader small {{
        color: #6b5a4a !important;
    }}

    /* "Drag and drop" 텍스트 강조 */
    .stApp .stFileUploader [data-testid="stFileUploaderDropzoneInstructions"] {{
        color: #8b7355 !important;
        font-weight: 500 !important;
    }}

    /* File uploader 버튼 - Browse files */
    .stApp .stFileUploader button {{
        background: linear-gradient(135deg, #c9a87c, #b8976b) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 0.5rem 1.25rem !important;
        font-weight: 600 !important;
        box-shadow: 0 2px 8px rgba(201,168,124,0.3) !important;
        transition: all 0.2s ease !important;
    }}

    .stApp .stFileUploader button:hover {{
        background: linear-gradient(135deg, #b8976b, #a7865a) !important;
        box-shadow: 0 4px 12px rgba(201,168,124,0.4) !important;
        transform: translateY(-1px) !important;
    }}

    .stApp .stFileUploader button span,
    .stApp .stFileUploader button p {{
        color: white !important;
    }}

    /* 업로드된 파일 표시 영역 */
    .stApp .stFileUploader [data-testid="stFileUploaderFile"] {{
        background: #fffdfb !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 8px !important;
        padding: 0.5rem !important;
    }}

    /* ============================================
       Popover (사용자 메뉴 등)
       ============================================ */
    [data-testid="stPopover"] {{
        background: #fffdfb !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
    }}

    /* ============================================
       JSON 표시
       ============================================ */
    .stJson {{
        background: #fffdfb !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 8px !important;
    }}

    /* ============================================
       Container with border (st.container(border=True))
       ============================================ */
    .stApp [data-testid="stVerticalBlockBorderWrapper"] {{
        background: #fffdfb !important;
        border: 1px solid #e8e2d9 !important;
        border-radius: 16px !important;
        padding: 1.5rem !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
    }}

    div[data-testid="stVerticalBlock"] > div:has(> div[data-testid="stVerticalBlockBorderWrapper"]) {{
        background: transparent;
        border-radius: 16px;
    }}
    </style>
    """

    st.markdown(css, unsafe_allow_html=True)


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
