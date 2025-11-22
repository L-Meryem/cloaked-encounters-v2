import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import Table from './Table/Table';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, useReactFlow, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from './Table/TableNode';

import tableToNode from '../utilities/tableToNode';
import saveChain from '../utilities/saveChain';
import isConnectionValid from '../utilities/validateEdges';


//Register custom nodes
const nodeTypes = {
  tableNode: TableNode,
};

const Board = ({nodes, setNodes, edges, setEdges}) => {
  // const [nodes, setNodes] = useState([]);
  // const [edges, setEdges] = useState([]);
  const [initialized, setInitialized] = useState(false); //Fix for: node position overrides after every render

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

  //convert tables to nodes
  // const convertTables = tables => {
  //   if (!initialized) {
  //     setNodes(tableToNode(tables));
  //     setInitialized(true);
  //   }
  // }

  const saveAsChain = async () => {
    await saveChain('First Chain', nodes, edges);
  };

  const edgeOptions = {
    style: {
      stroke: 'blue',
      strokeWidth: 3,
    },
    labelStyle: {
      fontSize: '20px',
      fill: 'white'
    }, labelBgStyle: {
      fill: 'blue',
      opacity: 0.8
    },
    labelBgPadding: [4, 4],
    markerEnd: {
      type: 'arrowclosed',
      color: 'blue',
      width: 15,
      height: 15
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* sendTables={convertTables} get all user tables to the board*/}
      <Table render={false} />

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
      />
      <Background
        gap={20}
        size={1}
        color="#888"
        variant="dots"
      />
      <button onClick={saveAsChain} style={{ position: 'relative', top: '-60px' }}>Save Chain</button>
    </div>
  );
}

export default Board;