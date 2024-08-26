<template></template>

<script setup>
const props = defineProps({
  drawer: Boolean,
})
const route = useRoute()
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
console.log(props.drawer)
</script>
