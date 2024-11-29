<template>
  <v-row>
    <v-col cols="12" sm="12" class="mx-8">
      <ContentDoc />
    </v-col>
    </v-row>
    <v-row justify="space-around" class="my-4">
    <v-col cols="12" sm="12" md="6" lg="3" v-for="project in projects" :key="project._id">
      <ProjectsProjectCard :project="project" />
    </v-col>
  </v-row>
</template>

<script setup>
const { data: projects } = await useAsyncData("posts", () =>
  queryContent("projects").where({title:{$ne: 'Projects'}}).find()
)
</script>

<style lang="scss" scoped></style>
