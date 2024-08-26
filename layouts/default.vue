<template>
  <v-app>
    <SiteHeader />
    <v-main>
      <NuxtPage />
    </v-main>
    <!-- <SiteFooter /> -->
  </v-app>
</template>

<style lang="css">
main {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  margin-bottom: 2em;
  padding: 2em 0;
  padding-top: 20em;
}

main.dark {
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
}
</style>
