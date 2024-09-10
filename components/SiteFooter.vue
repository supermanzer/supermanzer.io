<script>
export default {
  data: () => ({
    links: [
      {
        name: "Github",
        href: "https://github.com/supermanzer",
        icon: "mdi-github",
        tooltip_text: "Checkout out my Github profile",
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com",
        icon: "mdi-linkedin",
        tooltip_text: "Check out my LinkedIn profile",
      },
    ],
  }),
}
</script>

<template>
  <v-footer class="bg-indigo" border app z-index="-1">
    <v-row justify="center" no-gutters>
      <v-tooltip
        v-for="link in links"
        :key="link.name"
        :text="link.tooltip_text"
        location="top"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon class="mx-4" v-bind="props">
            <v-icon>{{ link.icon }}</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-row>
  </v-footer>
</template>
