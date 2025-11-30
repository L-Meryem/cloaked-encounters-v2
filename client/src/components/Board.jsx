import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Table from './Table/Table';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from './Table/TableNode';

import tableToNode from '../utilities/tableToNode';
import isConnectionValid from '../utilities/validateEdges';
import loadChain from '../utilities/loadChain';




const Board = ({ nodes, setNodes, edges, setEdges, currentChainId, setCurrentChainId, setCurrentChain, setChainName, singleRoll }) => {

  const handleToggleState = (nodeId, stateKey) => {
    setNodes(nodes => nodes.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, [stateKey]: !node.data[stateKey] } }
        : node
    ));
  };

  //Register custom nodes
  const nodeTypes = {
    tableNode: props => <TableNode {...props}
      singleRoll={singleRoll}
      onToggleState={handleToggleState}
      updateNodeData={updateNodeData}
    />
  };

  const reactFlowInstance = useReactFlow();

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((edgesSnapshot) => addEdge(
        {
          ...params,
          label: String(edgesSnapshot.length + 1),
        },
        edgesSnapshot
      ));
    },
    [],
  );


  //Drop
  const handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async e => {
    e.preventDefault();
    const dropData = JSON.parse(e.dataTransfer.getData('application/json'));
    if (dropData.flowData) {
      //load chain
      const isChainLoaded = await loadChain(dropData._id, setNodes, setEdges, setCurrentChainId, setCurrentChain, setChainName);

      if (isChainLoaded)
        setTimeout(() => {
          reactFlowInstance.fitView({ padding: 0.3 });
        }, 0); //wait for react flow to add nodes

    } else { //its a table
      //Position???
      const dropPosition = reactFlowInstance.screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      });
      console.log(`Drop position for ${JSON.stringify(dropData.name)}: ${JSON.stringify(dropPosition)}`);
      //Table to node
      const dropNode = tableToNode(dropData, dropPosition.x, dropPosition.y);
      //Add to nodes
      setNodes(nodes => [...nodes, dropNode[0]]);
    }


  };

  const updateNodeData = (nodeId, newData) => {
    setNodes(nodes =>
      nodes.map(node => {
        if (node.id !== nodeId)
          return node;
        const updatedData = { ...node.data, ...newData };
        return { ...node, data: updatedData };
      })
    );
  };

  //log nodes and edges
  useEffect(() => {
    console.log('nodes', nodes);
    console.log('edges', edges);
  }, [edges]);

  const edgeOptions = {
    style: {
      stroke: 'red',
      strokeWidth: 3,
    },
    labelStyle: {
      fontSize: '25px',
      fill: 'black'
    },
    labelBgStyle: {
      fill: 'rgb(255, 242, 234)',
    },
    markerEnd: {
      type: 'arrowclosed',
      color: 'red',
      width: 15,
      height: 15
    }
  };

  return (
    <div id="board" onDragOver={handleDragOver} onDrop={handleDrop}>
      <Table render={false} singleRoll={singleRoll} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={(connection) => isConnectionValid(connection, edges)} // A -> B -> C
        fitView
        panOnDrag={true}
        panOnScroll={true}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background
          gap={20}
          size={1}
          color="#8888883b"
          variant="lines"
        />
      </ReactFlow>
    </div>
  );
}

export default Board;