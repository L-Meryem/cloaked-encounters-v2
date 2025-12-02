import { API_URL } from "./config";

//load chain from aside to board
const loadChain = async (chainId, setNodes, setEdges, setCurrentChainId, setCurrentChain, setChainName) => {
    try {
        const chainFetch = await fetch(`${API_URL}/chains/${chainId}`,
            {credentials:'include'}
        );
        const chain = await chainFetch.json();

        if (chain.success) {
            // Fetch full table
            const nodesWithFullData = [];

            // for (const node of chain.data.flowData.nodes) {
            await Promise.all(chain.data.flowData.nodes.map(async node => {

                const tableId = node.data._id || node.data.tableId;

                if (tableId) {
                    const tableFetch = await fetch(`${API_URL}/tables/${tableId}`,
                        {credentials:'include'}
                    );
                    const tableData = await tableFetch.json();
                    if (tableData.success && tableData.data) {
                        nodesWithFullData.push({
                            ...node,
                            data: tableData.data
                        });
                        
                    } else {
                        console.log("Failed to load table:", tableId);
                    }
                } else {
                    console.log("Node has no table ID");
                }
            }));

            setNodes(nodesWithFullData);
            setEdges(chain.data.flowData.edges);
            setCurrentChainId(chain.data._id);
            setCurrentChain(chain.data);
            setChainName(chain.data.name);
            console.log("Chain loaded!");
            return true;
        }

        return false;

    } catch (error) {
        console.log("Failed to load the chain", error);
        return false;
    }

};


export default loadChain;