import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';

function ApprovedExtensions({setApproved}) {
  const [extensionList, setExtensionList] = useState<string[]>([
    '.jsx',
    '.js',
    '.tsx',
    '.ts',
  ]);
  const [approvedExt, setApprovedExt] = useState<string[]>(extensionList);

  // function to handle the logic of checking and unchecking the checkboxes
  function handleCheck(e) {
    // deconstruct the value and the checked boolean from the checkbox
    const {value, checked} = e.target;

    // updated the approvedExt array in state based on the value
    if (approvedExt.includes(value) && !checked)
      setApprovedExt(approvedExt.filter((ext) => ext != value));
    else if (!approvedExt.includes(value) && checked)
      setApprovedExt([...approvedExt, value]);
  }

  // whenever approvedExt state changes, invoke the callback to pass array to parent
  useEffect(() => {
    setApproved(approvedExt);
  }, [approvedExt]);

  // make our options jsx array so we can display it in the component render
  const options = extensionList.map((extension) => {
    return (
      <div key={uuid()} style={{margin: '0.5em'}}>
        <input
          onChange={handleCheck}
          type='checkbox'
          checked={approvedExt.includes(extension)} // if it's in the array, check the box
          value={extension}
        />
        <label>
          <b>{extension}</b>
        </label>
      </div>
    );
  });

  return (
    <div>
      <h3>Extensions to Include:</h3>
      {options}
    </div>
  );
}

export default ApprovedExtensions;
