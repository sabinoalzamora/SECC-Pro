export const managementOptions = [
  {
    id: 'notin',
    tag: 'NO DENTRO',
    title: 'No estoy dentro',
    description: 'Usar solo para decidir entrada.',
    tone: 'info'
  },
  {
    id: 'none',
    tag: 'SIN SALIDA',
    title: 'Sin salida 15m',
    description: 'HMA12 15m y RSI se mantienen.',
    tone: 'positive'
  },
  {
    id: 'alert',
    tag: 'ALERTA',
    title: 'Alerta temprana 15m',
    description: 'RSI5 bajo MA9 o HMA12 empieza Carpita.',
    tone: 'warning'
  },
  {
    id: 'confirm',
    tag: 'CONFIRMADA',
    title: 'Salida confirmada 15m',
    description: 'RSI14 bajo MA21, HMA12 cae o precio pierde EMA9.',
    tone: 'danger'
  }
] as const;

export type ManagementOptionId = typeof managementOptions[number]['id'];
