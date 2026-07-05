import { dailyQuestions } from '../../data/daily';
import { QuestionCard } from '../../components/Question/QuestionCard';
import { ScorePanel } from '../../components/ScorePanel/ScorePanel';
import { Button } from '../../components/Button/Button';
import { useAnalysisStore } from '../../store/useAnalysisStore';
import { evaluateAnalysis } from '../../engine/RuleEngine';
import './Daily.css';
export function Daily({onNext}:{onNext:()=>void}){const {analysis,setAnswer}=useAnalysisStore();const evaluation=evaluateAnalysis(analysis);const groups=[...new Set(dailyQuestions.map(q=>q.group))];const answered=dailyQuestions.every(q=>analysis.answers[q.id]!==undefined);return <div className="daily-page fade-in"><header className="page-header"><p className="eyebrow">Paso 1</p><h1>Diario</h1><p>El Diario da permiso. Primero validamos estructura, luego daño o reconstrucción.</p></header><ScorePanel label="Diagnóstico diario" score={evaluation.daily.score} max={evaluation.daily.maxScore} state={evaluation.daily.label}/>{groups.map(group=><section key={group} className="question-group"><h2>{group}</h2>{dailyQuestions.filter(q=>q.group===group).map(q=><QuestionCard key={q.id} question={q} value={analysis.answers[q.id]} onChange={(value)=>setAnswer(q.id,value)}/>)}</section>)}<Button disabled={!answered} onClick={onNext}>Continuar a Hora</Button></div>;}
