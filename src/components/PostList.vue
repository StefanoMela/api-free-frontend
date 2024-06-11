<script>
import axios from "axios";

export default {
  data() {
    return {
      apiUri: "http://localhost:3000/posts",
      posts: [],
      pagination: {
        currentPage: 1,
        totalItems: 0,
        totalPages: 0,
      },
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(this.apiUri, {
          params: {
            page: this.pagination.currentPage, // Aggiungiamo il numero di pagina corrente come parametro della query API
          },
        });
        this.posts = response.data.data; // Aggiorniamo solo i post della pagina corrente
        this.pagination = {
          currentPage: response.data.page,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
        };
      } catch (error) {
        console.error("Errore durante il recupero dei post:", error);
      }
    },
    async fetchPreviousPage() {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage--;
        await this.fetchPosts(); // Richiamiamo fetchPosts() per caricare i post della pagina precedente
      }
    },
    async fetchNextPage() {
      if (this.pagination.currentPage < this.pagination.totalPages) {
        this.pagination.currentPage++;
        await this.fetchPosts(); // Richiamiamo fetchPosts() per caricare i post della pagina successiva
      }
    },
  },
  mounted() {
    this.fetchPosts(); // Carichiamo i post della pagina iniziale al caricamento del componente
  },
};
</script>

<template>
  <section class="post-list">
    <div v-for="post in posts" :key="post.id" class="card mb-4">
      <img :src="post.image" class="card-img-top" :alt="post.title" />
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-text" v-if="post.tags">
          <b>Tags:</b> {{ post.tags.map((tag) => tag.name).join(", ") }}
        </p>
        <p class="card-text">{{ post.content }}</p>
        <p class="card-text" v-if="post.user">
          <b>Autore:</b> {{ post.user.name }}
        </p>
        <p class="card-text" v-if="post.category">
          <b>Categoria:</b> {{ post.category.name }}
        </p>
      </div>
    </div>
  </section>
  <div class="pagination d-flex justify-content-center">
    <button
      @click="fetchPreviousPage"
      :disabled="pagination.currentPage === 1"
      class="btn btn-primary me-2"
    >
      Precedente
    </button>
    <span class="align-self-center"
      >Pagina {{ pagination.currentPage }} di {{ pagination.totalPages }}</span
    >
    <button
      @click="fetchNextPage"
      :disabled="pagination.currentPage === pagination.totalPages"
      class="btn btn-primary ms-2"
    >
      Successivo
    </button>
  </div>
</template>

<style lang="scss" scoped>
.post-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}
.card {
  width: 24rem;
  padding: 1rem;
  margin: 1rem 0;
}
</style>
