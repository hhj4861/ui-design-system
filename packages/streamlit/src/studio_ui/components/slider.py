"""
studio_ui/components/slider.py
스와이프 슬라이더 컴포넌트
"""
import streamlit as st
import streamlit.components.v1 as components
from typing import List, Dict


def _render_radio_mode(slides: List[Dict[str, str]], current: int, key: str) -> int:
    """Radio 모드: Google Labs 스타일 pill 버튼 (st.button 기반 - 상태 동기화 보장)"""
    total = len(slides)
    state_key = f"{key}_idx"

    # 세션 상태 초기화
    if state_key not in st.session_state:
        st.session_state[state_key] = current

    # Google Labs 스타일 CSS
    st.markdown("""
    <style>
    /* pill 버튼 컨테이너 - 가로 스크롤 */
    [data-testid="stHorizontalBlock"] {
        flex-wrap: nowrap !important;
        overflow-x: auto !important;
        scrollbar-width: none !important;
        -webkit-overflow-scrolling: touch !important;
        gap: 8px !important;
        padding: 4px 0 !important;
    }
    [data-testid="stHorizontalBlock"]::-webkit-scrollbar {
        display: none !important;
    }
    /* 각 컬럼 - 자동 너비 */
    [data-testid="stHorizontalBlock"] > div[data-testid="stColumn"] {
        flex: 0 0 auto !important;
        width: auto !important;
        min-width: 0 !important;
    }
    /* pill 버튼 스타일 */
    [data-testid="stHorizontalBlock"] button[kind="secondary"] {
        background: #ffffff !important;
        border: 1px solid #dadce0 !important;
        border-radius: 100px !important;
        padding: 8px 20px !important;
        white-space: nowrap !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        color: #3c4043 !important;
        min-height: 0 !important;
        height: auto !important;
    }
    [data-testid="stHorizontalBlock"] button[kind="secondary"]:hover {
        background: #f8f9fa !important;
        border-color: #bdc1c6 !important;
    }
    /* 선택된 버튼 (primary) */
    [data-testid="stHorizontalBlock"] button[kind="primary"] {
        background: #f1f3f4 !important;
        border: 1px solid #5f6368 !important;
        border-radius: 100px !important;
        padding: 8px 20px !important;
        white-space: nowrap !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        color: #202124 !important;
        min-height: 0 !important;
        height: auto !important;
    }
    </style>
    """, unsafe_allow_html=True)

    # 버튼들을 columns로 배치
    cols = st.columns(total)

    for idx, (col, s) in enumerate(zip(cols, slides)):
        with col:
            emoji = s.get("emoji", "📌")
            title = s.get("title", "")
            label = f"{emoji} {title}"
            is_selected = st.session_state[state_key] == idx
            btn_type = "primary" if is_selected else "secondary"

            if st.button(label, key=f"{key}_btn_{idx}", type=btn_type):
                if st.session_state[state_key] != idx:
                    st.session_state[state_key] = idx
                    st.rerun()

    return st.session_state[state_key]


