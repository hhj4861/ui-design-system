'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
}

function SectionHeader({ label, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-6', className)}>
      <div className="text-xs font-semibold text-[var(--muted,#8b7355)] uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="text-xl font-bold text-[var(--foreground,#2d251f)] mb-1">
        {title}
      </div>
      {subtitle && (
        <div className="text-sm text-[var(--muted,#8b7355)]">
          {subtitle}
        </div>
      )}
    </div>
  );
}

SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
export type { SectionHeaderProps };
