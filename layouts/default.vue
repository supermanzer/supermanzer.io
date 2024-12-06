<template>
  <v-app>
    <SiteHeader />
    <v-main >
      
        <NuxtPage />
      
    </v-main>
    <SiteFooter />
  </v-app>
</template>

<style lang="css">
main {
  /* background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%); */
  /* margin-bottom: 2em; */
  padding: 4em 4em;
  margin: 0em 3em;
}

main.dark {
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
}

pre {
  background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(0, 0, 0, 0.25) 200%
    );
  background-blend-mode: multiply;
}
</style>
