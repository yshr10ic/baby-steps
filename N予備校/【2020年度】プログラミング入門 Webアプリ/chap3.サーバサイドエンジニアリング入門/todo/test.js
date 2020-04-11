'use strict';

const todo = require('./index.js');
const assert = require('assert');

todo.addTodo('note');
todo.addTodo('pen');
assert.deepEqual(todo.list(), ['note', 'pen']);

todo.done('note');
assert.deepEqual(todo.list(), ['pen']);
assert.deepEqual(todo.doneList(), ['note']);

todo.del('note');
todo.del('pen');
assert.deepEqual(todo.list(), []);
assert.deepEqual(todo.doneList(), []);

console.log('テストが正常に完了しました');