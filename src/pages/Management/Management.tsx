import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { managementOptions } from '../../data/management';
import { evaluateAnalysis } from '../../engine/RuleEngine';
import { useAnalysisStore } from '../../store/useAnalysisStore';
import type { AnswerValue } from '../../models/Analysis';
import './Management.css';

interface ManagementProps {
  onNext: () => void;
  onBack: () => void;
}

export function Management({ onNext, onBack }: ManagementProps) {
  const { analysis, setAnswer } = useAnalysisStore();
  const evaluation = evaluateAnalysis(analysis);
  const selected = analysis.answers.exit;

  return (
    <div className="management-page fade-in">
      <header className="page-header">
        <p className="eyebrow">Paso 4</p>
        <h1>Gestión</h1>
        <p>El 15 minutos administra salida. Si ya estás dentro, esta pantalla manda sobre la gestión del riesgo.</p>
      </header>

      <Card className="management-summary">
        <div>
          <small>Estado actual</small>
          <strong>{evaluation.management.label}</strong>
        </div>
        <span className={`risk-pill ${evaluation.management.risk}`}>
          {evaluation.management.risk === 'low' && 'Riesgo bajo'}
          {evaluation.management.risk === 'medium' && 'Riesgo medio'}
          {evaluation.management.risk === 'high' && 'Riesgo alto'}
          {evaluation.management.risk === 'neutral' && 'Neutral'}
        </span>
      </Card>

      <section className="management-options">
        {managementOptions.map(option => (
          <button
            key={option.id}
            className={`management-option ${option.tone} ${selected === option.id ? 'selected' : ''}`}
            onClick={() => setAnswer('exit', option.id as AnswerValue)}
          >
            <span>{option.tag}</span>
            <div>
              <strong>{option.title}</strong>
              <p>{option.description}</p>
            </div>
          </button>
        ))}
      </section>

      <div className="navigation-row">
        <Button variant="ghost" onClick={onBack}>Volver a Mercado</Button>
        <Button disabled={!selected} onClick={onNext}>Ver resultado</Button>
      </div>
    </div>
  );
}
