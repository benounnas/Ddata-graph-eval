<script lang="ts" setup>
import {ref} from 'vue'
import {useDebounceFn} from '@vueuse/core'


const drawer = ref(null)
const links = [
  {
    name: 'Graphs',
    icon: 'mdi-graph-outline',
    to: '/graphs'
  }
]


const handleSearch = (x: any) => {

  console.log(x) // 'response'
}
const debouncedHandleSearch = useDebounceFn((val) => {
  handleSearch(val);
}, 1000)

</script>

<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer">
      <v-sheet
        class="pa-4"
        color="grey-lighten-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>

        <div>BENOUNNAS Oussama</div>
      </v-sheet>

      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.icon"
          :prepend-icon="link.icon"
          :title="link.name"
          :to="link.to"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Didata graph</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView/>
    </v-main>
  </v-app>
</template>

