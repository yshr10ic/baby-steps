'use strict';

const pug = require('pug');
const assert = require('assert');

const html = pug.renderFile('./views/posts.pug', {
    posts: [
        {
            id: 1,
            content: "<script>alert('test');</script>",
            postedBy: 'guest1',
            trackingCookie: '7842123699681359_cd028ccd0d152f90a55c27f7cf6788f0b784395d',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    user: 'guest1'
});

assert(html.includes("&lt;script&gt;alert('test');&lt;/script&gt;"));
console.log('テストが正常に完了しました');