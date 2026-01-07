import * as React from 'react';
import { cn } from '../../lib/utils';
import { getScoreGrade } from './theme';

export interface ScoreBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 현재 점수 */
  score: number;
  /** 최대 점수 */
  maxScore?: number;
  /** 바 높이 */
  height?: number;
  /** 점수에 따른 색상 자동 적용 */
  autoColor?: boolean;
  /** 커스텀 색상 (autoColor가 false일 때) */
  color?: string;
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
}

/**
 * ScoreBar - 점수 프로그레스 바 컴포넌트
 *
 * 선형 프로그레스 바로 점수를 시각화합니다.
 */
export const ScoreBar = React.forwardRef<HTMLDivElement, ScoreBarProps>(
  (
    {
      score,
      maxScore = 100,
      height = 6,
      autoColor = true,
      color,
      disableAnimation = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min((score / maxScore) * 100, 100);
    const grade = getScoreGrade(score, maxScore);
    const barColor = autoColor ? grade.color : (color ?? '#8b5cf6');

    return (
      <div
        ref={ref}
        className={cn('w-full bg-white/10 rounded-full overflow-hidden', className)}
        style={{ height, ...style }}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-full',
            !disableAnimation && 'transition-all duration-500'
          )}
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
          }}
        />
      </div>
    );
  }
);

ScoreBar.displayName = 'ScoreBar';
