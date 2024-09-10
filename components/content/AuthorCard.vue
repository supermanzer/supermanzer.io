<template>
  <v-card class="mx-auto">
    <v-card-title>{{ header }}</v-card-title>
    <v-list-item
      lines="three"
      :title="author.name"
      :subtitle="author.description"
    >
      <template v-slot:append>
        <v-avatar tile :rounded="0" size="100">
          <v-img alt="author" :src="author.image"></v-img>
        </v-avatar>
      </template>
    </v-list-item>
  </v-card>
</template>

<script setup>
const { author, header } = useAttrs()
</script>

<style lang="scss" scoped></style>
