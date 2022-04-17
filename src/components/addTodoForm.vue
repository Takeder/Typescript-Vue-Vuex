<template>
  <form @submit.prevent="log(), handleAdd()">
    <label>
      <input type="text" v-model="title" />
    </label>
    <button>Сохранить</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isShow: Boolean,
  },
  data() {
    return {
      show: false,
      title: "",
    };
  },
  methods: {
    handleAdd() {
      this.$emit("onTodoAdd", {
        id: new Date().valueOf(),
        title: this.title,
        completed: false,
      });
      this.show = false;
      this.title = "";
    },
    log() {
      console.log(this.title);
    },
  },
  mounted() {
    console.log(this.isShow);
  },
});
</script>
