<template>
  <select v-model="filter">
    <option value="all">All</option>
    <option value="completed">Completed</option>
  </select>
  <ul class="todos">
    <li
      v-for="todo in filtredTodos"
      :key="todo.id"
      :class="{ 'todo-completed': todo.completed }"
      @click="handleSelect(todo)"
    >
      <b v-if="todo.selected">{{ todo.title }}</b>
      <span v-else>{{ todo.title }}</span>
    </li>
  </ul>
  <button @click="addTodoFormShow = true" v-if="!addTodoFormShow">
    Добавить
  </button>
  <addTodoForm v-else @onTodoAdd="handleAdd" :isShow="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ITodo from "@/interfaces/todo.interface";
import addTodoForm from "@/components/addTodoForm.vue";

export default defineComponent({
  components: {
    addTodoForm,
  },
  data() {
    let todos: ITodo[] = [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: true,
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: false,
        selected: true,
      },
      {
        userId: 1,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
      },
    ];
    return {
      todos,
      addTodoFormShow: false,
      filter: "all",
    };
  },
  mounted() {
    console.log("mounted");
  },
  unmounted() {
    console.log("unmounted");
  },
  methods: {
    handleSelect(todo: ITodo) {
      this.todos.forEach((item) => (item.selected = false));
      todo.selected = true;
    },
    handleAdd(todo: ITodo) {
      this.todos.push(todo);
      this.addTodoFormShow = false;
    },
  },
  watch: {
    "addTodoForm.title": function (newValue: string, oldValue: string) {
      console.log("newValue", newValue);
      console.log("oldValue", oldValue);
    },
    filter(newValue: string, oldValue: string) {
      console.log("newValue", newValue);
      console.log("oldValue", oldValue);
    },
  },
  computed: {
    filtredTodos(): ITodo[] {
      if (this.filter === "completed") {
        return this.todos.filter((todo) => todo.completed);
      } else {
        return this.todos;
      }
    },
  },
});
</script>

<style scoped>
.todos {
  list-style: none;
  margin: 0;
  padding: 20px 0;
  /* text-align: left; */
}
.todos > li {
  cursor: pointer;
}
.todos > li:hover {
  opacity: 0.6;
}
.todo-completed {
  color: green;
}
.todo-completed::before {
  position: absolute;
  margin-left: -1em;
  content: "\2713";
}
</style>
