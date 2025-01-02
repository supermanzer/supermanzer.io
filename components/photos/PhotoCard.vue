<template>
    
    <v-dialog height="100%" v-model="dialog">
        <template v-slot:activator="{ props: activatorProps }">
            <v-img
              v-bind="activatorProps"
             :lazy-src="img(photo.src, {width: 10, quality: 50})"
             :src="img(photo.src, {height: height, quality: 60})"
             :height="height"
             :alt="photo.description"
             aspect-ratio="4/3"
             cover
            ></v-img>
        </template>
        <template v-slot:default="{ save, close }">

            <v-card>
                <v-img
                :lazy-src="img(photo.src, {width: 10, quality: 50})"
                :src="photo.src"
                :alt="photo.description"
                cover
                ></v-img>
                <v-card-title>{{ photo.title }}</v-card-title>
                <v-card-subtitle>{{ photo.description }}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text class="py-1 px-6">
                    Details:
                    <v-row>
                        <v-col cols="12" sm="12" md="6">
                            <ul>
                                <li>Captured: {{ photo.details.DateTimeOriginal }}</li>
                                <li>Camera: {{ photo.details.Model }}</li>
                                <li>Shutter Speed: {{ photo.details.ExposureTime }}s</li>
                            </ul>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <ul>
                                <li>Aperture: f/{{ photo.details.FNumber }}</li>
                                <li>ISO: {{ photo.details.ISOSpeedRatings }}</li>
                                <li>Focal Length: {{ photo.details.FocalLength }}mm</li>
                                <li>Lens: {{ photo.details.LensModel }}</li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="dialog = !dialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup>
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

const dialog = ref(false)

</script>