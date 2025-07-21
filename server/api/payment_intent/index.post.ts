import Stripe from "stripe";
const stripe = useStripe();  // Server utility to return instantiated stripe-node instance



export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const intent = await stripe.paymentIntents.create({
        amount: body.amount,
        currency: body.currency
    });
    return { clientSecret: intent.client_secret }
});