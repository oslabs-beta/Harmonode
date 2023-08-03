import React, {useEffect, useState} from 'react';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.min.css'; //Example style, you can use another
import '../styles.css';
import {saveStringCode, stringCode} from '../ipcRenderer';

function CodeEditor({file, close}) {
  const [code, setCode] = useState('');
  const [position, setPosition] = useState({x: 0, y: 0});
  const [initialPosition, setInitialPosition] = useState({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState(false);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    async function getStringCode() {
      const codeString = await stringCode(file.fullPath);
      setCode(codeString);
    }
    getStringCode();
  }, []);

  useEffect(() => {
    console.log('Show Save');
    if (showSave) {
      setTimeout(() => {
        setShowSave(false);
      }, 1500);
    }
  }, [showSave]);

  function handleClose() {
    close();
    setCode('');
  }

  function handleSave() {
    saveStringCode(file.fullPath, code);
    setShowSave(true);
  }

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialPosition({x: e.clientX, y: e.clientY});
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    setInitialPosition({x: position.x, y: position.y});
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - initialPosition.x;
    const dy = e.clientY - initialPosition.y;

    setPosition(() => ({
      x: position.x + dx,
      y: position.y + dy,
    }));
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className='code-editor'
      style={{
        position: 'fixed',
        left: `calc(50% + ${position.x}px)`,
        top: `calc(50% + ${position.y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: 'var(--primary-color)',
          cursor: isDragging ? 'grabbing' : 'grab',
          display: 'flex',
          justifyContent: 'center',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <h2 className='editor-name'>{file.fileName}</h2>
        <p> (last updated: {new Date(file.lastUpdated).toLocaleString()} )</p>
      </div>
      <div className='editor-container'>
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
        {showSave && (
          <div className='code-editor-save-modal'>
            <p>Code is saved!</p>
          </div>
        )}
      </div>
      <div style={{display: 'flex'}}>
        <button className='editor-close-btn' onClick={handleClose}>
          Close / Discard Unsaved Changes
        </button>
        <button className='editor-save-btn' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CodeEditor;
