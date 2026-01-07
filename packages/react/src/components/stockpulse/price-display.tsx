import * as React from 'react';
import { cn } from '../../lib/utils';

export interface PriceDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 가격 */
  price: number;
  /** 통화 */
  currency?: 'KRW' | 'USD' | 'EUR' | 'JPY';
  /** 변동 금액 */
  change?: number;
  /** 변동률 (%) */
  changePercent?: number;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 라벨 */
  label?: string;
  /** 숫자 축약 (K, M, B) */
  compact?: boolean;
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

const currencySymbols: Record<string, string> = {
  KRW: '₩',
  USD: '$',
  EUR: '€',
  JPY: '¥',
};

/**
 * 숫자 포맷팅
 */
function formatPrice(
  price: number,
  currency: string = 'KRW',
  compact: boolean = false
): string {
  if (compact) {
    if (price >= 1_000_000_000_000) {
      return `${currencySymbols[currency]}${(price / 1_000_000_000_000).toFixed(1)}조`;
    }
    if (price >= 100_000_000) {
      return `${currencySymbols[currency]}${(price / 100_000_000).toFixed(1)}억`;
    }
    if (price >= 10_000) {
      return `${currencySymbols[currency]}${(price / 10_000).toFixed(1)}만`;
    }
  }

  const formatted = new Intl.NumberFormat(currency === 'KRW' ? 'ko-KR' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'KRW' ? 0 : 2,
    maximumFractionDigits: currency === 'KRW' ? 0 : 2,
  }).format(price);

  return formatted;
}

/**
 * PriceDisplay - 가격 표시 컴포넌트
 *
 * 가격과 변동률을 함께 표시합니다.
 */
export const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      price,
      currency = 'KRW',
      change,
      changePercent,
      size = 'lg',
      label,
      compact = false,
      className,
      ...props
    },
    ref
  ) => {
    const isPositive = (change ?? 0) >= 0;
    const hasChange = change !== undefined || changePercent !== undefined;

    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {label && <p className="text-xs text-white/40 mb-1">{label}</p>}
        <p className={cn('font-bold text-white', sizeClasses[size])}>
          {formatPrice(price, currency, compact)}
        </p>
        {hasChange && (
          <div
            className={cn(
              'inline-flex items-center gap-1 mt-1 text-sm font-medium',
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            <span>{isPositive ? '▲' : '▼'}</span>
            {change !== undefined && (
              <span>
                {isPositive ? '+' : ''}
                {formatPrice(Math.abs(change), currency, compact)}
              </span>
            )}
            {changePercent !== undefined && (
              <span>
                ({isPositive ? '+' : ''}
                {changePercent.toFixed(2)}%)
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

PriceDisplay.displayName = 'PriceDisplay';
