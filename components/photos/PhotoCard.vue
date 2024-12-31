<template>
    <v-card>
        <NuxtImg :src="imgSrc" :alt="props.photo.title" height="200px" />
    </v-card>
</template>

<script setup>
const props = defineProps({
    photo: Object
})

const imgSrc = computed(() => {
    const baseUrl = '/img/photos/'
    const name = props.photo._stem.split('/')[1]
    return `${baseUrl}${name}.jpg`
})

</script>