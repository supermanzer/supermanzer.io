<script setup>
const route = useRoute()
console.log(route)
const title = "Supermanzer.io"

const navigationItems = [
  { name: "Home", href: "/", active: route.name == "index" },
  { name: "Blog", href: "/blog", active: route.name.includes("blog") },
  {
    name: "Projects",
    href: "/projects",
    active: route.name.includes("projects"),
  },
  { name: "Photos", href: "/photos", active: route.name.includes("photos") },
]
</script>

<template>
  <div>
    <v-app-bar
      dark
      prominent
      class="text-white font-weight-black"
      image="/img/banner.webp"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          v-for="item in navigationItems"
          :key="item.name"
          :href="item.href"
          :active="item.active"
        >
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
