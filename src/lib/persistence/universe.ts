import { createClient } from '../supabase/client';
import { CLUBS } from '../baseball/league';
import type { BoxScore } from '../baseball/boxscore';
import type { SimPlayer } from '../baseball/players';

export async function createUniverse(teamKey:string, players:SimPlayer[], season=2027){
 const supabase=createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) throw new Error('Sign in required to create a persistent universe');
 const {data:u,error}=await supabase.from('universes').insert({user_id:user.id,name:`${CLUBS.find(c=>c.id===teamKey)?.name??'Baseball'} Universe`,game_date:`${season}-04-01`,current_season:season,user_role:'GM',user_team_key:teamKey,seed:`universe-${crypto.randomUUID()}`}).select().single(); if(error)throw error;
 const {data:teams,error:te}=await supabase.from('teams').insert(CLUBS.map(c=>({universe_id:u.id,team_key:c.id,city:c.city,name:c.name,abbreviation:c.abbr,league:c.league,division:c.division,strategy:{competitiveWindow:'HOLD',budgetAggression:50,prospectPreference:50,winNowPreference:50,positionalNeeds:[],untouchablePlayerIds:[]}}))).select();if(te)throw te;
 const teamIds=Object.fromEntries((teams??[]).map((t:any)=>[t.team_key,t.id]));
 const {error:pe}=await supabase.from('players').insert(players.map(p=>({universe_id:u.id,team_id:teamIds[p.teamId],name:p.name,level:'MLB',position:p.position,bats:p.bats,ratings:{contact:p.contact,power:p.power,discipline:p.discipline,speed:p.speed,defense:p.defense,pitching:p.pitching,control:p.control,stamina:p.stamina},fatigue:0,health:100})));if(pe)throw pe;
 const {error:se}=await supabase.from('standings').insert((teams??[]).map((t:any)=>({universe_id:u.id,season,team_id:t.id})));if(se)throw se;
 return {universe:u,teamIds};
}

export async function saveDay(universeId:string, season:number, date:string, boxes:BoxScore[]){
 const supabase=createClient();const {data:teams,error:tErr}=await supabase.from('teams').select('id,team_key').eq('universe_id',universeId);if(tErr)throw tErr;const ids=Object.fromEntries((teams??[]).map((t:any)=>[t.team_key,t.id]));
 const rows=boxes.map(b=>({universe_id:universeId,season,game_date:date,away_team_id:ids[b.awayId],home_team_id:ids[b.homeId],status:'FINAL',away_runs:b.awayRuns,home_runs:b.homeRuns,innings:b.innings.length,seed:`${universeId}:${b.gameId}`,box_score:b}));const {error:gErr}=await supabase.from('games').upsert(rows,{onConflict:'universe_id,season,game_date,away_team_id,home_team_id'});if(gErr)throw gErr;
 const {error:uErr}=await supabase.from('universes').update({game_date:date,updated_at:new Date().toISOString()}).eq('id',universeId);if(uErr)throw uErr;
 await rebuildStandings(supabase,universeId,season,ids);
}

async function rebuildStandings(supabase:any,universeId:string,season:number,ids:Record<string,string>){const {data:games,error}=await supabase.from('games').select('away_team_id,home_team_id,away_runs,home_runs').eq('universe_id',universeId).eq('season',season).eq('status','FINAL');if(error)throw error;const rows:Record<string,any>={};for(const id of Object.values(ids))rows[id]={universe_id:universeId,season,team_id:id,wins:0,losses:0,runs_scored:0,runs_allowed:0};for(const g of games??[]){const a=rows[g.away_team_id],h=rows[g.home_team_id];a.runs_scored+=g.away_runs;a.runs_allowed+=g.home_runs;h.runs_scored+=g.home_runs;h.runs_allowed+=g.away_runs;if(g.away_runs>g.home_runs){a.wins++;h.losses++}else{h.wins++;a.losses++}}const {error:sErr}=await supabase.from('standings').upsert(Object.values(rows),{onConflict:'universe_id,season,team_id'});if(sErr)throw sErr}

export async function listUniverses(){const supabase=createClient();const {data,error}=await supabase.from('universes').select('*').order('updated_at',{ascending:false});if(error)throw error;return data??[]}
export async function loadUniverse(id:string){const supabase=createClient();const [u,t,p,g,s,e,m]=await Promise.all([supabase.from('universes').select('*').eq('id',id).single(),supabase.from('teams').select('*').eq('universe_id',id),supabase.from('players').select('*').eq('universe_id',id),supabase.from('games').select('*').eq('universe_id',id).order('game_date'),supabase.from('standings').select('*').eq('universe_id',id),supabase.from('world_events').select('*').eq('universe_id',id).eq('resolved',false),supabase.from('memories').select('*').eq('universe_id',id).order('memory_date',{ascending:false})]);for(const x of [u,t,p,g,s,e,m])if(x.error)throw x.error;return{universe:u.data,teams:t.data,players:p.data,games:g.data,standings:s.data,events:e.data,memories:m.data}}
