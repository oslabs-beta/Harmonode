import React, { useCallback, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Background,
  BackgroundVariant,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

function Diagram() {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onNodeClick = useCallback((event, node) => {
    console.log(node, 'node clicked')
  },[])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#526D82' }}>
      Diagram
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick} // to test button
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
        <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Lines} />
      </ReactFlow>
    </div>
  );
}

export default Diagram;
