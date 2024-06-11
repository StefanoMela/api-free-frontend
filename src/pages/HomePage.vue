<script>
import {api} from '../services/api';

export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async loadPosts() {
      try {
        const response = await api.fetchPosts();
        this.posts = response;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
    <button @click="loadPosts">Load Posts</button>
  </div>
</template>


<style lang="scss" scoped></style>