<script setup>
import { useDisplay } from 'vuetify';
definePageMeta({
  layout: "home",
})

const {mobile} = useDisplay()
const { data: posts } = await useAsyncData("latest-posts", () =>
  queryContent("blog").where({title:{$ne: 'Blog'}}).sort().limit(3).find()
)
</script>

<template>
  <div>
    <v-row justify="space-around" class="mt-12">
      <v-col cols="8" class="text-center">
        <p class="text-md-h1 text-sm-h3 mb-4 text-white">Hi, I'm Ryan Manzer</p>
        <p class="subheading mb-3 text-white">
          Full stack software engineer, oceanographer, gentleman scientist
        </p>
      </v-col>
    </v-row>
    <v-divider class="text-white my-5" />
    <HomeNav />
    <BlogLatestsPosts v-if="!mobile" class="bottom-posts" :dark="true" />
  </div>
</template>

<style lang="css">

.bottom-posts {
  position: absolute;
  bottom: 10rem;
  background: rgba(0 0 0/ 10%) !important;
}

</style>
