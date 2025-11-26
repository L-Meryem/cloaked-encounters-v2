import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Table from './Table/Table';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from './Table/TableNode';

import tableToNode from '../utilities/tableToNode';
import isConnectionValid from '../utilities/validateEdges';




const Board = ({ nodes, setNodes, edges, setEdges, currentChainId, singleRoll }) => {

  //Register custom nodes
  const nodeTypes = {
    tableNode: props => <TableNode {...props} singleRoll={singleRoll} />
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
  const handleDrop = e => {
    e.preventDefault();
    const dropTable = JSON.parse(e.dataTransfer.getData('application/json'));
    //Position???
    const dropPosition = reactFlowInstance.screenToFlowPosition({
      x: e.clientX,
      y: e.clientY
    });
    console.log(`Drop position for ${JSON.stringify(dropTable.name)}: ${JSON.stringify(dropPosition)}`);
    //Table to node
    const dropNode = tableToNode(dropTable, dropPosition.x, dropPosition.y);
    //Add to nodes
    setNodes(nodes => [...nodes, dropNode[0]]);
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