import { CLUBS } from './league';

export type BatHand='L'|'R'|'S';
export interface SimPlayer { id:string; teamId:string; name:string; position:string; bats:BatHand; contact:number; power:number; discipline:number; speed:number; defense:number; pitching:number; control:number; stamina:number; fatigue?:number; health?:number }

const first=['Alex','Ben','Carlos','Dylan','Eli','Francisco','Grant','Henry','Isaac','Javier','Kai','Luis','Marcus','Nate','Owen','Parker','Rafael','Sam','Theo','Victor','Will','Zach'];
const last=['Adams','Baker','Castillo','Diaz','Edwards','Flores','Garcia','Hayes','Irwin','Johnson','Kim','Lopez','Martinez','Nelson','Ortiz','Perez','Quinn','Ramirez','Santos','Turner','Vega','Walker'];
const positions=['C','1B','2B','3B','SS','LF','CF','RF','DH'];
const pitcherPositions=['P','SP','RP','CP'];
function hash(s:string){let h=0;for(const c of s)h=(Math.imul(h,31)+c.charCodeAt(0))>>>0;return h}
function rating(seed:string,lo=55,hi=88){return lo+(hash(seed)%(hi-lo+1))}
function player(teamId:string,i:number,position:string):SimPlayer{const seed=`${teamId}-${i}`;return{id:`${teamId}-p${i}`,teamId,name:`${first[hash(seed+'f')%first.length]} ${last[hash(seed+'l')%last.length]}`,position,bats:(['L','R','S'] as BatHand[])[hash(seed+'b')%3],contact:rating(seed+'c'),power:rating(seed+'p'),discipline:rating(seed+'d'),speed:rating(seed+'s',45,88),defense:rating(seed+'x',50,90),pitching:pitcherPositions.includes(position)?rating(seed+'q',58,90):0,control:pitcherPositions.includes(position)?rating(seed+'k',55,88):0,stamina:position==='SP'?rating(seed+'t',65,92):position==='RP'?rating(seed+'t',25,48):0}}

export function createLeaguePlayers():SimPlayer[]{const all:SimPlayer[]=[];for(const club of CLUBS){positions.forEach((pos,i)=>all.push(player(club.id,i,pos)));for(let i=0;i<5;i++)all.push(player(club.id,9+i,'SP'));for(let i=0;i<8;i++)all.push(player(club.id,14+i,'RP'));}return all}
export function lineupFor(teamId:string,players:SimPlayer[]){return players.filter(p=>p.teamId===teamId&&!pitcherPositions.includes(p.position)&&(p.health??100)>30).sort((a,b)=>((b.contact+b.power+b.discipline+b.defense)-(b.fatigue??0))-((a.contact+a.power+a.discipline+a.defense)-(a.fatigue??0))).slice(0,9)}
export function starterFor(teamId:string,day:number,players:SimPlayer[]){const rotation=players.filter(p=>p.teamId===teamId&&pitcherPositions.includes(p.position)&&(p.health??100)>30).sort((a,b)=>(b.stamina+b.pitching+b.control)-(a.stamina+a.pitching+a.control)).slice(0,5);if(!rotation.length)throw new Error(`No available pitcher for ${teamId}`);return rotation[(day-1)%rotation.length]}
