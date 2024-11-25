
<template>
  <div>
    <p class="text-h4 py-8">Project Details: {{ project.title }}</p>
    <ProjectsProjectDetail :project="project" />
  </div>
</template>

<script setup lang="js">
const { path } = useRoute()

const { data: project } = await useAsyncData(`content-${path}`, () =>
  queryContent("/projects").where({ _path: path }).findOne()
)
console.log(project);

</script>

<style scoped></style>
