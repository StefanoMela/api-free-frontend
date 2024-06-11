import { createRouter, createWebHistory } from "vue-router";

import HomePage from '../src/pages/HomePage.vue';
import NewPost from '../src/pages/NewPost.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/create",
      name: "create",
      component: NewPost
    }
  ],
});

export { router };
