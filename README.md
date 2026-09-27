# MLB SEASON: AI — Baseball Universe

**162 games. 30 teams. One living baseball world.**

This repository is being built from the beginning around the complete Baseball Universe vision below. These are core systems, not optional stretch goals. GM/Manager is the first playable role, but the data model and world engine must support every role and long-term system from the start.

## Core design rules

1. The deterministic simulation engine owns baseball truth: games, plays, scores, stats, standings, fatigue, injuries and transaction legality.
2. AI never invents official baseball facts. AI interprets structured game state, creates narrative, role-plays characters, negotiates, remembers interactions and interprets free-text user intent.
3. Every meaningful action persists in the universe and can create future consequences.
4. All 30 organizations continue living and acting even when the user is not controlling them.
5. A universe branches away from real MLB the moment START SEASON is pressed.
6. Architecture must support 20+ seasons without resetting history.

## Roles

The universe must support:
- **GM** — trades, roster moves, call-ups, contracts, waivers, organizational planning.
- **Manager** — lineups, rotation, bullpen, playing time and strategy.
- **Owner** — budgets, ticket prices, front office, facilities and organizational priorities.
- **Reporter** — cover the league, interview characters, publish stories and build reputation.
- **Commissioner** — league-wide events, controversies, rules and major decisions.
- **Fan Mode** — experience and follow an alternate MLB universe without running a club.

**First playable version: combined GM/Manager.** Role boundaries must remain explicit in the model so the other roles can be activated later without redesigning the universe.

## Living daily world

Every simulated day processes the complete league:

**Games → stats → standings → injuries → fatigue → roster moves → transactions → news → player morale → team chemistry → relationships → trade rumors → media → fan reaction → finances → AI events → character memories.**

The user's team is not the only active organization. AI clubs evaluate needs, make roster moves, negotiate, trade with each other and pursue the same players the user may be pursuing.

## Daily experience / Baseball Times

Each new day can generate a personalized newspaper containing:
- Date and season context
- Major headline/story
- Every relevant league score
- Game recaps based only on verified simulation data
- League standings and playoff position
- League leaders (AVG, HR and eventually the full statistical set)
- User club record, Last 10, division place and Wild Card position
- Injuries
- Transactions
- Call-ups/options
- Trade rumors
- Breaking news
- Upcoming games
- Inbox/meetings requiring attention

The presentation should feel like the user is opening the baseball world each morning, not opening a conventional admin dashboard.

## Free-text AI decisions

Important events offer sensible predefined actions **plus an always-available free-text response**.

Example: a catcher reports a shoulder problem. The user can choose Start Him / Rest Him / IL, or type:

> Call up our Triple-A catcher. Give him the next two starts and have medical reevaluate our starter Friday.

AI must convert that language into structured proposed actions. The game/rules layer validates the actions, applies legal state changes, schedules follow-ups and stores the interaction in character/world memory. AI cannot directly mutate authoritative stats or bypass roster/baseball rules.

## AI conversations and initiated events

Characters can initiate meetings based on actual world state. Examples:
- A closer is unhappy with usage.
- A player objects to batting-order placement.
- A veteran defends the manager publicly.
- A player leaks frustration to a reporter.
- A coach recommends changing the rotation.
- Medical staff raises an injury concern.
- The owner pressures the front office.
- A reporter asks about a controversy or rumor.
- An opposing GM calls with a trade proposal.

The user can enter a conversation and respond naturally rather than being limited to scripted dialogue trees.

## Character personality + memory

Players, coaches, executives, owners, reporters and other recurring characters have persistent hidden traits and relationships. Player examples include:
- Loyalty
- Ego
- Leadership
- Competitiveness
- Media tolerance
- Manager relationship
- GM relationship
- Teammate relationships
- Morale
- Playing-time expectations
- Winning priority
- Financial priority

These values normally remain hidden. The player experiences them through behavior. Characters remember promises, conflicts, trades, demotions, praise, benchings, negotiations, injuries, media comments and prior conversations. Memory influences future dialogue, morale, relationships and events.

## Baseball simulation — NOT decided by AI

An LLM does not decide who wins.

The simulation uses player ratings and statistical distributions plus factors such as:
- Batter/pitcher matchup
- Handedness
- Starting pitcher
- Bullpen quality and availability
- Lineup quality
- Defense
- Park effects
- Fatigue
- Injuries
- Rest
- Strategy
- Randomness within realistic baseball distributions

The engine produces structured facts such as final score, innings, hits, walks, errors, pitching lines, batting lines and key plays. AI receives those facts and turns them into newspaper stories, commentary and character reactions without changing them.

## Real MLB seed data

A new universe should be seeded from real MLB information where legally/technically appropriate:
- 30 MLB clubs
- Current/selected-season rosters
- Players
- Positions
- Recent performance/statistical baselines
- Schedules
- Standings/league structure
- Ballparks
- Organization/minor-league context where available

The selected Opening Day snapshot becomes the starting point. After **START SEASON**, the saved universe is authoritative and real-world subsequent results do not overwrite it.

## Organization depth / minor leagues

Organizations must support more than the active MLB roster:
- MLB active roster
- Injured list
- 40-man roster
- Triple-A
- Double-A / prospect context
- Prospects
- Options/call-ups
- Demotions
- Depth chart
- Development state

This allows instructions such as calling up a Triple-A catcher to be real game actions rather than flavor text.

## Simulation speeds

The season must be practical to play across 162 games:
- **PLAY TODAY** — experience today's game and decisions.
- **SIM TO TOMORROW** — process one day.
- **SIM SERIES** — advance through the current series.
- **SIM WEEK** — advance seven days.
- **SIM UNTIL EVENT** — continue until something important requires user attention.

