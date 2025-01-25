# ChessBuddy multistage build
# docker compose build --no-cache --progress=plain
# docker compose up

# Builder Frontend
FROM oven/bun AS fe-builder
WORKDIR /usr/src/app
COPY public ./public
COPY common ./common
COPY react ./react
COPY wc ./wc
COPY serve.ts ./serve.ts

WORKDIR /usr/src/app/common
RUN bun install

WORKDIR /usr/src/app/react
RUN bun install
RUN bun run build

WORKDIR /usr/src/app/wc
RUN bun install
RUN bun run build

# Run Backend / server
WORKDIR /usr/src/app
ENTRYPOINT ["bun", "serve.ts"]
