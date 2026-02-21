# ChessBuddy React Module Specifications

This document outlines the functional specifications for the `react` module, which provides the web-based user interface for the ChessBuddy application.

## 1. User Interface Structure

The application UI is composed of several key components:

### 1.1 Main Layout (`app.tsx`)
**Requirement:** The application must present a responsive layout that adapts to different screen sizes (desktop, tablet, mobile).
*   **Components:**
    *   **Chess Board:** The central component for gameplay.
    *   **Player Info Bars:** Displays player names, timers, and game status (top for opponent, bottom for user).
    *   **Side Panel:** Contains game controls, history, and settings.
    *   **CP Bar:** Displays the Centipawn evaluation (advantage) bar.

### 1.2 Chess Board (`board.tsx`)
**Requirement:** A visual representation of the chess board that allows user interaction.
*   **Features:**
    *   **Piece Movement:** Users can drag and drop pieces to make moves.
    *   **Visual Feedback:** Highlights legal moves, last move, and check status.
    *   **Orientation:** The board can be rotated (flipped) for the user's perspective.
    *   **Markers:** Displays markers for best moves (hints), mistakes, and other analysis data.

### 1.3 Side Panel (`panel.tsx`)
**Requirement:** A tabbed interface for managing game information and controls.
*   **Tabs:**
    *   **Log:** Displays the move history of the current game.
    *   **History:** Lists past games stored locally or fetched from the server.
    *   **Edit:** Allows setting up custom board positions (FEN editing).

### 1.4 Configuration Dialog (`config-dialog.tsx`)
**Requirement:** A modal dialog for configuring application settings.
*   **Tabs:**
    *   **Game:** Setup new games (White vs Black, Timer).
    *   **Display:** Toggle UI features (Dark mode, Hints, CP bar, Animations).
    *   **Humans:** Manage human player profiles.
    *   **Bots:** Configure chess engine opponents (Skill level, Time).
    *   **Clocks:** Define time controls (e.g., 5+3, 10+0).
    *   **Bluetooth:** Connect to external Bluetooth chess boards.

## 2. Game Interaction

### 2.1 Playing a Game
**Requirement:** The UI must support the full game lifecycle.
*   **Start:** Users can start a new game against a human or bot.
*   **Play:** Moves are validated and executed via the `PlayService`.
*   **End:** The UI displays the game result (Checkmate, Draw, Resignation) and plays appropriate animations/sounds.

### 2.2 Analysis & Review
**Requirement:** Users can review and analyze games.
*   **Navigation:** Users can step through the move history.
*   **Engine Analysis:** The UI displays Stockfish evaluation (CP) and best move suggestions.

## 3. Integration with Common Services

The React module relies on the `common` module for business logic.

*   **State Management:** Uses MobX for reactive state updates from services (`playService`, `configService`, etc.).
*   **Media:** Plays sounds and videos via `MediaService`.
*   **Connectivity:** Handles Google Sign-In and server synchronization via `ConnectService`.
