<script lang="ts" setup>

import router from "@/router";

const goToGraph = (id: any) => {
  router.push({path: 'graphs/' + id})
}

</script>


<template>
  <div class="ma-5">
    <v-autocomplete
      :items="[]"
      auto-select-first
      class="flex-full-width"
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


    <v-container fluid>
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="2"
        >

          <v-card text="it works" @click="goToGraph(1)"></v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

