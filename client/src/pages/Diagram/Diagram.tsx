import React, { useCallback, useState } from 'react';
import AddProject from '../Projects/components/AddProject';
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


// Need some function to be able to create nodes each time "save and load project" is clicked
// Will also render the data being passed onto the nodes
// How do we determine/measure the amount of nodes we need per project? fileLoad counter?
// One node will have name of endpoint
// Possibly will need ANOTHER node to specifiy what kind of request it is (post, delete etc.)
// The next node(s) will have the data being sent to all the fetches


function Diagram() {

  // onclick of "save project and load" button nodes are created
  // show all files EXCEPT the ones that were selected to be ignored




  
  const nodeColor = (node) => {
    switch (node.id) {
      case '1':
        return '#FCC8D1';
      case '2':
        return '#98DFD6';
      case '3':
        return '#FFF89C';
      case '4':
        return '#19A7CE';
      default:
        return '#ff0072';
    }
  };

  const defaultNodeStyle1 = {
    border: '3px solid #ff0071',
    background: '#FCC8D1',
    borderRadius: 15,
  };

  const defaultNodeStyle2 = {
    border: '3px solid #1B9C85',
    background: '#98DFD6',
    borderRadius: 15,
  };

  const defaultNodeStyle3 = {
    border: '3px solid #FFEA11',
    background: '#FFF89C',
    borderRadius: 15,
  };
  
  const defaultNodeStyle4 = {
    border: '3px solid #146C94',
    background: '#19A7CE',
    borderRadius: 15,
  };

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, style: defaultNodeStyle1 },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, style: defaultNodeStyle2 },
    { id: '3', position: { x: 0, y: 200 }, data: { label: '3' }, style: defaultNodeStyle3 },
    { id: '4', position: { x: 0, y: 300 }, data: { label: '4' }, style: defaultNodeStyle4 },
  ];
  // Need to add functionality so that for each proj. load..
  // it will create nodes based on what is necesscary
  // We determine how many nodes are necesscary based on what user selected and on fileLoad for count?
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '4', target: '5' },
    { id: 'e3-4', source: '2', target: '3' },
    { id: 'e4-5', source: '3', target: '4' },
  ];


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
        onNodeClick={onNodeClick} // to test if node is clicked
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} zoomable pannable />
        <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Dots} />
        <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </div>
  );
}

export default Diagram;
