import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {
  const [isSubnavOpen, setIsSubnavOpen] = useState(false);

  const handleSubnavToggle = () => {
    setIsSubnavOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className='area'></div>
      <nav className='main-menu'>
        <ul>
          <li>
            <a href='https://jbfarrow.com'>
              <i className='fa fa-home fa-2x'></i>
              <span className='nav-text'>Community Dashboard</span>
            </a>
          </li>
          <li className={isSubnavOpen ? 'has-subnav open' : 'has-subnav'}>
            <a href='#' onClick={handleSubnavToggle}>
              <i className='fa fa-globe fa-2x'></i>
              <span className='nav-text'>Global Surveyors</span>
            </a>
          </li>
          {isSubnavOpen && (
            <ul className='subnav'>
              <li>
                <a href='#'>Submenu Item 1</a>
              </li>
              <li>
                <a href='#'>Submenu Item 2</a>
              </li>
              {/* Add more submenu items as needed */}
            </ul>
          )}
          <li className='has-subnav'>
            <a href='#'>
              <i className='fa fa-comments fa-2x'></i>
              <span className='nav-text'>Group Hub Forums</span>
            </a>
          </li>
          <li className='has-subnav'>
            <a href='#'>
              <i className='fa fa-camera-retro fa-2x'></i>
              <span className='nav-text'>Survey Photos</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-film fa-2x'></i>
              <span className='nav-text'>Surveying Tutorials</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-book fa-2x'></i>
              <span className='nav-text'>Surveying Jobs</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-cogs fa-2x'></i>
              <span className='nav-text'>Tools &amp; Resources</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-map-marker fa-2x'></i>
              <span className='nav-text'>Member Map</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='fa fa-info fa-2x'></i>
              <span className='nav-text'>Documentation</span>
            </a>
          </li>
        </ul>

        <ul className='logout'>
          <li>
            <a href='#'>
              <i className='fa fa-power-off fa-2x'></i>
              <span className='nav-text'>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
