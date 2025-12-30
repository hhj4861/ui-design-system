"""
studio_ui/components/step_carousel.py
스텝 캐러셀 컴포넌트 - "이렇게 사용하세요" 섹션용
"""
import streamlit as st
import streamlit.components.v1 as components
from typing import List, Dict, Optional


def step_carousel(
    steps: List[Dict[str, str]],
    current: int = 0,
    key: str = "step_carousel",
    height: int = 320,
    label: str = "HOW IT WORKS",
    title: str = "이렇게 사용하세요",
) -> int:
    """
    스텝 캐러셀 (이렇게 사용하세요 섹션)

    Args:
        steps: 스텝 리스트 [{"step": "STEP 1", "title": "파일 업로드", "desc": "설명..."}, ...]
        current: 현재 선택된 인덱스
        key: 컴포넌트 키
        height: 컴포넌트 높이
        label: 섹션 라벨 (예: "HOW IT WORKS")
        title: 섹션 타이틀 (예: "이렇게 사용하세요")

    Returns:
        선택된 스텝 인덱스

    Example:
        >>> steps = [
        ...     {"step": "STEP 1", "title": "파일 업로드", "desc": "주문서와 입금내역 엑셀 파일을 업로드하세요"},
        ...     {"step": "STEP 2", "title": "컬럼 선택", "desc": "이름과 금액 컬럼을 선택하세요"},
        ...     {"step": "STEP 3", "title": "자동 매칭", "desc": "버튼 한 번으로 스마트 매칭!"},
        ...     {"step": "STEP 4", "title": "결과 다운로드", "desc": "엑셀로 다운로드하세요"},
        ... ]
        >>> current = step_carousel(steps)
    """
    total = len(steps)
    current = min(current, total - 1)

    # 슬라이드 HTML 생성
    slides_html = ""
    for s in steps:
        slides_html += f'''
        <div class="carousel-slide">
            <span class="step-badge">{s.get("step", "")}</span>
            <div class="step-title">{s.get("title", "")}</div>
            <div class="step-desc">{s.get("desc", "")}</div>
        </div>
        '''

    # 도트 HTML 생성
    dots_html = "".join([
        f'<span class="dot {"active" if i == current else ""}" onclick="goTo({i})"></span>'
        for i in range(total)
    ])

    carousel_html = f'''
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        .section-container {{
            font-family: 'Noto Sans KR', -apple-system, sans-serif;
            background: #fffdfb;
            border: 1px solid #e8e2d9;
            border-radius: 1.5rem;
            padding: 2rem;
        }}
        .section-header {{
            text-align: center;
            margin-bottom: 1.5rem;
        }}
        .section-label {{
            font-size: 0.75rem;
            font-weight: 600;
            color: #8b7355;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
        }}
        .section-title {{
            font-size: 1.25rem;
            font-weight: 700;
            color: #2d251f;
        }}
        .carousel-inner {{
            overflow: hidden;
        }}
        .carousel-wrapper {{
            overflow: hidden;
        }}
        .carousel-track {{
            display: flex;
            transition: transform 0.3s ease;
        }}
        .carousel-slide {{
            flex: 0 0 100%;
            min-width: 100%;
            text-align: center;
            padding: 1.5rem 1rem;
            background: linear-gradient(135deg, #fff9f0, #fff5e6);
            border-radius: 1rem;
        }}
        .step-badge {{
            display: inline-block;
            background: linear-gradient(135deg, #c9a87c, #b8956c);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.7rem;
            font-weight: 700;
        }}
        .step-title {{
            font-size: 1.25rem;
            font-weight: 700;
            color: #2d251f;
            margin: 1rem 0 0.5rem;
        }}
        .step-desc {{
            font-size: 0.875rem;
            color: #5c4a3d;
            line-height: 1.5;
        }}
        .carousel-dots {{
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;
        }}
        .dot {{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #c9bfb0;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
        }}
        .dot.active {{
            background: #c9a87c;
            width: 20px;
            border-radius: 4px;
        }}
    </style>
    <div class="section-container">
        <div class="section-header">
            <div class="section-label">{label}</div>
            <div class="section-title">{title}</div>
        </div>
        <div class="carousel-inner">
            <div class="carousel-wrapper">
                <div class="carousel-track" id="track_{key}">{slides_html}</div>
            </div>
            <div class="carousel-dots" id="dots_{key}">{dots_html}</div>
        </div>
    </div>
    <script>
        let idx_{key} = {current};
        const track_{key} = document.getElementById('track_{key}');
        const dots_{key} = document.querySelectorAll('#dots_{key} .dot');

        function goTo(i) {{
            idx_{key} = i;
            track_{key}.style.transform = 'translateX(-' + (idx_{key} * 100) + '%)';
            dots_{key}.forEach((d, j) => d.classList.toggle('active', j === idx_{key}));
            updateStreamlit_{key}(i);
        }}

        function findNumberInput_{key}() {{
            const containers = window.parent.document.querySelectorAll('[data-testid="stNumberInput"]');
            for (const container of containers) {{
                const input = container.querySelector('input[type="number"]');
                if (input) return input;
            }}
            return null;
        }}

        function updateStreamlit_{key}(idx) {{
            const input = findNumberInput_{key}();
            if (input && parseInt(input.value) !== idx) {{
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.parent.HTMLInputElement.prototype, 'value').set;
                nativeInputValueSetter.call(input, idx);
                input.dispatchEvent(new Event('input', {{ bubbles: true }}));
                input.dispatchEvent(new Event('change', {{ bubbles: true }}));
                input.dispatchEvent(new Event('blur', {{ bubbles: true }}));
            }}
        }}

        // Touch swipe
        let startX_{key} = 0;
        track_{key}.addEventListener('touchstart', e => startX_{key} = e.touches[0].clientX, {{passive: true}});
        track_{key}.addEventListener('touchend', e => {{
            const diff = e.changedTouches[0].clientX - startX_{key};
            if (diff < -50 && idx_{key} < {total - 1}) goTo(idx_{key} + 1);
            else if (diff > 50 && idx_{key} > 0) goTo(idx_{key} - 1);
        }}, {{passive: true}});

        // Mouse drag
        let dragging_{key} = false, mouseStartX_{key} = 0;
        track_{key}.addEventListener('mousedown', e => {{ dragging_{key} = true; mouseStartX_{key} = e.clientX; }});
        track_{key}.addEventListener('mouseup', e => {{
            if (!dragging_{key}) return;
            dragging_{key} = false;
            const diff = e.clientX - mouseStartX_{key};
            if (diff < -50 && idx_{key} < {total - 1}) goTo(idx_{key} + 1);
            else if (diff > 50 && idx_{key} > 0) goTo(idx_{key} - 1);
        }});
        track_{key}.addEventListener('mouseleave', () => dragging_{key} = false);
    </script>
    '''
    components.html(carousel_html, height=height)

    # 숨겨진 number_input으로 인덱스 받기
    state_key = f"{key}_current"
    input_key = f"{key}_idx"

    if state_key not in st.session_state:
        st.session_state[state_key] = current

    if input_key in st.session_state:
        st.session_state[state_key] = st.session_state[input_key]

    new_idx = st.number_input(
        input_key,
        min_value=0,
        max_value=total - 1,
        value=st.session_state[state_key],
        key=input_key,
        label_visibility="collapsed"
    )

    if new_idx != st.session_state[state_key]:
        st.session_state[state_key] = new_idx

    # number_input 숨기기
    st.markdown("""
    <style>
    div[data-testid="stNumberInput"] {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        height: 0;
        overflow: hidden;
    }
    </style>
    """, unsafe_allow_html=True)

    return new_idx
