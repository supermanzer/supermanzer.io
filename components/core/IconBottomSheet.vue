<template>
    <v-bottom-sheet>
        <template v-slot:activator="{props}">
            <slot name="icon">
                <v-btn v-bind="props" size="small" icon="mdi-information" density="compact" color="blue" ></v-btn>
            </slot>
        </template>
        <v-card
            :title="title"
            :text="text"
            class="pa-4 pb-10"
        >
        </v-card>
    </v-bottom-sheet>
</template>

<script setup lang="js">

const propts = defineProps({
    title: {type: String, required:false, default: ""},
    text: {type: String, required: false, default: ""}
})
</script>