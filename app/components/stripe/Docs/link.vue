<template>
   <v-btn icon color="" :href="url" target="_blank">
    <v-icon>mdi-book-open</v-icon>
    <v-tooltip activator="parent" location="right">
        Stripe Documentation - {{ url }}
    </v-tooltip>
   </v-btn>
</template>

<script setup>
const {url } = defineProps({
    url: {type: String, required: false, default :""}
})
</script>