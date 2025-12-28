"""
studio-ui: Streamlit 범용 디자인 시스템
"""
# Core
from studio_ui.core.tokens import COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW
from studio_ui.core.theme import Theme, DEFAULT_THEME, DARK_THEME
from studio_ui.core.styles import apply_theme, inject_css

# Components - Atoms
from studio_ui.components.atoms import badge, section_label, section_title, label_badge, link_icon

# Components - Cards
from studio_ui.components.cards import (
    PricingPlan,
    pricing_card,
    pricing_grid,
    pricing_card_html,
    feature_card,
    StatItem,
    stats_card,
    upload_card,
)

# Components - Layouts
from studio_ui.components.layouts import (
    section_container,
    section_end,
    card_grid,
)
from studio_ui.components.layout import container, section_header, hero

# Components - Forms
from studio_ui.components.forms import (
    column_matcher,
    tab_selector,
)

# Components - Navigation
from studio_ui.components.navigation import gnb, gnb_html

# Components - Slider
from studio_ui.components.slider import swipe_slider

# Components - Step Carousel
from studio_ui.components.step_carousel import step_carousel

# Components - Action Card
from studio_ui.components.action_card import action_card, action_card_style

__version__ = "0.1.0"

__all__ = [
    # Core
    "COLORS",
    "TYPOGRAPHY",
    "SPACING",
    "RADIUS",
    "SHADOW",
    "Theme",
    "DEFAULT_THEME",
    "DARK_THEME",
    "apply_theme",
    "inject_css",
    # Atoms
    "badge",
    "section_label",
    "section_title",
    "label_badge",
    "link_icon",
    # Cards
    "PricingPlan",
    "pricing_card",
    "pricing_grid",
    "pricing_card_html",
    "feature_card",
    "StatItem",
    "stats_card",
    "upload_card",
    # Layouts
    "section_container",
    "section_end",
    "card_grid",
    "container",
    "section_header",
    "hero",
    # Forms
    "column_matcher",
    "tab_selector",
    # Navigation
    "gnb",
    "gnb_html",
    # Slider
    "swipe_slider",
    # Step Carousel
    "step_carousel",
    # Action Card
    "action_card",
    "action_card_style",
]
