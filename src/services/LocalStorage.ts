import type { Analysis } from '../models/Analysis';

const KEY = 'secc-pro-analysis-history';

export function saveAnalysis(analysis: Analysis) {
  const current = getHistory();
  const exists = current.some(item => item.id === analysis.id);
  const next = exists
    ? current.map(item => item.id === analysis.id ? analysis : item)
    : [analysis, ...current];

  localStorage.setItem(KEY, JSON.stringify(next));
}

export function getHistory(): Analysis[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
