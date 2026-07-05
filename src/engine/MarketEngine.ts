import type { AnswerValue } from '../models/Analysis';

export type MarketState = 'explosive' | 'normal' | 'caution' | 'lateral' | 'unclear';

const marketPositive = ['m_sma20_slope', 'm_explosive', 'm_orderly'];

export function scoreMarket(answers: Record<string, AnswerValue>) {
  return marketPositive.filter(key => answers[key] === true).length;
}

export function evaluateMarket(answers: Record<string, AnswerValue>): MarketState {
  if (answers.m_choppy === true || answers.m_sma20_slope === false) return 'lateral';
  if (answers.m_explosive === true && answers.m_orderly === true && answers.m_15alert === false) return 'explosive';
  if (answers.m_15alert === true) return 'caution';
  if (answers.m_sma20_slope === true && answers.m_orderly === true) return 'normal';
  return 'unclear';
}

export function marketLabel(state: MarketState) {
  const labels: Record<MarketState, string> = {
    explosive: 'Mercado explosivo',
    normal: 'Mercado normal / saludable',
    caution: 'Mercado con alerta 15m',
    lateral: 'Lateralidad / choppy',
    unclear: 'Mercado indefinido'
  };

  return labels[state];
}
