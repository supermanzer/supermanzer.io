<template>
  <MobileContainer>

    <v-row class="mx-2 mx-sm-4 mx-md-8 mb-2">
      <v-col>
        <p class="text-h4" :class="{ 'text-center': smAndDown }">
          My Photo Gallery
        </p>
        
        
      </v-col>
    </v-row>
    <div v-for="year in Object.keys(photos || {}).sort((a, b) => b - a)" :key="year">
      <v-row class="mx-2 mx-sm-4 mx-md-8 my-2">
        <v-col cols="12">
          <p class="text-h5" :class="{ 'text-center': smAndDown }">{{ year }}</p>
          <div v-for="month in Object.keys(photos[year]).sort((a, b) => b - a)" :key="month" class="mt-2">
            <p class="text-h6" :class="{ 'text-center': smAndDown }">{{ getMonthName(month) }}</p>
            <v-divider class="my-2"></v-divider>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="3" v-for="photo in photos[year][month]" :key="photo.id" :class="{ 'd-flex justify-center': smAndDown, 'px-3': !smAndDown }">
                <PhotosThumbnail :photo="photo" />
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-3" :thickness="4"></v-divider>
    </div>
  </MobileContainer>
</template>

<script setup>
import { useDisplay } from 'vuetify'

definePageMeta({
  layout: "photos",
})

const { smAndDown } = useDisplay()

const getMonthName = (monthIndex) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return monthNames[parseInt(monthIndex, 10)];
}

const {data: photos} = await useContentQuery({
  path: '/photos',
  where: {
    _path: { $ne: '/photos' },
    details: { $exists: true },
    'details.DateTimeOriginal': { $exists: true }
  },
  sort: { 'details.DateTimeOriginal': -1 }, // -1 for descending
  transform: (data) => {
    
    const grouped = data.reduce((acc, photo) => {
      const dateTime = photo.details?.DateTimeOriginal;
      if (dateTime) {
        // dateTime is in 'YYYY:MM:DD HH:mm:ss' format.
        // It needs to be 'YYYY-MM-DD HH:mm:ss' for new Date() to parse it correctly.
        const formattedDateTime = dateTime.substring(0, 10).replace(/:/g, '-') + dateTime.substring(10);
        const date = new Date(formattedDateTime);
        
        if (!isNaN(date)) {
          const year = date.getFullYear();
          const month = date.getMonth(); // 0-indexed
          
          if (!acc[year]) {
            acc[year] = {};
          }
          if (!acc[year][month]) {
            acc[year][month] = [];
          }
          acc[year][month].push(photo);
        }
      }
      return acc;
    }, {});

    console.log("RECEIVED PHOTOS: ", data);
    return grouped
  }
})

</script>



