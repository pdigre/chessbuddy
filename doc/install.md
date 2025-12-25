# DEVELOPMENT Chessbuddy

[Code overview](overview.md)

## Suggested tools

1. https://code.visualstudio.com/
2. https://git-scm.com/
3. https://desktop.github.com/
4. https://nodejs.org/en/

## Get started

## Installation

Prerequisites

1. Node
2. Bun

Chessbuddy:

1. git clone https://github.com/pdigre/chessbuddy.git
2. In VS Code, Open folder on "chessbuddy"
3. In common run: `npm install`
4. In react run: `npm install`
5. In react run: `bun install`
6. In react run: `bun dev`
7. In wc run: `npm install`
8. In wc run: `bun install`
9. In wc run: `bun dev`

To run via Docker:

1. docker build --no-cache --progress=plain .
2. docker compose up --build -d

To test build:

1. In react run: `npm run build`
2. In wc run: `npm run build`
3. On root run: `bun serve.ts`

## Size & Media queries

Supported screen sizes

- iPad 1366 \* 1024 px
- PWA: iPad PWA/Safari (1280 \* 760)
- CHROME: iPad Chrome (1200 \* 720)
