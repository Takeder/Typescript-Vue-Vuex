<template>
  <ul class="todos">
    <li v-for="(post, index) in posts" :key="post.id">
      <span>{{ post.title }}</span>
      <button @click.prevent="handleDelete(index)">Удалить</button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import IPost from "@/interfaces/post.interface";
import { reactive, computed, onMounted } from "vue";

let posts = reactive<IPost[]>([]);

onMounted(() => {
  fetch("http://jsonplaceholder.typicode.com/posts").then(async (res) => {
    posts.push(...(await res.json()));
  });
});

// const filtredPosts = computed((): IPost[] => {
//   return posts;
// });

const handleDelete = (todoIndex: number) => {
  posts.splice(todoIndex, 1);
};
</script>
