import { flexbox } from '@mui/system';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import ColorPicker from 'react-color-picker';
import { HexColorPicker } from 'react-colorful';
import './settings.css';

function Settings() {
  const defaultTheme = {
    '--primary-color': '#164b60',
    '--secondary-color': '#1b6b93',
    '--tertiary-color': '#42A186',
    '--quaternary-color': '#42A186',
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
  //set customize theme button state
  const [themeChoice, setChoice] = useState(false);

  //set default color picker state
  const [primaryColorChoice, setPimaryColorChoice] = useState('#164b60');
  const [secondaryColorChoice, setSecondaryColorChoice] = useState('#1b6b93');
  const [tertiaryColorChoice, setTertiaryColorChoice] = useState('#42A186');
  const [quatenaryColorChoice, setQuatenaryColorChoice] = useState('#04D6B2');
  const [inactiveColorChoice, setInactiveColorChoice] = useState('#868484');
  const [fontManColorChoice, setFontMaiColorChoice] = useState('#f6fff5');

  //color pickker - handle primary color
  function handlePrimaryColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
  }
  //color pickker - handle secondary color
  function handleSecondaryColor(color) {
    document.documentElement.style.setProperty('--secondary-color', color);
  }
  //color pickker - handle tertiary color
  function handleTertiaryColor(color) {
    console.log('color ', color);
    document.documentElement.style.setProperty('--tertiary-color', color);
  }
  //color pickker - handle quaternary color
  function handleQuaternaryColor(color) {
    document.documentElement.style.setProperty('--quaternary-color', color);
  }
  //color pickker - handle inactive color
  function handleInactiveColor(color) {
    document.documentElement.style.setProperty('--inactive-color', color);
  }
  //color pickker - handle font-main color
  function handleFontMainColor(color) {
    document.documentElement.style.setProperty('--font-main-color', color);
  }

  //handle theme botton choices
  document.documentElement.style.setProperty('--secondary-color', '#1b6b93');
  const [showThemeChoices, setThemeButtonStatus] = useState(false);
  function themeChoiceClick(e) {
    console.log('CLICK');
    console.log('showThemeChoices1 ', showThemeChoices);
    if (!showThemeChoices) {
      console.log('Change to true');
      setThemeButtonStatus(true);
    } else {
      setThemeButtonStatus(false);
      console.log('Change to false');
    }
    console.log('showThemeChoices2 ', showThemeChoices);
  }

  //handle color theme selection
  function handleClick(theme, e) {
    if (theme !== 'themeChoose') {
      for (let key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
      }
    } else {
      if (themeChoice === false) {
        setChoice(true);
      } else {
        setChoice(false);
      }
    }
  }

  return (
    <div>
      <h1>Settings</h1>
      <button
        className={
          !showThemeChoices ? 'primaryButtonInactive' : 'primaryButtonActive'
        }
        onClick={themeChoiceClick}
      >
        {!showThemeChoices ? 'Change Themes' : 'Hide Change Themes'}
      </button>
      {showThemeChoices ? (
        <section>
          <button
            className='button'
            onClick={(e) => handleClick(defaultTheme, e)}
          >
            Blue Mode (Default)
          </button>
          <button
            className='button'
            onClick={(e) => handleClick(themeOption1, e)}
          >
            Dark Mode
          </button>
          <button
            className='button'
            onClick={(e) => handleClick(themeOption2, e)}
          >
            Beach Mode
          </button>
          <button
            className='button'
            onClick={(e) => handleClick(themeOption3, e)}
          >
            Purple Mode
          </button>
          <button
            className='button'
            onClick={(e) => handleClick(themeOption4, e)}
          >
            Forest Mode
          </button>

          <section>
            <button
              className={
                !themeChoice ? 'primaryButtonInactive' : 'primaryButtonActive'
              }
              onClick={(e) => handleClick('themeChoose', e)}
            >
              {' '}
              {themeChoice ? 'Hide Customize Colors' : 'Customize Colors'}
            </button>
          </section>
          <section>
            {themeChoice ? (
              <section className='container'>
                <p>Primary Color</p>
                <p>Secondary Color</p>
                <p>Tertiary Color</p>
                <p>Quatenary Color</p>
                <p>Inactive Color</p>
                <p>Main Font Color</p>

                <HexColorPicker
                  color={primaryColorChoice}
                  onChange={handlePrimaryColor}
                />
                <HexColorPicker
                  color={secondaryColorChoice}
                  onChange={handleSecondaryColor}
                />
                <HexColorPicker
                  color={tertiaryColorChoice}
                  onChange={handleTertiaryColor}
                />
                <HexColorPicker
                  color={quatenaryColorChoice}
                  onChange={handleQuaternaryColor}
                />
                <HexColorPicker
                  color={inactiveColorChoice}
                  onChange={handleInactiveColor}
                />
                <HexColorPicker
                  color={fontManColorChoice}
                  onChange={handleFontMainColor}
                />
              </section>
            ) : (
              <section></section>
            )}
          </section>
        </section>
      ) : (
        <section></section>
      )}
    </div>
  );
}

export default Settings;
