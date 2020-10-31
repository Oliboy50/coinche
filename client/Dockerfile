# STAGE 1

FROM node:12.19.0-alpine as BUILDER

ARG SET_NPM_UNSAFE_PERM_TRUE
ENV SET_NPM_UNSAFE_PERM_TRUE=${SET_NPM_UNSAFE_PERM_TRUE}
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

WORKDIR /tmp/builder

# Fix bug https://github.com/nodejs/docker-node/issues/813 while deploying on Heroku
RUN test -z "$SET_NPM_UNSAFE_PERM_TRUE" || (npm config set unsafe-perm true) && :

COPY . .

RUN npm ci && npm run build \
    && cp package-lock.json package.json ./build \
    && cd ./build && npm ci --production \
    && rm package-lock.json package.json

# STAGE 2

FROM node:12.19.0-alpine

ENV NODE_APP_DIR=/home/node/app
ENV PORT=3000

WORKDIR $NODE_APP_DIR

RUN npm install -g serve

COPY --from=BUILDER /tmp/builder/build $NODE_APP_DIR

EXPOSE $PORT

CMD serve -l $PORT -s $NODE_APP_DIR
