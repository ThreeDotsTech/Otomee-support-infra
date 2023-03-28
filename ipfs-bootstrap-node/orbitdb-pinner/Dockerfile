FROM node:16-alpine as builder
LABEL stage=orbit-db-pinner-builder

RUN apk add --no-cache python3 alpine-sdk bash

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

ENV NODE_ENV=production
RUN npm install -g npm@9.6.2
RUN npm i -g esbuild
RUN npm install

FROM node:16-alpine


RUN apk add --no-cache nodejs

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY . .

COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 6969

ENTRYPOINT node pinner.js --http --port 6969
