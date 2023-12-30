# Builder Frontend
FROM node:latest AS fe-builder
WORKDIR /usr/src/app
COPY common ./common
COPY react ./react
COPY public ./public
COPY wc ./wc
WORKDIR /usr/src/app/common
RUN npm install
WORKDIR /usr/src/app/react
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/wc
RUN npm install
RUN npm run build

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
FROM scratch
# FROM alpine:latest
WORKDIR /bin/
COPY --from=fe-builder /usr/src/app/react/build ./build
COPY --from=fe-builder /usr/src/app/react/build/index.html ./build/react.html
COPY --from=fe-builder /usr/src/app/wc/dist ./build
COPY --from=fe-builder /usr/src/app/wc/dist/index.html ./build/wc.html
COPY --from=fe-builder /usr/src/app/public/index.html ./build/index.html
COPY --from=be-builder /usr/src/rust/target/release/chessbuddy ./
USER 1000
# CMD ["tail", "-f", "/dev/null"]
CMD ["/bin/chessbuddy"]
