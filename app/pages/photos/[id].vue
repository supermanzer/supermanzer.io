<template>
    <v-card v-if="data" flat height="100%" class="bg-blue-grey-lighten-2 d-flex">
        <v-row>
            <v-col cols="12" sm="1" align-self="center">
                <v-btn
                 v-if="next !== null"
                 icon="mdi-arrow-left"
                 :to="next"
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
                 v-if="previous !== null"
                 icon="mdi-arrow-right"
                 :to="previous"
                 variant="text"
                />
            </v-col>
        </v-row>
    </v-card>
    <v-card v-else flat>
      <v-progress-circular indeterminate/>
    </v-card>
</template>

<script setup lang="js">
import { useEventListener } from '@vueuse/core'

definePageMeta({
  layout: "photos",
})

const { data } = await useContentPhoto()

const previous = computed(() => {
  // Use optional chaining to prevent the "undefined" crash
  return data.value?.surround?.before?.path || null
})

const next = computed(() => {
  return data.value?.surround?.after?.path || null
})


// Handle arrow key navigation
useEventListener('keydown', (event) => {    
  if (event.key === 'ArrowLeft' && next !== null) {
    navigateTo(next)
  } else if (event.key === 'ArrowRight' && previous !== null) {
    navigateTo(previous)
  }
})

</script>