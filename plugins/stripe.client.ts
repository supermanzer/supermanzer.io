/**
 * plugins/stripe.client.ts
 * Defines a method for instantiating a StripeJS client using stored public API key.
 */

// Type declaration for the Stripe global
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Stripe: any;
  }
}

// const runtimeConfig = useRuntimeConfig()
export default defineNuxtPlugin((nuxtApp) => {
    const PK = 'pk_test_51JticYIlCeH6bP8REulC9GlUO09hWuGsCljwJ3VNWhqqLmTTW0CedWXOoABWyXkplmqMtwfA4SiXkdeqCMvesIii00BCpJb9Vb'
    const stripe = window.Stripe(PK)
    nuxtApp.provide('stripe', stripe)
})