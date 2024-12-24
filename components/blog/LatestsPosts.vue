<template>
    <div class="pa-6 right-0">
        <p class="text-h4" :class="{'text-white': dark}">Latest Posts</p>
        <v-row justify="center" class="mt-2">
            <v-col
            cols="12"
            sm="12"
            md="6"
            lg="3"
            v-if="posts.length > 0"
            v-for="post in posts"
            :key="post._id">
                <BlogPostCard
                :post="post"
                class="my-4"
                />
            </v-col>
        </v-row>
    </div>
</template>


<script setup>
const props = defineProps({
    dark: Boolean
})

const { data: posts } = await useAsyncData("latest-posts", () =>
  queryContent("blog").where({title:{$ne: 'Blog'}}).sort({created: -1, $numeric: true}).limit(4).find()
)
</script>