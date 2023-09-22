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
WORKDIR /usr/src/zig-out/bin
RUN echo "$( ls -al )"

# Bundle Stage
FROM alpine
# FROM scratch
WORKDIR /bin
COPY --from=fe-builder /usr/src/app/build ./
COPY --from=be-builder /usr/src/zig-out/bin/chessbuddy ./
RUN echo "$( ls -al )"
USER 1000
# CMD ["bin/sh", "ls", "-al"]
ENTRYPOINT [ "./chessbuddy" ]
