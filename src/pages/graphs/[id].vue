<script lang="ts" setup>
import GraphDetail from "../../components/GraphDetail";
import {useAppStore} from "@/store/app";
import TootipGraph from "@/components/TootipGraph.vue";
import {useRoute, useRouter} from "vue-router";

const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12"
             md="3">
        <v-btn

          class="ma-2"
          prepend-icon="mdi-chart-timeline-variant-shimmer"
          @click="router.push({path: '/graphs/' + route.params['id'] + '/edit'})"
        >


          Edit Graph


        </v-btn>
      </v-col>
    </v-row>
    <v-row class="h-screen">
      <v-col
        cols="12"
        md="3"
      >


      </v-col>

      <v-col
        cols="12"
        md="9"
      >
        <v-card class="h-75" color="white">
          <!--          <GraphDetail/>-->

          <TootipGraph/>
        </v-card>

      </v-col>


    </v-row>
  </v-container>
</template>


