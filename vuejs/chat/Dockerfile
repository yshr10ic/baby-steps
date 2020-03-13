FROM node:lts-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm @vue/cli && \
    npm install -g npm firebase

EXPOSE 9050

CMD ["/bin/sh"]