Fast simulation stops for events marked as requiring intervention, such as serious injury, roster illegality, major trade decision, player meeting, owner meeting or other high-priority event. Low-priority news is summarized rather than constantly interrupting play.

## Trades + living trade market

Trades are negotiations between persistent organizations, not isolated menu transactions.

AI GMs have:
- Organizational goals
- Competitive window
- Budget/payroll context
- Positional needs
- Prospect preferences
- Player valuations
- Untouchable players
- Negotiation history
- Relationships/reputation

The user can negotiate in natural language. The AI interprets the proposal, while the transaction engine controls actual assets and legality. Other clubs negotiate and trade with one another, so a target can be acquired by another team while the user is negotiating.

## Trade deadline

July/deadline season becomes a major dynamic mode:
- Days/hours until deadline
- Buy/sell/hold organizational context
- Rumors
- Competing offers
- AI GM calls
- Counteroffers
- Prospect packages
- Salary considerations
- User-created free-text counters
- Deals between AI clubs
- Breaking-news presentation when a target is lost or acquired
- Deadline recap and consequences

## Postseason / October mode

The presentation becomes more dramatic in October while using the same authoritative simulation engine:
- Wild Card
- Division Series
- Championship Series
- World Series
- Series state
- Elimination-game presentation
- Pitcher rest and short-rest decisions
- Bullpen availability
- Rotation changes
- Roster decisions
- Higher media/fan/owner pressure
- Postseason-specific conversations and storylines

The six-month history of the universe remains relevant to October relationships and decisions.

## End-of-season retrospective

After the World Series, generate a season history for the user and league:
- Final record
- Finish/postseason result
- Awards
- Statistical leaders
- Major storylines
- Key injuries
- Major transactions
- Manager approval
- Fan approval
- Owner approval
- Important successful/unsuccessful decisions described from actual outcomes
- Character/relationship developments
- Franchise and league records
- Saved historical newspaper/story archive

## Offseason

The universe continues rather than resetting:
- Expiring contracts
- Free agency
- Arbitration
- Options/non-tenders
- Rule 5
- Winter Meetings
- Trades
- Organizational hiring/firing where supported
- Draft
- Prospect development
- Spring training
- Roster battles
- Opening Day roster construction

Then **CONTINUE TO NEXT SEASON** begins another full season in the same persistent universe.

## Long-term universe

Target: **20+ seasons**.

Persist:
- Career statistics
- Season statistics
- Team histories
- Champions
- Awards
- Records
- Transactions
- Contracts
- Draft history
- Player development/aging
- Retirements
- Character memories
- User career history
- Franchise reputation
- News/story archive

The database must be designed for this from the beginning even when the first UI exposes only part of it.

## Core data domains required from the start

- Universe / seasons / calendar
- Teams / organizations / ballparks
- Players / ratings / personalities / health / fatigue
- Rosters / depth charts / minor leagues / prospects
- Contracts / payroll / finances
- Schedule / games / plays / box scores
- Batting / pitching / fielding statistics
- Standings / playoff races / postseason series
- Injuries / medical state
- Transactions / waivers / options / call-ups
- Trades / negotiations / offers / AI team strategy
- Staff / owners / reporters / commissioner characters
- Morale / chemistry / relationships
- Character memories / promises / conflicts
- News / rumors / newspaper stories / media reactions
- Fan sentiment / owner approval
- Events / meetings / conversations / user decisions
- Simulation checkpoints / stop conditions
- Awards / records / historical archive
- Offseason / arbitration / free agency / Rule 5 / draft / spring training

## v0.1 playable vertical slice

The first UI remains intentionally narrow while sitting on the full architecture:

**New Universe → Choose GM/Manager Club → Opening Day → Office/Inbox → Set Lineup/Staff Context → Play/Sim Game → Deterministic Box Score → AI-style Newspaper Recap → League Scores/Standings → Character Event → Preset or Free-Text Response → Apply Persistent Consequences → Advance Day**

The prototype may use placeholder/generated data while systems are implemented, but placeholders must be replaceable by the authoritative world model rather than becoming separate throwaway game logic.

## Build order

1. Persistent universe schema covering the complete data domains above.
2. Real MLB seed/import layer with cached snapshots.
3. Deterministic plate-appearance/game simulation and full box scores.
4. 30-team schedule, daily league simulation, stats and standings.
5. MLB/40-man/minor-league roster and transaction rules.
6. GM/Manager UI: lineup, rotation, bullpen, roster, depth and inbox.
7. Structured event system and stop conditions.
8. Character personality, relationship and memory model.
9. Free-text decision interpreter + validation/action layer.
10. AI newspaper, dialogue and verified-data narrative layer.
11. Injuries, fatigue, morale, chemistry, media, fans and owner systems.
12. AI organization strategy, transactions and trade negotiations.
13. Trade-deadline mode.
14. Full postseason/October mode.
15. Contracts, payroll, finances and complete offseason.
16. Arbitration, Rule 5, draft, development, aging, retirement and spring training.
17. End-of-season retrospective/history/awards/records.
18. Multi-season persistence and long-career balancing.
19. Activate Owner, Reporter, Commissioner and Fan role experiences on the shared world model.

## Current technical foundation

- Next.js / React / TypeScript
- Persistent database layer planned for the complete universe state
- Structured AI inputs/outputs for narration, dialogue and free-text interpretation
- Deterministic simulation code separated from AI code
- Text-first/newspaper-first presentation

## Definition of success

The game should eventually feel less like clicking through a baseball spreadsheet and more like **living inside an alternate MLB history that remembers what happened**. The numbers remain trustworthy because the simulation owns baseball truth; AI makes the people, conversations, news and consequences feel alive.

## Run locally

```bash
npm install
npm run dev
```
