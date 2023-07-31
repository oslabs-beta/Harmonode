import React from 'react';
import { useNavigate } from 'react-router';
import { MenuItem, Menu } from 'react-pro-sidebar';
import './sidebar.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    console.log('CLICKED!!!!!!');
    navigate(path);
  };

  return (
    <div>
      <Menu className='main-menu'>
        <MenuItem
          icon={<HomeOutlinedIcon />}
          onClick={() => handleClick('/home')}
        >
          {/* <i className='fa fa-home fa-2x'></i> */}
          Home
        </MenuItem>
        <MenuItem
          icon={<FolderOutlinedIcon />}
          className='has-subnav'
          onClick={() => handleClick('/projects')}
        >
          <a href='#'>
            {/* <i className='fa fa-globe fa-2x'></i> */}
            <span className='nav-text'>Projects</span>
          </a>
        </MenuItem>
        <MenuItem
          icon={<DashboardOutlinedIcon />}
          className='has-subnav'
          onClick={() => handleClick('/Dashboard')}
        >
          <a href='#'>
            {/* <i className='fa fa-comments fa-2x'></i> */}
            <span className='nav-text'>Dashboard</span>
          </a>
        </MenuItem>
        <MenuItem
          icon={<PolylineOutlinedIcon />}
          className='has-subnav'
          onClick={() => handleClick('/diagram')}
        >
          <a href='#'>
            {/* <i className='fa fa-camera-retro fa-2x'></i> */}
            <span className='nav-text'>Diagram</span>
          </a>
        </MenuItem>
        <MenuItem
          onClick={() => handleClick('/list')}
          icon={<ListAltOutlinedIcon />}
        >
          <a href='#'>
            {/* <i className='fa fa-film fa-2x'></i> */}
            <span className='nav-text'>List</span>
          </a>
        </MenuItem>
        <MenuItem
          onClick={() => handleClick('/settings')}
          icon={<SettingsOutlinedIcon />}
        >
          <a href='#'>
            {/* <i className='fa fa-book fa-2x'></i> */}
            <span className='nav-text'>Settings</span>
          </a>
        </MenuItem>

        {/* <MenuItem className='logout'>
          <a href='#'>
            <i className='fa fa-power-off fa-2x'></i>
            <span className='nav-text'>Logout</span>
          </a>
        </MenuItem> */}
      </Menu>
    </div>
  );
};

export default Sidebar;
