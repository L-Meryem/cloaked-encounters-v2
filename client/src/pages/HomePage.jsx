import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Board from '../components/Board';
import Aside from '../components/Aside/Aside';
import Viewer from '../components/Viewer';
import { ReactFlowProvider } from '@xyflow/react';
import tableToNode from '../utilities/tableToNode';
import creatEmptyTable from '../utilities/createTable';
import saveChain from '../utilities/saveChain';

const HomePage = ({ userName, setUserName }) => {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [currentChain, setCurrentChain] = useState(null);
  const [currentChainId, setCurrentChainId] = useState(null);
  const [chainName, setChainName] = useState('New chain');

  const [viewerMessage, setViewerMessage] = useState('');
  const [singleRolls, setSingleRolls] = useState([]);

  const singleRoll = roll => {
    setSingleRolls(prev => [...prev, roll]);
  };

  //load chain from aside to board
  const loadChain = async (chainId) => {
    try {
      const chainFetch = await fetch(`/api/chains/${chainId}`);
      const chain = await chainFetch.json();

      if (chain.success) {
        // Fetch full table
        const nodesWithFullData = [];
        for (const node of chain.data.flowData.nodes) {
          const tableId = node.data._id || node.data.tableId;
          if (tableId) {
            const tableFetch = await fetch(`/api/tables/${tableId}`);
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
        }

        setNodes(nodesWithFullData);
        setEdges(chain.data.flowData.edges);
        setCurrentChainId(chain.data._id);
        setCurrentChain(chain.data);
        setChainName(chain.data.name);
        console.log("Chain loaded!");
      }
    } catch (error) {
      console.log("Failed to load the chain", error);
    }

  };

  const createTable = (dieType) => {
    const newTable = creatEmptyTable(dieType);
    const newNode = tableToNode(newTable, 400, 300);
    setNodes(prev => [...prev, newNode[0]]);
    setCurrentChainId(null);
  }

  const saveAsChain = async () => {
    if (nodes.length === 0) {
      setViewerMessage('Add tables and connectors before saving a chain!');
      return
    }

    // setViewerMessage('');
    const result = await saveChain(chainName, nodes, edges, currentChainId);
    if (result.success) {
      setCurrentChainId(result.data._id);
      setViewerMessage(`${chainName} saved!`);
    }
  };

  const saveAsNewChain = async () => {
    if (nodes.length === 0) {
      setViewerMessage('Add tables and connectors before saving a chain!');
      return
    }

    const result = await saveChain(chainName, nodes, edges, null);
    if (result.success) {
      setCurrentChainId(result.data._id);
      setViewerMessage(`${chainName} saved!`);
    }
  };

  useEffect(() => {
    if (!viewerMessage) return;
    setTimeout(() => setViewerMessage(''), 4000);
  }, [viewerMessage]);

  const clearBoard = () => {
    setNodes([]);
    setEdges([]);
    setCurrentChainId(null);
    setCurrentChain(null);
    setChainName('New chain');
    setSingleRolls([]);
  };

  return (
    <ReactFlowProvider>
      <Navbar isLogin={true} userName={userName} setUserName={setChainName} />
      <div className="main-container">
        <main className="border">
          <Board
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            currentChainId={currentChainId}
            setCurrentChainId={setCurrentChainId}
            singleRoll={singleRoll}
          />
          <Viewer
            currentChain={currentChain}
            onClearBoard={clearBoard}
            chainName={chainName}
            onSaveChain={saveAsChain}
            onSaveNewChain={saveAsNewChain}
            setChainName={setChainName}
            currentChainId={currentChainId}
            viewerMessage={viewerMessage}
            singleRolls={singleRolls}
          />
        </main>
        <Aside
          loadChain={loadChain}
          onCreateTable={createTable}
          singleRoll={singleRoll}
        />
      </div>
    </ReactFlowProvider>
  )
}

export default HomePage