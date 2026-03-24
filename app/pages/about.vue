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

const route = useRoute();
const heading = 'About Me';
const subheading = "I'm just this guy, you know?";

const getSections = async () => {
  const result = await queryCollection("about").all()
  console.log("GOT COLLECTIONS:\n", result);
  
}
const { data: sections } = await useAsyncData("sections", () =>
  queryCollection("about").path(route.path).all()
)
const {mobile} = useDisplay()

onMounted(() => {
  getSections()
})
</script>        