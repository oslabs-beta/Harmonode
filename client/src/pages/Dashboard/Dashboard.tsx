import React from 'react';
// dashboard will hold number of endpoints, number of fetches

function Dashboard() {
  function handleSubmit(e, variable) {
    e.preventDefault();
    console.log('e.target.inputField.value: ', e.target.inputField.value);
    document.documentElement.style.setProperty(
      variable,
      e.target.inputField.value
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h5>Dashboard Page!!!!!</h5>
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
    </div>
  );
}
//--font-main-color
export default Dashboard;
