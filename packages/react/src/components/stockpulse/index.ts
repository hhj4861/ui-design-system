/**
 * StockPulse 전용 컴포넌트
 *
 * StockPulse 프로젝트 스타일의 다크 테마 컴포넌트들입니다.
 * Violet 계열 컬러와 glass-morphism 스타일이 특징입니다.
 *
 * 사용법:
 * import { GlassCard, ScoreCircle } from '@studio-ui/react/components/stockpulse';
 */

// Layout & Cards
export { GlassCard, type GlassCardProps } from './glass-card';
export { CategoryCard, type CategoryCardProps } from './category-card';

// Score & Progress
export { ScoreCircle, type ScoreCircleProps } from './score-circle';
export { ScoreBar, type ScoreBarProps } from './score-bar';
export { GradeBadge, type GradeBadgeProps } from './grade-badge';

// Data Display
export { StatGrid, StatItem, type StatGridProps, type StatItemProps } from './stat-grid';
export { PriceDisplay, type PriceDisplayProps } from './price-display';
export { VerdictBadge, type VerdictBadgeProps, type VerdictType } from './verdict-badge';

// Animation
export { Marquee, type MarqueeProps } from './marquee';

// Theme
export {
  stockpulseTheme,
  getScoreGrade,
  type ScoreGrade,
  type StockPulseTheme,
} from './theme';
