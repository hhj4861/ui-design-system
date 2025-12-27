"""
gonggu_ui/components/cards.py
카드 컴포넌트 - Native Wrapper 방식
"""
import streamlit as st
from dataclasses import dataclass
from typing import List, Optional, Callable, Any
from gonggu_ui.core.styles import inject_css


# ============================================================
# PricingCard - Native Wrapper
# ============================================================

@dataclass
class PricingPlan:
    """요금제 정보"""
    name: str
    price: str
    currency: str = "₩"
    period: str = "월"
    features: List[str] = None
    disabled_features: List[str] = None
    is_recommended: bool = False
    cta_text: str = "선택하기"


def pricing_card(
    plan: PricingPlan,
    on_select: Optional[Callable[[str], None]] = None,
    key: Optional[str] = None,
) -> bool:
    """
    가격표 카드 (Native Wrapper)

    st.button을 사용하여 Streamlit State와 완벽 연동

    Args:
        plan: 요금제 정보
        on_select: 선택 시 콜백 함수
        key: 컴포넌트 키

    Returns:
        선택 여부 (True/False)

    Example:
        >>> plan = PricingPlan("Pro", "9,900", features=["무제한"], is_recommended=True)
        >>> if pricing_card(plan, key="pro"):
        ...     st.success("Pro 선택됨!")
    """
    inject_css("""
        .pricing-card {
            background: var(--bg-card);
            border: 1px solid var(--border-light);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            text-align: center;
            position: relative;
            transition: all 0.3s;
        }
        .pricing-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-dark);
        }
        .pricing-card.recommended {
            border: 2px solid var(--primary);
            background: linear-gradient(135deg, #fffcf8, #fff9f0);
        }
        .pricing-badge {
            position: absolute;
            top: -0.75rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary);
            color: white;
            font-size: 0.625rem;
            font-weight: 700;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
        }
        .pricing-name {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--fg-muted);
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }
        .pricing-price {
            font-size: 2rem;
            font-weight: 700;
            color: var(--fg-primary);
        }
        .pricing-period {
            font-size: 0.75rem;
            color: var(--fg-muted);
            margin-bottom: 1rem;
        }
        .pricing-feature {
            padding: 0.25rem 0;
            font-size: 0.875rem;
            color: var(--fg-secondary);
            text-align: left;
        }
        .pricing-feature.disabled {
            color: var(--fg-muted);
            text-decoration: line-through;
        }
    """, key="pricing_card_styles")

    card_class = "pricing-card recommended" if plan.is_recommended else "pricing-card"
    key = key or f"pricing_{plan.name}"

    with st.container():
        badge_html = '<div class="pricing-badge">추천</div>' if plan.is_recommended else ""
        st.markdown(f'<div class="{card_class}">{badge_html}', unsafe_allow_html=True)

        st.markdown(f'<div class="pricing-name">{plan.name}</div>', unsafe_allow_html=True)
        st.markdown(f'<div class="pricing-price">{plan.currency}{plan.price}</div>', unsafe_allow_html=True)
        st.markdown(f'<div class="pricing-period">{plan.period}</div>', unsafe_allow_html=True)

        for feature in (plan.features or []):
            st.markdown(f'<div class="pricing-feature">✓ {feature}</div>', unsafe_allow_html=True)

        for feature in (plan.disabled_features or []):
            st.markdown(f'<div class="pricing-feature disabled">✗ {feature}</div>', unsafe_allow_html=True)

        st.markdown("<div style='height: 1rem;'></div>", unsafe_allow_html=True)

        clicked = st.button(
            plan.cta_text,
            key=key,
            type="primary" if plan.is_recommended else "secondary",
            use_container_width=True,
        )

        st.markdown('</div>', unsafe_allow_html=True)

        if clicked and on_select:
            on_select(plan.name)

        return clicked


def pricing_grid(
    plans: List[PricingPlan],
    columns: int = 3,
    footer_text: Optional[str] = None,
) -> Optional[str]:
    """
    가격표 그리드

    Args:
        plans: 요금제 리스트
        columns: 컬럼 수
        footer_text: 하단 안내 문구

    Returns:
        선택된 플랜 이름 (없으면 None)
    """
    selected = None
    cols = st.columns(columns)

    for i, plan in enumerate(plans):
        with cols[i % columns]:
            if pricing_card(plan, key=f"plan_{plan.name}"):
                selected = plan.name

    if footer_text:
        st.markdown(f"""
        <div style="text-align: center; font-size: 0.75rem; color: var(--fg-muted); margin-top: 1rem;">
            {footer_text}
        </div>
        """, unsafe_allow_html=True)

    return selected


