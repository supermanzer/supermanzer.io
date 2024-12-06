<template>
    <v-container>
        <PageHeader :title="heading" :subtitle="subheading"/>
        <AboutSection
          v-for="section in sections"
          :key="section.title"
          :section="section"
          class="my-6" />
    </v-container>
</template>

<script setup lang="js">
const heading = 'About Me';
const subheading = "I'm just this guy, you know?";

const { data: sections } = await useAsyncData("posts", () =>
  queryContent("about").sort({title:-1}).find()
)

</script>