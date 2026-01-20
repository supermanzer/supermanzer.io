<template>
    <a :href="photo.path">
        <NuxtImg
          :src="photo.src"
          :height="height"
          :width="height"
          :alt="photo.description"
          aspect-ratio="4/3"
          :quality="60"
          :href="photo.path"
          cover
        />
    </a>
</template>

<script setup lang="js">
    const props = defineProps({
    photo: {
        type: Object,
        required: true
    },
    height: {
        type: [String, Number],
        default: 300,
    },
})

const img = useImage()
</script>