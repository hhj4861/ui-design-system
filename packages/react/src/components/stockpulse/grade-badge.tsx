import * as React from 'react';
import { cn } from '../../lib/utils';
import { getScoreGrade, type ScoreGrade } from './theme';

export interface GradeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 점수 (자동 등급 계산) */
  score?: number;
  /** 최대 점수 */
  maxScore?: number;
  /** 직접 등급 지정 */
  grade?: ScoreGrade;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 이모지 표시 여부 */
  showEmoji?: boolean;
}

const sizeStyles = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-lg',
};

/**
 * GradeBadge - 등급 배지 컴포넌트
 *
 * 점수에 따른 등급을 배지 형태로 표시합니다.
 */
export const GradeBadge = React.forwardRef<HTMLDivElement, GradeBadgeProps>(
  (
    {
      score,
      maxScore = 100,
      grade: customGrade,
      size = 'md',
      showEmoji = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const grade = customGrade ?? (score !== undefined ? getScoreGrade(score, maxScore) : null);

    if (!grade) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 rounded-full font-bold',
          sizeStyles[size],
          className
        )}
        style={{
          background: `${grade.color}25`,
          color: grade.color,
          border: `1px solid ${grade.color}40`,
          ...style,
        }}
        {...props}
      >
        {showEmoji && <span>{grade.emoji}</span>}
        <span>{grade.text}</span>
      </div>
    );
  }
);

GradeBadge.displayName = 'GradeBadge';
