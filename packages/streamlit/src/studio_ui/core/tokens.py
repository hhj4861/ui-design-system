"""
studio_ui/core/tokens.py
브랜드 컬러, 타이포그래피, 간격 상수 정의
"""
from dataclasses import dataclass


@dataclass(frozen=True)
class Colors:
    """색상 토큰"""
    # 배경
    bg_main: str = "#f7f4f0"
    bg_card: str = "#fffdfb"
    bg_muted: str = "#faf8f5"
    bg_dark: str = "#2d251f"

    # 텍스트
    fg_primary: str = "#2d251f"
    fg_secondary: str = "#5c4a3d"
    fg_muted: str = "#8b7355"

    # 액센트 (브랜드 컬러)
    primary: str = "#c9a87c"
    primary_dark: str = "#b8976b"
    primary_light: str = "#d4b88a"

    # 시맨틱
    success: str = "#4a9d6b"
    success_bg: str = "#e8f5ed"
    warning: str = "#ffc107"
    warning_bg: str = "#fffbeb"
    error: str = "#dc3545"
    error_bg: str = "#fef2f2"
    info: str = "#fd7e14"

    # 테두리
    border_light: str = "#e8e2d9"
    border_dark: str = "#d9d2c9"


@dataclass(frozen=True)
class Typography:
    """타이포그래피 토큰"""
    font_family: str = "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"

    # 폰트 크기
    size_xs: str = "0.625rem"    # 10px
    size_sm: str = "0.75rem"     # 12px
    size_base: str = "0.875rem"  # 14px
    size_lg: str = "1rem"        # 16px
    size_xl: str = "1.25rem"     # 20px
    size_2xl: str = "1.5rem"     # 24px
    size_3xl: str = "1.75rem"    # 28px

    # 폰트 굵기
    weight_normal: int = 400
    weight_medium: int = 500
    weight_semibold: int = 600
    weight_bold: int = 700


@dataclass(frozen=True)
class Spacing:
    """간격 토큰"""
    xs: str = "0.25rem"   # 4px
    sm: str = "0.5rem"    # 8px
    md: str = "1rem"      # 16px
    lg: str = "1.5rem"    # 24px
    xl: str = "2rem"      # 32px
    xxl: str = "3rem"     # 48px


@dataclass(frozen=True)
class Radius:
    """테두리 곡률"""
    sm: str = "0.5rem"    # 8px
    md: str = "0.75rem"   # 12px
    lg: str = "1rem"      # 16px
    xl: str = "1.5rem"    # 24px
    full: str = "9999px"


@dataclass(frozen=True)
class Shadow:
    """그림자"""
    sm: str = "0 2px 8px rgba(0,0,0,0.06)"
    md: str = "0 4px 12px rgba(201,168,124,0.3)"
    lg: str = "0 8px 24px rgba(201,168,124,0.4)"
    dark: str = "0 8px 24px rgba(0,0,0,0.08)"


# 기본 인스턴스
COLORS = Colors()
TYPOGRAPHY = Typography()
SPACING = Spacing()
RADIUS = Radius()
SHADOW = Shadow()
