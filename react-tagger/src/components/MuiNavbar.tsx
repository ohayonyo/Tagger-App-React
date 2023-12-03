import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom';

type MuiNavbarProps = {
  links:{
    name:string
    url:string
  }[]
}

export const MuiNavbar = ({links}:MuiNavbarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <ImageIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TAGGERAPP
        </Typography>
        <Stack direction="row" spacing={2}>

          {links.map((link)=>{
            return <Button color="inherit" component={Link} to={link.url}>
            {link.name}
          </Button>
          })}
          
          {/* <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login/Register
          </Button> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};