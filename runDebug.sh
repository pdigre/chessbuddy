#!/bin/zsh

cd common
bun install
cd ..

cd react
bun install
bun run build
cp dist/assets/* ../assets
cd ..

cd wc
bun install
bun run build
cp dist/assets/* ../assets
cd ..

cd server
bun install
bun dev
