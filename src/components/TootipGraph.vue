<script lang="ts" setup>
import {computed, ref, watch, onMounted} from "vue"
import * as vNG from "v-network-graph"
import {useAppStore} from "@/store/app";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";

const appStore = useAppStore()

const {
  nodes,
  edges,
  layouts,
  configs,
  selectedNodes,
  selectedEdges,
  maxSelectedNodes
} = storeToRefs(appStore)

const route = useRoute()
// ref="graph"
const graph = ref<vNG.Instance>()
// ref="tooltip"
const tooltip = ref<HTMLDivElement>()

// positions of the center of nodes

const NODE_RADIUS = 16
const targetNodeId = ref<string>("")
const tooltipOpacity = ref(0) // 0 or 1
const tooltipPos = ref({left: "0px", top: "0px"})

const targetNodePos = computed(() => {
  const nodePos = layouts.value?.nodes?.[targetNodeId.value]
  return nodePos || {x: 0, y: 0}
})

// Update `tooltipPos`
watch(
  () => [targetNodePos.value, tooltipOpacity.value],
  () => {
    if (!graph.value || !tooltip.value) return

    // translate coordinates: SVG -> DOM
    const domPoint = graph.value.translateFromSvgToDomCoordinates(targetNodePos.value)
    // calculates top-left position of the tooltip.
    tooltipPos.value = {
      left: domPoint.x - tooltip.value.offsetWidth / 2 + "px",
      top: domPoint.y - NODE_RADIUS - tooltip.value.offsetHeight - 10 + "px",
    }
  },
  {deep: true}
)

const eventHandlers: vNG.EventHandlers = {
  "node:pointerover": ({node}) => {
    targetNodeId.value = node
    tooltipOpacity.value = 1 // show
  },
  "node:pointerout": _ => {
    tooltipOpacity.value = 0 // hide
  },
  "view:click": () => {
    configs.value.node.selectable = true
    appStore.resetSelectedNodes()
    appStore.resetSelectedEdges()

  },
}

watch(selectedNodes, (v) => {
  if (v.length >= maxSelectedNodes.value) {
    configs.value.node.selectable = false
  }
})
onMounted(() => {
  configs.value.node.selectable = true
  appStore.getOneGraphData(route.params['Id'])
})
</script>

<template>
  <div class="tooltip-wrapper">
    <v-network-graph
      ref="graph"
      v-model:layouts="layouts"
      v-model:selected-edges="selectedEdges"
      v-model:selected-nodes="selectedNodes"
      :configs="configs"
      :edges="edges"
      :event-handlers="eventHandlers"
      :nodes="nodes"
    />
    <!-- Tooltip -->
    <div
      ref="tooltip"
      :style="{ ...tooltipPos, opacity: tooltipOpacity }"
      class="tooltip"
    >
      <div v-if="nodes">{{ nodes[targetNodeId]?.tooltip ?? "" }}</div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.tooltip-wrapper {
  position: relative;
  height: 100% !important;
}

.tooltip {
  top: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  width: 80px;
  height: 36px;
  display: grid;
  place-content: center;
  text-align: center;
  font-size: 12px;
  background-color: #fff0bd;
  border: 1px solid #ffb950;
  box-shadow: 2px 2px 2px #aaa;
  transition: opacity 0.2s linear;
  pointer-events: none;
}
</style>
