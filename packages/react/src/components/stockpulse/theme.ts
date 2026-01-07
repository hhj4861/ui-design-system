/**
 * StockPulse Theme
 * stock-analyzer 프로젝트의 다크 테마 설정
 */

export interface ScoreGrade {
  text: string;
  emoji: string;
  color: string;
  description: string;
}

export interface StockPulseTheme {
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    border: string;
    ring: string;
  };
  gradients: {
    background: string;
    card: string;
    glassCard: string;
  };
  effects: {
    glassBlur: string;
    glassBorder: string;
  };
}

export const stockpulseTheme: StockPulseTheme = {
  colors: {
    background: '#09090b',
    foreground: '#fafafa',
    card: '#0a0a0c',
    cardForeground: '#fafafa',
    primary: '#8b5cf6',
    primaryForeground: '#fafafa',
    secondary: '#18181b',
    muted: '#18181b',
    mutedForeground: '#a1a1aa',
    accent: '#8b5cf6',
    border: '#27272a',
    ring: '#8b5cf6',
  },
  gradients: {
    background: 'linear-gradient(180deg, #09090b 0%, #0d0d10 100%)',
    card: 'linear-gradient(145deg, rgba(20, 20, 35, 0.95), rgba(35, 35, 55, 0.95))',
    glassCard: 'rgba(15, 15, 18, 0.8)',
  },
  effects: {
    glassBlur: 'blur(10px)',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
  },
};

/**
 * 점수에 따른 등급 계산
 */
export function getScoreGrade(score: number, maxScore: number = 100): ScoreGrade {
  const percentage = (score / maxScore) * 100;

  if (percentage >= 85) {
    return {
      text: '매우 강력 매수',
      emoji: '🚀',
      color: '#22c55e',
      description: '탁월한 투자 기회입니다',
    };
  }
  if (percentage >= 70) {
    return {
      text: '강력 매수',
      emoji: '💪',
      color: '#10b981',
      description: '좋은 투자 조건을 갖추고 있습니다',
    };
  }
  if (percentage >= 55) {
    return {
      text: '매수',
      emoji: '👍',
      color: '#3b82f6',
      description: '긍정적인 신호가 있습니다',
    };
  }
  if (percentage >= 40) {
    return {
      text: '중립',
      emoji: '⚖️',
      color: '#f59e0b',
      description: '추가 분석이 필요합니다',
    };
  }
  if (percentage >= 25) {
    return {
      text: '주의',
      emoji: '⚠️',
      color: '#f97316',
      description: '리스크 요인을 검토하세요',
    };
  }
  return {
    text: '매도 권고',
    emoji: '🔻',
    color: '#ef4444',
    description: '투자에 주의가 필요합니다',
  };
}
