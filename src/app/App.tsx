import { useState } from 'react';
import { AppLayout } from '../components/Layout/AppLayout';
import { StepProgress } from '../components/Progress/StepProgress';
import { Home } from '../pages/Home/Home';
import { Daily } from '../pages/Daily/Daily';
import { Hourly } from '../pages/Hourly/Hourly';
import { Market } from '../pages/Market/Market';
import { Management } from '../pages/Management/Management';
import { Result } from '../pages/Result/Result';
import { History } from '../pages/History/History';
import { Install } from '../pages/Install/Install';
import { useAnalysisStore } from '../store/useAnalysisStore';

type Screen = 'home' | 'daily' | 'hourly' | 'market' | 'management' | 'result' | 'history' | 'install';

const stepIndex: Record<Screen, number> = {
  home: 0,
  daily: 1,
  hourly: 2,
  market: 3,
  management: 4,
  result: 5,
  history: 0,
  install: 0
};

export function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const { reset } = useAnalysisStore();

  return (
    <AppLayout>
      <StepProgress activeIndex={stepIndex[screen]} />
      {screen === 'home' && <Home onStart={() => setScreen('daily')} onHistory={() => setScreen('history')} onInstall={() => setScreen('install')} />}
      {screen === 'daily' && <Daily onNext={() => setScreen('hourly')} />}
      {screen === 'hourly' && <Hourly onBack={() => setScreen('daily')} onNext={() => setScreen('market')} />}
      {screen === 'market' && <Market onNext={() => setScreen('management')} />}
      {screen === 'management' && <Management onBack={() => setScreen('market')} onNext={() => setScreen('result')} />}
      {screen === 'result' && <Result onBack={() => setScreen('management')} onRestart={() => { reset(); setScreen('daily'); }} />}
      {screen === 'history' && <History onBack={() => setScreen('home')} />}
      {screen === 'install' && <Install onBack={() => setScreen('home')} />}
    </AppLayout>
  );
}
