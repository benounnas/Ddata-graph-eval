<script lang="ts" setup>
import {useAppStore} from "@/store/app";
import TootipGraph from "@/components/TootipGraph.vue";
import TooltipInputDialog from "@/components/TooltipInputDialog.vue";
import {useRoute} from "vue-router";

const appStore = useAppStore()
const route = useRoute()

</script>

<template>
  <v-container>
    <TooltipInputDialog/>
    <v-row class="h-screen">
      <v-col
        cols="12"
        md="3"
      >

        <v-btn

          class="ma-2"
          color="green"
          prepend-icon="mdi-content-save-outline"
          @click="appStore.saveNodesToGraph(route.params['Id'])"
        >


          Save changes


        </v-btn>
        <v-btn

          class="ma-2"
          prepend-icon="mdi-plus"
          @click="appStore.toggleTooltip"
        >


          Add node


        </v-btn>
        <v-btn

          :disabled="appStore.selectedNodes.length < 2"
          class="ma-2"
          prepend-icon="mdi-plus"
          @click="appStore.addEdge"
        >


          Add edge


        </v-btn>
        <v-btn

          class="ma-2"
          color="orange"
          prepend-icon="mdi-minus"
          @click="appStore.removeNode"
        >

          Delete node

        </v-btn>
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


