/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'

import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"

// Components
import App from './App.vue'

// Composables
import {createApp} from 'vue'

const app = createApp(App)

registerPlugins(app)

app
  .use(VNetworkGraph)
  .mount('#app')
