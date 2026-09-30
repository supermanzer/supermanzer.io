<template>
    <v-card v-if="activity" class="mt-6" variant="tonal">
        <v-card-title class="text-h6">Recent activity</v-card-title>
        <v-card-subtitle>
            {{ activity.totalCommits }} commits · {{ activity.commitsLast90Days }} in the last 90 days ·
            last commit {{ activity.lastCommit }}
            <span v-if="activity.latestTag"> · {{ activity.latestTag }}</span>
        </v-card-subtitle>
        <v-list density="compact" bg-color="transparent">
            <v-list-item v-for="c in activity.recent" :key="c.sha" :title="c.subject" :subtitle="c.date" />
        </v-list>
        <v-card-text class="text-caption">
            Generated from git history on {{ activity.generatedAt }}.
        </v-card-text>
    </v-card>
</template>

<script setup lang="js">
// Display only: the page fetches (page setup runs during SSR; see projects/[...slug].vue).
defineProps({
    activity: { type: Object, default: null }
})
</script>
