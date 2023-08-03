import React from 'react';
import {Handle, Position} from 'reactflow';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

const handleStyle = {left: 11};
const handleStyle2 = {left: 42};
const handleStyle3 = {left: 73};
const handleStyle4 = {left: 104};
const handleStyle5 = {left: 135};

const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;

function FetchFileNode({data, isConnectable}) {
  function handleClick() {
    data.showEditor(data.file);
  }

  return (
    <div className='text-updater-node'>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className='diagram-node'>
        {data.label}
        <button onClick={handleClick} className='diagram-button'>
          {editIcon}
        </button>
      </div>

      <Handle
        type='source'
        position={Position.Bottom}
        id='a'
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='b'
        style={handleStyle2}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='c'
        style={handleStyle3}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='d'
        style={handleStyle4}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Bottom}
        id='e'
        style={handleStyle5}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default FetchFileNode;
