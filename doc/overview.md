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
* Messager - Message box, prompts

## Class diagram

```mermaid 
erDiagram
    CUSTOMER ||--|| ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses

```
    abstract Player
    class Human
    class Bot
    Player <|-- Human
    Player <|-- Bot

![Objects](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/pdigre/chessbuddy/master/doc/objects.iuml)

## UI components
![UI](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/pdigre/chessbuddy/master/doc/ui.iuml)


