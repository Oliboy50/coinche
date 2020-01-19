# STAGE 1

FROM node:12.14.0-alpine as BUILDER

ARG SET_NPM_UNSAFE_PERM_TRUE
ENV SET_NPM_UNSAFE_PERM_TRUE=${SET_NPM_UNSAFE_PERM_TRUE}

WORKDIR /tmp/builder

# Fix bug https://github.com/nodejs/docker-node/issues/813 while deploying on Heroku
RUN test -z "$SET_NPM_UNSAFE_PERM_TRUE" || (npm config set unsafe-perm true) && :

COPY . .

WORKDIR /tmp/builder/server

RUN npm ci && npm run build \
    && cp package-lock.json package.json ./build \
    && cd ./build && npm ci --production \
    && rm package-lock.json package.json

# STAGE 2

FROM node:12.14.0-alpine

ENV NODE_APP_DIR=/home/node/app
ENV NODE_ENV=production
ENV PORT=8000

WORKDIR $NODE_APP_DIR

COPY --from=BUILDER /tmp/builder/server/build $NODE_APP_DIR

EXPOSE $PORT

CMD node server/src/index.js
