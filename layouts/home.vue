<template>
  <v-app>
    <!-- <v-img
      cover
      src="img/home.jpeg"
      gradient="to top, rgba(0,0,0,0.1), rgba(0,0,0,0.2)"
    > -->
    <NuxtImg src="img/home.jpeg">
      <SiteHeader />
      <v-main>
        <v-container fluid>
          <NuxtPage />
        </v-container>
      </v-main>
      <SiteFooter />
    </NuxtImg>
    <!-- </v-img> -->
  </v-app>
</template>

<script setup></script>

<style lang="css" scoped>
main {
  height: 100%;
}
</style>
