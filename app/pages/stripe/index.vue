<template>
  <v-container>
    <ContentRenderer :value="posts[0]"/>
  </v-container>
</template>

<script setup>

const { data: posts } = await useAsyncData('stripe', () =>
  queryCollection("stripe").all()
)
</script>

