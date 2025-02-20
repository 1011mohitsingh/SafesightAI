import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Spline from '@splinetool/react-spline';
import { useLanguage } from '../contexts/LanguageContext';

const LandingPage = () => {
  const theme = useTheme();
  const { translations } = useLanguage();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '64px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: ['300px', '400px', '500px'][i],
              height: ['300px', '400px', '500px'][i],
              borderRadius: '50%',
              background: theme.palette.gradient.primary,
              opacity: 0.03,
              filter: 'blur(100px)',
              animation: `float-${i} ${20 + i * 5}s ease-in-out infinite`,
              top: ['20%', '50%', '70%'][i],
              left: ['20%', '50%', '70%'][i],
              '@keyframes float-0': {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '50%': { transform: 'translate(50px, -50px)' },
              },
              '@keyframes float-1': {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '50%': { transform: 'translate(-50px, 50px)' },
              },
              '@keyframes float-2': {
                '0%, 100%': { transform: 'translate(0, 0)' },
                '50%': { transform: 'translate(50px, 50px)' },
              },
            }}
          />
        ))}
      </Box>

      {/* 3D Model Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '90vh',
          flex: 1,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'translateY(-1%)',
          animation: 'fadeIn 1.5s ease-out',
          '& > div': {
            width: '100%',
            height: '100%',
            transform: 'scale(1.3)',
            transformOrigin: 'center 45%',
            transition: 'transform 0.5s ease-out',
          },
          '@media (max-width: 1200px)': {
            '& > div': {
              transform: 'scale(1.2)',
            },
          },
          '@media (max-width: 900px)': {
            '& > div': {
              transform: 'scale(1.1)',
            },
          },
          '@keyframes fadeIn': {
            from: {
              opacity: 0,
            },
            to: {
              opacity: 1,
            },
          },
        }}
      >
        <Spline scene="https://prod.spline.design/z6iM9Lvi2W-a5tFH/scene.splinecode" />
      </Box>

      {/* Content Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '0 5%',
          paddingTop: '70px',
          background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 30%, rgba(15, 23, 42, 0.1) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
          animation: 'gradientFadeIn 1s ease-out',
          '@keyframes gradientFadeIn': {
            from: {
              opacity: 0,
              background: 'transparent',
            },
            to: {
              opacity: 1,
              background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 30%, rgba(15, 23, 42, 0.1) 100%)',
            },
          },
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '800px',
            width: '100%',
            position: 'relative',
            marginTop: '-2px',
            textAlign: 'center',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.9,
            pt: 0,
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '0px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: theme.palette.gradient.primary,
              borderRadius: '2px',
              opacity: 0.7,
            },
            animation: 'slideDown 0.8s ease-out',
            '@keyframes slideDown': {
              from: {
                transform: 'translateY(-20px)',
                opacity: 0,
              },
              to: {
                transform: 'translateY(0)',
                opacity: 1,
              },
            },
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: 'text.primary',
              fontWeight: 800,
              mb: 1.5,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              animation: 'titleFadeIn 1s ease-out 0.3s both',
              '@keyframes titleFadeIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {translations.welcome}
          </Typography>
          <Typography 
            variant="h5" 
            paragraph
            sx={{ 
              color: 'text.secondary',
              mb: 1.5,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              textShadow: '0 1px 5px rgba(0,0,0,0.1)',
              animation: 'descriptionSlideUp 1s ease-out 0.6s both',
              margin: '0 auto',
              maxWidth: '500px',
              position: 'relative',
              paddingY: 0.5,
              '@keyframes descriptionSlideUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {translations.description}
          </Typography>
        </Box>
      </Box>

      {/* Gradient Overlay with animation */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to bottom, transparent, #0f172a)',
          zIndex: 3,
          pointerEvents: 'none',
          animation: 'fadeIn 1s ease-out 1s both',
        }}
      />
    </Box>
  );
};

export default LandingPage;