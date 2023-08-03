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
const idList = ['a', 'b', 'c', 'd', 'e'];

function EndpointNode({data, isConnectable}) {
  return (
    <div className='text-updater-node'>
      {handleStyles.map((style, i) => {
        return (
          <Handle
            key={uuid()}
            type='target'
            id={idList[i]}
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
            id={idList[i]}
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
