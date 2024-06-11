import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: HomePage,
    },
  ],
});

export { router };
