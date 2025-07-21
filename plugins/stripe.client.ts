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


export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const PK = runtimeConfig.public.stripePK
  const stripe = window.Stripe(PK)
  nuxtApp.provide('stripe', stripe)
})