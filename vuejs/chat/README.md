## 基礎から学ぶ Vue.js

- 認証付きの簡易チャットを作る！
- [https://cr-vue.mio3io.com/tutorials/firebase.html](https://cr-vue.mio3io.com/tutorials/firebase.html)

## Docker Command

```
$ docker build -t vue_chat_image .
$ docker run --rm -v `pwd`:/app -p 9051:9050 --name chat_app -it -d vue_chat_image
$ docker exec -it chat_app sh
```

## VueCLI Command

```
$ vue create .
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
