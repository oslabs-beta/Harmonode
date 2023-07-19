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

  function handleCheck(e) {
    const {value, checked} = e.target;
    if (approvedExt.includes(value) && !checked)
      setApprovedExt(approvedExt.filter((ext) => ext != value));
    else if (!approvedExt.includes(value) && checked)
      setApprovedExt([...approvedExt, value]);
  }

  useEffect(() => {
    setApproved(approvedExt);
  }, [approvedExt]);

  const options = extensionList.map((extension) => {
    return (
      <div key={uuid()} style={{margin: '0.5em'}}>
        <input
          onChange={handleCheck}
          type='checkbox'
          checked={approvedExt.includes(extension)}
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
