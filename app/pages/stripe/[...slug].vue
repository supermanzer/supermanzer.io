<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h3">Stripe - {{ example.title }}</v-card-title>
            <v-card-subtitle>
                <v-row justify="space-around" class="my-4">
                    {{ example.description }}
                    <StripeDocsLink :url="example.meta.documentation_url" />
                </v-row>
            </v-card-subtitle>
            <v-card-text>
                <component :is="component" />
                <ContentRenderer :value="example" />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { StripePaymentElementBasic } from '#components';

const route = useRoute();
const { data: example } = await useAsyncData('stripe', () =>
  queryCollection("stripe").path(route.path).first()
)
const component = computed(() => {
    return components[route.params.slug[0]]
})
const components = {
    payment_element: StripePaymentElementBasic,
}
</script>
