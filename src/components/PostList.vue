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
      } catch (error) {
        console.error("Errore", error);
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
  <section class="post-list">
    <h1 class="text-center">Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <div class="card">
        <h2>{{ post.title }}</h2>
        <img :src="post.image" alt="Post image" />
        <p v-if="post.tags">#{{ post.tags.map((tag) => tag.name).join(" #") }}</p>
        <p>{{ post.content }}</p>
        <p v-if="post.user"><b>Autore:</b> {{ post.user.name }}</p>
        <p v-if="post.category"><b>Categoria:</b> {{ post.category.name }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.post-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 24rem;
  padding: 1rem;
  margin: 1rem 0;
}
</style>