import axios from 'axios'
import Vuex from 'vuex'
export default new Vuex.Store({
  state: {
    isLoading: false,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.isLoading = status
    },
    SET_TODOS(state, todos) {
      state.todos = todos
    },
  },
  actions: {
    fetchTodos(context) {
      context.commit('SET_LOADING_STATUS', true)
      axios.get('/api/todos').then((response) => {
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_TODOS', response.data)
      })
    },
  },
})
