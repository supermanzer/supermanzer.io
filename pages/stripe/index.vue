<template>
  <v-container>
    <ContentRenderer :value="post"/>
  </v-container>
</template>

<script setup>

const { data: post } = await useAsyncData('stripe', () =>
  queryCollection("stripe").first()
)
</script>

