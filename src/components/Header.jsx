import React, { useState} from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  Box,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  MenuList,
} from '@mui/material';
import { styled} from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLanguage } from '../contexts/LanguageContext';

const StyledHeader = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: 'transparent',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  zIndex: 1100,
  '&.scrolled': {
    background: 'linear-gradient(to right, rgba(17, 24, 39, 0.98), rgba(15, 23, 42, 0.98))',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(37, 99, 235, 0.1)',
  }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between', // This will keep the logo on the left and items on the right
  alignItems: 'center',
  padding: theme.spacing(0, 3),
  minHeight: '70px',
  background: 'linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(15, 23, 42, 0.95))',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(37, 99, 235, 0.1)',
  transition: 'all 0.3s ease',
}));


const AnimatedButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '8px 16px',
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.1), rgba(30, 58, 138, 0.1))',
  },
  '&.active': {
    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.1), rgba(30, 58, 138, 0.1))',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      background: 'linear-gradient(90deg, #38BDF8, #1E3A8A)',
    }
  }
}));

const Header = ({ onSignInClick }) => {
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [servicesAnchor, setServicesAnchor] = useState(null);
  const { language, setLanguage, translations } = useLanguage();
  const location = useLocation();

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = (newLanguage) => {
    if (newLanguage) {
      setLanguage(newLanguage);
    }
    setLanguageAnchor(null);
  };

  const scrollToTechnology = () => {
    const techSection = document.getElementById('technology-section');
    if (techSection) {
      techSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServicesClick = (event) => {
    setServicesAnchor(servicesAnchor ? null : event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchor(null);
  };

  const servicesOpen = Boolean(servicesAnchor);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <StyledHeader>
      <StyledToolbar>
        <Typography 
            component="span"
            onClick={() => {
              window.location.href = '/';  // Redirect to home page
              setTimeout(() => {
                window.location.reload();  // Refresh the page after redirect
                window.scrollTo(0, 0);     // Scroll to the top of the page
              }, 50);  // Slight delay to allow redirection before reload
            }}
            sx={{ 
              cursor: 'pointer',
              fontWeight: 800,
              background: 'linear-gradient(45deg, #38BDF8, #6366F1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.3s ease',
              textDecoration: 'none', // Ensures no underline appears
              '&:hover': {
                transform: 'scale(1.05)',
                filter: 'brightness(1.2)',
              }
            }}
          >
            SafeSight AI
        </Typography>

          <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 // Adjust the spacing as needed (e.g., 1, 1.5, or 3 for smaller or larger gaps)
            }}
            >
            <AnimatedButton
              onClick={handleServicesClick}
              sx={{
                color: 'text.primary',
                opacity: ['/detection', '/face-detection'].includes(location.pathname) ? 1 : 0.8,
                gap: 0.5,
              }}
              endIcon={
                <KeyboardArrowDownIcon
                  sx={{
                    transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              }
            >
              Our Services
            </AnimatedButton>
            <Popper
              open={servicesOpen}
              anchorEl={servicesAnchor}
              transition
              placement="bottom-start"
              sx={{ zIndex: 1301 }}
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper
                    sx={{
                      mt: 1,
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(30, 41, 59, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 2,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <ClickAwayListener onClickAway={handleServicesClose}>
                      <MenuList
                        autoFocusItem={servicesOpen}
                        sx={{ p: 1 }}
                      >
                        <MenuItem
                          component={Link}
                          to="/trisight"
                          onClick={handleServicesClose}
                          sx={{
                            borderRadius: 1.5,
                            py: 1.5,
                            px: 3,
                            minWidth: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                            color: '#fff',
                            transition: 'all 0.3s ease',
                            background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.05), rgba(124, 58, 237, 0.05))',
                            '&:hover': {
                              background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15), rgba(124, 58, 237, 0.15))',
                              transform: 'translateX(5px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            },
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              width: '4px',
                              height: '70%',
                              background: 'linear-gradient(to bottom, #38BDF8, #6366F1)',
                              borderRadius: '0 4px 4px 0',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                            },
                            '&:hover::before': {
                              opacity: 1,
                            }
                          }}
                        >
                          TriSight
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          

          <AnimatedButton 
            onClick={scrollToTechnology}
            sx={{ 
              color: 'text.primary',
              opacity: location.pathname === '/technology' ? 1 : 0.8,
            }}
          >
            {translations.technology}
          </AnimatedButton>
          <AnimatedButton 
            component={Link} 
            to="/pricing"
            sx={{ 
              color: 'text.primary',
              opacity: location.pathname === '/pricing' ? 1 : 0.8,
            }}
          >
            {translations.pricing}
          </AnimatedButton>
          <AnimatedButton 
            onClick={scrollToAbout}
            sx={{ 
              color: 'text.primary',
              opacity: location.pathname === '/about' ? 1 : 0.8,
            }}
          >
            {translations.aboutUs}
          </AnimatedButton>

          <AnimatedButton
            onClick={onSignInClick}
            sx={{ 
              color: 'text.primary',
              opacity: location.pathname === '/signin' ? 1 : 0.8,
            }}
          >
            {translations.signin}
          </AnimatedButton>

          <IconButton 
            onClick={handleLanguageClick} 
            sx={{ 
              color: 'text.primary',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'rotate(15deg)',
              },
            }}
          >
            <LanguageIcon />
          </IconButton>
          </Box>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={() => handleLanguageClose()}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
              },
            }}
          >
            <MenuItem 
              onClick={() => handleLanguageClose('english')}
              selected={language === 'english'}
            >
              English
            </MenuItem>
            <MenuItem 
              onClick={() => handleLanguageClose('hindi')}
              selected={language === 'hindi'}
            >
              हिंदी
            </MenuItem>
            </Menu>
      </StyledToolbar>
    </StyledHeader>
  );
};

export default Header;
