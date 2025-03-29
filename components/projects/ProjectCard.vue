<template>
    <v-card
        :dark="false"
        :elevation="3"
        :min-width="300"
        :min-height="400"
        class="position-relative"
    >
        <v-card-title class="text-uppercase d-flex justify-center">
        {{ project.title }}
        <v-avatar v-if="project.meta.img" size="48px">
            <v-img :src="project.meta.img"></v-img>
        </v-avatar>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="fill-height">
            <p class="mb-auto pa-2">
                {{ project.description }}
            </p>
            
        
            <VersionStatus 
              :version="project.meta.version" 
              :status="project.meta.status"
              class="bottom-text"
              />
        </v-card-text>

        <v-card-actions class="bottom-actions">
            <v-spacer></v-spacer>
            <v-btn
                text
                color="deep-purple accent-4"
                :bottom="true"
                nuxt
                :to="project.path"
              >
                Details
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script setup>
import VersionStatus from './VersionStatus.vue';

const { project } = defineProps(['project'])
const projectUrl = computed(() => {
    return `projects/${project.id}`
})
const hasLink = (link) => {
    if (project.links) {
        return Object.prototype.hasOwnProperty.call(project.links, link)
    }
}
</script>
  
<style scoped>
    .bottom-actions {
        position: absolute;
        bottom: 1rem;
        width: 100%;
        border-top: 1px solid rgba(0 0 0/ 15%);

    }
    .bottom-text {
        position: absolute;
        bottom: 4.5rem;
        width: 100%;
        margin-top: 1em;
    }
</style>
  