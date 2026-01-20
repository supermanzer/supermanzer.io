<template>
    <v-list class="bg-blue-grey-lighten-2">
        <v-list-item>
            Captured: {{ useDateStr(details.DateTimeOriginal) }}
        </v-list-item>
        <v-list-item>
            F: {{ details.FNumber }} / ISO: {{ details.ISOSpeedRatings }} / Focal Length: {{ details.FocalLength }}mm / Shutter Speed: {{ shutterSpeed(details.ExposureTime) }}
        </v-list-item>
        <v-list-item>
            Lens: {{ details.LensModel }} / Camera: {{ details.Model }}
        </v-list-item>
    </v-list>
</template>

<script setup lang="js">
const props = defineProps({
        photo: {
            type: Object,
            required: true
    },
});

const details = computed(() => {
    return props.photo.details
});

</script>