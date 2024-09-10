<template>
  <v-row>
    <v-col cols="12" sm="12" md="4" lg="3">
      <AuthorCard :author="post.author" header="Author" />
    </v-col>
    <v-col cols="12" sm="12" md="8" lg="9">
      <ContentRenderer :value="post" />
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
