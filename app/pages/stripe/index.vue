<script setup>
import { ContentRenderer } from '#components';

const route = useRoute();
const { data: integrations } = await useAsyncData('stripe', () =>
  queryCollection("stripe").where("title", "<>", "Stripe").all()
)

const title = "Stripe Integrations"
const subtitle = "Code examples of implementing different Stripe products and functionalities"
</script>

<template>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" class="mx-8">
          <PageHeader :title="title" :subtitle="subtitle" />
        </v-col>
      </v-row>  
      <v-row class="my-4">
        <ComingSoon />
      </v-row>
    </v-container>
</template>



