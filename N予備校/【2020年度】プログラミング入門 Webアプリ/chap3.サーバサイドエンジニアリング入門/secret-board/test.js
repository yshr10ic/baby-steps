'use strict';

const pug = require('pug');
const assert = require('assert');

const html = pug.renderFile('./views/posts.pug', {
    posts: [
        {
            id: 1,
            content: "<script>alert('test');</script>",
            postedBy: 'guest1',
            trackingCookie: '2514189228062167_89bb9039abbc56ed2eb5be6f8906d5b70ee8a25e',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    user: 'guest1'
});

assert(html.includes("&lt;script&gt;alert('test');&lt;/script&gt;"));
console.log('テストが正常に完了しました');