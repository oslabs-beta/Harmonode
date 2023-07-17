import React from 'react';
// import all components here
import { Sidebar } from 'react-pro-sidebar';
import LandingPage from './pages/LandingPage/LandingPage';
import NavBar from './components/Sidebar';

const App = () => {
  return (
    <div>
      <LandingPage />
      
      <NavBar />
    </div>
  );
};

export default App;
