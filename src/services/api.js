import axios from "axios";


export const api = {

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

