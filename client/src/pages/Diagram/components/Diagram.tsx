import React, {useCallback, useState, useContext, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import './diagram.css';
import {ProjectsContext} from '../../../context/contextStore';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
  useReactFlow,
  useNodesInitialized,
} from 'reactflow';
import 'reactflow/dist/style.css';
import FetchFileNode from './FetchFileNode';
import GetEdge from './GetEdge';
import PostEdge from './PostEdge';
import PutEdge from './PutEdge';
import PatchEdge from './PatchEdge';
import DeleteEdge from './DeleteEdge';
import CodeEditor from '../../../components/CodeEditor';
import EndpointFileNode from './EndpointFileNode';
import EndpointNode from './EndpointNode';

const nodeTypes = {
  fetchFileNode: FetchFileNode,
  endpointFileNode: EndpointFileNode,
  endpointNode: EndpointNode,
};
const edgeTypes = {
  getEdge: GetEdge,
  postEdge: PostEdge,
  putEdge: PutEdge,
  patchEdge: PatchEdge,
  deleteEdge: DeleteEdge,
};

function Diagram() {
  const {fitView} = useReactFlow();
  const {activeProject} = useContext(ProjectsContext);
  const [showEditor, setShowEditor] = useState(false);
  const [editorFile, setEditorFile] = useState({});

  if (activeProject.ast.fetches.length === 0) return <h1>No project loaded</h1>;
  // eventually going to use this paths to generate all of the path nodes and all of the edges

  function clickEdit(file) {
    setEditorFile(file);
    setShowEditor(true);
  }

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
    border: '3px solid #db7d3e',
    background: '#ccb022',
    color: 'black',
    fontSize: '.75em',
    width: '12.5em',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 15,
  };

  const endpointFileNode = {
    border: '3px solid #32c371',
    background: '#1a934e',
    fontSize: '.85em',
    width: '11.25em',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 15,
  };

  const errorNode = {
    border: '3px solid #ff0071',
    background: '#FCC8D1',
    borderRadius: 15,
  };
  // State for switching between vertical and horizontal view
  const [orientation, setOrientation] = useState('horizontal');
  const uniquePaths = getUniquePaths(activeProject);
  const allPaths = [
    ...activeProject.ast.endpoints,
    ...activeProject.ast.fetches,
  ];

  function getUniquePaths(project) {
    const tempCache = {};
    console.log(project.ast);
    // get all of the paths and remove duplicates
    return [...project.ast.fetches, ...project.ast.endpoints]
      .map((path) => {
        if (tempCache[path.id]) return null;
        tempCache[path.id] = true;
        return {path: path.path, id: path.id};
      })
      .filter((path) => path !== null);
  }

  function generateEndpointFiles(paths) {
    const pathCache: any = {};
    const pathsArray: any = [];
    for (const path of paths) {
      pathCache[path].hasOwnProperty('method')
        ? pathCache[path].method.push(path.method)
        : (pathCache[path] = {method: [path.method]});
    }
    for (const key of Object.keys(pathCache)) {
      pathsArray.push(pathCache[key]);
    }
    return pathsArray;
  }
  function generateNodes(project = activeProject, orientation) {
    // Common spacing for horizontal/vertical stacking

    // Generate the nodes
    const initEndpointNodes: any = uniquePaths.map((path: any) => {
      return {
        id: path.id,
        animated: true,
        data: {label: path.path},
        style: endpointNode,
        type: 'endpointNode',
      };
    });

    const initFetchFileNodes = project.ast.fetchFiles.map((file) => {
      return {
        id: file.id, // This is fetchFiles.id
        animated: true,
        data: {label: file.fileName, file: file, showEditor: clickEdit}, //each file needs an id and we'll use the id to connect the nodes
        style: fetchFileNode,
        type: 'fetchFileNode',
      };
    });

    const initEndpointFileNodes = project.ast.endpointFiles.map((file) => {
      return {
        id: file.id,
        animated: true,
        data: {label: file.fileName, file: file, showEditor: clickEdit},
        style: endpointFileNode,
        type: 'endpointFileNode',
      };
    });
    // Apply spacing based on the longest node length

    // get the count of all the files
    const endpointCount = initEndpointNodes.length - 1;
    const fetchFileCount = initFetchFileNodes.length - 1;
    const endpointFileCount = initEndpointFileNodes.length - 1;
    // get the max length to control spacing
    const diagSpacing = Math.max(endpointCount, fetchFileCount) * 160;

    // endpoint spacing
    initEndpointNodes.forEach((node, i) => {
      const position =
        orientation === 'horizontal'
          ? {
              x: i * (diagSpacing / endpointCount),
              y: 200,
            }
          : {
              x: diagSpacing / endpointCount,
              y: i * (diagSpacing / 2 / endpointCount),
            };
      node.position = position;
    });

    // fetchFile spacing
    initFetchFileNodes.forEach((node, i) => {
      const position =
        orientation === 'horizontal'
          ? {x: i * (diagSpacing / fetchFileCount), y: 0}
          : {x: 0, y: i * (diagSpacing / fetchFileCount / 2)};

      node.position = position;
    });

    // endPointFile spacing
    initEndpointFileNodes.forEach((node, i) => {
      const position =
        orientation === 'horizontal'
          ? {x: i * (diagSpacing / endpointFileCount), y: 400}
          : {x: 0, y: i * (diagSpacing / fetchFileCount / 2)};
      node.position = position;
    });

    return [
      ...initFetchFileNodes,
      ...initEndpointNodes,
      ...initEndpointFileNodes,
    ];
  }

  function returnEdgeType(method) {
    switch (method) {
      case 'GET':
        return ['getEdge', 'a'];
      case 'POST':
        return ['postEdge', 'b'];
      case 'PUT':
        return ['putEdge', 'c'];
      case 'PATCH':
        return ['patchEdge', 'd'];
      case 'DELETE':
        return ['deleteEdge', 'e'];
      default:
        return ['getEdge', 'a'];
    }
  }

  // Need to add functionality so that for each proj. load..
  // it will create nodes based on what is necesscary
  // We determine how many nodes are necesscary based on what user selected and on fileLoad for count?
  function generateEdges(project = activeProject) {
    return project.ast.fetchFiles.flatMap((file, idx) => {
      return file.fetches
        .map((fetch) => {
          let endpoint;
          if (!endpoint) {
            endpoint = allPaths.find(
              (endpoint) => endpoint.path === fetch.path
            );
          }
          if (endpoint) {
            const edgeTypeArray = returnEdgeType(fetch.method); // 'GET'
            return {
              id: uuid(),
              animated: true,
              target: endpoint.id,
              source: file.id,
              type: edgeTypeArray[0],
              sourceHandle: edgeTypeArray[1],
              targetHandle: edgeTypeArray[1],
              data: {file: fetch},
            };
          }
          endpoint = null;
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

  // const onNodeClick = useCallback((event, node) => {
  //   console.log(node, 'node clicked');
  // }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 3em)',
        backgroundColor: 'var(--diagram-bg-color)',
        overflow: 'hidden',
      }}
    >
      {showEditor && (
        <div className='diagram-code-editor'>
          <CodeEditor file={editorFile} close={() => setShowEditor(false)} />
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{hideAttribution: true}}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <ul
          style={{
            position: 'relative',
            width: '50%',
            listStyleType: 'none',
          }}
        >
          <div
            className='diagram-legend-item'
            style={{backgroundColor: 'limegreen'}}
          />
          GET
          <li>
            <div
              className='diagram-legend-item'
              style={{backgroundColor: 'blue'}}
            />
            POST
          </li>
          <li>
            <div
              className='diagram-legend-item'
              style={{backgroundColor: 'violet'}}
            />
            PUT
          </li>
          <li>
            <div
              className='diagram-legend-item'
              style={{backgroundColor: 'orange'}}
            />
            PATCH
          </li>
          <li>
            <div
              className='diagram-legend-item'
              style={{backgroundColor: 'red'}}
            />
            DELETE
          </li>
        </ul>
        <Panel position='top-right'>
          <button className='verticalButton' onClick={handleVerticalClick}>
            Vertical View
          </button>
          <button className='horizontalButton' onClick={handleHorizontalClick}>
            Horizontal View
          </button>
        </Panel>
        <Controls />
        <MiniMap nodeColor={nodeColor} />
        {/* <Background
          id='1'
          gap={20}
          color='#071014'
          // variant={BackgroundVariant.Dots}
        />
        <Background
          id='2'
          // gap={10}
          // offset={1}
          // color='#ccc'
          // variant={BackgroundVariant.Cross}
        /> */}
      </ReactFlow>
    </div>
  );
}

export default Diagram;
