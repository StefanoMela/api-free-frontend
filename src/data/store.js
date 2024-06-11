import { reactive } from "vue";

export const store = reactive({
  api: {
    baseUri: "http://localhost:3000/",
  },
  users: [],
  posts: [],
  categories: [],
  tags: [],

  setPosts(posts) {
    this.posts = posts;
  }
});