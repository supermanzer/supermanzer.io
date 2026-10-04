<template>
    <div v-if="groups && groups.length">
        <v-card v-for="group in groups" :key="group.slug" class="mt-4">
            <v-list-item>
                <v-list-item-title class="font-weight-medium text-wrap">
                    More posts about
                    <NuxtLink :to="group.project.path">{{ group.project.title }}</NuxtLink>
                </v-list-item-title>
            </v-list-item>
            <v-divider/>
            <v-list v-if="group.posts.length" nav>
                <v-list-item
                    v-for="post in group.posts"
                    :key="post.path"
                    :to="post.path"
                    variant="plain"
                >
                    <!-- Sidebar is narrow: let titles wrap instead of truncating -->
                    <v-list-item-title class="text-wrap">{{ post.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ dateFormat(post.created_at) }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <v-card-text v-else class="text-body-2 text-medium-emphasis">
                This is the only post about this project so far.
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="js">
// Display only: the page fetches (see blog/[...slug].vue) so the data is in the SSR payload.
defineProps({
    groups: { type: Array, default: () => [] }
})
</script>
