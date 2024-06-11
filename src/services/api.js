import axios from "axios";
import { store } from "../data/store";

const API_BASE_URL = store.api.baseUri;


export const api = {
    async fetchPosts() {
        try {
          const response = await axios.get(`${API_BASE_URL}posts`);
          const postsArray = response.data.data; // Estrae l'array dei post dal campo 'data' della risposta
          store.setPosts(postsArray); // Salva i dati dei post nello store
          return postsArray; // Restituisce l'array dei post
        } catch (error) {
          console.error('Error fetching posts:', error);
          throw error;
        }
      },

    async fetchWithSlug(slug) {
        try {
            const response = await axios.get(API_BASE_URL + `posts/${slug}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching post with slug ${slug}:`, error);
            throw error;
        }
    },
}

