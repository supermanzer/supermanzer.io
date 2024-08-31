<template>
  <v-app>
    <v-img
      cover
      src="/img/home.jpeg"
      gradient="to top, rgba(0,0,0,0.1), rgba(0,0,0,0.2)"
      :eager="true"
    >
      <SiteHeader />
      <v-main>
        <v-container>
          <NuxtPage />
        </v-container>
      </v-main>
      <SiteFooter />
    </v-img>
  </v-app>
</template>

<script setup>
const img = useImage()
const backgroundStyles = computed(() => {
  const imgUrl = img("img/home.jpeg", { width: 100 })
  return { backgroundImage: `url('${imgUrl})` }
})
</script>

<style lang="css" scoped>
main {
  height: 100%;
}
</style>
