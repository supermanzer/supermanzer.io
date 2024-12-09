<template>
    <div>
        <v-card class="mx-auto" elevation="">
            <v-img 
            v-if="project.banner"
            :src="project.banner"
            class="text-white align-end pa-2"
            height="400"
            gradient="to top, rgba(50,50,50, 0.9), rgba(50,50,50,0.3)"
            cover
            >
                <v-row class="d-flex justify-space-between">
                    <v-col cols="12" sm="12" md="6">
                        <v-list-item
                        :title="project.title"
                        :subtitle="project.summary"
                        >
                        </v-list-item>
                        <v-list-item
                        :title="project.lead.name"
                        subtitle="Lead Developer"
                        >
                        </v-list-item>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <projects-links :links="project.links" />
                        <ProjectsVersionStatus :status="project.status" :version="project.version" format="list"/>
                    </v-col>
                </v-row>
            </v-img>
            <v-card-text>
                
                <ContentDoc />
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="js">
const props = defineProps({
    project: {
        type: Object,
        required: true,
        default: () => {}
    }
})
</script>

<style lang="scss" scoped>
@use "assets/styles/content.scss"

</style>