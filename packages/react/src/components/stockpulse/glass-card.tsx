import * as React from 'react';
import { cn } from '../../lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** hover 시 border 색상 변경 여부 */
  hoverEffect?: boolean;
  /** glass blur 효과 비활성화 (모바일 성능 최적화) */
  disableBlur?: boolean;
}

/**
 * GlassCard - StockPulse 스타일의 Glass Morphism 카드
 *
 * 다크 테마에서 반투명한 유리 느낌의 카드입니다.
 * 기본적으로 데스크탑에서만 blur 효과가 적용됩니다.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = true, disableBlur = false, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border transition-colors',
          hoverEffect && 'hover:border-violet-500/20',
          className
        )}
        style={{
          background: 'rgba(15, 15, 18, 0.95)',
          borderColor: 'rgba(255, 255, 255, 0.05)',
          ...(disableBlur
            ? {}
            : {
                // 데스크탑에서만 blur 적용을 위해 CSS에서 처리하거나
                // media query를 사용할 수 없으므로 기본적으로 적용
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }),
          ...style,
        }}
        {...props}
      />
    );
  }
);

GlassCard.displayName = 'GlassCard';
