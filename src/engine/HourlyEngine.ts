import type { AnswerValue } from '../models/Analysis';

export type HourlyState = 'full' | 'tactical' | 'weak' | 'blocked';

const hourlyCore = ['h_hull', 'h_rsi14_ma21', 'h_sma20', 'h_ema9', 'h_rsi50', 'h_rsi5'];

export function scoreHourly(answers: Record<string, AnswerValue>) {
  return hourlyCore.filter(key => answers[key] === true).length;
}

export function evaluateHourly(answers: Record<string, AnswerValue>): HourlyState {
  const score = scoreHourly(answers);

  if (answers.h_hull !== true) return 'blocked';
  if (answers.h_rsi14_ma21 !== true) return 'blocked';

  if (answers.h_sma20 === true && score >= 5) return 'full';
  if (score >= 4) return 'tactical';

  return 'weak';
}

export function hourlyLabel(state: HourlyState) {
  const labels: Record<HourlyState, string> = {
    full: 'Hora confirmada',
    tactical: 'Hora táctica',
    weak: 'Hora débil',
    blocked: 'Hora bloqueada'
  };

  return labels[state];
}

export function hourlyExplanation(state: HourlyState) {
  const explanations: Record<HourlyState, string> = {
    full: 'La Hora entrega gatillo operativo con condiciones principales alineadas.',
    tactical: 'La Hora puede permitir una entrada táctica, pero todavía no es señal máxima.',
    weak: 'Hay señales parciales, pero no suficiente ventaja para swing.',
    blocked: 'Falta una condición obligatoria: Cunita en Hull12 o momentum RSI14/MA21.'
  };

  return explanations[state];
}
