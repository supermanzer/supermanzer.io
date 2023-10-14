<script setup></script>

<template>
  <v-container class="fill-height">
    <v-row justify="space-around" class="mt-12">
      <v-card>
        <v-img
          src="https://images.pexels.com/photos/3747150/pexels-photo-3747150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          cover
          class="d-flex align-end text-white"
          height="200"
        >
          <v-card-title>Hello</v-card-title>
        </v-img>
        <v-divider class="my-4"></v-divider>
        <v-card-text>
          <p class="text-h2">Hi, I'm Ryan Manzer.</p>
          <p class="text-h4">Pythonista, Djangonaut, and general dork.</p>
          <v-divider class="my-4"></v-divider>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="my-10">
      <p class="text-h3">About Me</p>
      <section class="my-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime qui modi
        eius totam consequatur blanditiis perferendis hic iste autem ducimus?
        Autem dolorem neque rerum ea tempora alias nihil libero voluptates.
      </section>
    </v-row>
    <v-row>
      <ContentDoc />
    </v-row>
  </v-container>
</template>
