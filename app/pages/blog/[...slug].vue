<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="3" order-lg="1" order-md="2" order-sm="2">
        <AuthorCard v-if="post.author !== null" :author="post.author" header="Author" class="mb-6"/>

        <BlogTableOfContents :items="post.body.toc.links" />
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9" order-lg="2" order-md="1" order-sm="1">
        
          <v-card
           class="px-8 py-4">
            <v-card-item>
              <v-card-title class="text-h3">{{ post.title }}</v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle>{{ post.decription }}</v-card-subtitle>
              <div>Created: 
                {{ dateFormat(post.created_at) }}
              </div>
            </v-card-item>
            
            <ContentRenderer :value="post" :prose="true" />
          </v-card>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const {path, params} = useRoute()

const { data: post } = await useAsyncData(`blog-${params.slug[0]}`, () =>
  queryCollection("blog").path(path).first()
)
</script>

<style>
code > span {
  padding-left: 1rem;
  padding-right: 1rem;
}
code {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>