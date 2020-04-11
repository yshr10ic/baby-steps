'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
    const now = new Date();
    res.setHeader('Set-Cookie', 'last_access=' + now + ';');

    const lastAccessTime = req.headers.cookie
        ? req.headers.cookie.split('last_access=')[1]
        : now;

    res.end(lastAccessTime);
});

const port = 8000;

server.listen(port, () => {
    console.info('Listening on ' + port);
});