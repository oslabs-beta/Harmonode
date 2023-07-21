import React, {useState, useContext} from 'react';

//import react pro sidebar
import {
  Sidebar as ReactSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';
import {useNavigate} from 'react-router';
//import mui icons for sidebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
//import global state DirTreeHolder
import {DirTreeHolder} from '../context/contextStore';

function Sidebar() {
  //assign globalDir and dirDispatcher using useContext
  const {globalDir, dirDispatcher} = useContext(DirTreeHolder);
  console.log(globalDir.dirTree.name);
  //sidebarCollapse state using useState hook
  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  //func that will change sidebarCollapse state from false to true and true to false
  const sidebarIconClick = () => {
    //condition checking to change state from true to false and vice versa
    sidebarCollapse ? setSidebarCollapse(false) : setSidebarCollapse(true);
  };

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    // console.log(window.location.href, 'url');
  };

  // const testClick = () => {
  //   dirDispatcher({type: 'setDirTree', payload: 'leaf'})
  // }

  return (
    <div className='sidebar-container'>
      <ReactSidebar
        rootStyles={{
          backgroundColor: 'var(--secondary-color)',
          padding: '1em',
          color: 'white',
          height: 'calc(100% - 2em)', // 2 * padding
          overflow: 'hidden',
        }}
        backgroundColor='var(--secondary-color)'
        collapsed={sidebarCollapse}
      >
        {/* <SidebarHeader> */}
        <div className='nametext'>
          {/* small and big changes using sidebarCollapse state */}
          <p>{sidebarCollapse ? 'Hn' : 'Harmonode'}</p>
        </div>
        <div onClick={sidebarIconClick} style={{cursor: 'pointer'}}>
          {/* changing sidebar collapse icon on click */}
          {sidebarCollapse ? (
            <KeyboardDoubleArrowRightOutlinedIcon />
          ) : (
            <KeyboardDoubleArrowLeftOutlinedIcon />
          )}
        </div>
        {/* </SidebarHeader> */}
        {/* <button onClick={() => { 
          console.log('clicked', globalDir.dirTree)
        }} type='button'>clickMe2</button>
        <button onClick={testClick} type='button'>clickMe</button> */}
        <Menu
          menuItemStyles={{
            button: {'&:hover': {backgroundColor: 'var(--primary-color)'}},
          }}
        >
          <MenuItem icon={<HomeOutlinedIcon />}>Home</MenuItem>
          <MenuItem
            icon={<FolderOutlinedIcon />}
            onClick={() => handleClick('/projects')}
          >
            Projects
          </MenuItem>
          <MenuItem
            icon={<DashboardOutlinedIcon />}
            onClick={() => handleClick('/dashboard')}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<ListAltOutlinedIcon />}
            onClick={() => handleClick('/list')}
          >
            List
          </MenuItem>
          <MenuItem
            icon={<PolylineOutlinedIcon />}
            onClick={() => handleClick('/diagram')}
          >
            Diagram
          </MenuItem>
          <MenuItem
            icon={<SettingsOutlinedIcon />}
            onClick={() => handleClick('/settings')}
          >
            Settings
          </MenuItem>
        </Menu>
      </ReactSidebar>
    </div>
  );
}

export default Sidebar;
