import { Activity, BarChart3, Settings, Smartphone } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import './Home.css';

interface HomeProps {
  onStart: () => void;
  onHistory: () => void;
  onInstall: () => void;
}

export function Home({ onStart, onHistory, onInstall }: HomeProps) {
  return (
    <div className="home fade-in">
      <div className="brand">
        <div className="logo-mark">SECC</div>
        <p className="eyebrow">PRO v0.6 Alpha</p>
        <h1>Sistema Experto de Cunitas y Carpitas</h1>
        <p className="subtitle">El Diario da permiso · La Hora da gatillo · El Mercado modula · 15m gestiona salida.</p>
      </div>
      <Card>
        <div className="action-list">
          <Button onClick={onStart}><Activity size={18} /> Nuevo análisis</Button>
          <Button variant="secondary" onClick={onHistory}><BarChart3 size={18} /> Historial</Button>
          <Button variant="ghost" onClick={onInstall}><Smartphone size={18} /> Instalar en pantalla de inicio</Button>
          <Button variant="ghost" disabled><Settings size={18} /> Configuración — próximamente</Button>
        </div>
      </Card>
    </div>
  );
}
