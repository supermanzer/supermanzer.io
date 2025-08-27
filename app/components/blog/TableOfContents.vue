<template>
    <v-card class="position-sticky top-0">
        <v-list-item>
            <v-list-item-title class="font-weight-medium ">Table of Contents</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav>
            <v-list-item
             v-for="item in items"
             :key="item.text"
             :to="`#${item.id}`"
             variant="plain"
            >
                {{ item.text }}
            </v-list-item>
        </v-list>
    </v-card> 
</template>

<script setup lang="js">
const props = defineProps({
    items: {type: Array, required: true}
})
</script>