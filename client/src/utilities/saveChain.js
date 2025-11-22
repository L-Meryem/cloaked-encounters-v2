const saveChain = async (chainName, nodes, edges) => {
  try {
    //no source
    const startNode = nodes.find(node =>
      edges.filter(edge => edge.target === node.id).length === 0);

    const orderedTablesById = [];
    let currentNode = startNode;

    while (currentNode) {
      orderedTablesById.push(currentNode.data._id);
      const nextEdge = edges.find(edge => edge.source === currentNode.id);
      currentNode = nextEdge ? nodes.find(node => node.id === nextEdge.target) : null;
    }

    //flow stores a lot of extra data
    const justNodes = nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
      width: node.width,
      height: node.height
    }));
    const justEdges = edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      label: edge.label
    }));

     const payload = {
      name: chainName,
      tables: orderedTablesById,
      flowData: {
        nodes: justNodes,
        edges: justEdges
      }
    };

    const saveToBb = await fetch("/api/chains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: chainName,
        tables: orderedTablesById,
        flowData: {
          nodes: justNodes,
          edges: justEdges
        }
      })
    });

    const isSaved = await saveToBb.json();
    console.log("Chain saved!", isSaved);
  } catch (error) {
    console.log("Failed to save the chain", error);
  }
};

export default saveChain;