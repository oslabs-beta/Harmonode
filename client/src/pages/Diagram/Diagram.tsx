import React from 'react';
import ReactFlow, { Edge } from 'reactflow';
import 'reactflow/dist/style.css';

function Diagram() {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    // must wrap <ReactFlow /> with a width and height
    <div style={{ width: '100vw', height: '100vh' }}>
      Diagram
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}

export default Diagram;
