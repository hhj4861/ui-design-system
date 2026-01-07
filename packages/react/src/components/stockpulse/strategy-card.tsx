"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export type VerdictType = "매수" | "보류" | "매도" | "buy" | "hold" | "sell";

export interface TradingStrategy {
  currentPrice: number;
  entryPrice: number;
  target1: number;
  target2: number;
  verdict: VerdictType;
  currency?: string;
}

export interface StrategyCardProps {
  strategy: TradingStrategy;
  formatPrice?: (price: number, currency?: string) => string;
  className?: string;
}

const verdictColors: Record<string, { bg: string; text: string; border: string }> = {
  매수: {
    bg: "rgba(16, 185, 129, 0.1)",
    text: "#10b981",
    border: "rgba(16, 185, 129, 0.3)",
  },
  buy: {
    bg: "rgba(16, 185, 129, 0.1)",
    text: "#10b981",
    border: "rgba(16, 185, 129, 0.3)",
  },
  보류: {
    bg: "rgba(251, 191, 36, 0.1)",
    text: "#fbbf24",
    border: "rgba(251, 191, 36, 0.3)",
  },
  hold: {
    bg: "rgba(251, 191, 36, 0.1)",
    text: "#fbbf24",
    border: "rgba(251, 191, 36, 0.3)",
  },
  매도: {
    bg: "rgba(239, 68, 68, 0.1)",
    text: "#ef4444",
    border: "rgba(239, 68, 68, 0.3)",
  },
  sell: {
    bg: "rgba(239, 68, 68, 0.1)",
    text: "#ef4444",
    border: "rgba(239, 68, 68, 0.3)",
  },
};

const defaultFormatPrice = (price: number, currency?: string): string => {
  if (currency === "KRW") {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(price);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(price);
};

export function StrategyCard({
  strategy,
  formatPrice = defaultFormatPrice,
  className,
}: StrategyCardProps) {
  const verdictStyle = verdictColors[strategy.verdict] || verdictColors["hold"];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border-none",
        className
      )}
      style={{
        background:
          "linear-gradient(145deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))",
        border: "1px solid rgba(167, 139, 250, 0.2)",
      }}
    >
      <div className="pb-3 p-6 border-b border-white/5">
        <h3 className="flex items-center gap-3 text-lg font-semibold">
          <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg">
            💸
          </span>
          <span>매매 전략</span>
        </h3>
      </div>
      <div className="p-6 pt-4">
        <div className="space-y-4">
          {/* Price Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">전일종가</p>
              <p className="text-lg font-semibold">
                {formatPrice(strategy.currentPrice, strategy.currency)}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">적정 매수가</p>
              <p className="text-lg font-semibold text-emerald-400">
                {strategy.entryPrice > 0
                  ? formatPrice(strategy.entryPrice, strategy.currency)
                  : "분석 필요"}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">1차 목표가</p>
              <p className="text-lg font-semibold text-violet-400">
                {strategy.target1 > 0
                  ? formatPrice(strategy.target1, strategy.currency)
                  : "분석 필요"}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">2차 목표가</p>
              <p className="text-lg font-semibold text-pink-400">
                {strategy.target2 > 0
                  ? formatPrice(strategy.target2, strategy.currency)
                  : "분석 필요"}
              </p>
            </div>
          </div>

          {/* Verdict */}
          <div
            className="rounded-xl p-4 text-center"
            style={{
              background: verdictStyle.bg,
              border: `1px solid ${verdictStyle.border}`,
            }}
          >
            <p className="text-sm text-muted-foreground mb-1">최종 판단</p>
            <p
              className="text-2xl font-bold"
              style={{ color: verdictStyle.text }}
            >
              {strategy.verdict}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
