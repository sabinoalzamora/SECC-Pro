import './ScorePanel.css';
export function ScorePanel({label,score,max,state}:{label:string;score:number;max:number;state:string}){const pct=Math.round((score/max)*100);return <div className="score-panel"><div><small>{label}</small><strong>{state}</strong></div><div className="score-track"><div style={{width:`${pct}%`}} /></div><span className="mono">{score}/{max}</span></div>;}
