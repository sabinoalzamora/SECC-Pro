import type { AnswerValue } from '../models/Analysis';
export type DailyState = 'formed' | 'rebuilding' | 'tired' | 'broken' | 'partial' | 'weak';
const dailyCore=['d_sma20','d_hull','d_rsi14_ma21','d_ema9','d_rsi50'];
export function scoreDaily(answers:Record<string,AnswerValue>){return dailyCore.filter(k=>answers[k]===true).length;}
export function evaluateDaily(answers:Record<string,AnswerValue>):DailyState{const score=scoreDaily(answers); if(answers.d_broken===true)return'broken'; if(answers.d_rebuilding===true)return'rebuilding'; if(answers.d_tired===true)return'tired'; if(score>=4&&answers.d_sma20===true&&answers.d_hull===true&&answers.d_rsi14_ma21===true)return'formed'; if(score>=3)return'partial'; return'weak';}
export function dailyLabel(state:DailyState){const labels:Record<DailyState,string>={formed:'Diario formado',rebuilding:'Diario en reconstrucción',tired:'Diario cansado',broken:'Diario roto',partial:'Diario parcial',weak:'Diario débil'};return labels[state];}
