import React, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Board from '../components/Board';
import Aside from '../components/Aside/Aside';
import Viewer from '../components/Viewer';
import { ReactFlowProvider } from '@xyflow/react';
import tableToNode from '../utilities/tableToNode';
import creatEmptyTable from '../utilities/createTable';
import { saveChain } from '../utilities/fetches';
import { useChain } from '../context/ChainContext';

const HomePage = ({ userName, setUserName }) => {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [currentChain, setCurrentChain] = useState(null);
  const [currentChainId, setCurrentChainId] = useState(null);
  const [chainName, setChainName] = useState('New chain');
  const { refetchChains } = useChain();

  const [viewerMessage, setViewerMessage] = useState('');
  const [singleRolls, setSingleRolls] = useState([]);

  const singleRoll = roll => {
    setSingleRolls(prev => [...prev, roll]);
  };

  const createTable = (dieType) => {
    const newTable = creatEmptyTable(dieType);
    const newNode = tableToNode(newTable, 0, 0);
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
      setCurrentChain(result.data);
      setViewerMessage(`${chainName} saved!`);
      refetchChains();
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
      refetchChains();
      setViewerMessage(`${chainName} saved!`);
    }
  };

  useEffect(() => {
    if (!viewerMessage) return;
    setTimeout(() => setViewerMessage(''), 2500);
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
      <Navbar isLogin={true} />
      <div className="main-container">
        <main className="border">
          <Board
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            currentChainId={currentChainId}
            setCurrentChainId={setCurrentChainId}
            setCurrentChain={setCurrentChain}
            setChainName={setChainName}
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
            setViewerMessage={setViewerMessage}
            singleRolls={singleRolls}
          />
        </main>
        <Aside
          onCreateTable={createTable}
          singleRoll={singleRoll}
        />
      </div>
    </ReactFlowProvider>
  )
}

export default HomePage