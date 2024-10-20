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
WORKDIR /usr/src/app/common
RUN bun install
WORKDIR /usr/src/app/react
RUN bun install
RUN bun run build
WORKDIR /usr/src/app/wc
RUN bun install
RUN bun run build
RUN cp ./dist/index.html ../react/build//wc.html
RUN cp ./dist/assets/* ../react/build/assets

FROM buddyspencer/ziglang AS be-builder
RUN zig version
WORKDIR /usr/src
COPY zig /usr/src/zig
WORKDIR /usr/src/zig
RUN zig build chessbuddy

# Bundle Stage
FROM alpine
# FROM scratch
WORKDIR /bin/
COPY --from=fe-builder /usr/src/app/react/build ./build
COPY --from=be-builder /usr/src/zig/zig-out/bin/chessbuddy ./
WORKDIR /bin/build/
USER 1000
# RUN echo "$( ls -al /bin)"
#CMD ["tail", "-f", "/dev/null"]
ENTRYPOINT ["/bin/chessbuddy"]
