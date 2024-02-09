<script lang="ts" setup>
import {ref} from 'vue'
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";

const appStore = useAppStore()

const {tooltipDialogInput} = storeToRefs(appStore)
const newTooltip = ref('')
const addNewNode = () => {
  appStore.addNode(newTooltip)
  appStore.toggleTooltip()
  newTooltip.value = ''

}
</script>
<template>
  <v-row justify="center">
    <v-dialog
      v-model="tooltipDialogInput"
      persistent
      width="1024"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">New Node</span>
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
                  v-model="newTooltip"
                  label="Node tooltip"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="addNewNode"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
