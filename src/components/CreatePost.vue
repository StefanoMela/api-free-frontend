<script>
import { api } from "../services/api";

export default {
  name: "CreatePost",
  data() {
    return {
      title: "",
      content: "",
      image: "",
      categoryId: "",
      tags: "",
      published: false,
      categories: [],
      allTags: [],
      userId: 1,
    };
  },
  methods: {
    async submitPost() {
      // Trova gli ID dei tag corrispondenti ai nomi forniti
      const tagsArray = this.tags.split(",").map((tag) => tag.trim());
      const tagsIds = tagsArray
        .map((tagName) => {
          const tag = this.allTags.find(
            (t) => t.name.toLowerCase() === tagName.toLowerCase()
          );
          return tag ? tag.id : null;
        })
        .filter((tagId) => tagId !== null);

      const newPost = {
        title: this.title,
        content: this.content,
        image: this.image,
        categoryId: this.categoryId,
        tags: tagsIds,
        published: this.published,
        userId: this.userId,
      };

      try {
        await api.createPost(newPost);
        this.$router.push("/"); // Reindirizza alla pagina Home dopo la creazione del post
      } catch (error) {
        console.error("Error nella creazione del post:", error);
      }
    },
    async loadCategories() {
      try {
        const response = await api.fetchCategories();
        this.categories = response;
      } catch (error) {
        console.error("Errore in categories", error);
      }
    },
    async loadTags() {
      try {
        const response = await api.fetchTags();
        this.allTags = response;
      } catch (error) {
        console.error("Error in tags:", error);
      }
    },
  },
  mounted() {
    this.loadCategories();
    this.loadTags();
  },
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Create a New Post</h1>
    <form @submit.prevent="submitPost">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input v-model="title" type="text" id="title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content:</label>
        <textarea v-model="content" id="content" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Image URL:</label>
        <input v-model="image" type="url" id="image" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category:</label>
        <select v-model="categoryId" id="category" class="form-select" required>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="tags" class="form-label">Tags:</label>
        <input v-model="tags" type="text" id="tags" class="form-control" placeholder="Comma-separated tags" required />
      </div>
      <div class="mb-3 form-check">
        <input v-model="published" type="checkbox" id="published" class="form-check-input" />
        <label class="form-check-label" for="published">Published</label>
      </div>
      <button type="submit" class="btn btn-primary">Create Post</button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
