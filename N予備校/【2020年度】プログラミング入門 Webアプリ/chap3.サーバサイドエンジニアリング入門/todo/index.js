'use strict';

const tasks = new Array();

/**
 * TODOを追加する
 * @param {string} task
 */
function addTodo(task) {
    tasks.push({ name: task, state: false });
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
}

module.exports = {
    addTodo,
    list,
    done,
    doneList,
    del
};