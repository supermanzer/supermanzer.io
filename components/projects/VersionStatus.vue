<template>
    <v-row v-if="format=== 'row'">
        <v-col cols="12" sm="12" md="5" class="d-flex justify-space-around mx-0 px-0">
            Version: <code>{{ version }}</code> 
        </v-col>
        <v-col cols="12" sm="12" md="7" class="d-flex justify-space-around mx-0 px-0">
            Status: 
            <v-chip density="compact" rounded="xs" elevation="1" :class="chipStatus">
                {{ status }}
                <v-bottom-sheet>
                    <template v-slot:activator="{props}">
                        <v-icon v-bind="props" icon="mdi-information"></v-icon>
                    </template>
                    <v-card class="pa-4 pb-10">
                        <v-card-title>
                            Status Meaning
                        </v-card-title>
                        <v-card-text>
                            The status displayed here indicates the status of the curernt version.  Therefore a status of 'Complete' doesn't indicate that there will be no future work on this project.  Additionally, the version displayed may not yet be available for use in the project is 'In Progress'.                        
                        </v-card-text>
                    </v-card>
                </v-bottom-sheet>
            </v-chip>
        </v-col>
    </v-row>
    <v-list v-else-if="format === 'list'" class="d-flex justify-end bg-transparent">
        <v-list-item>
            <v-list-item-title>
                Version: <code>{{ version }}</code>
            </v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>
                Status: 
                <v-chip density="compact" rounded="xs" elevation="1" :class="chipStatus">
                    {{ status }}
                    <v-bottom-sheet>
                        <template v-slot:activator="{props}">
                            <v-icon v-bind="props" icon="mdi-information" end></v-icon>
                        </template>
                        <v-card class="pa-4 pb-10">
                            <v-card-title>
                                Status Meaning
                            </v-card-title>
                            <v-card-text>
                                The status displayed here indicates the status of the curernt version.  Therefore a status of 'Complete' doesn't indicate that there will be no future work on this project.  Additionally, the version displayed may not yet be available for use in the project is 'In Progress'.                        
                            </v-card-text>
                        </v-card>
                    </v-bottom-sheet>
                </v-chip>
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>

<script setup lang="js">
const props = defineProps({
    version: {type: String, required: false, default: ""},
    status: {type: String, required: false, default: ""},
    format: {type: String, required: false, default: "row"}
})
const chipStatus = reactive({
    'bg-green': props.status === 'Complete',
    'bg-blue': props.status === 'In Progress',
    'bg-secondary': ['Planning', 'Not Started'].indexOf(props.status) > -1
})
</script>

<style scoped>
div.v-list-item-title {
    font-size: 0.75rem;
}
span.v-chip {
    font-size: 0.75rem;
}
</style>