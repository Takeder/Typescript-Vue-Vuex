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
import ITodo from "@/interfaces/todo.interface";
import {
  defineComponent,
  reactive,
  ref,
  watch,
  computed,
  onMounted,
  onUnmounted,
} from "vue";

import addTodoForm from "@/components/addTodoForm.vue";

export default defineComponent({
  components: {
    addTodoForm,
  },
  setup() {
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

    return {
      todos,
      filter,
      filtredTodos,
      addTodoFormShow,
      handleAdd,
      handleSelect,
    };
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
