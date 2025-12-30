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

export type Shadows = typeof shadows;
export type SpeedClinicShadows = typeof speedClinicShadows;
