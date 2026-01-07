"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { getScoreGrade, type ScoreGrade } from "./theme";

export interface ScoreItem {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export interface ScoreDashboardProps {
  scores: Record<string, number>;
  items: ScoreItem[];
  maxScore?: number;
  maxItemScore?: number;
  className?: string;
}

export function ScoreDashboard({
  scores,
  items,
  maxScore = 100,
  maxItemScore = 20,
  className,
}: ScoreDashboardProps) {
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const grade = getScoreGrade(totalScore, maxScore);
  const percentage = (totalScore / maxScore) * 100;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border-none",
        className
      )}
      style={{
        background:
          "linear-gradient(145deg, rgba(20, 20, 35, 0.95), rgba(35, 35, 55, 0.95))",
      }}
    >
      {/* Header - Total Score */}
      <div
        className="p-8 text-center border-b border-white/5"
        style={{
          background: `linear-gradient(135deg, ${grade.color}15, ${grade.color}08)`,
        }}
      >
        {/* Circular Score */}
        <div className="relative w-36 h-36 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="64"
              fill="none"
              stroke="rgba(100, 100, 120, 0.3)"
              strokeWidth="12"
            />
            <circle
              cx="72"
              cy="72"
              r="64"
              fill="none"
              stroke={grade.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 402} 402`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-4xl font-extrabold"
              style={{ color: grade.color }}
            >
              {totalScore}
            </span>
            <span className="text-sm text-muted-foreground">/ {maxScore}</span>
          </div>
        </div>

        {/* Grade Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-lg mb-2"
          style={{
            background: `${grade.color}25`,
            color: grade.color,
            border: `1px solid ${grade.color}40`,
          }}
        >
          {grade.emoji} {grade.text}
        </div>
        <p className="text-sm text-muted-foreground">{grade.description}</p>
      </div>

      {/* Individual Scores Grid */}
      <div className="p-6">
        <div
          className={cn(
            "grid gap-3",
            items.length <= 5
              ? "grid-cols-2 lg:grid-cols-5"
              : "grid-cols-2 lg:grid-cols-3"
          )}
        >
          {items.map((item) => {
            const score = scores[item.key] || 0;
            const scorePercent = (score / maxItemScore) * 100;
            const itemGrade = getScoreGrade(score, maxItemScore);

            return (
              <div
                key={item.key}
                className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  {item.icon} {item.label}
                </div>
                <div
                  className="text-2xl font-bold mb-2"
                  style={{ color: itemGrade.color }}
                >
                  {score}
                  <span className="text-sm text-muted-foreground font-normal">
                    /{maxItemScore}
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${scorePercent}%`,
                      background: `linear-gradient(90deg, ${itemGrade.color}, ${itemGrade.color}cc)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
