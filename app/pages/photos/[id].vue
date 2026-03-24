<template>
    <v-card v-if="data" flat height="100%" class="bg-blue-grey-lighten-2 d-flex">
        <v-row class="w-100">
            <!-- Desktop side arrows (hidden on mobile) -->
            <v-col cols="12" sm="1" align-self="center" class="hidden-xs">
              <v-row justify="center">
                <v-btn
                 v-if="next !== null"
                 icon="mdi-arrow-left"
                 :to="next"
                 variant="text"
                />
              </v-row>
                
            </v-col>

            <!-- Image and info column -->
            <v-col cols="12" sm="10" align-self="center" class="d-flex flex-column">
                <div class="position-relative" @click="isFullscreenOpen = true">
                    <v-img
                    v-if="data.image"
                    :src="photoSrc(data.image.src)"
                    format="jpg"
                    aspect-ratio="4/3"
                    contain
                    :height="mdAndUp ? 1000 : undefined"
                    class="flex-grow-1 cursor-pointer"
                    />
                </div>
                <v-divider class="mt-5 mx-8" opacity="1"></v-divider>
                <PhotosInfoText v-if="data.image" :photo="data.image" />

                <!-- Mobile nav arrows (shown only on small screens) -->
                <v-row class="justify-center gap-4 mt-4 hidden-sm-and-up">
                    <v-btn
                     v-if="next !== null"
                     icon="mdi-arrow-left"
                     :to="next"
                     variant="text"
                    />
                    <v-btn
                     v-if="previous !== null"
                     icon="mdi-arrow-right"
                     :to="previous"
                     variant="text"
                    />
                </v-row>
            </v-col>

            <!-- Desktop right arrow (hidden on mobile) -->
            <v-col cols="12" sm="1" align-self="center" class="hidden-xs">
                <v-row justify="center">
                  <v-btn
                   v-if="previous !== null"
                   icon="mdi-arrow-right"
                   :to="previous"
                   variant="text"
                  />
                </v-row>
            </v-col>
        </v-row>
    </v-card>
    <v-card v-else flat>
      <v-progress-circular indeterminate/>
    </v-card>

    <!-- Fullscreen image dialog with zoom -->
    <v-dialog
      v-model="isFullscreenOpen"
      fullscreen
      class="bg-black"
      @click="isFullscreenOpen = false"
    >
     
          <v-img
            v-if="data.image"
            :src="photoSrc(data.image.src)"
            format="jpg"
            contain
            max-height="100vh"
            max-width="100vw"
            :style="{
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.2s ease',
              cursor: 'zoom-out'
            }"
          />
     
    </v-dialog>
</template>

<script setup lang="js">
import { useEventListener } from '@vueuse/core'
import { useDisplay } from 'vuetify'

definePageMeta({
  layout: "photos",
})

const { mdAndUp } = useDisplay()
const { data } = await useContentPhoto()

const isFullscreenOpen = ref(false)
const zoomLevel = ref(1)

const previous = computed(() => {
  // Use optional chaining to prevent the "undefined" crash
  return data.value?.surround?.before?.path || null
})

const next = computed(() => {
  return data.value?.surround?.after?.path || null
})

const handleZoom = (event) => {
  event.preventDefault()
  const zoomStep = 0.2
  const direction = event.deltaY > 0 ? -1 : 1
  zoomLevel.value = Math.max(1, Math.min(5, zoomLevel.value + (zoomStep * direction)))
}

// Reset zoom when dialog closes
watch(isFullscreenOpen, (newVal) => {
  if (!newVal) {
    zoomLevel.value = 1
  }
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