/**
 * utils/stripe.ts
 * Defines a method for instantiating a Stripe Node client using stored API key and version.
 */

import Stripe from 'stripe'

const runtimeConfig = useRuntimeConfig()
export const useStripe = () => {
    return new Stripe(
        runtimeConfig.stripeSK,
        {
            apiVersion: runtimeConfig.stripeApiVersion,
            typescript: true,
            appInfo: {
                name: 'Supermanzer',
                version: '0.1.0',
                url: 'https://supermanzer.io'
            }
        }
    )
}