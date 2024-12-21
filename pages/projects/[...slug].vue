
<template>
  <v-container>
    <!-- <p class="text-h1">Hi</p> -->
    <p class="text-h4 py-8">Project Details: {{ project.title }}</p>
    <ProjectsProjectDetail :project="project" />
  </v-container>
</template>

<script setup lang="js">
const { path } = useRoute()

const { data: project } = await useAsyncData(`content-${path}`, () =>
  queryContent("/projects").where({ _path: path }).findOne()
)
// console.log(project);

</script>

<style scoped>
/* [data-content-id] {
  color: red !important;
}


.v-card-text > h2 {
  margin: 1em 0;
  padding: 0.7em;
  line-height: 1.6;
  background-image: linear-gradient(
    135deg,
    #7085b6 0%,
    #87a7d9 50%,
    #def3f8 100%
  );
}
.v-card__text :v-deep(div.nuxt-content) {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}
.block-btn {
  margin-top: 1em;
} */
</style>