def swipe_slider(
    slides: List[Dict[str, str]],
    current: int = 0,
    key: str = "swipe_slider",
    height: int = 140,
    mode: str = "multi",
) -> int:
    """
    스와이프 슬라이더 (카드 형태)

    Args:
        slides: 슬라이드 리스트 [{"id": "name", "emoji": "👤", "title": "이름 연결", "type": "base"}, ...]
        current: 현재 선택된 인덱스
        key: 컴포넌트 키
        height: 컴포넌트 높이 (multi/single 모드에서만 사용)
        mode:
            - "multi": 여러 카드 표시, 스와이프 가능
            - "single": 한 카드씩 표시, 스와이프 가능
            - "radio": 카드형 라디오 버튼 (Streamlit 네이티브, 동기화 보장)

    Returns:
        선택된 슬라이드 인덱스

    Example:
        >>> slides = [
        ...     {"id": "name", "emoji": "👤", "title": "이름 연결", "type": "base"},
        ...     {"id": "amount", "emoji": "💰", "title": "금액 연결", "type": "base"},
        ...     {"id": "add", "emoji": "➕", "title": "매칭 추가", "type": "add"},
        ... ]
        >>> current = swipe_slider(slides, current=0)              # 여러 카드
        >>> current = swipe_slider(slides, current=0, mode="single")  # 한 카드씩
        >>> current = swipe_slider(slides, current=0, mode="radio")   # 라디오 버튼
    """
    total_slides = len(slides)
    current = min(current, total_slides - 1)

    # Radio 모드: Streamlit 네이티브 라디오 버튼 사용
    if mode == "radio":
        return _render_radio_mode(slides, current, key)

    is_single = mode == "single"

    # HTML 기반 가로 스와이프 카드
    cards_html = ""
    for idx, s in enumerate(slides):
        active = "active" if idx == current else ""
        add_class = "add-card" if s.get("type") == "add" else ""
        emoji = s.get("emoji", "📌")
        title = s.get("title", "")
        cards_html += f'''
        <div class="swipe-card {active} {add_class}" onclick="handleCardClick({idx})">
            <div class="card-emoji">{emoji}</div>
            <div class="card-title">{title}</div>
        </div>
        '''

    dots_html = "".join([
        f'<div class="dot {"active" if i == current else ""}" onclick="handleCardClick({i})"></div>'
        for i in range(total_slides)
    ])

    # 모드에 따른 카드 크기 CSS
    card_size_css = "flex: 0 0 calc(100% - 24px); min-width: calc(100% - 24px);" if is_single else "flex: 0 0 100px; min-width: 100px;"

    swipe_html = f'''
    <style>
        .swipe-outer {{
            width: 100%;
            padding: 8px 0;
        }}
        .swipe-track {{
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 12px;
            padding: 4px 8px;
            scrollbar-width: none;
            width: 100%;
            box-sizing: border-box;
        }}
        .swipe-track::-webkit-scrollbar {{
            display: none;
        }}
        .swipe-card {{
            {card_size_css}
            scroll-snap-align: center;
            background: linear-gradient(145deg, #ffffff, #f5f3f0);
            border: 2px solid #e0dcd6;
            border-radius: 16px;
            padding: 14px 6px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }}
        .swipe-card:hover {{
            border-color: #c9a87c;
            transform: translateY(-2px);
        }}
        .swipe-card.active {{
            border-color: #c9a87c;
            background: linear-gradient(145deg, #fff9f0, #fff5e6);
            box-shadow: 0 4px 12px rgba(201,168,124,0.3);
        }}
        .swipe-card.add-card {{
            background: linear-gradient(145deg, #f5f9ff, #eef5fd);
            border: 2px dashed #a0c4e8;
        }}
        .swipe-card.add-card.active {{
            border-color: #4a90d9;
            background: linear-gradient(145deg, #e8f2ff, #dceafa);
        }}
        .card-emoji {{
            font-size: 1.8rem;
            margin-bottom: 6px;
        }}
        .card-title {{
            font-size: 0.8rem;
            font-weight: 600;
            color: #3d3d3d;
        }}
        .dots-row {{
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 10px;
        }}
        .dot {{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #d5d5d5;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .dot.active {{
            width: 20px;
            border-radius: 4px;
            background: #c9a87c;
        }}
    </style>
    <div class="swipe-outer">
        <div class="swipe-track" id="swipeTrack">{cards_html}</div>
        <div class="dots-row">{dots_html}</div>
    </div>
    <script>
        const track = document.getElementById('swipeTrack');
        const cards = document.querySelectorAll('.swipe-card');

        function findNumberInput() {{
            // Streamlit number_input의 실제 input 요소 찾기
            const containers = window.parent.document.querySelectorAll('[data-testid="stNumberInput"]');
            for (const container of containers) {{
                const input = container.querySelector('input[type="number"]');
                if (input) return input;
            }}
            // 대체 방법: step button이 있는 input 찾기
            return window.parent.document.querySelector('input[type="number"][step="1"]');
        }}

        function updateStreamlitValue(idx) {{
            const input = findNumberInput();
            if (input && parseInt(input.value) !== idx) {{
                // React 방식으로 값 변경
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.parent.HTMLInputElement.prototype, 'value').set;
                nativeInputValueSetter.call(input, idx);
                input.dispatchEvent(new Event('input', {{ bubbles: true }}));
                input.dispatchEvent(new Event('change', {{ bubbles: true }}));
                // blur로 값 확정
                input.dispatchEvent(new Event('blur', {{ bubbles: true }}));
            }}
        }}

        function handleCardClick(idx) {{
            // 카드로 스크롤
            if (cards[idx]) {{
                cards[idx].scrollIntoView({{ behavior: 'smooth', inline: 'center', block: 'nearest' }});
            }}
            // 시각적 업데이트
            updateActiveState(idx);
            // Streamlit에 값 전달
            updateStreamlitValue(idx);
        }}

        function updateActiveState(idx) {{
            cards.forEach((c, i) => c.classList.toggle('active', i === idx));
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === idx));
        }}

        // 스크롤 기반 활성 카드 감지
        let scrollTimeout;
        track.addEventListener('scroll', () => {{
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {{
                const trackRect = track.getBoundingClientRect();
                const trackCenter = trackRect.left + trackRect.width / 2;

                let closestIdx = 0;
                let closestDist = Infinity;

                cards.forEach((card, i) => {{
                    const cardRect = card.getBoundingClientRect();
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    const dist = Math.abs(cardCenter - trackCenter);
                    if (dist < closestDist) {{
                        closestDist = dist;
                        closestIdx = i;
                    }}
                }});

                updateActiveState(closestIdx);
                updateStreamlitValue(closestIdx);
            }}, 150);
        }});

        // 초기 스크롤
        setTimeout(() => {{
            const active = document.querySelector('.swipe-card.active');
            if (active) active.scrollIntoView({{ inline: 'center', block: 'nearest' }});
        }}, 50);
    </script>
    '''
    components.html(swipe_html, height=height)

    # 숨겨진 number_input으로 슬라이드 인덱스 받기
    state_key = f"{key}_current"
    input_key = f"{key}_idx"

    # 초기 상태 설정
    if state_key not in st.session_state:
        st.session_state[state_key] = current

    # number_input의 현재 값 확인 (JS에서 변경된 값)
    if input_key in st.session_state:
        # JS에서 변경된 값이 있으면 state_key도 업데이트
        st.session_state[state_key] = st.session_state[input_key]

    new_idx = st.number_input(
        input_key,
        min_value=0,
        max_value=total_slides - 1,
        value=st.session_state[state_key],
        key=input_key,
        label_visibility="collapsed"
    )

    # number_input 값이 변경되면 state_key도 업데이트
    if new_idx != st.session_state[state_key]:
        st.session_state[state_key] = new_idx

    # CSS로 number_input 숨기기
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
