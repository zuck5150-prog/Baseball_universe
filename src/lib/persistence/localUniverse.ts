import type { BoxScore } from '../baseball/boxscore';
import type { PlayerHealth } from '../baseball/health';
export interface SavedUniverse { version:1; universeId:string; createdAt:string; updatedAt:string; season:number; day:number; teamId:string; boxes:BoxScore[]; health:Record<string,PlayerHealth>; directions:string[] }
const KEY='baseball-universe:v1';
export function saveUniverse(u:SavedUniverse){if(typeof window==='undefined')return;localStorage.setItem(KEY,JSON.stringify({...u,updatedAt:new Date().toISOString()}))}
export function loadUniverse():SavedUniverse|null{if(typeof window==='undefined')return null;try{const raw=localStorage.getItem(KEY);if(!raw)return null;const parsed=JSON.parse(raw) as SavedUniverse;return parsed.version===1?parsed:null}catch{return null}}
export function deleteUniverse(){if(typeof window!=='undefined')localStorage.removeItem(KEY)}
export function hasSavedUniverse(){return typeof window!=='undefined'&&!!localStorage.getItem(KEY)}
