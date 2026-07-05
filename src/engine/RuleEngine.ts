import type { Analysis } from '../models/Analysis';
import { dailyLabel, evaluateDaily, scoreDaily } from './DailyEngine';
import { evaluateHourly, hourlyLabel, scoreHourly } from './HourlyEngine';
import { evaluateMarket, marketLabel, scoreMarket } from './MarketEngine';
import { evaluateManagement, managementLabel, managementRisk } from './ManagementEngine';
import { generateVerdict } from './VerdictEngine';

export function evaluateAnalysis(analysis: Analysis) {
  const dailyState = evaluateDaily(analysis.answers);
  const hourlyState = evaluateHourly(analysis.answers);
  const marketState = evaluateMarket(analysis.answers);
  const managementState = evaluateManagement(analysis.answers);
  const verdict = generateVerdict(analysis);

  return {
    daily: {
      state: dailyState,
      label: dailyLabel(dailyState),
      score: scoreDaily(analysis.answers),
      maxScore: 5
    },
    hourly: {
      state: hourlyState,
      label: hourlyLabel(hourlyState),
      score: scoreHourly(analysis.answers),
      maxScore: 6
    },
    market: {
      state: marketState,
      label: marketLabel(marketState),
      score: scoreMarket(analysis.answers),
      maxScore: 3
    },
    management: {
      state: managementState,
      label: managementLabel(managementState),
      risk: managementRisk(managementState)
    },
    verdict,
    version: analysis.version
  };
}
