import type { Question } from '../models/Question';

export const marketQuestions: Question[] = [
  {
    id: 'm_sma20_slope',
    phase: 'market',
    group: 'Fuerza / Verticalidad',
    tag: 'SMA20 Hora',
    title: 'SMA20 Hora mantiene pendiente clara y no está plana en las últimas 6 velas',
    mandatory: true,
    weight: 20
  },
  {
    id: 'm_explosive',
    phase: 'market',
    group: 'Fuerza / Verticalidad',
    tag: 'Impulso',
    title: 'El movimiento es fuerte/vertical y los retrocesos son breves en las últimas 6 velas de Hora',
    weight: 10
  },
  {
    id: 'm_orderly',
    phase: 'market',
    group: 'Fuerza / Verticalidad',
    tag: 'Ordenado',
    title: 'Precio respeta EMA9/SMA20 y no rompe estructura en cada retroceso',
    weight: 10
  },
  {
    id: 'm_choppy',
    phase: 'market',
    group: 'Riesgo de lateralidad',
    tag: 'Choppy',
    title: 'Hay cruces repetidos, HMA12 cambia mucho de dirección o señales contradictorias en las últimas 6 velas de Hora',
    warning: true,
    weight: 0
  },
  {
    id: 'm_15alert',
    phase: 'market',
    group: 'Riesgo de lateralidad',
    tag: '15m alerta',
    title: '15 minutos ya muestra alerta temprana aunque Hora siga viva',
    warning: true,
    weight: 0
  }
];
