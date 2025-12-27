<template>
  <v-container fluid class="mx-4 " height="100%">

    <v-row class="mx-16 mb-2">
      <v-col>
        <p class="text-h4">Photos</p>
        <v-divider></v-divider>
        <p class="text-h7">I am a pretty basic amateur but I like the challenge of trying to capture images I find compelling</p>
      </v-col>
    </v-row>
    <v-row class="">
      <v-col cols="12" order-md="2" sm="12" order-lg="1" md="12" lg="3" class="border-right">
        <div> <!-- Preventing the timeline from extending longer than it need to-->
          <p class="text-h5">Photo Posts</p>
          <BlogTimeline :posts="posts" />
        </div>
      </v-col>
      <v-col cols="12" sm="12" order-md="1" md="12" order-lg="1" lg="9" class="pl-4">
        
        <p class="text-h5">Individual Photos</p>
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

const selectedCollection = ref(null)

const {data: photos} = await useAsyncData(
  "photos", () => {  
  const photos = queryCollection("photos").all().then(photos =>
    photos.sort((a,b) => {
      const dateA = a.details?.DateTimeOriginal ?? "";
      const dateB = b.details?.DateTimeOriginal ?? "";
      return dateB.localeCompare(dateA);
    })
  )
  if (photos === undefined) {
    console.log("PHOTOS UNDEFINED");
  } else {
    console.log("RECEIVED PHOTOS: ", photos.length);
  }
  return photos
})

const {data: albums} = await useAsyncData("collections", () => 
  queryCollection("photos").where('collections', "IS NOT NULL").all()
)

const {data: posts} = await useAsyncData("posts", () =>
  queryCollection("blog").where('projects', 'LIKE', '%photos%').all()
)

const uniqueCollections = computed(() => {
  if(!albums.value) return []
  return [...new Set(albums.value.flatMap(album => album.collections))]
})
</script>



