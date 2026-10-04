<script setup lang="js">

defineProps({
    links: {
        type: Object,
        default: () => ({})
    }
})
</script>

<template>
    <div class="d-flex justify-end align-end px-6 flex-column">
        <v-btn
         v-for="link in links"
         :key="link.url"
         :href="link.url"
         variant="outlined"
         color="white"
         :prepend-icon="link.icon"
         :text="link.text"
         size="large"
         ripple
         class="my-3"
        />
    </div>
</template>