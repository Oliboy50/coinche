# STAGE 1

FROM node:12.14.0-alpine as BUILDER

ARG SET_NPM_UNSAFE_PERM_TRUE
ENV SET_NPM_UNSAFE_PERM_TRUE=${SET_NPM_UNSAFE_PERM_TRUE}

WORKDIR /tmp/builder

# Fix bug https://github.com/nodejs/docker-node/issues/813 while deploying on Heroku
RUN test -z "$SET_NPM_UNSAFE_PERM_TRUE" || (npm config set unsafe-perm true) && :

COPY . .

RUN npm ci && npm run build \
    && cp package-lock.json package.json ./build \
    && cd ./build && npm ci --production \
    && rm package-lock.json package.json

# STAGE 2

FROM node:12.14.0-alpine

ENV NODE_APP_DIR=/home/node/app
ENV NODE_ENV=production

WORKDIR $NODE_APP_DIR

RUN npm install -g serve

COPY --from=BUILDER /tmp/builder/build $NODE_APP_DIR

EXPOSE 3000

CMD serve -l 3000 -s $NODE_APP_DIR
