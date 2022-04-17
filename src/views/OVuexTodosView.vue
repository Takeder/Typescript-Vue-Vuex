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
      <button @click="delTodo(index)">X</button>
    </li>
  </ul>
  <button @click="addTodoFormShow = true" v-if="!addTodoFormShow">
    Добавить
  </button>
  <addTodoForm v-else @onTodoAdd="addTodo" :isShow="false" />
</template>

<script lang="ts">
import ITodo from "@/interfaces/todo.interface";
import { defineComponent } from "vue";
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

import addTodoForm from "@/components/addTodoForm.vue";
import cAddTodoForm from "@/components/cAddTodoForm.vue";

export default defineComponent({
  components: {
    addTodoForm,
  },
  data() {
    return {
      addTodoFormShow: false,
      filter: "",
    };
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["filtredTodos"]),
  },
  methods: {
    handleSelect(todo: ITodo) {
      console.log(todo);
    },
    ...mapMutations(["addTodo", "delTodo", "setFilter"]),
    ...mapActions(["fetchTodos"]),

    // addTodo(todo: ITodo) {
    //   this.$store.commit("addTodo", todo);
    // },
    // delTodo(todoIndex: number) {
    //   this.$store.commit("delTodo", todoIndex);
    // },
  },
  mounted() {
    // this.$store.dispatch("fetchTodos", 10);
    this.fetchTodos(10);
  },
  watch: {
    filter(newValue) {
      this.setFilter(newValue);
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
