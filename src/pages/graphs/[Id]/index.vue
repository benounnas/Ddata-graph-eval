<script lang="ts" setup>
import TootipGraph from "@/components/TootipGraph.vue";
import {useRoute, useRouter} from "vue-router";
import {useAppStore} from "@/store/app";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import {storeToRefs} from "pinia";

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const {oneGraph} = storeToRefs(appStore)

</script>

<template>
  <v-container>
    <DeleteConfirmDialog/>
    <v-row>
      <v-col cols="12"
             md="3">
        <v-btn

          class="ma-2"
          prepend-icon="mdi-chart-timeline-variant-shimmer"
          @click="router.push({path: '/graphs/' + route.params['Id'] + '/edit'})"
        >


          Edit Graph


        </v-btn>
        <v-btn

          class="ma-2"
          color="red"
          prepend-icon="mdi-trash-can"
          @click="appStore.toggleDeleteGraphDialog"
        >


          Delete Graph


        </v-btn>
      </v-col>
    </v-row>
    <v-row class="h-screen">

      <v-col
        cols="12"
        md="4"
      >
        <h4>{{ oneGraph?.name }}</h4>
        <p>
          {{ oneGraph?.description }}
        </p>
      </v-col>

      <v-col
        cols="12"
        md="8"
      >
        <v-card class="h-100" color="white">
          <!--          <GraphDetail/>-->

          <TootipGraph/>
        </v-card>

      </v-col>


    </v-row>
  </v-container>
</template>


