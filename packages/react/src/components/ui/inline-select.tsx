'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

interface InlineSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

function InlineSelect({
  value,
  onChange,
  options,
  placeholder = '선택하세요',
  className,
}: InlineSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 클라이언트 사이드에서만 포탈 사용
  useEffect(() => {
    setMounted(true);
  }, []);

  // 드롭다운 위치 계산
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideContainer = containerRef.current?.contains(target);
      const isInsideDropdown = dropdownRef.current?.contains(target);
      if (!isInsideContainer && !isInsideDropdown) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 외부 스크롤 시 드롭다운 닫기 (드롭다운 내부 스크롤은 제외)
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (dropdownRef.current?.contains(e.target as Node)) {
        return;
      }
      if (isOpen) setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
  };

  const dropdown = isOpen ? (
    <div
      ref={dropdownRef}
      style={dropdownStyle}
      className="bg-white border border-t-0 border-[var(--primary,#c9a87c)] rounded-b-lg shadow-lg overflow-hidden"
    >
      <div className="max-h-48 overflow-y-auto">
        {options.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(opt);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            className={cn(
              'w-full px-3 py-2.5 text-left text-sm hover:bg-[var(--card,#faf8f5)]',
              idx < options.length - 1 && 'border-b border-[var(--border-light,#f0ebe3)]',
              opt === value
                ? 'bg-[var(--card,#faf8f5)] text-[var(--primary,#c9a87c)] font-medium'
                : 'text-[var(--foreground,#2d251f)]'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className={cn(
          'w-full p-2.5 border rounded-lg bg-white text-sm text-left flex items-center justify-between',
          isOpen
            ? 'border-[var(--primary,#c9a87c)] rounded-b-none'
            : 'border-[var(--border,#e8e2d9)]',
          !value && 'text-[var(--muted,#8b7355)]'
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          className={cn(
            'w-4 h-4 text-[var(--muted,#8b7355)] flex-shrink-0 ml-2 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {mounted && createPortal(dropdown, document.body)}
    </div>
  );
}

InlineSelect.displayName = 'InlineSelect';

export { InlineSelect };
export type { InlineSelectProps };
