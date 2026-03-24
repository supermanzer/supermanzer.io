
<template>
  <MobileContainer>
    <p class="text-h4 py-8">Project Details: {{ project.title }}</p>
    <ProjectsProjectDetail :project="project" />
  </MobileContainer>
</template>

<script setup lang="js">
const { data: project } = await useContentItem()
</script>
