import type { SimPlayer } from '../baseball/players';
import type { InjuryEvent } from '../baseball/injuries';
export interface GeneratedEvent{type:string;priority:'LOW'|'NORMAL'|'HIGH'|'REQUIRES_ACTION';title:string;context:Record<string,unknown>;playerId?:string}
export function eventsFromInjuries(injuries:InjuryEvent[],userTeamId:string,players:SimPlayer[]):GeneratedEvent[]{return injuries.map(i=>{const p=players.find(x=>x.id===i.playerId)!;const own=p?.teamId===userTeamId;return{type:'INJURY',priority:own&&i.severity!=='DAY_TO_DAY'?'REQUIRES_ACTION':i.severity==='60_DAY_IL'?'HIGH':'NORMAL',title:own?`${i.name} needs a roster decision`:`${i.name} injured`,context:{...i,teamId:p?.teamId},playerId:i.playerId}})}
export function usageMeeting(player:SimPlayer,appearances:number):GeneratedEvent|null{if(appearances<4)return null;return{type:'PLAYER_MEETING',priority:'REQUIRES_ACTION',title:`${player.name} wants to discuss his role`,context:{reason:'usage',appearances},playerId:player.id}}
export function memoryForResolution(playerId:string,date:string,summary:string,kind='CONVERSATION'){return{playerId,date,summary,kind,emotionalWeight:20}}
