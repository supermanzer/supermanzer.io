<template>
    <div class="pa-6 right-0" v-if="posts.length > 0">
        <p class="text-h4" :class="{'text-white': dark}">Latest Posts</p>
        <v-row justify="center" class="mt-2">
            <v-col
             v-for="post in posts"
            :key="post._id"
            cols="12"
            sm="12"
            md="6"
            lg="3"
            >
                <BlogPostCard
                :post="post"
                class="my-4"
                />
            </v-col>
        </v-row>
    </div>
</template>


<script setup>
defineProps({
    dark: Boolean
})

const { data: posts } = await useAsyncData("blog", () =>
  queryCollection("blog")
  .order('created_at', 'DESC')
  .limit(4)
  .all()
)
</script>