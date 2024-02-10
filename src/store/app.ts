// Utilities
import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import {Nodes, Edges, Layouts} from "v-network-graph"
import * as vNG from "v-network-graph"
import {useStorage} from '@vueuse/core'

export const useAppStore = defineStore('app', () => {

  const tooltipDialogInput = ref(false)

  function toggleTooltip() {
    tooltipDialogInput.value = !tooltipDialogInput.value
  }

  const nodes = ref<Nodes>({})
  const edges = ref<Edges>({})

  const layouts = ref<Layouts>({
    nodes: {}
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
    const nodeId = Math.random().toString(36).substring(2, 7);
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
    resetSelectedNodes()
  }

  function removeEdge() {
    for (const edgeId of selectedEdges.value) {
      delete edges.value[edgeId]
    }
  }

  function saveNodesToGraph(graphId: string) {
    const graphData = {
      id: graphId,
      nodes: nodes.value,
      edges: edges.value,
      layouts: layouts.value
    };

    let previousData = JSON.parse(localStorage.getItem('graphs'));

    if (!Array.isArray(previousData)) {
      previousData = [];
    }

    previousData.push(graphData);
    localStorage.setItem('graphs', JSON.stringify(previousData));

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
    resetSelectedEdges,
    saveNodesToGraph
  }
})
