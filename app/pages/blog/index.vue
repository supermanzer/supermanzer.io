<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
      <p class="text-h2">Blog Posts</p>
      <v-divider class="my-2" />
    </v-col>
    </v-row>
    <v-row class="height-100">
         <BlogTimeline  :posts="posts"  />
    </v-row>
  </v-container>
</template>

<script setup lang="js">
const {data: posts} = await useAsyncData('blog', () => 
  queryCollection('blog')
  .order('created_at', 'DESC')
  .all()
)
const num_posts = posts.length
console.log(`========GOT ${num_posts} BLOG POSTS========`)

</script>

