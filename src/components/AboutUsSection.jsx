import React, { forwardRef } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const cardHover = keyframes`
  0% {
    transform: translateY(0) scale(1);
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.2);
  }
  100% {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(37, 99, 235, 0.3);
  }
`;

const AboutUsSection = forwardRef((props, ref) => {
  const features = [
    {
      title: "Our Vision",
      description: "Pioneering AI-powered security solutions that create safer environments for everyone.",
      icon: "🎯",
      gradient: "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)"
    },
    {
      title: "Innovation",
      description: "Continuously advancing our technology with cutting-edge AI and machine learning capabilities.",
      icon: "💡",
      gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
    },
    {
      title: "Security First",
      description: "Ensuring robust protection while maintaining the highest standards of privacy and data security.",
      icon: "🛡️",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)"
    },
    {
      title: "Expert Team",
      description: "Backed by professionals with deep expertise in AI, computer vision, and cybersecurity.",
      icon: "👥",
      gradient: "linear-gradient(135deg, #EC4899 0%, #38BDF8 100%)"
    }
  ];

  return (
    <Box
      ref={ref}
      id="about-section"
      sx={{
        py: { xs: 8, md: 12 },
        pt: { xs: 2, md: 4 },
        background: 'linear-gradient(180deg, #132F4C 0%, #0A1929 100%)',
        position: 'relative',
        scrollMarginTop: '70px',
      }}
    >
      {/* Background Effects */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.4) 0%, transparent 30%)
          `,
          filter: 'blur(60px)',
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.1 },
            '50%': { opacity: 0.2 }
          }
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #38BDF8, #6366F1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              animation: `${fadeSlideUp} 0.8s ease-out`,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            About SafeSight AI
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '800px',
              mx: 'auto',
              animation: `${fadeSlideUp} 0.8s ease-out 0.2s both`,
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Transforming security through intelligent AI solutions
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  animation: `${fadeSlideUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(56, 189, 248, 0.3)',
                    border: '1px solid rgba(56, 189, 248, 0.5)',
                    background: 'rgba(15, 23, 42, 0.8)',
                    '& .feature-icon': {
                      transform: 'scale(1.2) rotate(8deg)',
                      filter: 'brightness(1.2)'
                    },
                    '& .feature-title': {
                      transform: 'scale(1.03)',
                      letterSpacing: '0.5px'
                    },
                    '& .feature-description': {
                      color: 'rgba(255, 255, 255, 0.95)'
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: feature.gradient,
                    opacity: 0.5,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    fontSize: '3rem',
                    mb: 2,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'inline-block',
                    filter: 'brightness(1)'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  className="feature-title"
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    background: feature.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  className="feature-description"
                  variant="body1"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.7,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

export default AboutUsSection; 