<template>
  <main>
    <ContentDoc />
  </main>
</template>

<script setup>
const { path } = useRoute().params
const { data: post } = await useAsyncData("post", () =>
  queryContent("/blog").where({ _path: path }).findOne()
)
</script>
