<script lang="ts" setup>
import {ref, onMounted, toRaw} from 'vue'
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";


const appStore = useAppStore()

const {nodes, oneGraph} = storeToRefs(appStore)


onMounted(() => {
  appStore.getOneGraphData()
})


</script>
<template>
  {{ oneGraph?.name }}
  {{ oneGraph?.description }}

  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Node ID
      </th>
      <th class="text-left">
        Node tooltip
      </th>
      <th class="text-left">
        Node neighbors
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="(node, key) in nodes"
      :key="key"
    >
      <td>{{ node.name }}</td>
      <td>{{ node.tooltip }}</td>
      <td> {{
          appStore.getNodes(key)

        }}
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
