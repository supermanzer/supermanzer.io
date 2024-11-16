<template>
  <v-app>
    <v-img
      cover
      src="/img/home.jpeg"
      gradient="to top, rgba(0,0,0,0.2), rgba(0,0,0,0.4)"
      :eager="true"
    >
      <SiteHeader :show-links="false" :transparent="true" />
      <v-main>
        <v-container>
          <NuxtPage />
        </v-container>
      </v-main>
      <!-- <SiteFooter /> -->
    </v-img>
  </v-app>
</template>

<script setup></script>

<style lang="css" scoped>
main {
  height: 100%;
}
</style>
