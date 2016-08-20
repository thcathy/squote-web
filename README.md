# Squote-web [![CircleCI](https://circleci.com/gh/thcathy/squote-web.svg?style=svg)](https://circleci.com/gh/thcathy/squote-web)

This is the interface of my personal website using Angular 2 (Typescript)

### How to build
```
npm install
API_HOST=<squote server's host> npm run build
```

#### Run development env
```API_HOST=<squote server's host> npm start ```

#### Environment Variable
API_HOST: Host of squote server

### Docker
A nginx proxy server hosting the squote interface, which built by angular 2, and forward request to ESL and Squote

*Pre-requisites*: Started [Squote](https://github.com/thcathy/squote)

```bash
docker run -d --name <container name> \
  -p <host's port>:80 \
  --link <squote container name> \
  --link <esl container name> \
  thcathy/nginx-proxy 
```

### Note ###

This is a personal project by [Timmy Wong](https://github.com/thcathy).
