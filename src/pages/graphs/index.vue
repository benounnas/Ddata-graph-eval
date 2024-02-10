<script lang="ts" setup>

import router from "@/router";
import {onMounted} from "vue";
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";
import GraphNewDialog from "@/components/GraphNewDialog.vue";

const goToGraph = (id: any) => {
  router.push({path: 'graphs/' + id})
}
const appStore = useAppStore()
const {graphs} = storeToRefs(appStore)


onMounted(() => {
  appStore.getGraphs()
})
</script>


<template>
  <div class="ma-5 ">
    <GraphNewDialog/>
    <v-autocomplete
      :items="[]"
      auto-select-first
      class="flex-full-width mt-5"
      density="comfortable"
      hide-no-data
      item-props
      menu-icon=""
      placeholder="Search for graph"
      prepend-inner-icon="mdi-magnify"
      rounded
      theme="light"
      variant="solo"
      @update:search="(val) => debouncedHandleSearch(val)"
    ></v-autocomplete>

    <v-btn

      class="ma-2"
      prepend-icon="mdi-plus"
      @click="appStore.toggleNewGraphDialog"
    >


      Add graph


    </v-btn>

    <v-container fluid>
      <v-row>
        <v-col
          v-for="graph in graphs"
          :key="graph.id"
          cols="2"
        >
          <v-card @click="goToGraph(graph.id)">
            {{ graph.name }}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

