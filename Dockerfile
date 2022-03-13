# Build Stage
FROM node:latest AS builder
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm install
COPY . ./
RUN npm run build

# Run Stage - Node
FROM node:latest
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
COPY server ./
WORKDIR /usr/src/app/server
RUN npm install
CMD npm start
