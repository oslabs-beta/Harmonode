import React, { useState } from 'react';

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

  const themeOption2 = {
    '--primary-color': '#B0DAFF',
    '--secondary-color': '#146C94',
    '--tertiary-color': '#19A7CE',
    '--quaternary-color': '#19A7CE',
    '--inactive-color': '#868484',
    '--font-main-color': '#FEFF86',
  };

  const themeOption3 = {
    '--primary-color': '#6527BE',
    '--secondary-color': '#9681EB',
    '--tertiary-color': '#868484',
    '--quaternary-color': '#868484',
    '--inactive-color': '#A7EDE7',
    '--font-main-color': '#45CFDD',
  };

  const themeOption4 = {
    '--primary-color': '#61764B',
    '--secondary-color': '#9BA17B',
    '--tertiary-color': '#CFB997',
    '--quaternary-color': '#CFB997',
    '--inactive-color': '#FAD6A5',
    '--font-main-color': '#A7EDE7',
  };
  //set user customization state
  const [themeChoice, setChoice] = useState(false);
  // let themeChooice = false;
  let themeChoose;

  function handleClick(theme, e) {
    if (theme !== 'themeChoose') {
      for (let key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
      }
    } else {
      if (themeChoice === false) {
        console.log('themeChoice 57', themeChoice);
        setChoice(true);
        console.log('themeChoice 59', themeChoice);
      } else {
        setChoice(false);
        console.log('themeChoice 62', themeChoice);
      }
      if (themeChoice === true) {
        console.log('themeChoice 65', themeChoice);
        themeChoose = (
          <section>
            <form
              onSubmit={(e) => handleSubmit(e, '--primary-color')}
              style={{ display: 'flex' }}
            >
              <input name='inputField' placeholder='type hex code' />
              <button>Primary Color</button>
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, '--secondary-color')}
              style={{ display: 'flex' }}
            >
              <input name='inputField' placeholder='type hex code' />
              <button>Secondary Color</button>
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, '--tertiary-color')}
              style={{ display: 'flex' }}
            >
              <input name='inputField' placeholder='type hex code' />
              <button>Tertiary Color</button>
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, '--quaternary-color')}
              style={{ display: 'flex' }}
            >
              <input name='inputField' placeholder='type hex code' />
              <button>Quaternary Color</button>
            </form>
            <form
              onSubmit={(e) => handleSubmit(e, '--font-main-color')}
              style={{ display: 'flex' }}
            >
              <input name='inputField' placeholder='type hex code' />
              <button>Font Color</button>
            </form>
          </section>
        );
      }
    }
  }

  function handleSubmit(e, variable) {
    e.preventDefault();
    console.log('e.target.inputField.value: ', e.target.inputField.value);
    document.documentElement.style.setProperty(
      variable,
      e.target.inputField.value
    );
  }

  return (
    <div>
      <h1>Settings</h1>
      <h2>Themes:</h2>
      <button onClick={(e) => handleClick(defaultTheme, e)}>
        Blue Mode (Default)
      </button>
      <button onClick={(e) => handleClick(themeOption1, e)}>Dark Mode</button>
      <button onClick={(e) => handleClick(themeOption2, e)}>Beach Mode</button>
      <button onClick={(e) => handleClick(themeOption3, e)}>Purple Mode</button>
      <button onClick={(e) => handleClick(themeOption4, e)}>Forest Mode</button>
      <button onClick={(e) => handleClick('themeChoose', e)}>
        Choose Your Own Adventure
      </button>
      {/* <section>{themeChoose}</section> */}
      {themeChoice ? (
        <section>
          <form
            onSubmit={(e) => handleSubmit(e, '--primary-color')}
            style={{ display: 'flex' }}
          >
            <input name='inputField' placeholder='type hex code' />
            <button>Primary Color</button>
          </form>
          <form
            onSubmit={(e) => handleSubmit(e, '--secondary-color')}
            style={{ display: 'flex' }}
          >
            <input name='inputField' placeholder='type hex code' />
            <button>Secondary Color</button>
          </form>
          <form
            onSubmit={(e) => handleSubmit(e, '--tertiary-color')}
            style={{ display: 'flex' }}
          >
            <input name='inputField' placeholder='type hex code' />
            <button>Tertiary Color</button>
          </form>
          <form
            onSubmit={(e) => handleSubmit(e, '--quaternary-color')}
            style={{ display: 'flex' }}
          >
            <input name='inputField' placeholder='type hex code' />
            <button>Quaternary Color</button>
          </form>
          <form
            onSubmit={(e) => handleSubmit(e, '--font-main-color')}
            style={{ display: 'flex' }}
          >
            <input name='inputField' placeholder='type hex code' />
            <button>Font Color</button>
          </form>
        </section>
      ) : (
        <section></section>
      )}
    </div>
  );
}

export default Settings;
