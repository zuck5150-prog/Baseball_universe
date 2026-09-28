import type { SimPlayer } from './players';

export type PersistedPlayerRow={id:string;team_id:string;name:string;position:string;bats?:string;ratings?:Record<string,number>;fatigue?:number;health?:number;roster_status?:string;level?:string;source?:any};

const n=(v:any,fallback:number)=>Number.isFinite(Number(v))?Number(v):fallback;
export function persistedRowsToSimPlayers(rows:PersistedPlayerRow[],teams:any[]):SimPlayer[]{
 const teamKey=Object.fromEntries(teams.map(t=>[t.id,t.team_key]));
 return rows.filter(p=>(p.level??'MLB')==='MLB' && (p.roster_status??'ACTIVE')!=='IL').map((p:any)=>({
  id:p.id,name:p.name,teamId:teamKey[p.team_id],position:p.position||'UT',bats:p.bats||'R',
  contact:n(p.ratings?.contact,50),power:n(p.ratings?.power,50),discipline:n(p.ratings?.discipline,50),speed:n(p.ratings?.speed,50),defense:n(p.ratings?.defense,50),
  pitching:n(p.ratings?.pitching,35),control:n(p.ratings?.control,35),stamina:n(p.ratings?.stamina,35),
  fatigue:n(p.fatigue,0),health:n(p.health,100)
 })) as SimPlayer[];
}

export function depthChart(teamId:string,players:SimPlayer[]){
 const roster=players.filter(p=>p.teamId===teamId);
 const hitters=roster.filter(p=>!['P','SP','RP','CP'].includes(p.position)).sort((a,b)=>(b.contact+b.power+b.discipline+b.defense)-(a.contact+a.power+a.discipline+a.defense));
 const starters=roster.filter(p=>['P','SP'].includes(p.position)).sort((a,b)=>(b.pitching+b.control+b.stamina)-(a.pitching+a.control+a.stamina)).slice(0,5);
 const bullpen=roster.filter(p=>['P','SP','RP','CP'].includes(p.position)&&!starters.some(s=>s.id===p.id)).sort((a,b)=>(b.pitching+b.control)-(a.pitching+a.control));
 return{lineup:hitters.slice(0,9),bench:hitters.slice(9),rotation:starters,bullpen};
}
