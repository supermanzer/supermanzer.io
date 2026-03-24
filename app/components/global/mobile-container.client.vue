<template>
    <v-container :fluid="smAndDown">
        <slot />
    </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

const {smAndDown} = useDisplay();
console.log("SM AND DOWN VALUE:\n", smAndDown.value);

</script>