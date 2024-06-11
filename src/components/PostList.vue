<script>
import axios from "axios";

export default {
  data() {
    return {
      apiUri: "http://localhost:3000/posts",
      posts: [],
    };
  },
  methods: {
    async fetchPosts() {
        try {
          const response = await axios.get(this.apiUri);
          const postsArray = response.data.data; 
          this.posts = postsArray;
          return this.posts;

        } catch (error) {
          console.error('Errore', error);
          throw error;
        }
      },
    },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<template>
  <div>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <p><b>Autore:</b> {{ post.user.name }}</p>
      <p><b>Categoria:</b> {{ post.category.name }}</p>
      <p><b>Tags:</b> {{ post.tags.map((tag) => tag.name).join(", ") }}</p>
      <img >
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
