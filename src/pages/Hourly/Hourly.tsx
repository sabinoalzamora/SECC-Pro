import { hourlyQuestions } from '../../data/hourly';
import { QuestionCard } from '../../components/Question/QuestionCard';
import { ScorePanel } from '../../components/ScorePanel/ScorePanel';
import { Button } from '../../components/Button/Button';
import { useAnalysisStore } from '../../store/useAnalysisStore';
import { evaluateAnalysis } from '../../engine/RuleEngine';
import './Hourly.css';

interface HourlyProps {
  onBack: () => void;
  onNext: () => void;
}

export function Hourly({ onBack, onNext }: HourlyProps) {
  const { analysis, setAnswer } = useAnalysisStore();
  const evaluation = evaluateAnalysis(analysis);

  const groups = [...new Set(hourlyQuestions.map(question => question.group))];
  const answered = hourlyQuestions.every(question => analysis.answers[question.id] !== undefined);

  return (
    <div className="hourly-page fade-in">
      <header className="page-header">
        <p className="eyebrow">Paso 2</p>
        <h1>Hora</h1>
        <p>La Hora da el gatillo. Aquí validamos si el movimiento tiene permiso operativo.</p>
      </header>

      <ScorePanel
        label="Diagnóstico horario"
        score={evaluation.hourly.score}
        max={evaluation.hourly.maxScore}
        state={evaluation.hourly.label}
      />
      <p className="hourly-summary">{evaluation.hourly.label}</p>

      {groups.map(group => (
        <section key={group} className="question-group">
          <h2>{group}</h2>
          {hourlyQuestions
            .filter(question => question.group === group)
            .map(question => (
              <QuestionCard
                key={question.id}
                question={question}
                value={analysis.answers[question.id]}
                onChange={(value) => setAnswer(question.id, value)}
              />
            ))}
        </section>
      ))}

      <div className="hourly-actions">
        <Button disabled={!answered} onClick={onNext}>Continuar a Mercado</Button>
        <Button variant="ghost" onClick={onBack}>Volver a Diario</Button>
      </div>
    </div>
  );
}
