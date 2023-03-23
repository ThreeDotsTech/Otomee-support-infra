FROM alpine as builder
LABEL stage=orbit-db-pinner-builder

RUN apk add --no-cache nodejs npm python3 alpine-sdk

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

ENV NODE_ENV=production
RUN npm install -g pnpm
RUN pnpm install

FROM alpine


RUN apk add --no-cache nodejs

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY . .

COPY --from=builder /usr/src/app/node_modules ./node_modules

ENTRYPOINT node pinner.js --address /orbitdb/zdpuB2VDcA4v3m7P4HaWWp8qfHze4XZut32HcYAt7VnPuR1ef/otomee-orderbook-alpha.v0
