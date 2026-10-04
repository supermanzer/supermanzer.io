<template>
    <v-container :fluid="breakPoint" class="pb-12">
        <slot />
    </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

const {mdAndDown: breakPoint} = useDisplay();
console.log("SM AND DOWN VALUE:\n", breakPoint.value);

</script>