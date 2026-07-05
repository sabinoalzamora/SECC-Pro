import { marketQuestions } from '../../data/market';
import { QuestionCard } from '../../components/Question/QuestionCard';
import { ScorePanel } from '../../components/ScorePanel/ScorePanel';
import { Button } from '../../components/Button/Button';
import { useAnalysisStore } from '../../store/useAnalysisStore';
import { evaluateAnalysis } from '../../engine/RuleEngine';
import './Market.css';

interface MarketProps {
  onNext: () => void;
}

export function Market({ onNext }: MarketProps) {
  const { analysis, setAnswer } = useAnalysisStore();
  const evaluation = evaluateAnalysis(analysis);

  const groups = [...new Set(marketQuestions.map(question => question.group))];
  const answered = marketQuestions.every(question => analysis.answers[question.id] !== undefined);

  return (
    <div className="market-page fade-in">
      <header className="page-header">
        <p className="eyebrow">Paso 3</p>
        <h1>Mercado</h1>
        <p>El Mercado modula. Aquí validamos si el contexto favorece swing, exige cautela o está demasiado lateral.</p>
      </header>

      <ScorePanel
        label="Diagnóstico mercado"
        score={evaluation.market.score}
        max={evaluation.market.maxScore}
        state={evaluation.market.label}
      />

      {groups.map(group => (
        <section key={group} className="question-group">
          <h2>{group}</h2>
          {marketQuestions
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

      <Button disabled={!answered} onClick={onNext}>
        Continuar a Gestión
      </Button>
    </div>
  );
}
