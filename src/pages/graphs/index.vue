<script lang="ts" setup>

import router from "@/router";
import {onMounted} from "vue";
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";
import GraphNewDialog from "@/components/GraphNewDialog.vue";
import GraphsList from "@/components/GraphsList.vue";

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
  <div class="ma-5 mt-5">
    <GraphNewDialog/>


    <v-btn

      class="ma-5"
      prepend-icon="mdi-plus"
      @click="appStore.toggleNewGraphDialog"
    >


      Add graph


    </v-btn>

    <v-container fluid>
      <v-row>
        <v-col
          cols="8"
        >
          <GraphsList :graphs="graphs"/>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

