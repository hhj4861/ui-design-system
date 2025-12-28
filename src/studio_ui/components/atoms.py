"""
studio_ui/components/atoms.py
기본 UI 요소: Badge, Tag, Section Header 등
"""
import streamlit as st
from typing import Literal, Optional


def badge(
    text: str,
    variant: Literal["default", "success", "warning", "error", "info"] = "default",
) -> None:
    """
    배지 컴포넌트

    Args:
        text: 배지 텍스트
        variant: 색상 변형 (default, success, warning, error, info)

    Example:
        >>> badge("NEW", variant="success")
        >>> badge("추천", variant="default")
    """
    colors = {
        "default": ("var(--primary)", "white"),
        "success": ("var(--success)", "white"),
        "warning": ("var(--warning)", "#333"),
        "error": ("var(--error)", "white"),
        "info": ("var(--info)", "white"),
    }
    bg, fg = colors.get(variant, colors["default"])

    st.markdown(f"""
    <span style="
        display: inline-block;
        background: {bg};
        color: {fg};
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.625rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    ">{text}</span>
    """, unsafe_allow_html=True)


def section_label(text: str) -> None:
    """
    섹션 레이블 (예: "HOW IT WORKS", "FEATURES")

    Args:
        text: 레이블 텍스트

    Example:
        >>> section_label("HOW IT WORKS")
    """
    st.markdown(f"""
    <div style="
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 0.5rem;
    ">{text}</div>
    """, unsafe_allow_html=True)


def section_title(text: str, subtitle: Optional[str] = None) -> None:
    """
    섹션 제목

    Args:
        text: 제목 텍스트
        subtitle: 부제목 (선택)

    Example:
        >>> section_title("주요 기능", subtitle="핵심 기능을 소개합니다")
    """
    st.markdown(f"""
    <div style="
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--fg-primary);
        margin-bottom: 0.25rem;
    ">{text}</div>
    """, unsafe_allow_html=True)

    if subtitle:
        st.markdown(f"""
        <div style="
            font-size: 0.875rem;
            color: var(--fg-muted);
        ">{subtitle}</div>
        """, unsafe_allow_html=True)


def divider(margin: str = "1.5rem") -> None:
    """
    구분선

    Args:
        margin: 상하 여백

    Example:
        >>> divider()
    """
    st.markdown(f"""
    <hr style="
        border: none;
        border-top: 1px solid var(--border-light);
        margin: {margin} 0;
    ">
    """, unsafe_allow_html=True)


def label_badge(
    text: str,
    variant: Literal["order", "deposit", "default"] = "default",
) -> None:
    """
    라벨 배지 (사각형, 컬럼 매칭용)

    ⚠️ [사용중 - 수정 주의] gonggu-match 컬럼 매칭 UI에서 사용 중

    Args:
        text: 배지 텍스트
        variant: 색상 변형 (order=베이지톤, deposit=세이지톤, default=회색)

    Example:
        >>> label_badge("주문서", variant="order")
        >>> label_badge("입금내역", variant="deposit")
    """
    # ⚠️ 디자인 시스템에 맞는 따뜻한 색상 팔레트 (수정 시 UI 확인 필수)
    colors = {
        "order": {"bg": "#f5ebe0", "text": "#8b7355", "border": "#d4c4b0"},
        "deposit": {"bg": "#e8f0e8", "text": "#5a7a5a", "border": "#c4d4c4"},
        "default": {"bg": "#f5f3f0", "text": "#6b6560", "border": "#e0dcd8"},
    }
    style = colors.get(variant, colors["default"])

    st.markdown(f"""
    <span style="
        display: inline-block;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        color: {style['text']};
        background: {style['bg']};
        border: 1px solid {style['border']};
        margin-bottom: 8px;
    ">{text}</span>
    """, unsafe_allow_html=True)


def link_icon(icon: str = "🔗") -> None:
    """
    링크 아이콘 (중앙 정렬)

    Args:
        icon: 표시할 아이콘/이모지

    Example:
        >>> link_icon()
        >>> link_icon("↔️")
    """
    st.markdown(f"""
    <div style="
        text-align: center;
        padding: 12px 0;
        color: #999;
        font-size: 1.5rem;
    ">{icon}</div>
    """, unsafe_allow_html=True)
