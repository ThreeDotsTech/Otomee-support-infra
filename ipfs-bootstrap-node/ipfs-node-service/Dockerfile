FROM mhart/alpine-node:12

ENV IPFS_MONITORING=1
ENV IPFS_PATH=/root/.jsipfs
ENV BUILD_DEPS='libnspr4 libnspr4-dev libnss3'

RUN apk add --no-cache git python build-base

RUN npm install --unsafe-perm -g ipfs@IPFS_VERSION

# Make the image a bit smaller
RUN npm cache clear --force
RUN apk del build-base python git

# Configure jsipfs
RUN jsipfs init

RUN jsipfs version

# Allow connections from any host
RUN sed -i.bak "s/127.0.0.1/0.0.0.0/g" $IPFS_PATH/config

EXPOSE 4002
EXPOSE 8081
EXPOSE 5002
EXPOSE 9090

CMD jsipfs daemon
