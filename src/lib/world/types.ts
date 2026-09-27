export type Role = 'GM' | 'MANAGER' | 'OWNER' | 'REPORTER' | 'COMMISSIONER' | 'FAN';
export type Level = 'MLB' | 'AAA' | 'AA' | 'PROSPECT';
export type SimSpeed = 'PLAY_TODAY' | 'TOMORROW' | 'SERIES' | 'WEEK' | 'UNTIL_EVENT';
export type EventPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'REQUIRES_ACTION';

export interface Personality {
  loyalty: number;
  ego: number;
  leadership: number;
  competitiveness: number;
  mediaTolerance: number;
  winningPriority: number;
  financialPriority: number;
}

export interface Relationship {
  fromCharacterId: string;
  toCharacterId: string;
  trust: number;
  respect: number;
  affinity: number;
  updatedAt: string;
}

export interface Memory {
  id: string;
  characterId: string;
  seasonId: string;
  date: string;
  kind: 'PROMISE' | 'CONFLICT' | 'PRAISE' | 'BENCHING' | 'DEMOTION' | 'TRADE' | 'NEGOTIATION' | 'INJURY' | 'MEDIA' | 'CONVERSATION' | 'OTHER';
  summary: string;
  emotionalWeight: number;
  relatedEntityIds: string[];
}

export interface Character {
  id: string;
  name: string;
  kind: 'PLAYER' | 'COACH' | 'EXECUTIVE' | 'OWNER' | 'REPORTER' | 'COMMISSIONER';
  teamId?: string;
  personality: Personality;
  morale: number;
}

export interface PlayerRatings {
  contact: number;
  power: number;
  discipline: number;
  speed: number;
  defense: number;
  arm: number;
  pitchingStuff?: number;
  pitchingControl?: number;
  pitchingMovement?: number;
  stamina?: number;
}

export interface Player {
  id: string;
  characterId: string;
  teamId: string;
  level: Level;
  position: string;
  bats: 'L' | 'R' | 'S';
  throws: 'L' | 'R';
  age: number;
  ratings: PlayerRatings;
  fatigue: number;
  health: number;
  injuredList: boolean;
  optionYearsRemaining: number;
  fortyMan: boolean;
  contractId?: string;
}

export interface Contract {
  id: string;
  playerId: string;
  teamId: string;
  startSeason: number;
  endSeason: number;
  annualSalary: number;
  status: 'ACTIVE' | 'OPTION' | 'ARBITRATION' | 'FREE_AGENT' | 'EXPIRED';
}

export interface TeamStrategy {
  competitiveWindow: 'BUY' | 'HOLD' | 'SELL' | 'REBUILD';
  budgetAggression: number;
  prospectPreference: number;
  winNowPreference: number;
  positionalNeeds: string[];
  untouchablePlayerIds: string[];
}

export interface Team {
  id: string;
  city: string;
  name: string;
  abbreviation: string;
  league: 'AL' | 'NL';
  division: 'EAST' | 'CENTRAL' | 'WEST';
  ballparkId: string;
  payrollBudget: number;
  cash: number;
  fanSentiment: number;
  ownerApproval: number;
  chemistry: number;
  strategy: TeamStrategy;
}

export interface GameLine {
  runs: number;
  hits: number;
  errors: number;
}

export interface GameResult {
  gameId: string;
  date: string;
  awayTeamId: string;
  homeTeamId: string;
  away: GameLine;
  home: GameLine;
  innings: number;
  winningPitcherId?: string;
  losingPitcherId?: string;
  savePitcherId?: string;
  keyPlayIds: string[];
  status: 'FINAL';
}

export interface Standing {
  teamId: string;
  wins: number;
  losses: number;
  divisionRank: number;
  gamesBack: number;
  wildCardRank?: number;
  last10Wins: number;
  last10Losses: number;
}

export interface TradeAsset {
  type: 'PLAYER' | 'CASH' | 'PTBNL';
  id?: string;
  amount?: number;
}

export interface TradeOffer {
  id: string;
  fromTeamId: string;
  toTeamId: string;
  offered: TradeAsset[];
  requested: TradeAsset[];
  status: 'PROPOSED' | 'COUNTERED' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'SUPERSEDED';
  createdAt: string;
}

export interface WorldEvent {
  id: string;
  universeId: string;
  seasonId: string;
  date: string;
  type: 'INJURY' | 'PLAYER_MEETING' | 'OWNER_MEETING' | 'COACH_RECOMMENDATION' | 'TRADE_CALL' | 'MEDIA' | 'ROSTER' | 'FINANCE' | 'LEAGUE' | 'OTHER';
  priority: EventPriority;
  title: string;
  factualContext: Record<string, unknown>;
  participantCharacterIds: string[];
  resolved: boolean;
}

export interface UserDecision {
  id: string;
  eventId: string;
  date: string;
  source: 'PRESET' | 'FREE_TEXT';
  rawText: string;
  proposedActions: StructuredAction[];
  validationStatus: 'PENDING' | 'VALID' | 'INVALID' | 'PARTIAL';
}

export interface StructuredAction {
  type: 'SET_LINEUP' | 'SET_ROTATION' | 'SET_BULLPEN_ROLE' | 'CALL_UP' | 'OPTION' | 'IL' | 'REST' | 'TRADE_PROPOSAL' | 'CONVERSATION_REPLY' | 'MEDIA_REPLY' | 'FINANCE_CHANGE' | 'OTHER';
  actorId?: string;
  targetId?: string;
  parameters: Record<string, unknown>;
}

export interface NewsStory {
  id: string;
  date: string;
  headline: string;
  dek?: string;
  body: string;
  verifiedFactIds: string[];
  relatedTeamIds: string[];
  relatedCharacterIds: string[];
  category: 'GAME' | 'TRADE' | 'INJURY' | 'RUMOR' | 'STANDINGS' | 'AWARD' | 'OFFSEASON' | 'OTHER';
}

export interface SeasonHistory {
  seasonId: string;
  year: number;
  championTeamId?: string;
  awardIds: string[];
  recordIds: string[];
  majorStoryIds: string[];
}

export interface UniverseState {
  id: string;
  name: string;
  currentSeasonId: string;
  currentDate: string;
  userRole: Role;
  userTeamId?: string;
  branchStartedAt: string;
  teams: Team[];
  characters: Character[];
  players: Player[];
  contracts: Contract[];
  standings: Standing[];
  events: WorldEvent[];
  memories: Memory[];
  relationships: Relationship[];
  tradeOffers: TradeOffer[];
  news: NewsStory[];
  history: SeasonHistory[];
}

export interface DailyWorldPipeline {
  date: string;
  stages: Array<'GAMES' | 'STATS' | 'STANDINGS' | 'INJURIES' | 'FATIGUE' | 'ROSTER_MOVES' | 'TRANSACTIONS' | 'MORALE' | 'CHEMISTRY' | 'TRADES' | 'MEDIA' | 'FANS' | 'FINANCES' | 'AI_EVENTS' | 'MEMORIES' | 'NEWSPAPER'>;
  stopForEventIds: string[];
}
