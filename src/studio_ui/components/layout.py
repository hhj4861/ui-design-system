"""
studio_ui/components/layout.py
레이아웃 컴포넌트 - 컨테이너, 섹션 헤더
"""
import streamlit as st


def container(content: str, padding: str = "2rem", margin_bottom: str = "1.5rem"):
    """
    기본 컨테이너

    Args:
        content: HTML 콘텐츠
        padding: 패딩
        margin_bottom: 하단 마진
    """
    st.markdown(f"""
    <div style="background: #fffdfb; border: 1px solid #e8e2d9; border-radius: 1.5rem; padding: {padding}; margin-bottom: {margin_bottom};">
        {content}
    </div>
    """, unsafe_allow_html=True)


def section_header(label: str, title: str, subtitle: str = "") -> str:
    """
    섹션 헤더 (레이블 + 제목 + 부제목)

    Args:
        label: 상단 레이블 (예: "STEP 1")
        title: 제목
        subtitle: 부제목 (선택)

    Returns:
        HTML 문자열
    """
    subtitle_html = f'<div style="font-size: 0.875rem; color: #8b7355;">{subtitle}</div>' if subtitle else ""
    return f"""
    <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="font-size: 0.75rem; font-weight: 600; color: #8b7355; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">{label}</div>
        <div style="font-size: 1.25rem; font-weight: 700; color: #2d251f; margin-bottom: 0.25rem;">{title}</div>
        {subtitle_html}
    </div>
    """


def hero(title: str, subtitle: str, highlight: str = ""):
    """
    히어로 섹션

    Args:
        title: 메인 타이틀
        subtitle: 서브타이틀
        highlight: 강조 텍스트 (선택)
    """
    highlight_html = f'<strong style="color: #c9a87c;">{highlight}</strong>' if highlight else ""
    subtitle_with_highlight = subtitle.replace("{highlight}", highlight_html) if highlight else subtitle

    st.markdown(f"""
    <div style="text-align: center; padding: 2rem 1rem;">
        <div style="font-size: 2.5rem; font-weight: 700; color: #2d251f; margin-bottom: 0.75rem;">
            {title}
        </div>
        <div style="font-size: 1.125rem; color: #5c4a3d; line-height: 1.6; max-width: 500px; margin: 0 auto 1.5rem;">
            {subtitle_with_highlight}
        </div>
    </div>
    """, unsafe_allow_html=True)
