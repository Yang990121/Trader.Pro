import * as React from 'react';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Routes, Route, Link } from "react-router-dom";
import Popup from './Popup';
import Box from '@mui/material/Box';
import './Template.css';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const mainListItems = (
  <React.Fragment>
    <nav>
      <Link className='navName' to="/dashboard" >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
          </ListItemIcon>
            <ListItemText primary="Dashboard" />
      </ListItemButton>
      </Link>
    </nav>
    <ListItemButton>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <nav>
        <Link className='navName' to="/Discover">
        <ListItemText primary="Discover Stocks" />
        </Link>
      </nav>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NewspaperIcon />
      </ListItemIcon>
      <nav>
        <Link className='navName' to="/News">
        <ListItemText primary="Financial News" />
        </Link>
      </nav>
    </ListItemButton>
   
  </React.Fragment>
);

export default function SecondaryListItems() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
    window.location = "/login";
	};
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
      </ListSubheader>
      
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
      <ListItemText primary="Log Out" onClick={togglePopup}/>
      </ListItemButton>
      {isOpen && <Popup
      content={<>
      <Box>
        <b></b>
        <strong><p className='ConfirmText'>Confirm Log Out?</p></strong>
        <div className='ConfirmLogOut'>
        {/* <nav> */}

          {/* <Link className='navName' to="/SignIn"> */}
            <Button variant="outlined" onClick={handleLogout}><ExitToAppIcon />Log Out</Button>
          {/* </Link>
          </nav> */}
        </div>
      </Box>
      </>}
      handleClose={togglePopup}
    />}
      
      
    </React.Fragment>
  );
}
{/* <nav>
      <Link className='navName' to="/SignIn">
        <ListItemText primary="Log Out" />
      </Link>
    </nav> */}