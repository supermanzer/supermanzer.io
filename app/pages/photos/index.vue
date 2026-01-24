<template>
  <v-container fluid class="mx-4 " height="100%">

    <v-row class="mx-16 mb-2">
      <v-col>
        <p class="text-h4 d-flex justify-space-between">
          My Photo Gallery 

  
        </p>
        
        
      </v-col>
    </v-row>
    <div v-for="year in Object.keys(photos || {}).sort((a, b) => b - a)" :key="year">
      <v-row class="mx-16 my-2">
        <v-col cols="12">
          <p class="text-h5">{{ year }}</p>
          <div v-for="month in Object.keys(photos[year]).sort((a, b) => b - a)" :key="month" class="mt-4">
           
            <p class="text-h6 ml-4">{{ getMonthName(month) }}</p>
             <v-divider class="my-2"></v-divider>
            <v-row class="">
              <v-col cols="12" sm="6" md="4" lg="3" v-for="photo in photos[year][month]" :key="photo.id" class="mx-2">
                <!-- <PhotosPhotoCard :photo="photo" />  -->
                 <PhotosThumbnail :photo="photo" />
                
              </v-col>
            </v-row>
            
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-4" :thickness="4"></v-divider>
    </div>
  </v-container>
</template>

<script setup>

definePageMeta({
  layout: "photos",
})

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



