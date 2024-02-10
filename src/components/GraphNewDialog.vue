<script lang="ts" setup>
import {ref, toRaw, watch} from 'vue'
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";
import {Graph} from "@/types/graph";
import {Edges, Layouts, Nodes} from "v-network-graph";

const appStore = useAppStore()

const {newGraphDialog} = storeToRefs(appStore)

const createInitialFormData = (): Graph => {
  return {
    id: Math.random().toString(36).substring(2),
    name: '',
    description: '',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    nodes: {} as Nodes,
    edges: {} as Edges,
    layouts: {} as Layouts
  };
}

const form = ref<Graph>(createInitialFormData())

const addNewGraph = () => {
  appStore.saveGraph(toRaw(form.value))
}
watch(newGraphDialog, (v) => {
  form.value = {...createInitialFormData()}
})
</script>
<template>
  <v-row justify="center">
    <v-dialog
      v-model="newGraphDialog"
      persistent
      width="1024"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">New Graph</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="12"
                sm="12"
              >
                <v-textarea
                  v-model="form.description"
                  label="Description"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="addNewGraph"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
