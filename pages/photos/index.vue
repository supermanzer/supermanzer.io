<template>
  <v-container fluid class="mx-4 fill-height">
    <v-row class="mx-16 my-4">
      <v-col>
        <ContentDoc  />
      </v-col>
    </v-row>
    <v-row class="fill-height">
      <v-col cols="12" sm="12" md="4" lg="3" class="border-right d-none d-md-block">
        <p class="text-h5">Photo Posts</p>
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="9" class="pl-4">
        <p class="text-h5">Photos</p>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="photo in photos" :key="photo.id">
            <PhotosPhotoCard :photo="photo" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import PostCard from '~/components/blog/PostCard.vue';

const {data: photos} = await useAsyncData("photos", () =>
  queryContent("photos").where({title: {$ne: 'Photos'}}).find()
)
const {data: posts} = await useAsyncData("posts", () =>
  queryContent("blog").where( {'projects': {$icontains: 'photos'}}).find()
)
</script>


