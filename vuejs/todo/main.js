var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',

  data: {
    todos: [],

    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' }
    ],

    current: -1
  },

  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  created() {
    this.todos = todoStorage.fetch()
  },

  methods: {
    add: function(event, value) {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }

      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      })

      comment.value = ''
    },

    changeState: function(todo) {
      todo.state = todo.state ? 0 : 1
    },

    remove: function(todo) {
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    }
  }
})