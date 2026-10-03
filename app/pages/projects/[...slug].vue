
<template>
  <MobileContainer>
    <p class="text-h4 py-8">Project Details: {{ project.title }}</p>
    <v-row>
      <v-col cols="12" :lg="hasPosts ? 9 : 12">
        <ProjectsProjectDetail :project="project" />
      </v-col>
      <v-col v-if="hasPosts" cols="12" lg="3">
        <div class="project-posts-sticky">
          <ProjectsPosts :posts="posts" />
        </div>
      </v-col>
    </v-row>
    <v-row v-if="activity">
      <v-col cols="12">
        <ProjectsActivity :activity="activity" />
      </v-col>
    </v-row>
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
// Published blog posts tagged with this project, newest first (empty when there are none)
const { data: posts } = await useProjectPosts(slug)
const hasPosts = computed(() => !!posts.value?.length)
</script>

<style scoped>
/* Pin the posts card beside the main card. Only at lg and up (Vuetify's default
   lg threshold, 1280px), where the two sit side by side; below that they stack. */
@media (min-width: 1280px) {
  .project-posts-sticky {
    position: sticky;
    top: 16px;
  }
}
</style>
