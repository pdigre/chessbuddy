# Builder Frontend
FROM node:latest AS fe-builder
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm install
COPY . ./
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
COPY --from=fe-builder /usr/src/app/build ./build
COPY --from=be-builder /usr/src/rust/target/release/chessbuddy ./
USER 1000
# CMD ["tail", "-f", "/dev/null"]
CMD ["/bin/chessbuddy"]
