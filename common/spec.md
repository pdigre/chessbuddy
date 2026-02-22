# ChessBuddy Common Module Specifications

This document outlines the functional specifications for the `common` module, which contains shared logic, models, and services for the ChessBuddy application.

## 1. Chess Rules (RulesService)

The `RulesService` is responsible for enforcing chess rules, validating moves, and interpreting game states.

### 1.1 Move Detection
**Requirement:** The system must be able to detect the move made between two consecutive board states (FEN strings).

*   **Scenario 1: Simple Move**
    *   **Given** a board state A and a board state B where a piece has moved from square X to square Y.
    *   **Then** the service should return the move as `[X, Y]`.
*   **Scenario 2: Castling**
    *   **Given** a board state where the King is in its original position and a subsequent state where the King has moved two squares towards a Rook.
    *   **Then** the service should identify this as a castling move.
*   **Scenario 3: Promotion**
    *   **Given** a pawn moves to the last rank.
    *   **Then** the service should identify the promotion and the piece it promoted to.

### 1.2 Game Termination
**Requirement:** The system must identify when a game has ended based on the move notation.

*   **Criteria:**
    *   "1-0" (White wins)
    *   "0-1" (Black wins)
    *   "1/2-1/2" (Draw)
    *   Any move ending with "#" (Checkmate)

## 2. FEN (Forsyth-Edwards Notation) Handling

The `FEN` model represents the state of a chess game.

### 2.1 Parsing
**Requirement:** The system must be able to parse a standard FEN string into a structured object.

