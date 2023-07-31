import React, {useState, useEffect, useRef} from 'react';
import {BaseEdge, EdgeProps, getBezierPath, EdgeLabelRenderer} from 'reactflow';
// import './buttonedge.css';

export default function PostEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [showData, setShowData] = useState(false);
  const edgeStyle = {
    ...style,
    stroke: 'blue',
    strokeWidth: 3,
  };

  const bodyKeys = data.file.body ? data.file.body.keys : [];

  return (
    <>
      <BaseEdge path={edgePath} style={edgeStyle} />

      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            left: sourceX, // Use the X coordinate from getBezierPath
            top: sourceY, // Use the Y coordinate from getBezierPath
            transform: 'translate(-50%, -70%)', // Center the label
            fontSize: 12,
            zIndex: 1001,
            height: '1em',
            width: '1em',
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
            // backgroundColor: 'red',
            // Adjust the height as needed
          }}
          onMouseEnter={() => setShowData(true)}
          onMouseLeave={() => setShowData(false)}
        >
          {showData && (
            <div
              style={{
                backgroundColor: 'var(--primary-color)',
                width: 'fit-content',
                padding: '.25em 1.5em .25em 1.5em',
              }}
            >
              <h1>Data</h1>

              <div>
                <h2 style={{margin: '0 .5em 0 0', padding: '0'}}>Body:</h2>
                <ul style={{margin: '0 0 1em 0'}}>
                  {bodyKeys.length > 0 ? (
                    bodyKeys.map((key) => (
                      <li style={{marginLeft: '-2em'}}>{key}</li>
                    ))
                  ) : (
                    <p style={{marginLeft: '-2em'}}>'No data'</p>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
