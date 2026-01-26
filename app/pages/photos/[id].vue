<template>
    <v-card flat height="100%" class="bg-blue-grey-lighten-2 d-flex">
        <v-row>
            <v-col cols="12" sm="1" align-self="center">
                <v-btn
                 v-if="data.surround.after"
                 icon="mdi-arrow-left"
                 :to="data.surround.after.path"
                 variant="text"
                />
            </v-col>
            <v-col cols="12" sm="10" align-self="center" height="100%">
                <v-img
                v-if="data.image"
                :src="photoSrc(data.image.src)"
                format="jpg"
                aspect-ratio="4/3"
                contain
                :height="1000"
                />
                <v-divider class="mt-5 mx-8" opacity="1"></v-divider>
                <PhotosInfoText v-if="data.image" :photo="data.image" />
            </v-col>
            <v-col cols="12" sm="1" align-self="center">
                <v-btn
                 v-if="data.surround.before"
                 icon="mdi-arrow-right"
                 :to="data.surround.before.path"
                 variant="text"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup lang="js">
import { useEventListener } from '@vueuse/core'

definePageMeta({
  layout: "photos",
})

const { data } = await useContentPhoto()

// Handle arrow key navigation
useEventListener('keydown', (event) => {    
  if (event.key === 'ArrowLeft' && data.value.surround.after) {
    navigateTo(data.surround.after.path)
  } else if (event.key === 'ArrowRight' && data.value.surround.before) {
    navigateTo(data.surround.before.path)
  }
})

</script>