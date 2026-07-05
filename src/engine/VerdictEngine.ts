import type { Analysis } from '../models/Analysis';
import type { Verdict } from '../models/Verdict';
import { evaluateDaily, scoreDaily } from './DailyEngine';
import { evaluateHourly, scoreHourly } from './HourlyEngine';
import { evaluateMarket } from './MarketEngine';
import { evaluateManagement } from './ManagementEngine';

function confidenceFromScores(analysis: Analysis) {
  const daily = scoreDaily(analysis.answers) / 5;
  const hourly = scoreHourly(analysis.answers) / 6;

  const marketState = evaluateMarket(analysis.answers);
  const market =
    marketState === 'explosive' ? 1 :
    marketState === 'normal' ? 0.8 :
    marketState === 'caution' ? 0.55 :
    marketState === 'lateral' ? 0.2 : 0.4;

  const managementState = evaluateManagement(analysis.answers);
  const management =
    managementState === 'none' ? 1 :
    managementState === 'notin' ? 0.85 :
    managementState === 'alert' ? 0.5 :
    managementState === 'confirm' ? 0.1 : 0.5;

  return Math.round((daily * 0.4 + hourly * 0.35 + market * 0.2 + management * 0.05) * 100);
}

export function generateVerdict(analysis: Analysis): Verdict {
  const daily = evaluateDaily(analysis.answers);
  const hourly = evaluateHourly(analysis.answers);
  const hourlyScore = scoreHourly(analysis.answers);
  const market = evaluateMarket(analysis.answers);
  const management = evaluateManagement(analysis.answers);
  const confidence = confidenceFromScores(analysis);

  const hFull =
    analysis.answers.h_hull === true &&
    analysis.answers.h_rsi14_ma21 === true &&
    analysis.answers.h_sma20 === true &&
    hourlyScore >= 5;

  const hTactical =
    analysis.answers.h_hull === true &&
    analysis.answers.h_rsi14_ma21 === true &&
    hourlyScore >= 4;

  let verdict: Verdict = {
    type: 'wait',
    title: 'ESPERAR',
    subtitle: 'No hay ventaja suficiente para operar.',
    dte: '—',
    delta: '—',
    size: '—',
    mode: 'Esperar',
    stop: '—',
    confidence,
    explanation: ['Faltan condiciones suficientes para autorizar una operación con ventaja.'],
    warnings: []
  };

  if (daily === 'broken') {
    verdict = hTactical
      ? {
          type: 'info',
          title: 'SOLO REBOTE INTRADÍA PEQUEÑO',
          subtitle: 'Diario roto. Hora puede dar rebote, pero no swing.',
          dte: '80 DTE',
          delta: '0.20',
          size: 'Máx. 25%',
          mode: 'Intradía táctico',
          stop: 'EMA9 Hora o RSI5 < MA9',
          confidence: Math.min(confidence, 55),
          explanation: [
            'El Diario está roto y no autoriza calls swing.',
            'La Hora puede permitir un rebote táctico, pero no una tesis de pernocta.'
          ],
          warnings: ['No pernoctar. No convertir rebote en swing.']
        }
      : {
          type: 'wait',
          title: 'NO CALLS — DIARIO ROTO',
          subtitle: 'El Diario no autoriza calls.',
          dte: '—',
          delta: '—',
          size: '—',
          mode: 'Esperar',
          stop: '—',
          confidence: Math.min(confidence, 35),
          explanation: [
            'La estructura principal diaria está dañada.',
            'SECC no permite swing alcista cuando el Diario está roto.'
          ],
          warnings: ['Esperar reconstrucción antes de buscar swing.']
        };

    return applyManagement(verdict, management, market, daily);
  }

  if (analysis.answers.h_hull !== true) {
    verdict = {
      type: 'wait',
      title: 'ESPERAR — NO HAY CUNITA EN HORA',
      subtitle: 'Hull12 Hora es gatillo obligatorio.',
      dte: '—',
      delta: '—',
      size: '—',
      mode: 'Esperar',
      stop: '—',
      confidence: Math.min(confidence, 45),
      explanation: [
        'El Diario puede estar mejorando, pero la Hora todavía no da gatillo.',
        'La Cunita en Hora es condición clave para entrada.'
      ],
      warnings: ['Evitar anticiparse al giro horario.']
    };

    return applyManagement(verdict, management, market, daily);
  }

  if (analysis.answers.h_rsi14_ma21 !== true) {
    verdict = {
      type: 'wait',
      title: 'ESPERAR — FALTA MOMENTUM HORARIO',
      subtitle: 'RSI14 Hora aún no confirma sobre MA21.',
      dte: '—',
      delta: '—',
      size: '—',
      mode: 'Esperar',
      stop: '—',
      confidence: Math.min(confidence, 50),
      explanation: [
        'Existe señal visual parcial, pero falta confirmación de momentum.',
        'SECC evita comprar antes de que el RSI valide la recuperación.'
      ],
      warnings: ['Esperar confirmación del RSI14 sobre MA21.']
    };

    return applyManagement(verdict, management, market, daily);
  }

  if (daily === 'rebuilding') {
    if (hourlyScore >= 6 && market !== 'lateral') {
      verdict = {
        type: 'rebuild',
        title: 'SWING DE RECONSTRUCCIÓN',
        subtitle: 'Diario reconstruyendo, pero Hora confirma al máximo.',
        dte: '80 DTE',
        delta: '0.20–0.25',
        size: '50–75%',
        mode: 'Swing con pernocta permitida · Hora gobierna',
        stop: 'Si Hora pierde estructura, salir aunque Diario siga reconstruyéndose',
        confidence: Math.max(confidence, 70),
        explanation: [
          'El Diario no está completamente formado, pero tampoco invalida la operación.',
          'Hora confirma con máxima calidad y puede gobernar temporalmente.',
          'Si el Diario termina de formarse, la operación evoluciona a Swing Completo.'
        ],
        warnings: ['Capital reducido frente a un Swing Completo. Vigilar Hora en cada sesión.']
      };
    } else if (hTactical) {
      verdict = {
        type: 'info',
        title: 'SOLO INTRADÍA — DIARIO EN RECONSTRUCCIÓN',
        subtitle: 'Hora da pase parcial, pero sin señal completa no se autoriza pernocta.',
        dte: '80 DTE',
        delta: '0.20',
        size: '25–50%',
        mode: 'Intradía / sin pernocta',
        stop: 'EMA9 Hora, RSI5 < MA9 o salida 15m',
        confidence: Math.min(confidence, 60),
        explanation: [
          'Hora permite un rebote táctico.',
          'Diario aún está en reconstrucción y no autoriza dormir posición sin Hora completa.'
        ],
        warnings: ['Para pasar a Swing de Reconstrucción se necesita Hora 6/6.']
      };
    }

    return applyManagement(verdict, management, market, daily);
  }

  if (market === 'lateral') {
    verdict = {
      type: 'wait',
      title: 'EVITAR SWING — LATERALIDAD',
      subtitle: 'El contexto choppy reduce la ventaja.',
      dte: '—',
      delta: '—',
      size: '—',
      mode: 'Esperar o scalp muy selectivo',
      stop: '—',
      confidence: Math.min(confidence, 50),
      explanation: [
        'El mercado muestra señales laterales o contradictorias.',
        'SECC prioriza estructuras limpias para evitar falsas entradas.'
      ],
      warnings: ['Esperar pendiente clara de SMA20 Hora y nueva Cunita limpia.']
    };

    return applyManagement(verdict, management, market, daily);
  }

  if (analysis.answers.h_sma20 !== true) {
    verdict = {
      type: 'risk',
      title: 'ENTRADA TÁCTICA DE RIESGO',
      subtitle: 'Hay Cunita y momentum, pero SMA20 Hora no sostiene.',
      dte: '80 DTE',
      delta: '0.20',
      size: '25–50%',
      mode: 'Intradía / confirmar',
      stop: 'EMA9 Hora o RSI5 < MA9',
      confidence: Math.min(confidence, 65),
      explanation: [
        'La Hora da señales parciales, pero falta soporte de SMA20.',
        'No se debe llamar swing hasta que SMA20 Hora recupere.'
      ],
      warnings: ['Tamaño reducido y gestión estricta.']
    };

    return applyManagement(verdict, management, market, daily);
  }

  if (daily === 'formed' && hFull) {
    verdict = {
      type: 'go',
      title: 'SWING COMPLETO',
      subtitle: 'Diario formado y Hora confirmada.',
      dte: '80 DTE',
      delta: '0.30',
      size: market === 'explosive' ? '100%' : '75–100%',
      mode: 'Swing con pernocta permitida',
      stop: 'EMA9 Hora / HMA12 Hora / salida 15m',
      confidence: Math.max(confidence, 85),
      explanation: [
        'El Diario autoriza el swing.',
        'La Hora entrega gatillo confirmado.',
        market === 'explosive'
          ? 'El mercado está explosivo y permite tamaño completo.'
          : 'El mercado acompaña sin invalidar la operación.'
      ],
      warnings: []
    };

    return applyManagement(verdict, management, market, daily);
  }

  if ((daily === 'formed' || daily === 'tired' || daily === 'partial') && hTactical) {
    verdict = {
      type: 'risk',
      title: daily === 'tired' ? 'SWING PEQUEÑO / CANSADO' : 'SWING MODERADO',
      subtitle: 'Estructura operable, pero no máxima.',
      dte: '80 DTE',
      delta: '0.20–0.30',
      size: daily === 'tired' ? '50–75%' : '75%',
      mode: 'Swing con vigilancia',
      stop: 'EMA9 Hora o 15m confirmado',
      confidence: Math.min(Math.max(confidence, 65), 82),
      explanation: [
        'Hay condiciones suficientes para operar, pero no con máxima convicción.',
        'El tamaño debe ajustarse según la calidad del Diario y Hora.'
      ],
      warnings: ['Agregar solo si el diagnóstico mejora.']
    };
  }

  return applyManagement(verdict, management, market, daily);
}

