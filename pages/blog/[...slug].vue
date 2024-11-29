<template>
  <v-row>
    <v-col cols="12" sm="12" md="4" lg="3">
      <AuthorCard :author="post.author" header="Author" />
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="9">
      <v-theme-provider class="" theme="light">
        <v-card :title="post.title" :subtitle="post.description" class="px-8">
          <ContentDoc :value="post" />
        </v-card>
      </v-theme-provider>
    </v-col>
  </v-row>
</template>

<script setup>
const { path } = useRoute()
console.log(path)
const { data: post } = await useAsyncData(`content-${path}`, () =>
  queryContent("/blog").where({ _path: path }).findOne()
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