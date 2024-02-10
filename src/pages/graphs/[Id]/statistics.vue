<script lang="ts" setup>
import TootipGraph from "@/components/TootipGraph.vue";
import {useRoute, useRouter} from "vue-router";
import {useAppStore} from "@/store/app";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import {storeToRefs} from "pinia";
import GraphTable from "@/components/GraphTable.vue";
import {onMounted} from "vue";

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const {oneGraph} = storeToRefs(appStore)

onMounted(() => {
  appStore.getOneGraphData(route.params['Id'])
})
</script>

<template>
  <v-container>

    <v-row class="h-screen">

      <v-col
        cols="3"
        md="3"
      >
        <h4>{{ oneGraph?.name }}</h4>

      </v-col>

      <v-col
        cols="9"
        md="9"
      >
        <GraphTable/>


      </v-col>


    </v-row>
  </v-container>
</template>


