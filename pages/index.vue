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
      <v-card class="text-white semi_op">
        <v-divider class="my-4" />
        <v-card-text>
          <p class="text-h2">Hi, I'm Ryan Manzer.</p>
          <v-divider class="my-4 test-white white" />
          <p class="text-h4">
            Full stack software engineer, oceanographer, gentleman scientist
          </p>
        </v-card-text>
      </v-card>
    </v-row>
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
