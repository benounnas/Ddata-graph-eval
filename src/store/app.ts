// Utilities
import {defineStore} from 'pinia'
import {ref, reactive} from 'vue'
import {Nodes, Edges, Layouts} from "v-network-graph"
import * as vNG from "v-network-graph"
import {Graph} from "@/types/graph";

export const useAppStore = defineStore('app', () => {

  const oneGraph = ref<Graph>()
  const graphs = ref<any[]>();
  const tooltipDialogInput = ref(false)
  const deleteGraphDialog = ref(false)
  const newGraphDialog = ref(false)

  function toggleTooltip() {
    tooltipDialogInput.value = !tooltipDialogInput.value
  }

  function toggleDeleteGraphDialog() {
    deleteGraphDialog.value = !deleteGraphDialog.value
  }

  function toggleNewGraphDialog() {
    newGraphDialog.value = !newGraphDialog.value
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

  function addNode(tooltip: string = '', name: string = '') {
    const nodeId = Math.random().toString(36).substring(2);
    nodes.value[nodeId] = {name: name, tooltip: tooltip};

    console.log(nodes.value)
    console.log(nodeId)
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
    const graphData: Graph = {
      id: graphId,
      nodes: nodes.value,
      edges: edges.value,
      layouts: layouts.value
    };

    let previousData = JSON.parse(localStorage.getItem('graphs'));

    if (!Array.isArray(previousData)) {
      previousData = [];
    }

    const index = previousData.findIndex(graph => graph.id === graphId);

    if (index !== -1) {
      previousData[index] = {
        ...previousData[index],
        nodes: graphData.nodes,
        edges: graphData.edges,
        layouts: graphData.layouts
      };
    } else {
      previousData.push(graphData);
    }

    localStorage.setItem('graphs', JSON.stringify(previousData));
  }

  function getOneGraphData(graphID: string) {
    const currentGraphData: any[] = JSON.parse(localStorage.getItem('graphs'))
    const data: Graph = currentGraphData.find(el => el.id == graphID)


    if (data) {
      oneGraph.value = data
      nodes.value = data.nodes ? data.nodes : nodes.value
      edges.value = data.edges ? data.edges : edges.value
      layouts.value = data.layouts ? data.layouts : layouts.value
    }
  }

  function deleteGraph(graphId: string) {
    // Retrieve the current graph data from local storage
    const currentGraphData: any[] = JSON.parse(localStorage.getItem('graphs'));

    // If there's no data or it's not an array, there's nothing to delete
    if (!Array.isArray(currentGraphData)) {
      return;
    }

    // Find the index of the graph with the matching id
    const index = currentGraphData.findIndex(el => el.id === graphId);

    // If the graph with the matching id exists, remove it
    if (index !== -1) {
      currentGraphData.splice(index, 1); // Remove the element at the found index
      localStorage.setItem('graphs', JSON.stringify(currentGraphData)); // Save the updated data back to local storage
    }

    toggleDeleteGraphDialog()
  }

  function getGraphs() {
    graphs.value = JSON.parse(localStorage.getItem('graphs'))
  }

  function saveGraph(graph: Graph) {

    const previousData: Graph[] = JSON.parse(localStorage.getItem('graphs')) || [];

    const index = previousData.findIndex(g => g.id === graph.id);

    if (index !== -1) {
      previousData[index] = graph;
    } else {
      previousData.push(graph);
    }

    localStorage.setItem('graphs', JSON.stringify(previousData));
    toggleNewGraphDialog()
    getGraphs()
  }

  function getNodes(targetNode: string) {
    const filteredEdges = Object.entries(edges.value)
      .filter(([key, value]) => value.target === targetNode || value.source === targetNode)
      .map(([key, value]) => value.source == targetNode ? value.target : value.source)

    return filteredEdges.map(nodeId => getNodeById(nodes.value, nodeId)).join(', ');
  }

  function getNodeById(nodes, id) {
    return nodes[id].name || null; // Return the node with the specified ID, or null if not found
  }

  return {
    oneGraph,
    graphs,
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
    deleteGraphDialog,
    newGraphDialog,
    toggleTooltip,
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    resetSelectedNodes,
    resetSelectedEdges,
    saveNodesToGraph,
    getOneGraphData,
    toggleDeleteGraphDialog,
    deleteGraph,
    getGraphs,
    toggleNewGraphDialog,
    saveGraph,
    getNodes
  }
})
