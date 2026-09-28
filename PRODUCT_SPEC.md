# Baseball Universe — Product Contract

The product is a persistent, text-first alternate MLB universe. The deterministic baseball/world state is authoritative; AI interprets and narrates it but may not invent baseball facts.

## 1. Real MLB universe
Real MLB organizations and real players seed each new universe from a versioned pre-start snapshot. After Start Universe, the save branches from reality permanently.

## 2. Serious baseball simulation
Plate appearances, lineups, rotations, bullpen roles/usage, fatigue, injuries, substitutions, platoons, parks, ratings and season statistics are simulation state, not LLM decisions.

## 3. GM + Manager
Roster moves, IL, options, call-ups, DFA, waivers, trades, contracts, depth charts, lineups, pitching roles and strategy are user/AI-club actions validated by deterministic rules.

## 4. Living 30-team world
All clubs act independently: transactions, injuries, promotions, trade market, contention states, chemistry, morale, media, fans and finances.

## 5. AI characters
Players/coaches/GMs/owners/reporters have hidden personalities, relationships and persistent memories. Dialogue is grounded in world state.

## 6. Free-text control
Natural-language instructions become structured proposed actions, then deterministic validation/execution. Canned choices are shortcuts, not limits.

## 7. The Baseball Times
Daily personalized newspaper generated only from verified scores/stats/standings/events/transactions. AI writes prose; it cannot alter facts.

## 8. Season pacing
Play Today, Sim Tomorrow, Sim Series, Sim Week, Sim Until Event. Important/requires-action events interrupt fast simulation.

## 9. Deadline, October, offseason, future seasons
Trade deadline negotiations, postseason, World Series, awards/retrospective, arbitration, free agency, Rule 5, winter meetings, draft, spring training and Continue to Next Season.

## 10. Presentation
Text-first editorial baseball-world presentation: office, newspaper, conversations, transactions, roster/lineup, standings/leaders, dramatic postseason presentation, responsive mobile-first UI.

## Data integrity rules
- Real-world seed data is frozen and versioned.
- Simulated universe state overrides reality after start.
- Every story/dialogue receives a factual context payload.
- AI output never directly mutates game state.
- AI-proposed actions must pass rules validation.
- Saves must remain reproducible from universe seed + persisted mutations/results.
