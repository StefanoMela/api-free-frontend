import axios from "axios";

const API_BASE_URL = "http://localhost:3000/";

export const api = {
  async createPost(post) {
    try {
      const response = await axios.post(`${API_BASE_URL}posts`, post);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },
  async fetchCategories() {
    try {
      const response = await axios.get(`${API_BASE_URL}categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  async fetchTags() {
    try {
      const response = await axios.get(`${API_BASE_URL}tags`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  }
};
