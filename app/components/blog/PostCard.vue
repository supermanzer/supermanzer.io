<script setup>
defineProps({"post": 
  {type: Object, required: true, default: () => {
    return {
      _path: '',
      title: '',
      description: '',
      img: ''
    }
  }
}})
</script>

<template>
  <v-card :rounded="true" :to="post.path" class="mb-4">
    <v-list-item lines="three">
      <p class="text-h8">{{ post.title }}</p>
      <v-divider></v-divider>
      <v-list-item-subtitle class="text-truncate">{{ post.description }}</v-list-item-subtitle>
      <template v-slot:prepend>
        <v-avatar :rounded="0" size="100">
          <v-img :src="post.meta.img" :alt="post.title" />
        </v-avatar>
      </template>
    </v-list-item>
  </v-card>
</template>
