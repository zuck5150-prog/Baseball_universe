export interface MlbRosterPerson { id:number; fullName:string; position?:{abbreviation?:string;type?:string} }
export interface MlbRosterEntry { person:MlbRosterPerson; jerseyNumber?:string; position:{abbreviation:string}; status?:{code:string;description:string} }
export interface MlbRosterResponse { roster:MlbRosterEntry[] }
export interface MlbScheduleGame { gamePk:number; officialDate:string; teams:{away:{team:{id:number;name:string}};home:{team:{id:number;name:string}}} }
export interface MlbScheduleResponse { dates:Array<{date:string;games:MlbScheduleGame[]}> }
const BASE='https://statsapi.mlb.com/api/v1';
async function json<T>(url:string):Promise<T>{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error(`MLB import failed ${r.status}`);return r.json() as Promise<T>}
export async function fetchTeamRoster(teamId:number,season:number,rosterType='40Man'){return json<MlbRosterResponse>(`${BASE}/teams/${teamId}/roster?season=${season}&rosterType=${encodeURIComponent(rosterType)}`)}
export async function fetchSeasonSchedule(season:number){return json<MlbScheduleResponse>(`${BASE}/schedule?sportId=1&season=${season}&gameType=R`)}
export async function fetchPlayer(personId:number){return json<{people:Array<{id:number;fullName:string;birthDate?:string;batSide?:{code:string};pitchHand?:{code:string};primaryPosition?:{abbreviation:string}}> }>(`${BASE}/people/${personId}`)}
export async function fetchPlayerSeasonStats(personId:number,season:number,group:'hitting'|'pitching'){return json<any>(`${BASE}/people/${personId}/stats?stats=season&group=${group}&season=${season}`)}
// Import only creates a frozen seed snapshot. Once a universe starts, simulated state is authoritative.
