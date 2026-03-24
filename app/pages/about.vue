<template>
    <MobileContainer>
        <PageHeader :title="heading" :subtitle="subheading"/>
        <AboutSection
          v-for="section in sections"
          :key="section.title"
          :section="section"
          class="my-6" />
   </MobileContainer>
</template>

<script setup lang="js">

const heading = 'About Me';
const subheading = "I'm just this guy, you know?";

const sections = ref([]);

const getSections = async () => {
  const result = await queryCollection("about").all()
  console.log("SETTING RESULT AS SECTIONS:\n", result);
  sections.value = result
  
}



onMounted(() => {
  getSections()
})
</script>        