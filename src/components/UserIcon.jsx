import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Tooltip,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SignIn from './SignIn';

export default function UserIcon() {
  const { user, logout, loading } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <CircularProgress size={24} color="inherit" />
      </Box>
    );
  }

  return (
    <>
      {user ? (
        <Box>
          <Tooltip title={user.name}>
            <IconButton onClick={handleMenu} sx={{ ml: 2 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 40,
                  height: 40,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
                  }
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                background: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '& .MuiMenuItem-root': {
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(56, 189, 248, 0.1)',
                  }
                }
              }
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      ) : (
        <Box>
          <Tooltip title="Sign In">
            <IconButton
              onClick={() => setShowSignIn(true)}
              sx={{
                ml: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  '& .MuiSvgIcon-root': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <PersonIcon
                sx={{
                  color: 'white',
                  fontSize: 28,
                  transition: 'all 0.3s ease',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <SignIn
        open={showSignIn}
        onClose={() => setShowSignIn(false)}
      />
    </>
  );
} 