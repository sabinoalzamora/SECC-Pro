import { Clock, Database } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { evaluateAnalysis } from '../../engine/RuleEngine';
import { getHistory } from '../../services/LocalStorage';
import './History.css';

interface HistoryProps {
  onBack: () => void;
}

export function History({ onBack }: HistoryProps) {
  const history = getHistory();

  return (
    <div className="history-page fade-in">
      <header className="page-header">
        <p className="eyebrow">Archivo local</p>
        <h1>Historial</h1>
        <p>Estos análisis se guardan solo en este dispositivo usando almacenamiento local.</p>
      </header>

      {history.length === 0 ? (
        <Card className="empty-history">
          <Database size={32} />
          <strong>No hay análisis guardados todavía</strong>
          <p>Completa un análisis y toca “Guardar análisis” en Resultado.</p>
        </Card>
      ) : (
        <section className="history-list">
          {history.map(item => {
            const evaluation = evaluateAnalysis(item);
            const date = new Date(item.createdAt).toLocaleString('es-PE', {
              dateStyle: 'medium',
              timeStyle: 'short'
            });

            return (
              <Card key={item.id} className="history-item">
                <div className="history-top">
                  <span><Clock size={14} /> {date}</span>
                  <small>{item.id}</small>
                </div>
                <strong>{evaluation.verdict.title}</strong>
                <p>{evaluation.verdict.subtitle}</p>
                <div className="history-meta">
                  <span>Confianza {evaluation.verdict.confidence}%</span>
                  <span>Diario {evaluation.daily.score}/{evaluation.daily.maxScore}</span>
                  <span>Hora {evaluation.hourly.score}/{evaluation.hourly.maxScore}</span>
                </div>
              </Card>
            );
          })}
        </section>
      )}

      <Button variant="ghost" onClick={onBack}>Volver al inicio</Button>
    </div>
  );
}
