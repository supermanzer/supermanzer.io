<script setup>
definePageMeta({
  layout: "home",
})

const { data: posts } = await useAsyncData("latest-posts", () =>
  queryContent("blog").sort().limit(3).find()
)
</script>

<template>
  <div>
    <v-row justify="space-around" class="mt-12">
      <v-col cols="8" class="text-center">
        <p class="text-md-h1 text-sm-h3 mb-4 text-white">Hi, I'm Ryan Manzer</p>
        <p class="subheading mb-3 text-white">
          Full stack software engineer, oceanographer, gentleman scientist
        </p>
      </v-col>
    </v-row>
    <v-divider class="text-white my-5" />
    <HomeNav />
    <v-row class="mt-12">
      <v-col cols="12" sm="4" offset-sm="4">
        <BlogPostCard
          v-for="post in posts"
          :key="post._id"
          :post="post"
          class="my-4"
        />
      </v-col>
    </v-row>
  </div>
</template>

<style lang="css"></style>
