<template>
  <div>
    <v-row>
      <v-col v-for="post in posts" :key="post._id">
        <BlogPostCard :post="post" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData("posts", () =>
  queryContent("blog").find()
)
</script>

<style lang="scss" scoped></style>
