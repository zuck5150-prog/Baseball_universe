import type { StructuredAction, UniverseState } from '../world/types';

export interface InterpretedDecision { summary:string; actions:StructuredAction[]; needsClarification:boolean }

// This contract is the boundary for the eventual model call. The LLM proposes
// structured actions; validateActions must run before authoritative state changes.
export interface DecisionInterpreter { interpret(text:string,state:UniverseState):Promise<InterpretedDecision> }

export function validateActions(actions:StructuredAction[],state:UniverseState):{valid:StructuredAction[];errors:string[]} {
 const valid:StructuredAction[]=[]; const errors:string[]=[];
 for(const action of actions){
  if(action.actorId && !state.players.some(p=>p.id===action.actorId) && !state.characters.some(c=>c.id===action.actorId)){errors.push(`Unknown actor: ${action.actorId}`);continue}
  if(action.targetId && !state.players.some(p=>p.id===action.targetId) && !state.characters.some(c=>c.id===action.targetId) && !state.teams.some(t=>t.id===action.targetId)){errors.push(`Unknown target: ${action.targetId}`);continue}
  valid.push(action);
 }
 return {valid,errors};
}
