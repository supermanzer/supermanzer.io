<script setup lang="js">

const props = defineProps({
    posts: {type: Array, required: false, default: () => []},
    direction: {type: String, required: false, default: 'vertical'},
    align: {type: String, required: false, default: 'start'},
    justify: {type: String, required: false, default: "auto"},

})
</script>

<template>
    <v-timeline :direction="direction" :align="align" side="end" :justify="justify" line-thickness="2" line-color="#aeaeae">
        <v-timeline-item v-for="post in posts" :key="post.id">
            <template v-slot:opposite>
                {{ dateFormat(post.created_at) }}
            </template>
            <template v-slot:icon>
                <v-avatar :image="post.meta.img"></v-avatar>
            </template>
            <v-list-item :to="post.stem">
                <v-list-item-title>
                    {{ post.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ post.description }}
                </v-list-item-subtitle>
            </v-list-item>
        </v-timeline-item>
    </v-timeline>
</template>