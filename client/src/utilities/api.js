const saveTableNameToDB = async (tableId, newName) => {
    try {
        const saveToBb = await fetch(`/api/tables/${tableId}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newName
            })
        });
        return saveToBb;
    } catch (error) {
        console.log(error);
    }
}

const saveRowChangesToDb = async (table, row) => {
    try {
        const saveToBb = await fetch(`/api/tables/${table._id}/rows/${row._id}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roll: row.roll,
                entry: row.entry
            })
        });
        return saveToBb;
    } catch (error) {
        console.log(error);
    }
};

const saveNewTableToDb = async table => {
    try {
        const saveToBb = await fetch(`/api/tables`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: table.name,
                die: table.die,
                entries: table.entries.map(entry => ({
                    roll: entry.roll,
                    entry: entry.entry
                }))
            })
        });
        return saveToBb;
    } catch (error) {
        console.log(error);
    }
};

const toggleShareTable = async (tableId, shared) => {
    try {
        const res = await fetch(`/api/tables/${tableId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shared: shared ? false : true
            })
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

const saveChain = async (chainName, nodes, edges, chainId = null) => {
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
            data: { // only store ids
                _id: node.data._id,
                tableId: node.data._id
            },
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

        let method = "POST";
        let url = "/api/chains";
        //check if chain already exists
        if (chainId && chainId !== null) {
            const check = await fetch(`/api/chains/${chainId}`, {
                credentials: 'include'
            });



            if (check.ok) {
                method = "PUT";
                url = `/api/chains/${chainId}`;
            }
        }

        const saveToBb = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
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
        return isSaved;
    } catch (error) {
        console.log("Failed to save the chain", error);
    }
};

const deleteChain = async chainId => {
    try {
        const res = await fetch(`/api/chains/${chainId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        return res;
    } catch (error) {
        console.log(error);
    }

};

export { saveRowChangesToDb, saveTableNameToDB, saveNewTableToDb, toggleShareTable, saveChain, deleteChain };