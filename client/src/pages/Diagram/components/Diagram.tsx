import React, { useCallback, useState, useContext, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './diagram.css';
import { ProjectsContext } from '../../../context/contextStore';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  NodeToolbar,
  Panel,
  NodeResizer,
  useReactFlow,
  useNodesInitialized,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PlaylistAddOutlined } from '@mui/icons-material';

function Diagram() {
  const { fitView } = useReactFlow();
  const { activeProject } = useContext(ProjectsContext);
  console.log(activeProject);

  // codMinimap colors
  const nodeColor = (node) => {
    switch (node.type) {
      case 'fetchFileNode':
        return '#19A7CE';
      case 'endpointNode':
        return '#98DFD6';
      case '3':
        return '#FCC8D1';
      case '4':
        return '#FFF89C';
      case 'errorNode':
        return '#ff0072';
      default:
        return '#F1F1F1';
    }
  };
  //diagram colors
  const fetchFileNode = {
    border: '3px solid #146C94',
    background: '#19A7CE',
    borderRadius: 15,
  };

  const endpointNode = {
    border: '3px solid #1B9C85',
    background: '#98DFD6',
    borderRadius: 15,
  };

  const defaultNodeStyle3 = {
    border: '3px solid #FFEA11',
    background: '#FFF89C',
    borderRadius: 15,
  };

  const errorNode = {
    border: '3px solid #ff0071',
    background: '#FCC8D1',
    borderRadius: 15,
  };
  // State for switching between vertical and horizontal view
  const [orientation, setOrientation] = useState('vertical');

  function generateNodes(project = activeProject, orientation) {
    // Common spacing for horizontal/vertical stacking
    const spacing = 200;
    const initialFetchNodes = project.ast.fetchFiles.map((file, idx) => {
      const position =
        orientation === 'horizontal'
          ? { x: idx * spacing, y: 0 }
          : { x: 0, y: idx * spacing };

      return {
        id: file.id, // This is fetchFiles.id
        position,
        animated: true,
        // position: { x: idx * 200, y: 0 },
        data: { label: file.fileName }, //each file needs an id and we'll use the id to connect the nodes
        style: fetchFileNode,
        type: 'fetchFileNode',
      };
    });

    const initialEndpointNodes = project.ast.endpointFiles[0].endpoints.map(
      (file, idx) => {
        const position =
          orientation === 'horizontal'
            ? { x: idx * spacing, y: spacing }
            : { x: spacing, y: idx * spacing };
        return {
          id: file.id, // This is endpoints.id
          position,
          animated: true,
          // position: { x: idx * 200, y: 200 },
          data: { label: file.path },
          style: endpointNode,
          type: 'endpointNode',
        };
      }
    );

    return [...initialFetchNodes, ...initialEndpointNodes];
  }
  // Need to add functionality so that for each proj. load..
  // it will create nodes based on what is necesscary
  // We determine how many nodes are necesscary based on what user selected and on fileLoad for count?
  function generateEdges(project = activeProject) {
    return project.ast.fetchFiles.flatMap((file, idx) => {
      return file.fetches
        .map((fetch) => {
          const endpoint = project.ast.endpointFiles[0].endpoints.find(
            (endpoint) => endpoint.path === fetch.path
          );
          if (endpoint) {
            return {
              id: uuid(),
              animated: true,
              target: endpoint.id,
              source: file.id,
            };
          }
          return null;
        })
        .filter((edge) => edge !== null);
    });
  }

  // State Management for nodes and edges (connectors)

  const [nodes, setNodes, onNodesChange] = useNodesState(
    generateNodes(activeProject, orientation)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    generateEdges(activeProject)
  );
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    setNodes(generateNodes(activeProject, orientation));
    setEdges(generateEdges(activeProject));
  }, [activeProject, orientation]);

  useEffect(() => {
    fitView();
  }, [nodesInitialized]);
  // combine nodes with spread?

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)), // Not doing anything for now
    [setEdges]
  );

  const handleHorizontalClick = () => {
    setOrientation('horizontal');
  };
  const handleVerticalClick = () => {
    setOrientation('vertical');
  };

  const onNodeClick = useCallback((event, node) => {
    console.log(node, 'node clicked');
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 3em)',
        backgroundColor: '#121212',
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
        proOptions={{ hideAttribution: true }}
      >
        {/* <NodeToolbar /> */}
        <Panel position='top-right'>
          <button className='verticalButton' onClick={handleVerticalClick}>
            Vertical View
          </button>
          <button className='horizontalButton' onClick={handleHorizontalClick}>
            Horizontal View
          </button>
        </Panel>
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
          // offset={1}
          color='#ccc'
          // variant={BackgroundVariant.Cross}
        />
      </ReactFlow>
    </div>
  );
}

export default Diagram;
