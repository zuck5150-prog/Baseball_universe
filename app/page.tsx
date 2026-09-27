'use client';

import { useState } from 'react';

const teams = ['Arizona','Atlanta','Baltimore','Boston','Chicago (AL)','Chicago (NL)','Cincinnati','Cleveland','Colorado','Detroit','Houston','Kansas City','Los Angeles (AL)','Los Angeles (NL)','Miami','Milwaukee','Minnesota','New York (AL)','New York (NL)','Athletics','Philadelphia','Pittsburgh','San Diego','San Francisco','Seattle','St. Louis','Tampa Bay','Texas','Toronto','Washington'];

type Screen = 'home' | 'teams' | 'office' | 'game' | 'story';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [team, setTeam] = useState('Baltimore');
  const [day, setDay] = useState(1);
  const [record, setRecord] = useState({ w: 0, l: 0 });
  const [lastScore, setLastScore] = useState('');

  function simulate() {
    const ours = Math.floor(Math.random() * 8) + 1;
    const theirs = Math.floor(Math.random() * 8);
    const win = ours > theirs;
    setRecord(r => ({ w: r.w + (win ? 1 : 0), l: r.l + (win ? 0 : 1) }));
    setLastScore(`${team} ${ours}, New York ${theirs}`);
    setScreen('story');
  }

  if (screen === 'home') return <main className="cover"><div className="kicker">AN AI BASEBALL WORLD</div><h1>BASEBALL<br/>UNIVERSE</h1><p className="deck">162 games. Thirty clubs. One season that remembers everything.</p><button onClick={() => setScreen('teams')}>BEGIN A NEW SEASON →</button><div className="rule"/><p className="small">Every game creates history. Every decision changes what comes next.</p></main>;

  if (screen === 'teams') return <main><header><b>BASEBALL UNIVERSE</b><span>NEW UNIVERSE / 2027</span></header><section className="paper"><div className="kicker">OPENING DAY IS WAITING</div><h2>Choose Your Club</h2><p>You are taking control of baseball operations. The universe begins the moment you accept the job.</p><div className="teams">{teams.map(t => <button className={team===t?'selected':''} key={t} onClick={()=>setTeam(t)}>{t}</button>)}</div><button className="primary" onClick={()=>setScreen('office')}>TAKE THE JOB — {team.toUpperCase()} →</button></section></main>;

  if (screen === 'office') return <main><header><b>BASEBALL UNIVERSE</b><span>APRIL {day + 2}, 2027</span></header><section className="paper"><div className="mast"><div><div className="kicker">YOUR CLUB</div><h2>{team}</h2><p className="record">{record.w}–{record.l} · Opening Series</p></div><div className="stamp">GM<br/>OFFICE</div></div><div className="grid"><article><div className="kicker">TODAY'S GAME</div><h3>{team} vs. New York</h3><p>7:05 PM · Opening series</p><button className="primary" onClick={()=>setScreen('game')}>GO TO BALLPARK →</button></article><article><div className="kicker">INBOX</div><h3>A decision is waiting.</h3><p>Your manager wants to know how aggressive you want the club to be with the bullpen during the opening series.</p><textarea placeholder="Tell your manager what you want to do…"/><button onClick={()=>alert('Direction saved. In the full AI build, your manager will remember this.')}>SEND DIRECTION</button></article></div><div className="headline"><div className="kicker">AROUND THE LEAGUE</div><h2>A NEW SEASON BEGINS</h2><p>Thirty clubs wake up with the same record. By tonight, this universe will have its first heroes, mistakes and arguments.</p></div></section></main>;

  if (screen === 'game') return <main><header><b>BASEBALL UNIVERSE</b><span>GAME DAY</span></header><section className="paper center"><div className="kicker">OPENING SERIES · GAME {day}</div><h2>{team}<br/><span className="vs">VS.</span><br/>NEW YORK</h2><p>Your lineup is posted. The park is filling. Once the game begins, the simulation engine determines the result and the story engine explains what happened.</p><button className="primary huge" onClick={simulate}>PLAY BALL →</button></section></main>;

  return <main><header><b>THE BASEBALL TIMES</b><span>FINAL EDITION</span></header><section className="paper"><div className="kicker">FINAL</div><h2>{lastScore}</h2><div className="headline"><h1>{record.w > record.l ? 'A NIGHT TO REMEMBER' : 'OPENING NIGHT STINGS'}</h1><p>{team} opened another chapter of its season tonight. The decisive innings changed the mood around the clubhouse, and tomorrow's game now carries a little more weight.</p><p>This story area is where the AI layer will turn verified simulation data into newspaper-style reporting without inventing the underlying statistics.</p></div><div className="grid"><article><h3>Your record</h3><p className="bigstat">{record.w}–{record.l}</p></article><article><h3>Next</h3><p>New York · Tomorrow</p></article></div><button className="primary" onClick={()=>{setDay(d=>d+1);setScreen('office')}}>ADVANCE TO TOMORROW →</button></section></main>;
}
