# ChessBuddy multistage build
# docker compose build --no-cache --progress=plain
# docker compose up

# Builder Frontend
FROM node AS fe-builder
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
RUN cp ./dist/index.html ../react/build//wc.html
RUN cp ./dist/assets/* ../react/build/assets

FROM buddyspencer/ziglang AS be-builder
RUN zig version
WORKDIR /usr/src
COPY zig /usr/src/zig
WORKDIR /usr/src/zig
RUN zig build chessbuddy

# Bundle Stage
FROM alpine:latest
# FROM scratch
WORKDIR /bin/
COPY --from=fe-builder /usr/src/app/react/build ./build
COPY --from=be-builder /usr/src/zig/zig-out/bin/chessbuddy ./
# COPY zig/chessbuddy ./
USER 1000
# RUN echo "$( ls -al /bin)"
#CMD ["tail", "-f", "/dev/null"]
ENTRYPOINT ["/bin/chessbuddy"]
