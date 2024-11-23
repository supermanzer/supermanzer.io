<template>
    <p class="text-h2">{{ props.title }}</p>
    <v-divider class="my-2" />
    <p class="text-h6" > {{ props.subtitle }}</p>
</template>

<script setup>
const props = defineProps({
    title: String,
    subtitle: String
})
</script>