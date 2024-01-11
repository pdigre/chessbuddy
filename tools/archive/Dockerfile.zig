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
RUN cp ./dist/index.html ../react/build//wc.html
RUN cp ./dist/assets/* ../react/build/assets
RUN echo $(ls -al build)

FROM cgr.dev/chainguard/zig AS be-builder
RUN zig version
WORKDIR /usr/src
# COPY chessbuddy ./
COPY zig /usr/src/zig
WORKDIR /usr/src/zig
RUN echo "$( ls -al /usr/src/chessbuddy )"
RUN zig build chessbuddy
RUN echo "$( ls -al zig-out/bin)"
# RUN strip /usr/src/zig-out/bin/chessbuddy
# CMD ["tail", "-f", "/dev/null"]
# ENTRYPOINT [ "/usr/src/chessbuddy" ]

# Bundle Stage
FROM alpine:latest
# FROM scratch
WORKDIR /bin/
COPY --from=fe-builder /usr/src/app/react/build ./build
COPY --from=be-builder /usr/src/zig/zig-out/bin/chessbuddy ./
USER 1000
#CMD ["tail", "-f", "/dev/null"]
CMD ["/bin/chessbuddy"]
