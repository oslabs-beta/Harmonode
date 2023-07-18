import React, {useState} from 'react';
//import react pro sidebar
import {
  Sidebar as ReactSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';
//import mui icons for sidebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import {useNavigate} from 'react-router';
import './sidebar.css';

function Sidebar() {
  //sidebarCollapse state using useState hook
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const navigate = useNavigate();
  //func that will change sidebarCollapse state from false to true and true to false
  const sidebarIconClick = () => {
    //condition checking to change state from true to false and vice versa
    sidebarCollapse ? setSidebarCollapse(false) : setSidebarCollapse(true);
  };

  return (
    <div className='sidebar-container'>
      <ReactSidebar
        rootStyles={{
          padding: '1em',
          backgroundColor: 'rgb(94, 202, 75)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'space-between',
          overflow: 'hidden',
        }}
        backgroundColor='rgb(94, 202, 75)'
        collapsed={sidebarCollapse}
        className='sidebar'
      >
        {/* <SidebarHeader> */}
        <div className='nametext'>
          {/* small and big changes using sidebarCollapse state */}
          <p>{sidebarCollapse ? 'Hn' : 'Harmonode'}</p>
        </div>
        <div onClick={sidebarIconClick}>
          {/* changing sidebar collapse icon on click */}
          {sidebarCollapse ? (
            <KeyboardDoubleArrowRightOutlinedIcon />
          ) : (
            <KeyboardDoubleArrowLeftOutlinedIcon />
          )}
        </div>
        {/* </SidebarHeader> */}
        <Menu className='sidebar-menu'>
          <MenuItem onClick={() => navigate('/')} icon={<HomeOutlinedIcon />}>
            Home
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/projects')}
            icon={<FolderOutlinedIcon />}
          >
            Projects
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/dash')}
            icon={<DashboardOutlinedIcon />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/list')}
            icon={<ListAltOutlinedIcon />}
          >
            List
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/diagram')}
            icon={<PolylineOutlinedIcon />}
          >
            Diagram
          </MenuItem>
          <MenuItem
            onClick={() => navigate('/settings')}
            icon={<SettingsOutlinedIcon />}
          >
            Settings
          </MenuItem>
        </Menu>
      </ReactSidebar>
    </div>
  );
}

export default Sidebar;
