export type SimSpeed='TODAY'|'TOMORROW'|'SERIES'|'WEEK'|'UNTIL_EVENT';
export type SeasonPhase='REGULAR'|'TRADE_DEADLINE'|'POSTSEASON'|'WORLD_SERIES'|'OFFSEASON'|'FREE_AGENCY'|'WINTER_MEETINGS'|'SPRING_TRAINING';
export type TransactionKind='CALL_UP'|'OPTION'|'IL'|'ACTIVATE'|'DFA'|'WAIVER'|'TRADE'|'SIGN'|'RELEASE';
export interface Transaction{kind:TransactionKind;teamId:string;playerId:string;otherTeamId?:string;metadata?:Record<string,unknown>}
export interface SeasonClock{season:number;day:number;phase:SeasonPhase;stopReason?:string}
export function phaseForDay(day:number):SeasonPhase{if(day>=162)return'POSTSEASON';if(day>=115&&day<=123)return'TRADE_DEADLINE';return'REGULAR'}
export function daysToAdvance(speed:SimSpeed,currentDay:number,seriesRemaining=3){if(speed==='TODAY'||speed==='TOMORROW')return 1;if(speed==='SERIES')return Math.max(1,seriesRemaining);if(speed==='WEEK')return 7;return Math.max(1,162-currentDay)}
export function shouldStopForEvent(event:{priority:string}|undefined){return !!event&&(event.priority==='REQUIRES_ACTION'||event.priority==='HIGH')}
export function validateTransaction(tx:Transaction,state:{roster:Set<string>;il:Set<string>}):string[]{const errors:string[]=[];if(['OPTION','IL','DFA','RELEASE'].includes(tx.kind)&&!state.roster.has(tx.playerId))errors.push('Player is not on the active organization roster.');if(tx.kind==='ACTIVATE'&&!state.il.has(tx.playerId))errors.push('Player is not on the injured list.');if(tx.kind==='TRADE'&&!tx.otherTeamId)errors.push('Trade requires another team.');return errors}
export const OFFSEASON_SEQUENCE:SeasonPhase[]=['OFFSEASON','FREE_AGENCY','WINTER_MEETINGS','SPRING_TRAINING'];
