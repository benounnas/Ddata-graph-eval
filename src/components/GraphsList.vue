<script lang="ts" setup>
import {Graph} from "@/types/graph";
import {useRouter} from "vue-router";

defineProps<{
  graphs?: Graph[]
}>()

const router = useRouter()
</script>

<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Name
      </th>
      <th class="text-left">
        Description
      </th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="graph in graphs"
      :key="graph.id"
    >
      <td>{{ graph.name }}</td>
      <td>{{ graph.description }}</td>
      <td>

        <v-tooltip text="View graph">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-eye-outline" size="sm" v-bind="props" variant="text"
                   @click="router.push({path: '/graphs/' + graph.id })"
            ></v-btn>

          </template>
        </v-tooltip>
      </td>
    </tr>
    </tbody>
  </v-table>

</template>
