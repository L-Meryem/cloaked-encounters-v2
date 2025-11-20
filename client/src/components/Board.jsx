import React from 'react';
import { useState, useCallback } from 'react';
import Table from './Table/Table';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, ReactFlowProvider} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TableNode from './Table/TableNode';

import tableToNode from '../utilities/tableToNode';
import saveChain from '../utilities/saveChain';
import isConnectionValid from '../utilities/validateEdges';


//Register custom nodes
const nodeTypes = {
  tableNode: TableNode,
};

const Board = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [initialized, setInitialized] = useState(false); //Fix for: node position overrides after every render

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  //convert tables to nodes
  const convertTables = tables => {
    if (!initialized) {
      setNodes(tableToNode(tables));
      setInitialized(true);
    }
  }

  const saveAsChain = async () => {
    await saveChain('First Chain', nodes, edges);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlowProvider>
        <Table sendTables={convertTables} render={false} />
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
        />
        <Background
          gap={20}
          size={1}
          color="#888"
          variant="dots"
        />
      </ReactFlowProvider>
      <button onClick={saveAsChain} style={{position:'relative',top: '-60px' }}>Save Chain</button>
    </div>
  );
}

export default Board;