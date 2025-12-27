"""
gonggu_ui/core/theme.py
CSS 변수 생성 및 테마 확장
"""
from dataclasses import dataclass, field, replace
from typing import Optional
from .tokens import Colors, COLORS


@dataclass
class Theme:
    """테마 클래스"""
    name: str = "gonggu"
    colors: Colors = field(default_factory=lambda: COLORS)

    def to_css_vars(self) -> str:
        """CSS 변수로 변환"""
        c = self.colors
        return f"""
        :root {{
            /* 배경 */
            --bg-main: {c.bg_main};
            --bg-card: {c.bg_card};
            --bg-muted: {c.bg_muted};
            --bg-dark: {c.bg_dark};

            /* 텍스트 */
            --fg-primary: {c.fg_primary};
            --fg-secondary: {c.fg_secondary};
            --fg-muted: {c.fg_muted};

            /* 액센트 */
            --primary: {c.primary};
            --primary-dark: {c.primary_dark};
            --primary-light: {c.primary_light};

            /* 시맨틱 */
            --success: {c.success};
            --success-bg: {c.success_bg};
            --warning: {c.warning};
            --warning-bg: {c.warning_bg};
            --error: {c.error};
            --error-bg: {c.error_bg};
            --info: {c.info};

            /* 테두리 */
            --border-light: {c.border_light};
            --border-dark: {c.border_dark};

            /* 그림자 */
            --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
            --shadow-md: 0 4px 12px rgba(201,168,124,0.3);
            --shadow-lg: 0 8px 24px rgba(201,168,124,0.4);
            --shadow-dark: 0 8px 24px rgba(0,0,0,0.08);

            /* 테두리 곡률 */
            --radius-sm: 0.5rem;
            --radius-md: 0.75rem;
            --radius-lg: 1rem;
            --radius-xl: 1.5rem;
            --radius-full: 9999px;

            /* 트랜지션 */
            --transition-fast: 0.15s ease;
            --transition-normal: 0.2s ease;
            --transition-slow: 0.3s ease;
        }}
        """

    def extend(self, name: str, **color_overrides) -> "Theme":
        """
        커스텀 색상으로 테마 확장

        Example:
            >>> custom = DEFAULT_THEME.extend(
            ...     name="my_brand",
            ...     primary="#007bff",
            ...     primary_dark="#0056b3",
            ... )
        """
        new_colors = replace(self.colors, **color_overrides)
        return Theme(name=name, colors=new_colors)


# 기본 테마
DEFAULT_THEME = Theme()

# 다크 테마
DARK_THEME = DEFAULT_THEME.extend(
    name="dark",
    bg_main="#1a1a1a",
    bg_card="#2d2d2d",
    bg_muted="#3d3d3d",
    fg_primary="#ffffff",
    fg_secondary="#cccccc",
    fg_muted="#999999",
    border_light="#444444",
    border_dark="#555555",
)
