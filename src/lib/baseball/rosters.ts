export interface RosterPlayer { id:string; name:string; position:string; level:'MLB'|'AAA'|'AA'; contact:number; power:number; pitching?:number; fatigue:number; morale:number }
export interface LineupSlot { order:number; playerId:string; position:string }

// Demo roster data is intentionally labeled. The MLB seed importer will replace it
// with a frozen Opening Day snapshot; simulated universes never update from reality afterward.
export const BALTIMORE_DEMO_ROSTER:RosterPlayer[]=[
{id:'bal-p1',name:'Gunnar Henderson',position:'SS',level:'MLB',contact:84,power:88,fatigue:0,morale:75},
{id:'bal-p2',name:'Adley Rutschman',position:'C',level:'MLB',contact:82,power:76,fatigue:0,morale:75},
{id:'bal-p3',name:'Jackson Holliday',position:'2B',level:'MLB',contact:79,power:72,fatigue:0,morale:75},
{id:'bal-p4',name:'Jordan Westburg',position:'3B',level:'MLB',contact:78,power:78,fatigue:0,morale:75},
{id:'bal-p5',name:'Colton Cowser',position:'LF',level:'MLB',contact:74,power:80,fatigue:0,morale:75},
{id:'bal-p6',name:'Demo Center Fielder',position:'CF',level:'MLB',contact:72,power:67,fatigue:0,morale:75},
{id:'bal-p7',name:'Demo Right Fielder',position:'RF',level:'MLB',contact:70,power:72,fatigue:0,morale:75},
{id:'bal-p8',name:'Demo First Baseman',position:'1B',level:'MLB',contact:71,power:77,fatigue:0,morale:75},
{id:'bal-p9',name:'Demo DH',position:'DH',level:'MLB',contact:73,power:79,fatigue:0,morale:75},
{id:'bal-sp1',name:'Demo Opening Day Starter',position:'SP',level:'MLB',contact:0,power:0,pitching:80,fatigue:0,morale:75},
{id:'bal-aaa-c',name:'Triple-A Catcher',position:'C',level:'AAA',contact:65,power:61,fatigue:0,morale:70}
];

export function defaultLineup(roster:RosterPlayer[]):LineupSlot[]{return roster.filter(p=>p.level==='MLB'&&p.position!=='SP').slice(0,9).map((p,i)=>({order:i+1,playerId:p.id,position:p.position}))}
export function callUp(roster:RosterPlayer[],playerId:string){return roster.map(p=>p.id===playerId?{...p,level:'MLB' as const}:p)}
