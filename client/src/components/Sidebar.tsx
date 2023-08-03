import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MenuItem, Menu } from 'react-pro-sidebar';
import './sidebar.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
// import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
// import { IconButton } from '@mui/material';

const menuItems = [
  {
    label: 'Home',
    icon: <HomeOutlinedIcon />,
    path: '/home',
  },
  {
    label: 'Projects',
    icon: <FolderOutlinedIcon />,
    path: '/projects',
  },
  {
    label: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    path: '/dashboard',
  },
  {
    label: 'Diagram',
    icon: <PolylineOutlinedIcon />,
    path: '/diagram',
  },
  {
    label: 'List',
    icon: <ListAltOutlinedIcon />,
    path: '/list',
  },
  {
    label: 'Settings',
    icon: <SettingsOutlinedIcon />,
    path: '/settings',
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const handleMenuItemClick = (idx) => {
    setSelectedMenuItem(idx);
  };

  return (
    <div>
      {/* <div className={`sidebar-header ${collapsed ? 'collapsed' : ''}`}></div>
      <IconButton onClick={toggleSidebar}>
        {collapsed ? (
          <KeyboardDoubleArrowRightOutlinedIcon />
        ) : (
          <KeyboardDoubleArrowLeftOutlinedIcon />
        )}
      </IconButton> */}
      <Menu className={`main-menu ${collapsed ? 'collapsed' : ''}`}>
        {menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            icon={item.icon}
            onClick={() => {
              handleMenuItemClick(idx);
              handleClick(item.path);
            }}
            style={
              selectedMenuItem === idx ? { backgroundColor: '#143542' } : {}
            }
          >
            <a href='#'>
              <span className='nav-text'>{item.label}</span>
            </a>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Sidebar;
