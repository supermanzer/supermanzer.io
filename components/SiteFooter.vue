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
  <v-footer :absolute="true" class="semi_op">
    <div>
      <v-btn v-for="link in links" :key="link.name" :href="link.href" icon>
        <v-icon class="text-white">{{ link.icon }}</v-icon>
      </v-btn>
    </div>
  </v-footer>
</template>
