import type { DailyWorldPipeline, SimSpeed, UniverseState, WorldEvent } from './types';

export const DAILY_STAGES: DailyWorldPipeline['stages'] = [
  'GAMES',
  'STATS',
  'STANDINGS',
  'INJURIES',
  'FATIGUE',
  'ROSTER_MOVES',
  'TRANSACTIONS',
  'MORALE',
  'CHEMISTRY',
  'TRADES',
  'MEDIA',
  'FANS',
  'FINANCES',
  'AI_EVENTS',
  'MEMORIES',
  'NEWSPAPER',
];

export function buildDailyPipeline(state: UniverseState): DailyWorldPipeline {
  return {
    date: state.currentDate,
    stages: [...DAILY_STAGES],
    stopForEventIds: state.events.filter(requiresUserIntervention).map((event) => event.id),
  };
}

export function requiresUserIntervention(event: WorldEvent): boolean {
  return !event.resolved && event.priority === 'REQUIRES_ACTION';
}

export function daysForSpeed(speed: SimSpeed, remainingSeriesGames = 1): number | 'UNTIL_EVENT' {
  switch (speed) {
    case 'PLAY_TODAY':
    case 'TOMORROW':
      return 1;
    case 'SERIES':
      return Math.max(1, remainingSeriesGames);
    case 'WEEK':
      return 7;
    case 'UNTIL_EVENT':
      return 'UNTIL_EVENT';
  }
}

/**
 * Authoritative world advancement contract.
 *
 * Implementations must execute deterministic/rules-based stages first and only
 * pass verified structured state to AI narrative/dialogue services. AI output
 * may propose actions or narrative, but it cannot directly change official
 * scores, statistics, rosters, contracts, injuries, standings or transactions.
 */
export interface WorldEngine {
  advance(state: UniverseState, speed: SimSpeed): Promise<UniverseState>;
}
