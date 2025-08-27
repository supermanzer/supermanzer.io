<script setup lang="js">
const props = defineProps({
    posts: {type: Array, required: false, default: () => []},
    direction: {type: String, required: false, default: 'vertical'},
    align: {type: String, required: false, default: 'start'},
    justify: {type: String, required: false, default: "auto"},
    style: {type: String, required: false, default: 'list'},

})
</script>

<template>
    <v-timeline 
      :direction="direction" 
      :align="align"
      side="end" 
      :justify="justify" 
      line-thickness="2" 
      line-color="#aeaeae" 
      class="w-100"
    >
        <v-timeline-item v-for="post in posts" :key="post.id" class="w-100" dot-color="white">
                <template v-slot:icon>
                    <v-avatar :image="post.meta.img"></v-avatar>
                </template>
                <v-card>
                    <v-list-item :to="post.stem">
                        <v-list-item-title>
                            {{ post.title }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ post.description }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-2 text-overline font-weight-bold">
                            Created: {{ dateFormat(post.created_at) }}
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-card>
        </v-timeline-item>
    </v-timeline>
</template>