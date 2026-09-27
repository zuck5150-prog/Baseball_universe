import { CLUBS, ScheduledGame } from './league';

export interface SimGameResult { gameId:string; awayId:string; homeId:string; awayRuns:number; homeRuns:number; innings:number; headline:string }

function hash(input:string){let h=2166136261;for(let i=0;i<input.length;i++){h^=input.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed:number){let x=seed||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296}}
function poisson(mean:number, random:()=>number){const L=Math.exp(-mean);let k=0,p=1;do{k++;p*=random()}while(p>L);return k-1}

export function simulateGame(game:ScheduledGame, universeSeed='baseball-universe'):SimGameResult {
 const away=CLUBS.find(c=>c.id===game.awayId)!; const home=CLUBS.find(c=>c.id===game.homeId)!; const random=rng(hash(`${universeSeed}:${game.id}`));
 const awayMean=4.25+(away.strength-home.strength)*0.035; const homeMean=4.45+(home.strength-away.strength)*0.035;
 let ar=Math.max(0,poisson(Math.max(2.2,awayMean),random)); let hr=Math.max(0,poisson(Math.max(2.3,homeMean),random)); let innings=9;
 while(ar===hr){innings++; if(random()<0.48) ar++; if(random()<0.52) hr++; if(innings>15&&ar===hr) hr++;}
 const winner=ar>hr?away:home; const loser=ar>hr?home:away;
 return {gameId:game.id,awayId:away.id,homeId:home.id,awayRuns:ar,homeRuns:hr,innings,headline:`${winner.name.toUpperCase()} BEAT ${loser.name.toUpperCase()} ${Math.max(ar,hr)}–${Math.min(ar,hr)}`};
}

export function simulateDay(games:ScheduledGame[], day:number, universeSeed='baseball-universe'){return games.filter(g=>g.day===day).map(g=>simulateGame(g,universeSeed))}