*   **Input:** `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
*   **Output:** Object containing board array, active color, castling availability, en passant target, halfmove clock, and fullmove number.

## 3. History Management (HistoryService)

The `HistoryService` manages the storage and retrieval of game history.

### 3.1 Game Storage
**Requirement:** Completed games should be stored locally and capable of being synced to the server.

### 3.2 PGN Export
**Requirement:** Games should be exportable to PGN (Portable Game Notation) format.

## 4. Bot Integration (BotService)

The `BotService` manages interactions with chess engines (bots).

### 4.1 UCI Communication
**Requirement:** The service must communicate with Web Workers running chess engines using the UCI (Universal Chess Interface) protocol.

## 5. Bluetooth Connectivity (BluetoothService)

The `BluetoothService` handles connection to physical chess boards (e.g., Chessnut).

### 5.1 Connection
**Requirement:** The system should be able to scan for and connect to supported Bluetooth Low Energy (BLE) chess boards.

### 5.2 Move Synchronization
**Requirement:** Moves made on the physical board should be reflected in the application state, and vice versa (via LED indicators on the board).

---

## 6. OpenSpec task backlog (from GitHub issues)

This section translates open GitHub issues into implementable tasks for the `common` module.

### Task C-199: Optional faint bleep on illegal position

**Source:** GitHub #199 – “Add (optional) faint bleep when board registers new (illegal) position”

**Goal**
- When the physical board reports a *new position* that is determined to be illegal / not explainable by a legal move transition, optionally play a faint “bleep”.

**Where**
- `service/bluetooth.service.ts` (position update ingestion)
- `service/config.service.ts` (user setting)
- `service/media.service.ts` (or a new lightweight sound helper) for playing the bleep

**Requirements**
- Add config flag (default: **off**) e.g. `configService.display.bleepIllegalPosition: boolean` (or a dedicated `bluetooth` section if preferred).
- Detect “illegal position” at the point where incoming board state is decoded and compared to the expected/previous state.
- If the state is illegal and the flag is enabled:
  - Trigger a low-volume, short audio cue.
  - Throttle so repeated bad frames don’t spam audio (e.g. min 1–2 seconds between bleeps).

**Acceptance criteria**
- With flag OFF, no behavior change.
- With flag ON, a bleep plays only when an illegal position transition is detected.
- Bleep does not prevent normal recovery (user fixes pieces → system continues).

---

### Task C-198: BLE investigate “impossible to move” situations

**Source:** GitHub #198 – “BLE: Investigate impossible to move situations”

**Goal**
- Improve robustness when the BLE board reports a sequence of states that the rules engine can’t reconcile into a legal move.

**Where**
- `service/bluetooth.service.ts`
- `service/rules.service.ts`
- `model/fen.ts` / board differencing utilities if needed

**Requirements**
- Add structured debug logging hooks around:
  - previous FEN,
  - incoming board FEN (decoded),
  - computed diff,
  - chosen interpretation (move, capture, castle, promotion, “unknown”).
- Add a recovery strategy (no UI work in `common`, just state handling), such as:
  - Reset/rewind the “expected” board state after N consecutive unknown transitions.
  - Or re-sync from the physical board as authoritative if configured.
- Ensure that a single bad packet doesn’t permanently wedge move detection.

**Acceptance criteria**
- After “impossible” sequences, service eventually returns to a consistent state without requiring app restart.
- Logs provide enough detail to reproduce and diagnose the mismatch.

---

### Task C-197: BLE optional timer for sliding moves

**Source:** GitHub #197 – “BLE: Add (optional) timer to sliding moves”

**Goal**
- Improve move detection for rooks/bishops/queens when the user slides a piece and intermediate board states are noisy.

**Where**
- `service/bluetooth.service.ts`

**Requirements**
- Add optional config value (default: **off** or **0ms**) such as `bluetooth.slideDebounceMs`.
- When enabled:
  - Delay committing a detected move until the board has been stable for `slideDebounceMs`.
  - Prefer the most recent stable state as the final “to” square.
- Ensure pawns/knights/kings still respond quickly; debounce should apply only to sliding-piece candidates.

**Acceptance criteria**
- With debounce enabled, sliding moves don’t prematurely commit to an intermediate square.
- With debounce disabled, behavior is unchanged.

---

### Task C-196: BLE cannot move King from start position

**Source:** GitHub #196 – “BLE: Cannot move King from start pos”

**Goal**
- Fix scenarios where the BLE move detection logic fails to recognize king moves (especially from initial squares e1/e8) and/or misclassifies them as castling.

**Where**
- `service/rules.service.ts`
- `service/bluetooth.service.ts`

**Requirements**
- Review king-move inference logic:
  - Distinguish between castling and a normal king move.
  - Handle cases where the rook hasn’t moved but the king makes a 1-square move.
- Ensure that BLE events for lifting/placing do not get interpreted as transient castling attempts.

**Acceptance criteria**
- Normal king moves from the initial square are recognized and applied.
- Castling is still recognized when it should be.

---

### Task C-131: Bad move triggers only when black?

**Source:** GitHub #131 – “Bad move triggers only when black?”

**Goal**
- Ensure “bad move” detection (rule violation / illegal move) triggers consistently for *both* sides.

**Where**
- `service/rules.service.ts` (legal move validation)
- `service/play.service.ts` (move application / eventing)

**Requirements**
- Identify which condition branches depend on `turn` / active color.
- Ensure illegal-move event is emitted for white and black.
- Ensure any heuristics (hint/facts) don’t suppress the event for one side.

**Acceptance criteria**
- Illegal moves detected for both white and black.
- No regression in normal legal move flow.

---

### Task C-65: “End game” only when started and add names to choices

**Source:** GitHub #65 – “End game only when started and add names to choices”

**Goal**
- End-of-game flow should only fire when a game is actually in progress, and winner selection should include player names.

**Where**
- `service/play.service.ts`
- `service/message.service.ts` (message payload; UI rendering is in other modules)
- `service/config.service.ts` (player names)

**Requirements**
- Add/verify a single authoritative “game started” flag in play state.
- Only trigger “end game” prompt when started.
- When prompting for winner selection, include configured player names (white/black) in the message payload.

**Acceptance criteria**
- Finishing logic does not fire on an empty/not-started state.
- Winner options include player names.

---

### Task C-57: Run suggestions when game starts first move

**Source:** GitHub #57 – “Run suggestions when game starts first move”

**Goal**
- Ensure the analyzer/suggestion pipeline runs on the first move of a game.

**Where**
- `service/analyzer.service.ts`
- `service/play.service.ts`

**Requirements**
- Place an explicit trigger/hook when the first move is committed.
- Ensure analyzer has a valid FEN and side-to-move at that point.

**Acceptance criteria**
- First move results in suggestions being computed.

---

### Task C-56: CP sometimes wrong colour

**Source:** GitHub #56 – “CP sometimes wrong colour”

**Goal**
- Ensure CP evaluation sign/orientation consistently maps to the correct side (white advantage vs black advantage).

**Where**
- `service/analyzer.service.ts`
- `service/rendering.service.ts` (if it flips display)

**Requirements**
- Define a single rule: CP > 0 means advantage for White (or vice versa) and enforce it end-to-end.
- Verify when side-to-move flips, CP interpretation remains stable.

**Acceptance criteria**
- Same position yields consistent CP direction regardless of move history.

---

### Task C-51: Winner in status – unfinished game

**Source:** GitHub #51 – “Winner in status - unfinished game”

**Goal**
- Prevent winner/status from showing a final result when game is not completed.

**Where**
- `service/play.service.ts`
- `model/game.ts` / termination detection helpers

**Requirements**
- Only set winner/status based on explicit termination evidence (PGN result token or checkmate marker).
- Clear winner when rewinding/undoing to a non-terminal position.

**Acceptance criteria**
- Unfinished games do not show a winner.

---

### Task C-50: Timer shows wrong time – should reset

**Source:** GitHub #50 – “Timer shows wrong time - should reset”

**Goal**
- Clocks reset correctly when starting a new game / loading a game.

**Where**
- `model/clock.ts`
- `service/clock.service.ts`
- `service/play.service.ts` (game lifecycle)

**Requirements**
- Define lifecycle events: new game, load game, reset.
- Ensure clock state resets to allowed time and clears increments/elapsed.

**Acceptance criteria**
- Starting a new game resets timers to correct initial values.

---

### Task C-49: CP 10000 white says black win

**Source:** GitHub #49 – “CP 10000 white says black win”

**Goal**
- Fix mate-score / extreme CP mapping so that a very large positive evaluation corresponds to the correct winner.

**Where**
- `service/analyzer.service.ts`

**Requirements**
- Standardize engine score handling:
  - distinguish centipawns vs mate scores
  - clamp/normalize large values
  - compute “winning side” consistently

**Acceptance criteria**
- Large positive evaluation yields “white winning” presentation and internal winner inference.

---

### Task C-45: Option to see best move briefly after move

**Source:** GitHub #45 – “Option to see best move for a second after move is made.”

**Goal**
- After each move, optionally show the engine’s best move hint briefly.

**Where**
- `service/analyzer.service.ts`
- `service/play.service.ts`
- `service/rendering.service.ts` (hint markers)
- `service/config.service.ts` (option)

**Requirements**
- Add config option, e.g. `display.showBestMoveAfterMoveMs` (0 disables).
- After a move is committed:
  - compute best move
  - publish hint markers
  - clear after configured duration

**Acceptance criteria**
- Option disabled: no hint flash.
- Option enabled: best move flashes quickly then disappears.

---

### Task C-34: Connect user to MySQL cloud storage

**Source:** GitHub #34 – “Connect user to MySQL cloud storage”

**Goal**
- Provide an abstraction layer so storage backend can be swapped (Firestore, MySQL, etc.).

**Where**
- `service/connect.service.ts` + storage services

**Requirements**
- Introduce an interface for remote persistence (save/load).
- Keep existing behavior by providing the current backend implementation.
- MySQL implementation itself may live outside `common`, but the interface belongs here.

**Acceptance criteria**
- Storage calls from UI go through an interface.

---

### Task C-20: iPad wrapper

**Source:** GitHub #20 – “Ipad wrapper”

**Goal**
- Align shared code to support embedding (wrapper apps) by minimizing browser assumptions.

**Where**
- Cross-cutting: services that touch `window`, `document`, `localStorage`, media APIs.

**Requirements**
- Centralize environment detection (browser vs embedded).
- Provide fallbacks/no-ops where unavailable.

**Acceptance criteria**
- `common` can run in constrained webviews without crashing.
