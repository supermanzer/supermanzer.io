<template>
  <v-alert :type="props.type" :title="props.title" outlined>
    <slot />
  </v-alert>
</template>

<script setup>
const props = defineProps({
  title: String,
  type: String,
})
</script>

<style lang="scss" scoped></style>
