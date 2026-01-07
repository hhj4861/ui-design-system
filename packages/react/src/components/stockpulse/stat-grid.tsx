import * as React from 'react';
import { cn } from '../../lib/utils';

export interface StatItemProps {
  /** 라벨 */
  label: string;
  /** 값 */
  value: string | number;
  /** 서브 값 (변동률 등) */
  subValue?: string;
  /** 서브 값 색상 */
  subValueColor?: 'positive' | 'negative' | 'neutral';
  /** 아이콘 */
  icon?: React.ReactNode;
}

export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 통계 아이템들 */
  items: StatItemProps[];
  /** 컬럼 수 */
  columns?: 2 | 3 | 4 | 5 | 6;
}

const subValueColors = {
  positive: 'text-emerald-400',
  negative: 'text-rose-400',
  neutral: 'text-zinc-400',
};

const columnClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

/**
 * StatItem - 단일 통계 아이템
 */
export function StatItem({
  label,
  value,
  subValue,
  subValueColor = 'neutral',
  icon,
}: StatItemProps) {
  return (
    <div className="text-center">
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <div className="flex items-center justify-center gap-1">
        {icon}
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
      {subValue && (
        <p className={cn('text-xs mt-0.5', subValueColors[subValueColor])}>
          {subValue}
        </p>
      )}
    </div>
  );
}

/**
 * StatGrid - 통계 그리드 컴포넌트
 *
 * 여러 통계 항목을 그리드로 표시합니다.
 */
export const StatGrid = React.forwardRef<HTMLDivElement, StatGridProps>(
  ({ items, columns = 4, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('grid gap-3', columnClasses[columns], className)}
        {...props}
      >
        {items.map((item, index) => (
          <StatItem key={index} {...item} />
        ))}
      </div>
    );
  }
);

StatGrid.displayName = 'StatGrid';
