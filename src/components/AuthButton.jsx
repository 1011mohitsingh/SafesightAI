import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
  IconButton,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  Login,
  PersonAdd,
  Settings,
  Logout,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AuthButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with your auth state
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  const handleSignup = () => {
    navigate('/signup');
    handleClose();
  };

  const handleLogout = () => {
    // Add your logout logic here
    setIsAuthenticated(false);
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  if (!isAuthenticated) {
    return (
      <Box>
        <Button
          color="inherit"
          onClick={handleMenu}
          startIcon={<AccountCircle />}
        >
          Login
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 180,
              borderRadius: 2,
              '& .MuiMenuItem-root': {
                typography: 'body2',
                padding: 2,
              },
            },
          }}
        >
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
          <MenuItem onClick={handleSignup}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Sign up
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Box>
      <IconButton onClick={handleMenu} sx={{ padding: 0.5 }}>
        <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              padding: 2,
            },
          },
        }}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AuthButton; 