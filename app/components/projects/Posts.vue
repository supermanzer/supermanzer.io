<template>
    <v-card hover>
        <v-card-title class="text-h6 text-wrap">Posts about this project</v-card-title>
        <v-divider />
        <v-list nav>
            <v-list-item v-for="post in posts" :key="post.path" :to="post.path">
                <!-- Column is narrow: let titles wrap instead of truncating -->
                <v-list-item-title class="text-wrap">{{ post.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ dateFormat(post.created_at) }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script setup lang="js">
// Display only: the page fetches (see projects/[...slug].vue) so the data is in the SSR payload.
defineProps({
    posts: { type: Array, default: () => [] }
})
</script>
