export interface Personality{loyalty:number;ego:number;leadership:number;competitiveness:number;mediaTolerance:number;adaptability:number}
export interface Relationship{trust:number;respect:number;affinity:number}
export interface CharacterMemory{date:string;kind:string;summary:string;emotionalWeight:number;entities:string[]}
function clamp(n:number){return Math.max(0,Math.min(100,Math.round(n)))}
export function reactionScore(p:Personality,r:Relationship,input:{playingTimeDelta?:number;teamSuccess?:number;publicCriticism?:boolean;promiseKept?:boolean}){let x=(r.trust+r.respect+r.affinity)/3;if(input.playingTimeDelta)x+=input.playingTimeDelta*(p.ego/100);if(input.teamSuccess)x+=input.teamSuccess*(p.competitiveness/100);if(input.publicCriticism)x-=p.mediaTolerance<40?18:8;if(input.promiseKept)x+=12;return clamp(x)}
export function applyMemory(r:Relationship,m:CharacterMemory):Relationship{const d=m.emotionalWeight/10;return{trust:clamp(r.trust+d),respect:clamp(r.respect+d*.6),affinity:clamp(r.affinity+d*.8)}}
export function dialogueContext(name:string,p:Personality,r:Relationship,memories:CharacterMemory[]){return{character:name,personality:p,relationship:r,recentMemories:memories.slice(-12),rule:'Respond in character, but never invent baseball facts outside supplied world state.'}}
