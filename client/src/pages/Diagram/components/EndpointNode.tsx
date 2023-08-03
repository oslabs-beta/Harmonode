import React from 'react';
import {Handle, Position} from 'reactflow';
import {v4 as uuid} from 'uuid';

const handleStyles: any = [
  {left: 11},
  {left: 42},
  {left: 73},
  {left: 104},
  {left: 135},
];
const idListTop = ['a', 'b', 'c', 'd', 'e'];
const idListBottom = ['f', 'g', 'h', 'i', 'j'];

function EndpointNode({data, isConnectable}) {
  return (
    <div className='text-updater-node'>
      {handleStyles.map((style, i) => {
        return (
          <Handle
            key={uuid()}
            type='target'
            id={idListTop[i]}
            style={style}
            position={Position.Top}
            isConnectable={isConnectable}
          />
        );
      })}
      <div className='diagram-node'>{data.label}</div>
      {handleStyles.map((style, i) => {
        return (
          <Handle
            key={uuid()}
            type='target'
            id={idListBottom[i]}
            style={style}
            position={Position.Bottom}
            isConnectable={isConnectable}
          />
        );
      })}
    </div>
  );
}

export default EndpointNode;
