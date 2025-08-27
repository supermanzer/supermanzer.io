

<script setup>
import {useNavStore} from '@/stores/nav'

const navigationStore = useNavStore()

const navigationItems = navigationStore.getLinks
</script>

<template>
  <v-row align="center" justify="center" class="shaded">
    <v-col
      v-for="(item, i) in navigationItems"
      :key="i"
      class="px-4"
      cols="12"
      sm="12"
      md="3"
      lg="2"
      :class="{'text-center': true}"
    >
      <v-btn :text="item.name" :href="item.href" variant="text" class="text-white" />
    </v-col>
  </v-row>
</template>

<style lang="css">
.shaded {
  background: rgba(0 0 0/ 10%) !important;
}
</style>