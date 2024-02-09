<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-card text="it works"></v-card>
      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-card text="it works"></v-card>

      </v-col>


    </v-row>
  </v-container>
</template>

<script setup>
const links = [
  'Dashboard',
  'Messages',
  'Profile',
  'Updates',
]
</script>

<script>
export default {
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
}
</script>
