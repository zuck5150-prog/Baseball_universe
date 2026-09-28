import type {ScheduledGame} from './league';
import type {SimPlayer} from './players';
import type {BoxScore} from './boxscore';
import {simulateBoxScore} from './boxscore';
import type {DailyGamePlan} from './gamePlan';
function cloneWithPlan(players:SimPlayer[],plan?:DailyGamePlan){if(!plan)return players;const order=new Map(plan.lineupIds.map((id,i)=>[id,i]));return players.map(p=>{if(p.teamId!==plan.teamId)return p;const slot=order.get(p.id);if(slot!==undefined)return{...p,contact:p.contact+(9-slot)*.01};if(p.id===plan.starterId)return{...p,stamina:p.stamina+30,pitching:p.pitching+5};return p})}
export function simulateManagedBoxScore(game:ScheduledGame,day:number,players:SimPlayer[],seed:string,awayPlan?:DailyGamePlan,homePlan?:DailyGamePlan):BoxScore{let prepared=cloneWithPlan(players,awayPlan);prepared=cloneWithPlan(prepared,homePlan);const box=simulateBoxScore(game,day,prepared,seed);return box}
export function gamePlanRunModifier(plan:DailyGamePlan){let x=0;if(plan.baserunning==='AGGRESSIVE')x+=.08;if(plan.steals==='AGGRESSIVE')x+=.05;if(plan.platoon)x+=.04;if(plan.bunts==='AGGRESSIVE')x-=.03;if(plan.defenseLate==='AGGRESSIVE')x+=.02;return x}
