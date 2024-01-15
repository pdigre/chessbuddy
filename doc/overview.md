# Code Chessbuddy

## MOBX Observables
* Config - orientation, settings
* Rendering - screensize
* Players - list of bots and players
* GameState - playing or paused
* Game - the game updates when move is done
* GameHistory - previous games updates when game completes
* Server - online game history storage
* Helper - gets CP and Stockfish suggestions
* TimeKeeper - updates timer every second of play
* RefreshTimer - 100ms refresh, due to ChessBoard bug
* Messages- Message box, prompts


```mermaid 
---
title: Chessbuddy observed state
---
classDiagram
    App <|-- render : darkMode 
    Board <|-- render : rotation
    Board <|-- config : fen
    CP <|-- analyzer : cp
    CP <|-- render : showCP
    FenInfo <|-- play : log
    PlayerInfo <|-- play
    Ticker <|-- clock : log

    CP <|-- analyzer : cp


    class App{
        boolean darkMode
    }
    class Board{
        string FEN
        int rotation
    }
    class CP{
    }
    class FenInfo{
        string log
    }
    class PlayerInfo{
    }
    class Ticker{
    }

    class play{
       string log
    }
    class render{
       boolean darkTheme
       int rotation
       boolean showCP
    }
    class analyzer{
       int cp
    }
    class config{
        boolean showConfig
        string listMode
        int showTab
    }
    class message{
        boolean show
    }
    class clock{
        string clockText
    }
```

```mermaid 
---
title: Chessbuddy Storage data model
---
erDiagram
    Chessbuddy ||--o{ History : games
    Chessbuddy ||--|| Render : render
    Chessbuddy ||--|| Config : config

    Config ||--|| Game : game
    Config ||--|| Display : display
    Config ||--o{  Human : humans
    Config ||--o{  Bot : bots
    Config ||--o{ Clock : clocks

    Human{
        string name
        string email
    }
    Bot{
        string name
        string engine
        int skill
        int time
        int depth
    }
    Clock{
        String name
        TimeRule[] time
    }
    Game{
       string white
       string black
       string clock
    }
    Display{
       boolean showFacts
       boolean showHints
       boolean playCorrect
       boolean playMistake
       boolean playWinner
    }
    Render{
       boolean darkTheme
       int rotation
       boolean showCP
    }
    Chessbuddy{

    }
    History{
    string id
    Date date
    string white
    string black
    number wtime
    number btime
    string[] log
    string fen
    }
```



