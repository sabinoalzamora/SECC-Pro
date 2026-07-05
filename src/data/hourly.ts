import type { Question } from '../models/Question';

export const hourlyQuestions: Question[] = [
  {
    id: 'h_hull',
    phase: 'hourly',
    group: 'Condiciones obligatorias',
    tag: 'Cunita',
    title: 'Hull12 Hora girando arriba',
    description: 'Es el gatillo visual principal del sistema.',
    mandatory: true,
    weight: 20
  },
  {
    id: 'h_rsi14_ma21',
    phase: 'hourly',
    group: 'Condiciones obligatorias',
    tag: 'RSI14/MA21',
    title: 'RSI14 Hora sobre MA21',
    description: 'Confirma momentum horario a favor del movimiento.',
    mandatory: true,
    weight: 20
  },
  {
    id: 'h_sma20',
    phase: 'hourly',
    group: 'Condiciones obligatorias',
    tag: 'SMA20',
    title: 'Precio sobre SMA20 y SMA20 girando levemente o con intención hacia arriba',
    mandatory: true,
    weight: 20
  },
  {
    id: 'h_ema9',
    phase: 'hourly',
    group: 'Calidad',
    tag: 'EMA9',
    title: 'Precio sobre EMA9 Hora o rebote desde EMA9',
    weight: 10
  },
  {
    id: 'h_rsi50',
    phase: 'hourly',
    group: 'Calidad',
    tag: 'RSI>50',
    title: 'RSI14 y/o MA21 del RSI sobre 50 en Hora',
    weight: 10
  },
  {
    id: 'h_rsi5',
    phase: 'hourly',
    group: 'Calidad',
    tag: 'RSI5/MA9',
    title: 'RSI5 sobre MA9 Hora',
    weight: 10
  }
];
