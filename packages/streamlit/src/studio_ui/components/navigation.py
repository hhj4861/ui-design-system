"""
studio_ui/components/navigation.py
네비게이션 컴포넌트 - CSS-only 햄버거 메뉴
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
    GNB (Global Navigation Bar) - CSS-only 햄버거 메뉴
    """
    if menu_items is None:
        menu_items = [
            {"label": "매칭하기", "page": "matching"},
        ]

    menu_html = ""
    for item in menu_items:
        href = "?page=" + item['page']
        if "section" in item:
            href += "&section=" + item['section']
        menu_html += '    <a class="x-menu-item" href="' + href + '" target="_top">' + item["label"] + '</a>\n'

    html = """
<style>
    .x-toggle { display: none; }
    .x-bar {
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
    .x-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none !important;
        color: inherit;
    }
    .x-logo-icon {
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
    .x-logo-text {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2d251f;
    }
    .x-hamburger {
        position: fixed;
        top: 1rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
        background: transparent;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        z-index: 1000004;
        border-radius: 0.5rem;
    }
    .x-hamburger:hover { background: rgba(0,0,0,0.05); }
    .x-line { width: 20px; height: 2px; background: #2d251f; border-radius: 1px; }
    .x-close {
        position: fixed;
        top: 1rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
        color: #2d251f;
        cursor: pointer;
        z-index: 1000005;
        display: none;
        align-items: center;
        justify-content: center;
    }
    .x-menu {
        position: fixed;
        top: 70px; left: 0; right: 0; bottom: 0;
        background: #fffdfb;
        z-index: 1000002;
        padding: 2rem;
        display: none;
    }
    .x-spacer { height: 70px; }
    .x-toggle:checked ~ .x-close { display: flex; }
    .x-toggle:checked ~ .x-hamburger { display: none; }
    .x-toggle:checked ~ .x-menu { display: block; }
    .x-menu-item {
        display: block;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0.875rem 0;
        color: #2d251f;
        text-decoration: none !important;
    }
    .x-menu-item:hover { color: #c9a87c; }
</style>
<input type="checkbox" id="xToggle" class="x-toggle">
<label for="xToggle" class="x-hamburger"><span class="x-line"></span><span class="x-line"></span><span class="x-line"></span></label>
<label for="xToggle" class="x-close">✕</label>
<div class="x-menu">
""" + menu_html + """</div>
<div class="x-bar">
    <a class="x-logo" href="?page=""" + landing_page + """" target="_top">
        <div class="x-logo-icon">""" + logo_icon + """</div>
        <span class="x-logo-text">""" + logo_text + """</span>
    </a>
</div>
<div class="x-spacer"></div>
"""

    st.markdown(html, unsafe_allow_html=True)


def gnb_html(
    logo_icon: str = "G",
    logo_text: str = "공구매칭",
    menu_items: Optional[List[Dict[str, str]]] = None,
    landing_page: str = "landing",
) -> str:
    """
    GNB HTML 문자열 반환 (테스트용)
    """
    if menu_items is None:
        menu_items = [
            {"label": "매칭하기", "page": "matching"},
        ]

    menu_html = ""
    for item in menu_items:
        href = "?page=" + item['page']
        if "section" in item:
            href += "&section=" + item['section']
        menu_html += '    <a class="x-menu-item" href="' + href + '" target="_top">' + item["label"] + '</a>\n'

    return """
<style>
    .x-toggle { display: none; }
    .x-bar {
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
    .x-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none !important;
        color: inherit;
    }
    .x-logo-icon {
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
    .x-logo-text {
        font-size: 1.25rem;
        font-weight: 700;
        color: #2d251f;
    }
    .x-hamburger {
        position: fixed;
        top: 1rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
        background: transparent;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        z-index: 1000004;
        border-radius: 0.5rem;
    }
    .x-hamburger:hover { background: rgba(0,0,0,0.05); }
    .x-line { width: 20px; height: 2px; background: #2d251f; border-radius: 1px; }
    .x-close {
        position: fixed;
        top: 1rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
        font-size: 1.5rem;
        color: #2d251f;
        cursor: pointer;
        z-index: 1000005;
        display: none;
        align-items: center;
        justify-content: center;
    }
    .x-menu {
        position: fixed;
        top: 70px; left: 0; right: 0; bottom: 0;
        background: #fffdfb;
        z-index: 1000002;
        padding: 2rem;
        display: none;
    }
    .x-spacer { height: 70px; }
    .x-toggle:checked ~ .x-close { display: flex; }
    .x-toggle:checked ~ .x-hamburger { display: none; }
    .x-toggle:checked ~ .x-menu { display: block; }
    .x-menu-item {
        display: block;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0.875rem 0;
        color: #2d251f;
        text-decoration: none !important;
    }
    .x-menu-item:hover { color: #c9a87c; }
</style>
<input type="checkbox" id="xToggle" class="x-toggle">
<label for="xToggle" class="x-hamburger"><span class="x-line"></span><span class="x-line"></span><span class="x-line"></span></label>
<label for="xToggle" class="x-close">✕</label>
<div class="x-menu">
""" + menu_html + """</div>
<div class="x-bar">
    <a class="x-logo" href="?page=""" + landing_page + """" target="_top">
        <div class="x-logo-icon">""" + logo_icon + """</div>
        <span class="x-logo-text">""" + logo_text + """</span>
    </a>
</div>
<div class="x-spacer"></div>
"""
