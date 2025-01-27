# ChessBuddy multistage build
# docker build --no-cache --progress=plain .
# docker compose up --build -d

# Builder Frontend
FROM oven/bun AS fe-builder
WORKDIR /usr/src/app
COPY public ./public
COPY common ./common
COPY server ./server
COPY react ./react
COPY wc ./wc

WORKDIR /usr/src/app/common
RUN bun install

WORKDIR /usr/src/app/server
RUN bun install

WORKDIR /usr/src/app/react
RUN bun install
RUN bun run build

WORKDIR /usr/src/app/wc
RUN bun install
RUN bun run build

# Run Backend / server
WORKDIR /usr/src/app
ENTRYPOINT ["bun", "server/serve.ts"]
