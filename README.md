# coinche

> Card game

[![CI](https://github.com/Oliboy50/coinche/actions/workflows/ci.yml/badge.svg)](https://github.com/Oliboy50/coinche/actions/workflows/ci.yml)

## User documentation

### Install

#### Local

1. `cp docker-compose.local.yaml docker-compose.override.yaml`
1. Edit `docker-compose.override.yaml` file to setup your environment variables
1. `docker-compose up`
1. Go to [http://localhost:3000](http://localhost:3000)

## Developer documentation

### NodeJS

```shell
# terminal 1
cd client
npm install

# terminal 2
cd server
npm install
npm run dev

# terminal 1
REACT_APP_API_BASE_URL=http://localhost:8000 npm run dev
```

## License

GPLv3 - See [LICENSE.md](LICENSE.md) file.
