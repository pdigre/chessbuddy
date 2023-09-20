# Builder Frontend
FROM oven/bun:latest AS fe-builder
WORKDIR /usr/src/app
COPY *.json ./
# COPY bun.lockb ./
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

# Bundle Stage
FROM scratch
WORKDIR /bin/
COPY --from=fe-builder /usr/src/app/build ./build
COPY --from=be-builder /usr/src/zig-out/bin/chessbuddy ./
USER 1000
# CMD ["tail", "-f", "/dev/null"]
CMD ["/bin/chessbuddy"]
