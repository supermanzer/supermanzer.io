<template>
    <div>
        <v-parallax :src="section.meta.parallax_image" height="600">
            <div class="d-flex flex-column fill-height justify-center align-center text-white">
                <h1 class="text-h1">
                    {{ section.title }}
                </h1>
            </div>
        </v-parallax>
        <v-card class=" pa-6">
            <ContentRenderer :value="section" />
        </v-card>
    </div>
</template>

<script setup lang="js">
defineProps({
    section: {type: Object, required: false, default: () => {
       return  {parallax_image: '',
        title: ''}
    }}
})


</script>

<style lang="scss">

.no-reset {
    margin: initial !important;
    padding: initial !important;
}
ol {
    padding-left: 2em;
}
p {
    padding-top: 1em;
}
h2 {
    padding-top: 0.75em;
}

</style>