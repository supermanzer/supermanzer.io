---
title: Payment Element
description: A basic integration using the Stripe Payment ELement
documentation_url: https://docs.stripe.com/payments/payment-element
---

## Introduction
The Payment Element is the most flexible Stripe element for accepting payments. It can present multiple payment methods in a single UI component, adapting dynamically based on your customer's location and device. This makes it easy to offer a seamless checkout experience while supporting a wide range of payment options.

There are many ways. you can configure a Payment Element but, for this post, we will focus on a basic integration.

## Code

For HTML, we just need an element we can tell Stripe.js to mount the Payment Element to.  

### HTML
```html
<div id=payment></div>
```


### JavaScript - Plugin
Since I am building this site using [Nuxt 3](https://nuxt.com), I provide an instantiated instance of [Stripe.js](https://docs.stripe.com/js) using a [Nuxt Plugin](https://nuxt.com/docs/guide/directory-structure/plugins).

```javascript
// stripe.client.js - Nuxt plugin
export default defineNuxtPlugin((nuxtApp) => {
    const PK = 'STRIPE_PUBLIC_KEY'
    const stripe = window.Stripe(PK)
    nuxtApp.provide('stripe', stripe)
})
```

### JavaScript - Client

In the Nuxt page itself, I use the following code to 

```javascript
// PaymentElement/basic.vue component
const {$stripe} = useNuxtApp(); // accessing the Stripe.js instance in my component

// Creating a reactive data object to store the Stripe elements we create and client secret we will use to confirm the payment
const data = reactive({
    elements: null,
    paymentElement: null,
    clientSecret: null
});  

// Defining the data used to create the Payment Intent
const paymentData = {
    amount: 1099,
    currency: 'usd'
}

// A function to load the Element
const loadElement = () => {
    if (data.clientSecret !== null) {
        data.elements = $stripe.elements({
            clientSecret: data.clientSecret
        });
        data.paymentElement = data.elements.create('payment');
        data.paymentElement.on('change', (ev) => {
            console.log(ev);
            if (ev.complete) {
                data.isComplete = true
            }            
        })
        data.paymentElement.mount('#payment');    
    } else {
        data.alert.text="A client secret is needed before we attempt to load the Payment Element"
        data.alert.show = true
    }
    
}
const getClientSecret = async () => {
    const {clientSecret} = await $fetch("/api/payment_intent", {
        method: "POST",
        body: paymentData
    });
    data.clientSecret = clientSecret
} 

const confirmIntent = async() => {
    const url = `${window.location.origin}/stripe/success`;

    const {error} = $stripe.confirmPayment({
        elements: data.elements,
        confirmParams: {
            return_url: url
        }
    });
    if (error) {
        data.alert.text = error.message + "\n" + error.code
        data.alert.show = true
    }

```

## Node.js - Server Side

```javascript
const body = await readBody(event);

const intent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: body.currency
});
return { clientSecret: intent.client_secret }
```