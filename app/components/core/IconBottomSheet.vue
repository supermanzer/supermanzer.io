<template>
    <v-bottom-sheet>
        <template #activator="{props}">
            <slot name="icon">
                <v-btn v-bind="props" size="small" icon="mdi-information" density="compact" color="blue" />
            </slot>
        </template>
        <v-card
            :title="title"
            :text="text"
            class="pa-4 pb-10"
        />
    </v-bottom-sheet>
</template>

<script setup lang="js">

defineProps({
    title: {type: String, required:false, default: ""},
    text: {type: String, required: false, default: ""}
})
</script>