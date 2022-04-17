<template>
  <form @submit.prevent="handleAdd()">
    <label>
      <input type="text" v-model="title" />
    </label>
    <button>Сохранить</button>
  </form>
</template>

<script lang="ts" setup>
import ITodo from "@/interfaces/todo.interface";
import { onMounted, ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  isShow: Boolean,
});

const emit = defineEmits<{
  (e: "onTodoAdd", todo: ITodo): void;
}>();

const title = ref("");

onMounted(() => {
  console.log(props.isShow);
});

const handleAdd = () => {
  emit("onTodoAdd", {
    id: new Date().valueOf(),
    title: title.value,
    completed: false,
  });
  title.value = "";
};
</script>
