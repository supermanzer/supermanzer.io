<template>
    <v-card>
        <v-alert v-model="data.alert.show" :type="data.alert.type" :text="data.alert.text" closable />
        <v-card-text>
            <div id="payment" class="my-8"></div>
        </v-card-text>
        <v-card-actions>
            <v-row class="my-5" justify="space-around">
                <v-btn 
                  class="light-blue-accent-4"
                  @click="loadElement"
                  text="Load Element"
                  :disabled="data.clientSecret == null"
                />
                <v-btn 
                  class="green-accent-4"
                  @click="confirmIntent"
                  text="Confirm Intent"
                  :disabled="data.isComplete == false"
                />
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="js">

const {$stripe} = useNuxtApp();

const data = reactive({
    elements: null,
    paymentElement: null,
    clientSecret: null,
    isComplete: false,
    alert: {
        type: 'error',
        show: false,
        text: ''
    }
})

const paymentData = {
    amount: 1099,
    currency: 'usd'
}

onMounted( async() => {
    loadElement()
});

const loadElement = async () => {
     const {clientSecret} = await $fetch("/api/payment_intent", {
        method: "POST",
        body: paymentData
    });
    if (clientSecret !== null) {
        data.elements = $stripe.elements({
            clientSecret: clientSecret
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
}
</script>