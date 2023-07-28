import React, {useEffect} from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.min.css'; //Example style, you can use another
import '../styles.css';
import {saveStringCode, stringCode} from '../ipcRenderer';

function CodeEditor({file, close}) {
  const [code, setCode] = React.useState('');
  console.log(file);

  useEffect(() => {
    async function getStringCode() {
      const codeString = await stringCode(file.fullPath);
      setCode(codeString);
    }
    getStringCode();
  }, []);

  function handleClose() {
    close();
    setCode('');
  }

  function handleSave() {
    saveStringCode(file.fullPath, code);
  }

  return (
    <div className='code-editor'>
      <button onClick={handleClose}>Close</button>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default CodeEditor;
