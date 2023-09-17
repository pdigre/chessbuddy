# Builder Frontend
#FROM node:latest AS fe-builder
FROM oven/bun:latest AS fe-builder
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
#RUN npm install
RUN bun install
RUN bun -v
COPY . ./
#RUN npm run build2
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
