FROM alpine as builder
LABEL stage=orbit-db-pinner-builder

RUN apk add --no-cache nodejs npm python3 alpine-sdk

WORKDIR /usr/src/app

COPY ./package.json .

ENV NODE_ENV=production
RUN npm install -g pnpm
RUN pnpm install

FROM node:16-alpine


RUN apk add --no-cache nodejs

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY . .

COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 6969

ENTRYPOINT node pinner.js --http --port 6969