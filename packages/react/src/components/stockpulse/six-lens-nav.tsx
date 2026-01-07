"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../lib/utils";

export interface LensItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  color: string;
  activeColor: string;
  description: string;
}

export interface SixLensNavProps {
  items: LensItem[];
  onFilterChange?: (activeIds: string[]) => void;
  showFilter?: boolean;
  className?: string;
}

export function SixLensNav({
  items,
  onFilterChange,
  showFilter = true,
  className,
}: SixLensNavProps) {
  const [activeItems, setActiveItems] = useState<string[]>(
    items.map((item) => item.id)
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    if (!showFilter) {
      scrollToSection(id);
      return;
    }

    const newActiveItems = activeItems.includes(id)
      ? activeItems.filter((item) => item !== id)
      : [...activeItems, id];

    if (newActiveItems.length === 0) return;

    setActiveItems(newActiveItems);
    onFilterChange?.(newActiveItems);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`lens-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleClick = (id: string) => {
    if (showFilter) {
      handleToggle(id);
    }
    scrollToSection(id);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {items.map((item) => {
          const isActive = activeItems.includes(item.id);
          const isHovered = hoveredItem === item.id;
          const IconComponent = item.icon;

          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => handleClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                  "border transition-all duration-300",
                  isActive ? item.activeColor : `${item.color} opacity-40`,
                  !isActive && "hover:opacity-70",
                  "cursor-pointer"
                )}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.name}</span>
                {showFilter && (
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      isActive ? "bg-current" : "bg-current/30"
                    )}
                  />
                )}
              </button>

              {isHovered && (
                <div
                  className={cn(
                    "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50",
                    "w-64 p-3 rounded-xl",
                    "bg-zinc-900/95 border border-white/10 backdrop-blur-sm",
                    "shadow-xl shadow-black/20",
                    "animate-fade-in"
                  )}
                >
                  <p className="text-xs text-white/70 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-zinc-900/95" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showFilter && activeItems.length < items.length && (
        <div className="mt-3 text-center">
          <button
            onClick={() => {
              const allIds = items.map((item) => item.id);
              setActiveItems(allIds);
              onFilterChange?.(allIds);
            }}
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            전체 선택 ({activeItems.length}/{items.length}개 선택됨)
          </button>
        </div>
      )}
    </div>
  );
}

export const defaultLensItems: Omit<LensItem, "icon">[] = [
  {
    id: "policy",
    name: "정책",
    color: "text-blue-400 bg-blue-500/20 border-blue-500/30",
    activeColor:
      "text-blue-300 bg-blue-500/30 border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    description:
      "정부 정책, 규제 변화, 세금 정책 등이 기업에 미치는 영향을 분석합니다.",
  },
  {
    id: "industry",
    name: "산업",
    color: "text-green-400 bg-green-500/20 border-green-500/30",
    activeColor:
      "text-green-300 bg-green-500/30 border-green-400/60 shadow-[0_0_15px_rgba(34,197,94,0.4)]",
    description:
      "산업 트렌드, 시장 성장률, 경쟁 구도 등 산업 환경을 분석합니다.",
  },
  {
    id: "momentum",
    name: "모멘텀",
    color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
    activeColor:
      "text-yellow-300 bg-yellow-500/30 border-yellow-400/60 shadow-[0_0_15px_rgba(234,179,8,0.4)]",
    description:
      "주가 추세, 거래량 변화, 투자자 심리 등 시장 모멘텀을 분석합니다.",
  },
  {
    id: "fundamental",
    name: "펀더멘털",
    color: "text-purple-400 bg-purple-500/20 border-purple-500/30",
    activeColor:
      "text-purple-300 bg-purple-500/30 border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    description:
      "재무제표, 수익성, 성장성, 안정성 등 기업의 기본 가치를 분석합니다.",
  },
  {
    id: "technical",
    name: "기술적",
    color: "text-red-400 bg-red-500/20 border-red-500/30",
    activeColor:
      "text-red-300 bg-red-500/30 border-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    description: "RSI, MACD, 이동평균선 등 기술적 지표를 분석합니다.",
  },
  {
    id: "news",
    name: "뉴스",
    color: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30",
    activeColor:
      "text-cyan-300 bg-cyan-500/30 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.4)]",
    description: "최신 뉴스, 애널리스트 리포트, 시장 반응 등을 분석합니다.",
  },
];
