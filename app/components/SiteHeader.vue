<script setup>
import { useTheme } from 'vuetify';
import { useLocalStorage } from '@vueuse/core';

const route = useRoute()
const {links} = useNav();
const drawer = useState("drawer", () => false)
const title = "Supermanzer.io"





const props = defineProps({
  showLinks: { type: Boolean, required: false, default: true },
  transparent: {type: Boolean, required: false, default: false},
})

const classObject = reactive({
  'transparent': props.transparent
})
</script>

<template>
  <div>
 
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item title="Supermanzer.io" subtitle="Site of Supermanzer" />
        <v-divider />
        <v-list-item
          v-for="item in links"
          :key="item.name"
          :href="item.href"
          :active="item.active"
        >
          {{ item.name }}
        </v-list-item>
      </v-navigation-drawer>

    <v-toolbar prominent :class="classObject" :order="-1" elevation="2">
      <v-app-bar-nav-icon
        v-if="props.showLinks"
        class="d-sm-flex d-md-none"
        @click="drawer = !drawer"
      />

      <v-toolbar-title >{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-toolbar-items v-if="props.showLinks" class="d-none d-md-flex">
        <v-btn
          v-for="item in links"
          :key="item.name"
          :href="item.href"
          :active="item.active"
          :text="item.name"
        />
      </v-toolbar-items>
      
    </v-toolbar>
  </div>
</template>

<style lang="css">
.transparent {
  background: rgba(0 0 0/ 20%) !important;
  .v-toolbar-title {
    color: white;
  }
}
</style>
