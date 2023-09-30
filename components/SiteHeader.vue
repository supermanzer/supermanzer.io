<script setup>
const route = { name: "index" }

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
    <v-toolbar
      dark
      prominent
      class="text-white font-weight-black"
      image="https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
    </v-toolbar>
  </div>
</template>
