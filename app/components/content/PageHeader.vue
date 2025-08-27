<template>
    <p class="text-h2">
       {{ title }}
    </p>
    <v-divider class="my-2" />
    <p> 
       {{ subtitle }}
    </p>
</template>

<script setup lang="js">
const props = defineProps({
    title: {type: String, required: false, default: ""},
    subtitle: {type: String, required: false, default: ""}
})
</script>