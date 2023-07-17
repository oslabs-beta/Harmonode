import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function NavBar() {
  return (
    <div>
        
      <Sidebar>
        <Menu>
          <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
          <MenuItem>Projects</MenuItem> 
          <MenuItem>List</MenuItem>
          <MenuItem>Diagram</MenuItem>
          <MenuItem>Settings</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default NavBar;
