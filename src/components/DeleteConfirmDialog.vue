<script lang="ts" setup>

import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";

const appStore = useAppStore()
const {deleteGraphDialog} = storeToRefs(appStore)
const route = useRoute()
const router = useRouter()

const deleteGraph = () => {
  appStore.deleteGraph(route.params['Id'])
  router.push({path: '/graphs'})
}
</script>
<template>
  <v-row justify="center">
    <v-dialog
      v-model="deleteGraphDialog"
      persistent
      width="auto"
    >

      <v-card>
        <v-card-title class="text-h5">
          Delete graph?
        </v-card-title>
        <v-card-text>This action is irreversible
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="appStore.toggleDeleteGraphDialog"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="deleteGraph"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
