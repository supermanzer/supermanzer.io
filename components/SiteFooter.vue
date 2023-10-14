<script>
export default {
  data: () => ({
    links: [
      {
        name: "Github",
        href: "https://github.com/supermanzer",
        icon: "mdi-github",
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com",
        icon: "mdi-linkedin",
      },
    ],
  }),
}
</script>

<template>
  <v-app-bar location="bottom" style="min-height=140px">
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-btn v-for="link in links" :key="link.name" :href="link.href" icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