function applyManagement(
  verdict: Verdict,
  management: ReturnType<typeof evaluateManagement>,
  market: ReturnType<typeof evaluateMarket>,
  daily: ReturnType<typeof evaluateDaily>
): Verdict {
  if (management === 'alert') {
    return {
      ...verdict,
      warnings: [
        ...verdict.warnings,
        daily === 'rebuilding'
          ? 'Reconstrucción + alerta 15m: reducir o cerrar rápido.'
          : daily === 'tired'
            ? 'Diario cansado + alerta 15m: proteger ganancia.'
            : '15m en alerta: tomar parcial o subir stop mental.'
      ],
      confidence: Math.min(verdict.confidence, 78)
    };
  }

  if (management === 'confirm') {
    if (market === 'explosive' && verdict.type === 'go') {
      return {
        ...verdict,
        warnings: [
          ...verdict.warnings,
          '15m confirma salida: en mercado explosivo puede gestionarse como parcial si Hora sigue fuerte.'
        ],
        confidence: Math.min(verdict.confidence, 80)
      };
    }

    return {
      type: 'wait',
      title: 'SALIDA ANTICIPADA CONFIRMADA',
      subtitle: 'Si ya estás dentro, la gestión manda.',
      dte: verdict.dte,
      delta: verdict.delta,
      size: 'Reducir / cerrar',
      mode: 'Gestión de salida',
      stop: 'Salida técnica 15m',
      confidence: Math.min(verdict.confidence, 55),
      explanation: [
        'El 15m confirma deterioro operativo.',
        'La gestión protege capital antes que sostener una tesis.'
      ],
      warnings: [
        daily === 'rebuilding'
          ? 'En reconstrucción, salida 15m confirmada obliga cierre.'
          : 'Proteger capital y ganancia.'
      ]
    };
  }

  return verdict;
}
