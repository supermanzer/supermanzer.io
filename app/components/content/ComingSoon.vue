<template>
    <v-row justify="center" class="mt-6">
        <v-card width="500">
            <v-img
                :src="img_src"
                height="200"
                class="align-end text-white pa-2"
                gradient="to top, rgba(0,0,0,0.7), rgb(0,0,0,0.1)"
                cover
            >
                <v-card-title >
                    <v-icon>mdi-folder-wrench-outline</v-icon>
                    <slot name="title">
                        Under construction ...
                    </slot>
                </v-card-title>
                <div>
                    <v-divider class="white text-white"></v-divider>
                    <v-card-subtitle>
                        <slot name="subtitle" />
                    </v-card-subtitle>
                </div>
            </v-img>
            <v-card-text class="pa-4">
                <slot name="text">
                    This section of this site is currently being worked on to ensure it's fabulous.  Check back later to be amazed!
                </slot>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script setup lang="js">
const props = defineProps({
    img_src: {type: String, required: false, default: "/img/components/construction.jpeg"}
})
</script>