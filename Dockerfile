# Builder Frontend
FROM oven/bun:latest AS fe-builder
WORKDIR /usr/src/app
COPY *.json ./
COPY index.html ./
COPY . ./
RUN bun install
RUN bun -v
RUN bun run build

FROM cgr.dev/chainguard/zig AS be-builder
RUN zig version
WORKDIR /usr/src
COPY zap ./
WORKDIR /usr/src/zap
RUN zig build chessbuddy
# RUN strip /usr/src/zig-out/bin/chessbuddy


# Bundle Stage
FROM alpine
# FROM scratch
WORKDIR /usr/bin/
COPY --from=fe-builder /usr/src/app/build ./build
COPY --from=be-builder /usr/src/zig-out/bin/chessbuddy ./
RUN echo "$( ls -al chessbuddy)"
RUN echo "$( ls -al build)"
# USER 1000
CMD ["./chessbuddy"]
