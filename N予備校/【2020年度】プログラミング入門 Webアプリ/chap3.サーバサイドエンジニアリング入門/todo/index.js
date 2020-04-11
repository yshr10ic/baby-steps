'use strict';

const fs = require('fs');
const fileName = './tasks.json';

let tasks = new Array();

try {
    const data = fs.readFileSync(fileName, 'utf8');
    tasks = JSON.parse(data);
} catch (ignore) {
    console.log(fileName + 'から復元できませんでした');
}

/**
 * タスクをファイルに保存する
 */
function saveTasks() {
    fs.writeFileSync(fileName, JSON.stringify(tasks), 'utf8');
}

/**
 * TODOを追加する
 * @param {string} task
 */
function addTodo(task) {
    tasks.push({ name: task, state: false });
    saveTasks();
}

/**
 * 未完了のTODOの一覧の配列を取得する
 * @returns {array}
 */
function list() {
    return tasks
        .filter(task => !task.state)
        .map(t => t.name);
}

/**
 * TODOを完了にする
 * @param {string} task
 */
function done(task) {
    const idx = tasks.findIndex(t => t.name === task);
    if (idx != -1) {
        tasks[idx].state = true;
    }
    saveTasks();
}

/**
 * 完了済みのTODOの一覧の配列を取得する
 * @returns {array}
 */
function doneList() {
    return tasks
        .filter(task => task.state)
        .map(t => t.name);
}

/**
 * TODOを削除する
 * @param {string} task
 */
function del(task) {
    const idx = tasks.findIndex(t => t.name === task);
    if (idx != -1) {
        tasks.splice(idx, 1);
    }
    saveTasks();
}

module.exports = {
    addTodo,
    list,
    done,
    doneList,
    del
};