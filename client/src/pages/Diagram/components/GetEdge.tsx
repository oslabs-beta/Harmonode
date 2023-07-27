import React, {useState, useEffect, useRef} from 'react';
import {BaseEdge, EdgeProps, getBezierPath, EdgeLabelRenderer} from 'reactflow';
// import './buttonedge.css';

export default function GetEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeStyle = {
    ...style,
    stroke: 'limegreen',
    strokeWidth: 2,
  };

  return (
    <>
      <BaseEdge path={edgePath} style={edgeStyle} />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            left: sourceX, // Use the X coordinate from getBezierPath
            top: sourceY, // Use the Y coordinate from getBezierPath
            transform: 'translate(-50%, -50%)', // Center the label
            fontSize: 12,
            zIndex: 999999999,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
            backgroundColor: 'transparent',
            // Adjust the height as needed
          }}
        ></div>
      </EdgeLabelRenderer>
    </>
  );
}
