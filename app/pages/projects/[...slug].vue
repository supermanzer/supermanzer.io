
<template>
  <MobileContainer>
    <p class="text-h4 py-8">Project Details: {{ project.title }}</p>
    <ProjectsProjectDetail :project="project" />
    <ProjectsActivity :activity="activity" />
  </MobileContainer>
</template>

<script setup lang="js">
const route = useRoute()
const slug = [route.params.slug].flat().join('/')
const { data: project } = await useContentItem()
// Generated git activity for this project (null when there is no matching clone/JSON)
const { data: activity } = await useAsyncData(`activity-${slug}`, () =>
  queryCollection('activity').where('slug', '=', slug).first()
)
</script>
