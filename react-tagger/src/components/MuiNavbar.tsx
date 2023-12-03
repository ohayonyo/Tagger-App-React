import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom';

export const MuiNavbar = () => {
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
          
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login/Register
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};