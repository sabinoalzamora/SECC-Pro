import type { Question } from '../models/Question';
export const dailyQuestions: Question[] = [
{id:'d_sma20',phase:'daily',group:'Estructura diaria',tag:'SMA20',title:'Precio sobre SMA20 y SMA20 ascendente o recuperando',mandatory:true,weight:20},
{id:'d_hull',phase:'daily',group:'Estructura diaria',tag:'Hull12',title:'Hull12 Diario Ascendente formando Cunita',mandatory:true,weight:20},
{id:'d_rsi14_ma21',phase:'daily',group:'Estructura diaria',tag:'RSI14/MA21',title:'RSI14 sobre MA21 y/o MA21 aún ascendente',mandatory:true,weight:20},
{id:'d_ema9',phase:'daily',group:'Estructura diaria',tag:'EMA9',title:'EMA9 sobre SMA20',weight:10},
{id:'d_rsi50',phase:'daily',group:'Estructura diaria',tag:'RSI>50',title:'RSI14 y/o MA21 del RSI sobre 50',weight:10},
{id:'d_rebuilding',phase:'daily',group:'Daño / Reconstrucción',tag:'Caída fuerte',title:'¿El Diario viene de una caída fuerte reciente?',warning:true,weight:0},
{id:'d_tired',phase:'daily',group:'Daño / Reconstrucción',tag:'Sin verticalidad',title:'¿La tendencia diaria perdió inclinación clara o lateraliza?',warning:true,weight:0},
{id:'d_broken',phase:'daily',group:'Daño / Reconstrucción',tag:'Roto',title:'¿El Diario perdió estructura claramente?',warning:true,weight:0}
];
