import {NextResponse} from 'next/server';
import {fetchRealLeagueSnapshot} from '../../../../src/lib/mlb/realData';
export const dynamic='force-dynamic';export const maxDuration=60;
export async function GET(req:Request){try{const u=new URL(req.url);const season=Number(u.searchParams.get('season')||2026);const data=await fetchRealLeagueSnapshot(season);return NextResponse.json(data)}catch(e:any){return NextResponse.json({error:e?.message||'MLB snapshot failed'},{status:500})}}
