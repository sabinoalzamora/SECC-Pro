import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './theme/global.css';
if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/service-worker.js').catch(() => {}); }); }
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<React.StrictMode><App /></React.StrictMode>);
