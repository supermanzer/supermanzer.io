<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12">
      <p class="text-h2">Blog Posts</p>
      <v-divider class="my-2" />
      <ContentDoc />
    </v-col>
    </v-row>
    <v-row>
      <v-col v-for="post in posts" :key="post._id" >
        <BlogPostCard :post="post" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData("posts", () =>
  queryContent("blog").where({title:{$ne: 'Blog'}}).find()
)
</script>

<style lang="scss" scoped></style>
