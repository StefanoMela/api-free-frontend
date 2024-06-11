<script>
import { api } from "../services/api";
import { store } from "../data/store";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    async loadPosts() {
      try {
        await api.fetchPosts(); // Chiama la funzione fetchPosts del servizio API
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    },
  },
  mounted() {
    this.loadPosts();
  },
};
</script>

<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in store.posts" :key="post.id">{{ post.title }}</li>
      <button @click="loadPosts">Load Posts</button>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
