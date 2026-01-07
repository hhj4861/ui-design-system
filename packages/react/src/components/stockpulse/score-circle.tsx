import * as React from 'react';
import { cn } from '../../lib/utils';
import { getScoreGrade } from './theme';

export interface ScoreCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 현재 점수 */
  score: number;
  /** 최대 점수 */
  maxScore?: number;
  /** 원의 크기 (px) */
  size?: number;
  /** stroke 두께 */
  strokeWidth?: number;
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
  /** 중앙에 표시할 커스텀 라벨 */
  label?: React.ReactNode;
}

/**
 * ScoreCircle - 원형 점수 표시 컴포넌트
 *
 * SVG 기반의 원형 프로그레스 바로 점수를 시각화합니다.
 */
export const ScoreCircle = React.forwardRef<HTMLDivElement, ScoreCircleProps>(
  (
    {
      score,
      maxScore = 100,
      size = 144,
      strokeWidth = 12,
      disableAnimation = false,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const grade = getScoreGrade(score, maxScore);
    const percentage = (score / maxScore) * 100;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg className="w-full h-full -rotate-90">
          {/* 배경 원 */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(100, 100, 120, 0.3)"
            strokeWidth={strokeWidth}
          />
          {/* 프로그레스 원 */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={grade.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
            className={cn(!disableAnimation && 'transition-all duration-1000 ease-out')}
          />
        </svg>
        {/* 중앙 컨텐츠 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label ?? (
            <>
              <span
                className="text-4xl font-extrabold"
                style={{ color: grade.color }}
              >
                {score}
              </span>
              <span className="text-sm text-zinc-400">/ {maxScore}</span>
            </>
          )}
        </div>
      </div>
    );
  }
);

ScoreCircle.displayName = 'ScoreCircle';
