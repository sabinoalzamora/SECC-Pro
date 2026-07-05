export type VerdictType = 'go' | 'risk' | 'wait' | 'rebuild' | 'info';

export interface Verdict {
  type: VerdictType;
  title: string;
  subtitle: string;
  dte: string;
  delta: string;
  size: string;
  mode: string;
  stop: string;
  confidence: number;
  explanation: string[];
  warnings: string[];
}
