<script setup>
definePageMeta({
  // layout: "home",
})
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="space-around" class="mt-12">
      <v-card class="text-white semi_op">
        <!-- <v-img
          src="https://images.pexels.com/photos/3747150/pexels-photo-3747150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          cover
          class="d-flex align-end text-white"
          height="500"
        > -->
        <!-- <v-card-title>Hello</v-card-title> -->
        <!-- </v-img> -->
        <v-divider class="my-4"></v-divider>
        <v-card-text>
          <p class="text-h2">Hi, I'm Ryan Manzer.</p>
          <p class="text-h4">Pythonista, Djangonaut, and general nerd.</p>
          <v-divider class="my-4"></v-divider>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="my-10">
      <ContentDoc />
    </v-row>
  </v-container>
</template>
