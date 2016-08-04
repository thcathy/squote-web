# Squote-web #

This is the interface of my personal website using Angular 2 (Typescript)

### How to build ###

```
npm install
npm run gulp build
```

#### Run development env with browser sync ####
```npm run gulp serve```

#### Build Production env ####
```NODE_ENV=production npm run gulp build```

### Configuration ###

Configuration are stored in config/config.json or config-prd.json

### Docker ###
A nginx proxy server hosting the squote interface, which built by angular 2, and forward request to ESL and Squote

*Pre-requisites*: Started ESL and [Squote](https://github.com/thcathy/squote)

```bash
docker run -d --name <container name> \
-p <host's port>:80 \
--link <squote container name> --link <esl container name> \
thcathy/nginx-proxy
```

### Note ###

This is a personal project by [Timmy Wong](https://github.com/thcathy).
