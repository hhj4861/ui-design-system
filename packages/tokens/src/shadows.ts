/**
 * Studio UI Design System - Shadow Tokens
 */

export const shadows = {
  none: 'none',
  sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
  md: '0 4px 12px rgba(201, 168, 124, 0.3)',    // Studio Gold tint
  lg: '0 8px 24px rgba(201, 168, 124, 0.4)',    // Studio Gold tint
  xl: '0 12px 32px rgba(0, 0, 0, 0.12)',
  dark: '0 8px 24px rgba(0, 0, 0, 0.08)',
} as const;

/** SpeedClinic용 그림자 (중립 색상) */
export const speedClinicShadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
} as const;

/** Deep Tech Glow용 그림자 (글로우 효과) */
export const deepTechGlowShadows = {
  none: 'none',
  sm: '0 0 10px rgba(168, 137, 108, 0.2)',
  md: '0 0 20px rgba(168, 137, 108, 0.3)',
  lg: '0 0 40px rgba(168, 137, 108, 0.4)',
  xl: '0 0 60px rgba(168, 137, 108, 0.5)',
  // 글로우 펄스 효과용
  glow: '0 0 20px rgba(168, 137, 108, 0.3)',
  glowStrong: '0 0 30px rgba(168, 137, 108, 0.5)',
} as const;

export type Shadows = typeof shadows;
export type SpeedClinicShadows = typeof speedClinicShadows;
export type DeepTechGlowShadows = typeof deepTechGlowShadows;
