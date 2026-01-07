'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 마퀴 안에 들어갈 아이템들 */
  children: React.ReactNode;
  /** 애니메이션 속도 (초) */
  duration?: number;
  /** 일시정지 on hover */
  pauseOnHover?: boolean;
  /** 마퀴 방향 */
  direction?: 'left' | 'right';
  /** 그라데이션 마스크 적용 */
  gradient?: boolean;
  /** 그라데이션 너비 (%) */
  gradientWidth?: number;
}

/**
 * Marquee - 무한 스크롤 마퀴 컴포넌트
 *
 * 아이템들이 무한히 스크롤되는 마퀴 효과를 제공합니다.
 */
export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      children,
      duration = 25,
      pauseOnHover = true,
      direction = 'left',
      gradient = true,
      gradientWidth = 10,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const animationDirection = direction === 'left' ? 'normal' : 'reverse';

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={{
          ...(gradient && {
            maskImage: `linear-gradient(to right, transparent, black ${gradientWidth}%, black ${100 - gradientWidth}%, transparent)`,
            WebkitMaskImage: `linear-gradient(to right, transparent, black ${gradientWidth}%, black ${100 - gradientWidth}%, transparent)`,
          }),
          ...style,
        }}
        {...props}
      >
        <div
          className={cn('flex w-max', pauseOnHover && 'hover:[&>*]:pause-animation')}
          style={{
            ['--marquee-duration' as string]: `${duration}s`,
          }}
        >
          {/* 첫 번째 트랙 */}
          <div
            className="flex shrink-0"
            style={{
              animation: `marquee-scroll var(--marquee-duration) linear infinite`,
              animationDirection,
            }}
          >
            {children}
          </div>
          {/* 두 번째 트랙 (이음새 없는 순환) */}
          <div
            className="flex shrink-0"
            style={{
              animation: `marquee-scroll var(--marquee-duration) linear infinite`,
              animationDirection,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Marquee.displayName = 'Marquee';

/**
 * Marquee CSS (globals.css에 추가 필요)
 *
 * @keyframes marquee-scroll {
 *   0% { transform: translateX(0); }
 *   100% { transform: translateX(-100%); }
 * }
 *
 * .pause-animation {
 *   animation-play-state: paused !important;
 * }
 */