# ============================================================
# StatsCard - Native Wrapper
# ============================================================

@dataclass
class StatItem:
    """통계 항목"""
    label: str
    value: int
    color: str


def stats_card(
    items: List[StatItem],
    title: str = "통계",
) -> None:
    """
    통계 카드 (Native Wrapper)

    Args:
        items: 통계 항목 리스트
        title: 카드 제목

    Example:
        >>> items = [
        ...     StatItem("매칭", 117, "#4a9d6b"),
        ...     StatItem("확인필요", 3, "#ffc107"),
        ...     StatItem("미입금", 5, "#dc3545"),
        ... ]
        >>> stats_card(items, title="매칭 결과")
    """
    inject_css("""
        .stats-container {
            background: linear-gradient(135deg, var(--bg-dark), #3d322b);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
        }
        .stats-title {
            color: white;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .stats-bar {
            display: flex;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 1rem;
        }
        .stats-segment {
            transition: opacity 0.2s;
        }
        .stats-legend {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .stats-legend-item {
            display: flex;
            align-items: center;
            gap: 0.375rem;
        }
        .stats-legend-dot {
            width: 10px;
            height: 10px;
            border-radius: 2px;
        }
        .stats-legend-text {
            color: rgba(255,255,255,0.8);
            font-size: 0.75rem;
        }
    """, key="stats_card_styles")

    total = sum(item.value for item in items)

    bar_html = ""
    for item in items:
        pct = (item.value / total * 100) if total > 0 else 0
        bar_html += f'<div class="stats-segment" style="width:{pct}%;background:{item.color};"></div>'

    legend_html = ""
    for item in items:
        legend_html += f'''
        <div class="stats-legend-item">
            <div class="stats-legend-dot" style="background:{item.color};"></div>
            <span class="stats-legend-text">{item.label} {item.value}</span>
        </div>
        '''

    st.markdown(f'''
    <div class="stats-container">
        <div class="stats-title">{title} (총 {total}건)</div>
        <div class="stats-bar">{bar_html}</div>
        <div class="stats-legend">{legend_html}</div>
    </div>
    ''', unsafe_allow_html=True)


# ============================================================
# UploadCard - Native Wrapper
# ============================================================

def upload_card(
    title: str,
    icon: str = "📎",
    accepted_types: List[str] = None,
    help_text: Optional[str] = None,
    key: Optional[str] = None,
) -> Any:
    """
    파일 업로드 카드 (Native Wrapper)

    st.file_uploader를 사용하여 파일 처리 완벽 연동

    Args:
        title: 카드 제목
        icon: 아이콘 이모지
        accepted_types: 허용 파일 확장자 리스트
        help_text: 도움말 텍스트
        key: 컴포넌트 키

    Returns:
        업로드된 파일 객체 (없으면 None)

    Example:
        >>> file = upload_card(
        ...     "주문서 업로드",
        ...     icon="📋",
        ...     accepted_types=["xlsx", "csv"],
        ...     help_text="엑셀 또는 CSV 파일",
        ... )
    """
    inject_css("""
        .upload-card-header {
            text-align: center;
            margin-bottom: 0.5rem;
        }
        .upload-icon {
            font-size: 2rem;
            margin-bottom: 0.25rem;
        }
        .upload-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--fg-primary);
        }
        .upload-help {
            font-size: 0.75rem;
            color: var(--fg-muted);
        }
    """, key="upload_card_styles")

    with st.container(border=True):
        help_html = f"<div class='upload-help'>{help_text}</div>" if help_text else ""
        st.markdown(f'''
        <div class="upload-card-header">
            <div class="upload-icon">{icon}</div>
            <div class="upload-title">{title}</div>
            {help_html}
        </div>
        ''', unsafe_allow_html=True)

        return st.file_uploader(
            title,
            type=accepted_types,
            key=key,
            label_visibility="collapsed",
        )
