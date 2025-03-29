<template>
    <v-container :fluid="mobile" class="">
        <PageHeader :title="heading" :subtitle="subheading"/>
        <AboutSection
          v-for="section in sections"
          :key="section.title"
          :section="section"
          class="my-6" />
    </v-container>
</template>

<script setup lang="js">
import { useDisplay } from 'vuetify';

const heading = 'About Me';
const subheading = "I'm just this guy, you know?";

const { data: sections } = await useAsyncData("sections", () =>
  queryCollection("about").order('title', 'DESC').all()
)
const {mobile} = useDisplay()
</script>