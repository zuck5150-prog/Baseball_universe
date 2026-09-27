import { CLUBS } from './league';
import type { SimGameResult } from './sim';

export interface ClubStanding { teamId:string; w:number; l:number; pct:number; rs:number; ra:number }

export function calculateStandings(results:SimGameResult[]):ClubStanding[]{
 const table:Record<string,ClubStanding>=Object.fromEntries(CLUBS.map(c=>[c.id,{teamId:c.id,w:0,l:0,pct:0,rs:0,ra:0}]));
 for(const g of results){const a=table[g.awayId],h=table[g.homeId];a.rs+=g.awayRuns;a.ra+=g.homeRuns;h.rs+=g.homeRuns;h.ra+=g.awayRuns;if(g.awayRuns>g.homeRuns){a.w++;h.l++}else{h.w++;a.l++}}
 for(const row of Object.values(table)) row.pct=row.w+row.l?row.w/(row.w+row.l):0;
 return Object.values(table).sort((a,b)=>b.pct-a.pct||b.w-a.w);
}
