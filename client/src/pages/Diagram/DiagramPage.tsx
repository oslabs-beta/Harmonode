import React from 'react';
import {ReactFlowProvider} from 'reactflow';
import Diagram from './components/Diagram';
import './diagram.css';

function DiagramPage() {
  return (
    <ReactFlowProvider>
      <Diagram />
    </ReactFlowProvider>
  );
}

export default DiagramPage;
