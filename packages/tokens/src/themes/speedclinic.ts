/**
 * SpeedClinic Theme
 * Dark + Beige 테마 재내보내기 (하위 호환성 유지)
 *
 * @deprecated studio 테마를 직접 사용하세요
 * import { studioTheme, generateStudioCss } from './studio';
 */

import { studioTheme, generateStudioCss, type StudioTheme } from './studio';

/** @deprecated studioTheme 사용 권장 */
export const speedClinicTheme = {
  ...studioTheme,
  name: 'speedclinic', // 하위 호환성을 위해 이름 유지
} as const;

/** @deprecated generateStudioCss 사용 권장 */
export const generateSpeedClinicCss = generateStudioCss;

/** @deprecated StudioTheme 사용 권장 */
export type SpeedClinicTheme = StudioTheme;
