// Utilities
import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import {Nodes, Edges, Layouts} from "v-network-graph"
import * as vNG from "v-network-graph"

export const useAppStore = defineStore('app', () => {

  const tooltipDialogInput = ref(false)

  function toggleTooltip() {
    tooltipDialogInput.value = !tooltipDialogInput.value
  }

  const nodes = ref<Nodes>({
    "1": {name: "Node 1", tooltip: 'Node 1'},
    "2": {name: "Node 2", tooltip: 'Node 2'},
    "3": {name: "Node 3", tooltip: 'changed 3'},
  })
  const edges = ref<Edges>({
    "1": {source: "1", target: "2"},
    "2": {source: "2", target: "3"},
  })

  const layouts = ref<Layouts>({
    nodes: {
      "1": {x: 50, y: 0},
      "2": {x: 0, y: 75},
      "3": {x: 100, y: 75},
    },
  })

  const configs = reactive(vNG.getFullConfigs())


  const nextNodeIndex = ref(Object.keys(nodes.value).length + 1)
  const nextEdgeIndex = ref(Object.keys(edges.value).length + 1)

  const selectedNodes = ref<string[]>([])
  const selectedEdges = ref<string[]>([])
  const maxSelectedNodes = ref(2)

  function resetSelectedNodes() {
    selectedNodes.value = []
  }

  function resetSelectedEdges() {
    selectedEdges.value = []
  }

  function addNode(tooltip: string = '') {
    const nodeId = nextNodeIndex.value;
    const name = `Node ${nextNodeIndex.value}`;
    nodes.value[nodeId] = {name: name, tooltip: tooltip};
    nextNodeIndex.value++;
  }

  function removeNode() {
    for (const nodeId of selectedNodes.value) {
      delete nodes.value[nodeId]
    }
  }

  function addEdge() {
    if (selectedNodes.value.length !== 2) return
    const [source, target] = selectedNodes.value
    const edgeId = `edge${nextEdgeIndex.value}`
    edges.value[edgeId] = {source, target}
    nextEdgeIndex.value++
    configs.node.selectable = true

  }

  function removeEdge() {
    for (const edgeId of selectedEdges.value) {
      delete edges.value[edgeId]
    }
  }


  return {
    nodes,
    edges,
    layouts,
    configs,
    nextNodeIndex,
    nextEdgeIndex,
    selectedNodes,
    selectedEdges,
    maxSelectedNodes,
    tooltipDialogInput,
    toggleTooltip,
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    resetSelectedNodes,
    resetSelectedEdges
  }
})
