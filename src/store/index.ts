import ITodo from "@/interfaces/todo.interface";
import { createStore } from "vuex";

const todos: ITodo[] = [];
const todoFilter = "all";

export default createStore({
  state: {
    todos,
    todoFilter,
  },
  getters: {
    filtredTodos(state) {
      if (state.todoFilter === "completed") {
        return state.todos.filter((todo) => todo.completed);
      } else {
        return state.todos;
      }
    },
  },
  mutations: {
    setFilter(state, todoFilter) {
      state.todoFilter = todoFilter;
    },
    loadTodos(state, todos: ITodo[]) {
      state.todos = todos;
    },
    addTodo(state, todo: ITodo) {
      state.todos.push(todo);
    },
    delTodo(state, todoIndex: number) {
      state.todos.splice(todoIndex, 1);
    },
  },
  actions: {
    async fetchTodos({ commit }, limit = 10) {
      const res = await fetch(
        "http://jsonplaceholder.typicode.com/todos?_limit=" + limit
      );
      commit("loadTodos", await res.json());
    },
  },
  modules: {},
});
