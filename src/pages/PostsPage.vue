<script>
import PostList from "./components/PostList.vue";

export default {
  data() {
    return {
      title: "Hello world"
    }
  }

  components: {
    PostList,
  },
};
</script>

<template>
  <h1>{{ title }}</h1>
</template>

<style lang="scss" scoped></style>