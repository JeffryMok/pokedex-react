import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import { css } from '@emotion/css';

const Header = ({ title }) => {
  const [isopenDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setOpenDrawer(!isopenDrawer);
  };

  const handleClickMenu = (url) => {
    navigate(url);
    setOpenDrawer(false);
  }

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={() => handleClickMenu(-1)}>
          <ListItemIcon><ArrowBackIcon /></ListItemIcon>
          <ListItemText primary="Back" />
        </ListItem>
        <ListItem button onClick={() => handleClickMenu('/')}>
          <ListItemText primary="Pokemon List" />
        </ListItem>
        <ListItem button onClick={() => handleClickMenu('/my-list')}>
          <ListItemText primary="My Pokemon List" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar
        position="static"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <div className={css`font-size: 24px; font-weight: 600`}>
            {title}
          </div>
        </Toolbar>
        <nav>
          <Drawer
            variant="temporary"
            open={isopenDrawer}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </AppBar>
    </div>
  );
};

export default Header;