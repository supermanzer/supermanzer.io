<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
      <p class="text-h2">Blog Posts</p>
      <v-divider class="my-2" />
     
    </v-col>
    </v-row>
    <v-row>

        <!-- <BlogPostCard :post="post" /> -->
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

</script>

