<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="3">
        <AuthorCard :author="post.author" header="Author" class="mb-6"/>

        <BlogTableOfContents :items="post.body.toc.links" />
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="9">
        <v-theme-provider class="" theme="light">
          <v-card :title="post.title" :subtitle="post.description" class="px-8 py-4">
            <div>Created: 
              {{ dateFormat(post.created_at) }}
            </div>
            <ContentRenderer :value="post" />
          </v-card>
        </v-theme-provider>
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