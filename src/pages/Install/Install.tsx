import { Smartphone, Share, PlusSquare } from 'lucide-react';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { isIOS, isStandalonePWA } from '../../utils/pwa';
import './Install.css';

interface InstallProps {
  onBack: () => void;
}

export function Install({ onBack }: InstallProps) {
  const standalone = isStandalonePWA();
  const ios = isIOS();

  return (
    <div className="install-page fade-in">
      <header className="page-header">
        <p className="eyebrow">PWA</p>
        <h1>Instalar SECC Pro</h1>
        <p>SECC Pro puede colocarse en la pantalla de inicio como una app.</p>
      </header>

      <Card className={`install-status ${standalone ? 'ready' : ''}`}>
        <Smartphone size={30} />
        <div>
          <strong>{standalone ? 'Ya estás usando SECC Pro como app' : 'Lista para instalar'}</strong>
          <p>{standalone ? 'La aplicación está en modo pantalla completa.' : 'Ábrela en Safari iPhone o Chrome Android para agregarla a inicio.'}</p>
        </div>
      </Card>

      {ios ? (
        <Card className="install-steps">
          <h2>iPhone / Safari</h2>
          <ol>
            <li><Share size={16} /> Toca el botón Compartir.</li>
            <li><PlusSquare size={16} /> Elige “Agregar a pantalla de inicio”.</li>
            <li>Confirma el nombre: <strong>SECC Pro</strong>.</li>
          </ol>
        </Card>
      ) : (
        <Card className="install-steps">
          <h2>Android / Chrome</h2>
          <ol>
            <li>Abre el menú de Chrome.</li>
            <li>Elige “Instalar app” o “Agregar a pantalla principal”.</li>
            <li>Confirma el nombre: <strong>SECC Pro</strong>.</li>
          </ol>
        </Card>
      )}

      <Card className="install-note">
        <strong>Importante</strong>
        <p>Para que la instalación PWA funcione correctamente, la app debe servirse desde un dominio HTTPS o desde localhost durante pruebas.</p>
      </Card>

      <Button variant="ghost" onClick={onBack}>Volver al inicio</Button>
    </div>
  );
}
