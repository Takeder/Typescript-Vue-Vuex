<template>
  <select v-model="filter">
    <option value="all">All</option>
    <option value="completed">Completed</option>
  </select>
  <ul class="todos">
    <li
      v-for="(todo, index) in filtredTodos"
      :key="todo.id"
      :class="{ 'todo-completed': todo.completed }"
      @click="handleSelect(todo)"
    >
      <b v-if="todo.selected">{{ todo.title }}</b>
      <span v-else>{{ todo.title }}</span>
      <button @click.prevent="handleCheck(todo)">
        {{ !todo.completed ? "Завершить" : "Отменить" }}
      </button>
      <button @click.prevent="handleDelete(index)">Удалить</button>
    </li>
  </ul>
  <button @click="addTodoFormShow = true" v-if="!addTodoFormShow">
    Добавить
  </button>
  <cAddTodoForm v-else @onTodoAdd="handleAdd" :isShow="true" />
</template>

<script lang="ts" setup>
import ITodo from "@/interfaces/todo.interface";
import { reactive, ref, watch, computed, onMounted, onUnmounted } from "vue";

import cAddTodoForm from "@/components/cAddTodoForm.vue";

let filter = ref("all");
let addTodoFormShow = ref(false);
let todos = reactive<ITodo[]>([
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
]);

watch(filter, () => {
  console.log(filter.value);
});

onMounted(() => {
  console.log("onMounted");
});

onUnmounted(() => {
  console.log("onUnmounted");
});

const filtredTodos = computed((): ITodo[] => {
  if (filter.value === "completed") {
    return todos.filter((todo) => todo.completed);
  } else {
    return todos;
  }
});

const handleSelect = (todo: ITodo) => {
  todos.forEach((item) => (item.selected = false));
  todo.selected = true;
};

const handleAdd = (todo: ITodo) => {
  todos.push(todo);
  addTodoFormShow.value = false;
};

const handleCheck = (todo: ITodo) => {
  todo.completed = !todo.completed;
};
const handleDelete = (todoIndex: number) => {
  todos.splice(todoIndex, 1);
};
</script>

<style scoped>
.todos {
  list-style: none;
  margin: 0 auto;
  padding: 20px 0;
  width: 400px;

  /* text-align: left; */
}
.todos > li {
  cursor: pointer;
  display: flex;
  text-align: left;
  margin: 5px 0;
}

.todos > li > *:first-child {
  flex: 1;
  margin-left: 0;
}
.todos > li > * {
  flex: 1;
  margin-left: 5px;
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
