# ChessBuddy project
<i>Per Digre - personal project to explore new tech.</i>

Play at: [https://chessbuddy.net/](https://chessbuddy.net/)


<details>
  <summary>Introduction</summary>

## Introduction

![Chessbuddy](doc/chessbuddy.png)

An iPad app that follows along when playing chess with my friends.

- chess clock
- logs games
- StockFish and Lozza chessbots opponents
- Names of openings 
- Suggest moves
- Evaluates CP score throughout the game
</details>

<details>
  <summary>User guide</summary>

## User guide

This has been used as an assistant like chess clock during friendly two player games. It helps learning.

- It marks board with openings it knows.
- It marks board with what Stockfish would have done.
- It remembers games and scores.
- Keeps track of time, but it does not use it for any other purpose than information
- You can tilt board 90 degress sideways for easy use in a chess clock position alongside the board.
- You can alternative play against Stockfish or Lozza chess engines

</details>

<details>
  <summary>Tech exploration</summary>

## Tech exploration

### 1. React version
My first learning experience
- React
- Typescript
- Chessboard.jsx
- Chess.js
- MobX
- Material-UI
- Tailwind-CSS
- WASM - Stockfish
- PWA
- Playing media
- GCP - Google Cloud Run
- Multi-stage docker
- RUST web-server
- Docker distro-less deployment

### 2. Web-Components version
My second learning trip
- Web Components
- Bun
- Zig
- Chessboard - Web Component 
- Material Design 3 - Web
- MobX for Lit Element
- Structure project for both React and WC

### 3. Next to do
Some of this is not yet production ready and I lack experience.
- Use media queries to fix size issues
- Connect Bluetooth chessboard
- Connect other iPad to use as slave display
- Store games in Google cloud
- Use new multi-threaded AI version of Stockfish WASM

</details>

<details>
  <summary>Developer</summary>

## Developer

- [Install](doc/install.md)
- [Overview](doc/overview.md)
- [Architecture](docs/README.md)

</details>
<details>
  <summary>Credits and resources</summary>

## Credits and resources

Credits:
- [https://eddmann.com/posts/creating-a-react-based-chess-game-with-wasm-bots-in-typescript/](https://eddmann.com/posts/creating-a-react-based-chess-game-with-wasm-bots-in-typescript/)

Resources
- Learn Web components with MobX - https://www.npmjs.com/package/@adobe/lit-mobx
- Using Material Design MD-3 for web components - https://m3.material.io/develop/web
- Material Design on Github - https://github.com/material-components/material-web/tree/main/docs/components
- Chessboard - https://github.com/justinfagnani/chessboard-element
- Example pages WC - https://github.com/klyngen/webcomponents-examples

* REACT-JS for UI components https://reactjs.org/
* MOBX for state management https://mobx.js.org/README.html
* https://material-ui.com/ based on https://material.io/design
* Chess Rules - https://github.com/jhlywa/chess.js
* Chess Board - https://github.com/Clariity/react-chessboard
* WASM - Use with Stockfish
* Lozza JS chess engine


</details>
