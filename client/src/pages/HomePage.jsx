import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Board from '../components/Board';
import Aside from '../components/Aside/Aside';
import Viewer from '../components/Viewer';
import { ReactFlowProvider } from '@xyflow/react';

const HomePage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  //load chain from aside to board
  const loadChain = async (chainId) => {
    try {
      const chainFetch = await fetch(`/api/chains/${chainId}`);
      const chain = await chainFetch.json();

      if (chain.success) {
        setNodes(chain.data.flowData.nodes);
        setEdges(chain.data.flowData.edges);
        console.log("Chain loaded!", chain.data);
      }

    } catch (error) {
      console.log("Failed to load the chain", error);
    }
  };

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <Board
                nodes={nodes}
                setNodes={setNodes}
                edges={edges}
                setEdges={setEdges}
              />
            </div>
            <div className=" viewer border-t p-4 h-40">
              <Viewer />
            </div>
          </main>
          <aside className="w-64 border-l overflow-y-auto">
            <Aside loadChain={loadChain} />
          </aside>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default HomePage