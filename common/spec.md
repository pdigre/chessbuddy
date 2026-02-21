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
