# coinche

> Card game

[![CircleCI](https://circleci.com/gh/Oliboy50/coinche.svg?style=svg)](https://circleci.com/gh/Oliboy50/coinche)

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

### TODO

- [ ] fix lint in subdirectories when git commit is run from the root directory

## License

GPLv3 - See [LICENSE.md](LICENSE.md) file.
