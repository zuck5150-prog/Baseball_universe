import type { SimPlayer } from './players';
export interface InjuryEvent{playerId:string;name:string;days:number;severity:'DAY_TO_DAY'|'10_DAY_IL'|'60_DAY_IL';health:number}
function hash(s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
export function rollDailyInjuries(players:SimPlayer[],day:number,seed:string):InjuryEvent[]{const out:InjuryEvent[]=[];for(const p of players){const n=hash(`${seed}:${day}:${p.id}:injury`)%10000;if(n<8){const severity=n<1?'60_DAY_IL':n<4?'10_DAY_IL':'DAY_TO_DAY';const days=severity==='60_DAY_IL'?60+(hash(p.id+day)%31):severity==='10_DAY_IL'?10+(hash(day+p.id)%21):1+(hash(p.id)%5);out.push({playerId:p.id,name:p.name,days,severity,health:severity==='60_DAY_IL'?35:severity==='10_DAY_IL'?60:82})}}return out}
