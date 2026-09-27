# Baseball Universe

A text-first, AI-driven baseball management universe.

## v0.1 playable loop

- Start a new season
- Choose from 30 MLB cities/clubs
- Enter the GM office
- Receive a front-office decision prompt
- Go to game day
- Simulate a result
- Read a newspaper-style game story
- Advance to the next day with persistent record state

## Direction

The simulation engine owns baseball facts and results. The AI layer will narrate verified results, role-play baseball characters, create structured events, and interpret free-text management decisions. This separation prevents the narrative model from inventing game statistics.

## Next build phases

1. Full deterministic game simulation and box score
2. 30-team schedule, standings and statistics
3. Persistent universes/database
4. AI newspaper and structured event engine
5. Roster/lineup/rotation/bullpen management
6. Injuries, morale and relationships
7. Trades and deadline AI
8. Postseason
9. Contracts/free agency/offseason
10. Multi-season careers

## Run locally

```bash
npm install
npm run dev
```
