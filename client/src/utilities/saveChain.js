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

      const saveToBb = await fetch("/api/chains", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: chainName,
          tables: orderedTablesById
        })
      });

      const isSaved = await saveToBb.json();
      console.log("Chain saved!", isSaved);
    } catch (error) {
      console.log("Failed to save the chain", error);
    }
  };

  export default saveChain;