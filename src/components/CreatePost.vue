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
        console.error("Error creating post:", error);
      }
    },
    async loadCategories() {
      try {
        const response = await api.fetchCategories();
        this.categories = response;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async loadTags() {
      try {
        const response = await api.fetchTags();
        this.allTags = response;
      } catch (error) {
        console.error("Error fetching tags:", error);
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
  <div>
    <h1>Create a New Post</h1>
    <form @submit.prevent="submitPost">
      <div>
        <label for="title">Title:</label>
        <input v-model="title" type="text" id="title" required />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea v-model="content" id="content" required></textarea>
      </div>
      <div>
        <label for="image">Image URL:</label>
        <input v-model="image" type="url" id="image" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <select v-model="categoryId" id="category" required>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="tags">Tags:</label>
        <input
          v-model="tags"
          type="text"
          id="tags"
          placeholder="Comma-separated tags"
          required
        />
      </div>
      <div>
        <label for="published">Published:</label>
        <input v-model="published" type="checkbox" id="published" />
      </div>
      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
