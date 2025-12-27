"""
gonggu_ui/components/layouts.py
레이아웃 컴포넌트
"""
import streamlit as st
from typing import List, Optional, Dict, Any
from gonggu_ui.core.styles import inject_css


def section_container(
    label: str,
    title: str,
    subtitle: Optional[str] = None,
) -> None:
    """
    섹션 컨테이너 시작

    Args:
        label: 상단 레이블 (예: "HOW IT WORKS")
        title: 제목
        subtitle: 부제목 (선택)

    Example:
        >>> section_container("HOW IT WORKS", "사용 방법")
        >>> st.write("내용...")
        >>> section_end()
    """
    inject_css("""
        .section-box {
            background: var(--bg-card);
            border: 1px solid var(--border-light);
            border-radius: var(--radius-xl);
            padding: 2rem;
            margin-bottom: 1.5rem;
        }
        .section-header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .section-label {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--fg-muted);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
        }
        .section-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--fg-primary);
        }
        .section-subtitle {
            font-size: 0.875rem;
            color: var(--fg-muted);
            margin-top: 0.25rem;
        }
    """, key="section_container_styles")

    subtitle_html = f'<div class="section-subtitle">{subtitle}</div>' if subtitle else ""

    st.markdown(f'''
    <div class="section-box">
        <div class="section-header">
            <div class="section-label">{label}</div>
            <div class="section-title">{title}</div>
            {subtitle_html}
        </div>
    ''', unsafe_allow_html=True)


def section_end() -> None:
    """섹션 컨테이너 종료"""
    st.markdown('</div>', unsafe_allow_html=True)


def card_grid(
    items: List[Dict[str, Any]],
    columns: int = 3,
) -> None:
    """
    카드 그리드 레이아웃

    st.columns를 활용한 Native 그리드

    Args:
        items: 카드 데이터 리스트 [{"icon": "📊", "title": "제목", "desc": "설명"}]
        columns: 컬럼 수

    Example:
        >>> items = [
        ...     {"icon": "📊", "title": "기능1", "desc": "설명1"},
        ...     {"icon": "🔧", "title": "기능2", "desc": "설명2"},
        ...     {"icon": "⚡", "title": "기능3", "desc": "설명3"},
        ... ]
        >>> card_grid(items, columns=3)
    """
    inject_css("""
        .grid-card {
            background: var(--bg-card);
            border: 1px solid var(--border-light);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s;
            height: 100%;
        }
        .grid-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-dark);
        }
        .grid-icon {
            font-size: 2rem;
            margin-bottom: 0.75rem;
        }
        .grid-title {
            font-size: 1rem;
            font-weight: 600;
            color: var(--fg-primary);
            margin-bottom: 0.5rem;
        }
        .grid-desc {
            font-size: 0.875rem;
            color: var(--fg-secondary);
            line-height: 1.5;
        }
    """, key="card_grid_styles")

    cols = st.columns(columns)

    for i, item in enumerate(items):
        with cols[i % columns]:
            st.markdown(f'''
            <div class="grid-card">
                <div class="grid-icon">{item.get("icon", "")}</div>
                <div class="grid-title">{item.get("title", "")}</div>
                <div class="grid-desc">{item.get("desc", "")}</div>
            </div>
            ''', unsafe_allow_html=True)


def dark_container(content: str, padding: str = "1.5rem") -> None:
    """
    다크 컨테이너 (대시보드용)

    Args:
        content: HTML 콘텐츠
        padding: 내부 여백

    Example:
        >>> dark_container("<h3>대시보드</h3>")
    """
    st.markdown(f"""
    <div style="
        background: linear-gradient(135deg, var(--bg-dark), #3d322b);
        border-radius: var(--radius-lg);
        padding: {padding};
        color: white;
    ">
        {content}
    </div>
    """, unsafe_allow_html=True)


def spacer(height: str = "1rem") -> None:
    """
    여백 컴포넌트

    Args:
        height: 높이

    Example:
        >>> spacer("2rem")
    """
    st.markdown(f"<div style='height: {height};'></div>", unsafe_allow_html=True)
