import type { AnswerValue } from '../models/Analysis';

export type ManagementState = 'notin' | 'none' | 'alert' | 'confirm' | 'pending';

export function evaluateManagement(answers: Record<string, AnswerValue>): ManagementState {
  const value = answers.exit;

  if (value === 'notin') return 'notin';
  if (value === 'none') return 'none';
  if (value === 'alert') return 'alert';
  if (value === 'confirm') return 'confirm';

  return 'pending';
}

export function managementLabel(state: ManagementState) {
  const labels: Record<ManagementState, string> = {
    notin: 'No estoy dentro',
    none: 'Sin salida 15m',
    alert: 'Alerta temprana 15m',
    confirm: 'Salida confirmada 15m',
    pending: 'Pendiente'
  };

  return labels[state];
}

export function managementRisk(state: ManagementState) {
  const risks: Record<ManagementState, 'low' | 'medium' | 'high' | 'neutral'> = {
    notin: 'neutral',
    none: 'low',
    alert: 'medium',
    confirm: 'high',
    pending: 'neutral'
  };

  return risks[state];
}
