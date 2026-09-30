<template>
  <MobileContainer>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3" order-lg="1" order-md="2" order-sm="2">
        <AuthorCard v-if="post.author !== null" :author="post.author" header="Author" class="mb-6"/>

        <!-- One sticky unit so the related cards don't slide under the pinned TOC.
             max-height + scroll keeps the bottom reachable when there are many. -->
        <div class="sticky-sidebar">
          <BlogTableOfContents :items="post.body.toc.links" />
          <BlogRelatedPosts :groups="related" />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9" order-lg="2" order-md="1" order-sm="1">
        
          <v-card
           class="px-8 py-4">
            <v-card-item>
              <v-card-title class="text-h4 text-wrap">{{ post.title }}</v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle>{{ post.description }}</v-card-subtitle>
              <div>Created: 
                {{ dateFormat(post.created_at) }}
              </div>
            </v-card-item>
            
            <ContentRenderer :value="post" :prose="true" />
          </v-card>
        
      </v-col>
    </v-row>
  </MobileContainer>
</template>

<script setup>
const { data: post } = await useContentItem()
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}
const { data: related } = await useRelatedPosts(post.value.projects, post.value.path)
</script>

<style>
.sticky-sidebar {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
}
code > span {
  padding-left: 1rem;
  padding-right: 1rem;
}
code {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>