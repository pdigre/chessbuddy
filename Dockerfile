# ChessBuddy multistage build
# docker compose build --no-cache --progress=plain
# docker compose up

# Builder Frontend
FROM node:latest AS fe-builder
WORKDIR /usr/src/app
COPY public ./public
COPY common ./common
COPY react ./react
COPY wc ./wc
WORKDIR /usr/src/app/common
RUN npm install
WORKDIR /usr/src/app/react
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/wc
RUN npm install
RUN npm run build
RUN mv ./dist/index.html ./dist/wc.html
RUN cp ./dist/assets/* ../react/build/assets
RUN echo $(ls -al build)

# Builder backend
FROM rust:alpine AS be-builder
RUN apk update
RUN apk add clang musl-dev
WORKDIR /usr/src/
WORKDIR /usr/src/rust
COPY rust/src src
COPY rust/Cargo.toml rust/Cargo.lock ./
RUN cargo add tracing
RUN cargo add tracing-subscriber
RUN cargo build --release
RUN strip target/release/chessbuddy

# Bundle Stage
# FROM scratch
FROM alpine:latest
WORKDIR /bin/
COPY --from=fe-builder /usr/src/app/react/build ./build
COPY --from=be-builder /usr/src/rust/target/release/chessbuddy ./
USER 1000
# CMD ["tail", "-f", "/dev/null"]
CMD ["/bin/chessbuddy"]
