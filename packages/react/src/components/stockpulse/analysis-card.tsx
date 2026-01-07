"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { getScoreGrade } from "./theme";

export interface AnalysisStep {
  key: string;
  label: string;
  icon: string;
  color: string;
}

export interface AnalysisCardProps {
  step: AnalysisStep;
  content: string;
  score?: number;
  maxScore?: number;
  expanded?: boolean;
  className?: string;
}

function formatContent(text: string): string {
  if (!text) return "";

  let html = text;
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>');
  // List
  html = html.replace(/^- (.+)$/gm, "• $1");
  // Line break
  html = html.replace(/\n/g, "<br/>");

  return html;
}

export function AnalysisCard({
  step,
  content,
  score = 0,
  maxScore = 20,
  expanded = false,
  className,
}: AnalysisCardProps) {
  const grade = getScoreGrade(score, maxScore);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border-none transition-all hover:shadow-lg",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${step.color}08, ${step.color}04)`,
        borderLeft: `3px solid ${step.color}`,
      }}
    >
      <div className="p-6 pb-3">
        <h3 className="flex items-center justify-between text-lg font-semibold">
          <span className="flex items-center gap-2">
            <span>{step.icon}</span>
            <span>{step.label} 분석</span>
          </span>
          {score > 0 && (
            <span className="text-base font-bold" style={{ color: grade.color }}>
              {score}/{maxScore}
            </span>
          )}
        </h3>
      </div>
      <div className="px-6 pb-6">
        <div
          className={cn(
            "text-sm text-muted-foreground leading-relaxed",
            expanded ? "" : "line-clamp-4"
          )}
          dangerouslySetInnerHTML={{
            __html: formatContent(content),
          }}
        />
      </div>
    </div>
  );
}

export const defaultAnalysisSteps: AnalysisStep[] = [
  { key: "policy", label: "정책", icon: "🏛️", color: "#3b82f6" },
  { key: "industry", label: "산업", icon: "📈", color: "#22c55e" },
  { key: "momentum", label: "모멘텀", icon: "📊", color: "#eab308" },
  { key: "fundamental", label: "펀더멘털", icon: "🧠", color: "#a855f7" },
  { key: "technical", label: "기술적", icon: "🎯", color: "#ef4444" },
];

export const biotechAnalysisStep: AnalysisStep = {
  key: "fda_clinical",
  label: "FDA/임상",
  icon: "🧬",
  color: "#06b6d4",
};
