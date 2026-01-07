import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카테고리 아이콘 */
  icon?: React.ReactNode;
  /** 카테고리 라벨 */
  label: string;
  /** 카테고리 색상 */
  color?: string;
  /** 우측 상단 액션/정보 */
  action?: React.ReactNode;
  /** 카드 내용 */
  children: React.ReactNode;
  /** 좌측 border 표시 */
  showBorder?: boolean;
}

/**
 * CategoryCard - 카테고리별 콘텐츠 카드
 *
 * 아이콘, 라벨, 색상으로 구분되는 카테고리 카드입니다.
 */
export const CategoryCard = React.forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      icon,
      label,
      color = '#8b5cf6',
      action,
      children,
      showBorder = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl overflow-hidden transition-all hover:shadow-lg',
          className
        )}
        style={{
          background: `linear-gradient(135deg, ${color}08, ${color}04)`,
          borderLeft: showBorder ? `3px solid ${color}` : undefined,
          ...style,
        }}
        {...props}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-white">
            {icon && <span>{icon}</span>}
            <span>{label}</span>
          </div>
          {action}
        </div>

        {/* 콘텐츠 */}
        <div className="px-5 pb-5">{children}</div>
      </div>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';
