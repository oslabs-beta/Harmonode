import React from 'react';
import {ReactFlowProvider} from 'reactflow';
import Diagram from './components/Diagram';

function DiagramPage() {
  return (
    <ReactFlowProvider>
      <Diagram />
    </ReactFlowProvider>
  );
}

export default DiagramPage;
