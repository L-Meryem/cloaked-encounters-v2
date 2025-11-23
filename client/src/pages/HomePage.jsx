import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Board from '../components/Board';
import Aside from '../components/Aside/Aside';
import Viewer from '../components/Viewer';
import { ReactFlowProvider } from '@xyflow/react';
import tableToNode from '../utilities/tableToNode';
import creatEmptyTable from '../utilities/createTable';

const HomePage = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [currentChainId, setCurrentChainId] = useState(null);
  const [currentChain, setCurrentChain] = useState(null);

  const [viewerHeight, setViewerHeight] = useState(160);
  const [isResizing, setIsResizing] = useState(false);

  //load chain from aside to board
  const loadChain = async (chainId) => {
    try {
      const chainFetch = await fetch(`/api/chains/${chainId}`);
      const chain = await chainFetch.json();

      if (chain.success) {
        setNodes(chain.data.flowData.nodes);
        setEdges(chain.data.flowData.edges);
        setCurrentChainId(chain.data._id);
        setCurrentChain(chain.data);
        console.log("Chain loaded!", chain.data);
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

  const startResize = () => {
    setIsResizing(true);
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing) {
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 100 && newHeight < 600) {
        setViewerHeight(newHeight);
      }
    }
  };

  return (
    <ReactFlowProvider>
      <div
        className="flex flex-col h-screen"
        onMouseMove={resize}
        onMouseUp={stopResize}
      >
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <Board
                nodes={nodes}
                setNodes={setNodes}
                edges={edges}
                setEdges={setEdges}
                currentChainId={currentChainId}
                setCurrentChainId={setCurrentChainId}
              />
            </div>
            <div
              onMouseDown={startResize}
              style={{
                height: '4px',
                background: '#ccc',
                cursor: 'row-resize'
              }}
            />
            <div className=" viewer border-t p-4"
              style={{
                height: `${viewerHeight}px`,
                overflowY: 'auto'
              }}>
              <Viewer currentChain={currentChain} />
            </div>
          </main>
          <aside className="w-64 border-l overflow-y-auto">
            <Aside loadChain={loadChain} onCreateTable={createTable} />
          </aside>
        </div>
      </div>
    </ReactFlowProvider>
  )
}

export default HomePage