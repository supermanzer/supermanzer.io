<template>
  <v-container fluid class="mx-4 " height="100%">

    <v-row class="mx-16 mb-4">
      <v-col>
        <p class="text-h4">Photos</p>
        <v-divider></v-divider>
        <p class="text-h7">I am a prety basic amateur but I like the challenge of trying to capture images I find compelling</p>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col cols="12" sm="12" md="4" lg="3" class="border-right">
        <div> <!-- Preventing the timeline from extending longer than it need to-->
          <p class="text-h5">Photo Posts</p>
          <BlogTimeline :posts="posts" />
        </div>
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
  queryCollection("photos").all()
)
const {data: posts} = await useAsyncData("posts", () =>
  queryCollection("blog").where('projects', 'LIKE', '%photos%').all()
)
</script>


