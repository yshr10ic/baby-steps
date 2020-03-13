FROM node:lts-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm @vue/cli firebase-tools && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 9050

CMD ["/bin/sh"]