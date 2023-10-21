# Usage
# ================
# docker build . --progress=plain --no-cache
# docker compose up 

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
# COPY chessbuddy ./
COPY zap /usr/src/zap
WORKDIR /usr/src/zap
RUN echo "$( ls -al /usr/src/chessbuddy )"
RUN zig build chessbuddy
RUN echo "$( ls -al zig-out/bin)"
# RUN strip /usr/src/zig-out/bin/chessbuddy
# CMD ["tail", "-f", "/dev/null"]
# ENTRYPOINT [ "/usr/src/chessbuddy" ]


# Bundle Stage
FROM alpine
# FROM scratch
WORKDIR /usr/bin/
COPY --from=fe-builder /usr/src/app/build ./build
COPY --from=be-builder /usr/src/zap/zig-out/bin/chessbuddy /usr/bin/chessbuddy
RUN echo "$( ls -al chessbuddy)"
RUN echo "$( ls -al build)"
# USER 1000
#CMD ["tail", "-f", "/dev/null"]
ENTRYPOINT ["/usr/bin/chessbuddy"]
