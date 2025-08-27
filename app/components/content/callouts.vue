<template>
  <v-alert
    v-model="open"
    :type="props.type"
    :title="props.title"
    outlined
    closable
    density="comfortable"
  >
    <slot />
  </v-alert>
</template>

<script setup>
const props = defineProps({
  title: String,
  type: String,
})
const open = ref(true)
</script>

<style lang="scss" scoped></style>
