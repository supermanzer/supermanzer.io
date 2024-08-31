<script setup>
definePageMeta({
  layout: "home",
})
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="space-around" class="mt-12">
      <v-card class="text-white semi_op">
        <v-divider class="my-4"></v-divider>
        <v-card-text>
          <p class="text-h2">Hi, I'm Ryan Manzer.</p>
          <v-divider class="my-4 test-white white"></v-divider>
          <p class="text-h4">
            Full stack software engineer, oceanographer, gentleman scientist
          </p>

          <p></p>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="my-6">
      <ContentDoc />
    </v-row>
  </v-container>
</template>

<style lang="css">
code {
  background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(0, 0, 0, 0.25) 200%
    );
  background-blend-mode: multiply;
}
</style>
