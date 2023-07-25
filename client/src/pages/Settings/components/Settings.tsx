import React from 'react';

function Settings() {
  const defaultTheme = {
    '--primary-color': '#164b60',
    '--secondary-color': '#1b6b93',
    '--tertiary-color': '#4caf50',
    '--quaternary-color': '#4caf50',
    '--inactive-color': '#868484',
    '--font-main-color': '#f6fff5',
  };
  const themeOption1 = {
    '--primary-color': '#27374D',
    '--secondary-color': '#526D82',
    '--tertiary-color': '#9DB2BF',
    '--quaternary-color': '#9DB2BF',
    '--inactive-color': '#868484',
    '--font-main-color': '#DDE6ED',
  };
  function handleClick(e, value) {
    e.preventDefault();
    console.log('CLICK!!!');
    document.documentElement.style.setProperty('root', value);
  }
  return (
    <div>
      <h1>Settings</h1>
      <p>Themes</p>
      <button onClick={(e) => handleClick(e, defaultTheme)}>Default</button>
      <button onClick={(e) => handleClick(e, themeOption1)}>Option 1</button>
    </div>
  );
}

export default Settings;

/*
DEFAULT
  --primary-color: #164b60;
  --secondary-color: #1b6b93;
  --tertiary-color: #4caf50;
  --quaternary-color: #4caf50;
  --inactive-color: #868484;
  --font-main-color: #f6fff5;

OPTION 1
--primary-color: #27374D;
  --secondary-color: #526D82;
  --tertiary-color: #9DB2BF;
  --quaternary-color: #9DB2BF;
  --inactive-color: #868484;
  --font-main-color: #DDE6ED;

*/
