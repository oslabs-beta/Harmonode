import React, {useCallback, useState, useContext, useEffect} from 'react';
import AddProject from '../../Projects/components/AddProject';
import ProjectsProvider from '../../../context/ProjectsProvider';
import {ProjectsContext} from '../../../context/contextStore';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Background,
  BackgroundVariant,
  Controls,
  useReactFlow,
  useNodesInitialized,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {PlaylistAddOutlined} from '@mui/icons-material';
// start with fetchFiles?
// get data from interface astroot in types.ts
// formSubmit in addproject.tsx
// setActiveProject holds all data thats loaded for current project
// ast:files
// grab name from active project name and state

// Need some function to be able to create nodes each time "save and load project" is clicked
// Will also render the data being passed onto the nodes
// How do we determine/measure the amount of nodes we need per project? fileLoad counter?
// One node will have name of endpoint
// Possibly will need ANOTHER node to specifiy what kind of request it is (post, delete etc.)
// The next node(s) will have the data being sent to all the fetches

function Diagram() {
  // onclick of "save project and load" button nodes are created
  // show all files EXCEPT the ones that were selected to be ignored
  const {fitView} = useReactFlow();
  const {activeProject} = useContext(ProjectsContext);

  // console.log(activeProject);

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

  const testObj = {
    firstName: 'Hamza',
    lastName: 'C',
    age: 27,
  };
  /*
  activeProject.ast.fetchFiles.map( (file, idx) => {
    return {
      id: idx,
      position: {x: 0, y: idx * 100},
      data: {label: file.fileName},
      style: defaultNodeStyle1
    }
  }) */
  const initialFetchNodes = activeProject.ast.fetchFiles.map((file, idx) => {
    return {
      id: file.id,
      position: {x: 0, y: idx * 100},
      data: {label: file.fileName}, //each file needs an id and we'll use the id to connect the nodes
      style: defaultNodeStyle1,
    };
  });

  const initialEndpointNodes = activeProject.ast.endpointFiles[0].endpoints.map(
    (file, idx) => {
      return {
        id: idx.toString(),
        position: {x: 200, y: idx * 100},
        data: {label: file},
        style: defaultNodeStyle2,
      };
    }
  );

  const initialNodes = [...initialFetchNodes, ...initialEndpointNodes];
  console.log(initialNodes, 'INITIAL NODES');
  // Need to add functionality so that for each proj. load..
  // it will create nodes based on what is necesscary
  // We determine how many nodes are necesscary based on what user selected and on fileLoad for count?
  const initialEdges = [
    {id: 'e0-1', source: '1', target: '2'}, //source MUST match id in order to connect
    {id: 'e1-2', source: '4', target: '5'},
    {id: 'e2-3', source: '2', target: '3'},
    {id: 'e3-4', source: '3', target: '4'},
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialFetchNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    // const newNodes = nodes.map((node) => {
    //   const match = activeProject.ast.fetchFiles.find(
    //     (file) => file.id === node.id
    //   );
    //   if (match) {
    //     return {
    //       ...node,
    //       data: {label: match.fileName},
    //     };
    //   }
    // });
    // setNodes(newNodes as any);
    // setEdges(initialEdges);
  }, [activeProject]);

  // useEffect(() => {
  //   fitView();
  // }, [nodesInitialized]);
  // combine nodes with spread?

  // const connectNodes () => {
  // const combinedNodes = [...initialNodes, ...setActiveProject]
  //
  // }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    console.log(node, 'node clicked');
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 3em)',
        backgroundColor: '#526D82',
        overflow: 'hidden',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick} // to test if node is clicked
        proOptions={{hideAttribution: true}}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} zoomable pannable />
        <Background
          id='1'
          gap={10}
          color='#f1f1f1'
          variant={BackgroundVariant.Dots}
        />
        <Background
          id='2'
          gap={100}
          offset={1}
          color='#ccc'
          variant={BackgroundVariant.Cross}
        />
      </ReactFlow>
    </div>
  );
}

export default Diagram;