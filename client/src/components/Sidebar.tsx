import React, { useState } from 'react';
//import react pro sidebar
import { Sidebar as ReactSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import mui icons for sidebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';

function Sidebar() {
  //sidebarCollapse state using useState hook
  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  //func that will change sidebarCollapse state from false to true and true to false
  const sidebarIconClick = () => {
    //condition checking to change state from true to false and vice versa
    sidebarCollapse ? setSidebarCollapse(false) : setSidebarCollapse(true);
  };

  return (
    <div>
      <ReactSidebar collapsed={sidebarCollapse}>
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
        <Menu>
          <MenuItem icon={<HomeOutlinedIcon />}>Homne</MenuItem>
          <MenuItem icon={<FolderOutlinedIcon />}> Projects</MenuItem>
          <MenuItem icon={<DashboardOutlinedIcon />}>Dashboard</MenuItem>
          <MenuItem icon={<ListAltOutlinedIcon />}>List</MenuItem>
          <MenuItem icon={<PolylineOutlinedIcon />}>Diagram</MenuItem>
          <MenuItem icon={<SettingsOutlinedIcon />}>Settings</MenuItem>
        </Menu>
      </ReactSidebar>
    </div>
  );
}

export default Sidebar;
