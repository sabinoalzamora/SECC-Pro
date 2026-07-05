import { CheckCircle2, AlertTriangle, XCircle, Info, Save } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { evaluateAnalysis } from '../../engine/RuleEngine';
import { saveAnalysis } from '../../services/LocalStorage';
import { useAnalysisStore } from '../../store/useAnalysisStore';
import './Result.css';

interface ResultProps {
  onRestart: () => void;
  onBack: () => void;
}

const iconByType = {
  go: CheckCircle2,
  rebuild: AlertTriangle,
  risk: AlertTriangle,
  wait: XCircle,
  info: Info
};

export function Result({ onRestart, onBack }: ResultProps) {
  const { analysis } = useAnalysisStore();
  const evaluation = evaluateAnalysis(analysis);
  const verdict = evaluation.verdict;
  const Icon = iconByType[verdict.type];

  const save = () => {
    saveAnalysis(analysis);
    alert('Análisis guardado en este dispositivo.');
  };

  return (
    <div className="result-page fade-in">
      <header className="page-header">
        <p className="eyebrow">Paso 5</p>
        <h1>Resultado</h1>
        <p>Veredicto generado por el motor SECC según Diario, Hora, Mercado y Gestión.</p>
      </header>

      <Card className={`verdict-card ${verdict.type}`}>
        <div className="verdict-icon">
          <Icon size={34} />
        </div>
        <div>
          <small>Veredicto</small>
          <h2>{verdict.title}</h2>
          <p>{verdict.subtitle}</p>
        </div>
      </Card>

      <Card className="confidence-card">
        <div className="confidence-top">
          <span>Confianza SECC</span>
          <strong>{verdict.confidence}%</strong>
        </div>
        <div className="confidence-track">
          <div style={{ width: `${verdict.confidence}%` }} />
        </div>
      </Card>

      <section className="result-grid">
        <Card>
          <small>DTE</small>
          <strong>{verdict.dte}</strong>
        </Card>
        <Card>
          <small>Delta</small>
          <strong>{verdict.delta}</strong>
        </Card>
        <Card>
          <small>Tamaño</small>
          <strong>{verdict.size}</strong>
        </Card>
        <Card>
          <small>Modo</small>
          <strong>{verdict.mode}</strong>
        </Card>
      </section>

      <Card className="stop-card">
        <small>Stop / salida</small>
        <strong>{verdict.stop}</strong>
      </Card>

      <Card className="diagnostic-grid">
        <div>
          <small>Diario</small>
          <strong>{evaluation.daily.label}</strong>
          <span>{evaluation.daily.score}/{evaluation.daily.maxScore}</span>
        </div>
        <div>
          <small>Hora</small>
          <strong>{evaluation.hourly.label}</strong>
          <span>{evaluation.hourly.score}/{evaluation.hourly.maxScore}</span>
        </div>
        <div>
          <small>Mercado</small>
          <strong>{evaluation.market.label}</strong>
          <span>{evaluation.market.score}/{evaluation.market.maxScore}</span>
        </div>
        <div>
          <small>Gestión</small>
          <strong>{evaluation.management.label}</strong>
          <span>{evaluation.management.risk}</span>
        </div>
      </Card>

      <Card className="explanation-card">
        <small>Por qué</small>
        <ul>
          {verdict.explanation.map(item => <li key={item}>{item}</li>)}
        </ul>
      </Card>

      {verdict.warnings.length > 0 && (
        <Card className="warnings-card">
          <small>Alertas</small>
          <ul>
            {verdict.warnings.map(item => <li key={item}>{item}</li>)}
          </ul>
        </Card>
      )}

      <div className="navigation-row">
        <Button variant="ghost" onClick={onBack}>Volver a Gestión</Button>
        <Button variant="secondary" onClick={save}>
          <Save size={18} /> Guardar análisis
        </Button>
        <Button onClick={onRestart}>Nuevo análisis</Button>
      </div>
    </div>
  );
}
