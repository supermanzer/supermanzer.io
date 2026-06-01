<template>

        <NuxtImg
          :src="photo.src"
          :height="height"
          :width="height"
          :alt="photo.description"
  
          :quality="60"
          :href="photo.path"
          cover
          @click="photoNav"
        />

</template>

<script setup lang="js">
    const props = defineProps({
    photo: {
        type: Object,
        required: true
    },
    height: {
        type: [String, Number],
        default: 250,
    },
})

const img = useImage()

const photoNav = () => {
    console.log("PHOTO THUMBNAIL CLICKED");
    
    window.location.replace(props.photo.path)
}
</script>