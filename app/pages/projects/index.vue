<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" class="mx-8">
        <PageHeader :title="title" :subtitle="subtitle" />
      </v-col>
      </v-row>
      <v-row justify="space-around" class="my-4">
      <v-col cols="12" sm="12" md="6" lg="4" v-for="project in projects" :key="project._id">
        <ProjectsProjectCard :project="project" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { data: projects } = await useAsyncData("projects", () => 
  queryCollection('projects').where('title', "NOT LIKE", "Projects").all()
)
const {data: doc} = await useAsyncData("header", () => 
queryCollection("projects").where('title', "LIKE", 'Projects').first()
)

const title = 'My Projects'
const subtitle = 'I like building things'
</script>
