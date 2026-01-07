import * as React from 'react';
import { cn } from '../../lib/utils';

export type VerdictType = 'buy' | 'hold' | 'sell' | 'strong-buy' | 'strong-sell';

export interface VerdictBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 판정 타입 */
  verdict: VerdictType;
  /** 커스텀 라벨 (없으면 기본값 사용) */
  label?: string;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 아이콘 표시 */
  showIcon?: boolean;
}

const verdictConfig: Record<VerdictType, { label: string; icon: string; bg: string; text: string; border: string }> = {
  'strong-buy': {
    label: '매우 강력 매수',
    icon: '🚀',
    bg: 'rgba(16, 185, 129, 0.15)',
    text: '#10b981',
    border: 'rgba(16, 185, 129, 0.4)',
  },
  buy: {
    label: '매수',
    icon: '👍',
    bg: 'rgba(16, 185, 129, 0.1)',
    text: '#10b981',
    border: 'rgba(16, 185, 129, 0.3)',
  },
  hold: {
    label: '보류',
    icon: '⚖️',
    bg: 'rgba(251, 191, 36, 0.1)',
    text: '#fbbf24',
    border: 'rgba(251, 191, 36, 0.3)',
  },
  sell: {
    label: '매도',
    icon: '👎',
    bg: 'rgba(239, 68, 68, 0.1)',
    text: '#ef4444',
    border: 'rgba(239, 68, 68, 0.3)',
  },
  'strong-sell': {
    label: '강력 매도',
    icon: '🔻',
    bg: 'rgba(239, 68, 68, 0.15)',
    text: '#ef4444',
    border: 'rgba(239, 68, 68, 0.4)',
  },
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
};

/**
 * VerdictBadge - 판정 배지 컴포넌트
 *
 * 매수/보류/매도 등의 판정을 시각적으로 표시합니다.
 */
export const VerdictBadge = React.forwardRef<HTMLDivElement, VerdictBadgeProps>(
  ({ verdict, label, size = 'md', showIcon = true, className, style, ...props }, ref) => {
    const config = verdictConfig[verdict];
    const displayLabel = label ?? config.label;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-bold',
          sizeClasses[size],
          className
        )}
        style={{
          background: config.bg,
          color: config.text,
          border: `1px solid ${config.border}`,
          ...style,
        }}
        {...props}
      >
        {showIcon && <span>{config.icon}</span>}
        <span>{displayLabel}</span>
      </div>
    );
  }
);

VerdictBadge.displayName = 'VerdictBadge';
