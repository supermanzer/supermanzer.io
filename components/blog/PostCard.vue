<script setup>
const { post } = defineProps(["post"])
</script>

<template>
  <v-card :rounded="true" :to="post._path">
    <v-list-item :lines="3" :title="post.title" :subtitle="post.description">
      <template v-slot:append>
        <v-avatar :rounded="0" size="100">
          <v-img :src="post.img" :alt="post.title" />
        </v-avatar>
      </template>
    </v-list-item>
  </v-card>
</template>
