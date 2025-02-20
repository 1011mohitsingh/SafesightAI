import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  IconButton, 
  Link,
  useTheme,
  styled,
  keyframes
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  LinkedIn, 
  Instagram,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledFooterSection = styled(Box)(({ theme }) => ({
  animation: `${fadeInUp} 0.6s ease-out forwards`,
  opacity: 0,
  '&:nth-of-type(1)': {
    animationDelay: '0.1s',
  },
  '&:nth-of-type(2)': {
    animationDelay: '0.2s',
  },
  '&:nth-of-type(3)': {
    animationDelay: '0.3s',
  },
  '&:nth-of-type(4)': {
    animationDelay: '0.4s',
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateY(-3px)',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(5px)',
  },
}));

const Footer = ({ darkMode }) => {
  const theme = useTheme();
  const { translations } = useLanguage();

  const scrollToSection = (sectionId) => {
    if (sectionId === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If on a different page, first go to home page then scroll
      window.location.href = '/?scrollTo=' + sectionId;
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e293b',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        zIndex: 10,
        mt: 'auto',
        paddingTop: 8,
        marginTop: '100px',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #1e293b)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledFooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                SafeSight AI
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Advancing security through intelligent face and object detection technology.
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <SocialIconButton>
                  <Facebook />
                </SocialIconButton>
                <SocialIconButton>
                  <Twitter />
                </SocialIconButton>
                <SocialIconButton>
                  <LinkedIn />
                </SocialIconButton>
                <SocialIconButton>
                  <Instagram />
                </SocialIconButton>
              </Box>
            </StyledFooterSection>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledFooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Quick Links
              </Typography>
              <FooterLink 
                component="button"
                onClick={() => scrollToSection('top')}
                sx={{ cursor: 'pointer' }}
              >
                Home
              </FooterLink>
              <FooterLink 
                href="/detection"
                sx={{ cursor: 'pointer' }}
              >
                Object Detection
              </FooterLink>
              <FooterLink 
                component="button"
                onClick={() => scrollToSection('technology-section')}
                sx={{ cursor: 'pointer' }}
              >
                Technology
              </FooterLink>
              <FooterLink 
                href="/pricing"
                sx={{ cursor: 'pointer' }}
              >
                Pricing
              </FooterLink>
              <FooterLink 
                component="button"
                onClick={() => scrollToSection('about-section')}
                sx={{ 
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  }
                }}
              >
                About Us
              </FooterLink>
              <FooterLink 
                href="/privacy"
                sx={{ cursor: 'pointer' }}
              >
                Privacy Policy
              </FooterLink>
            </StyledFooterSection>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledFooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Us
              </Typography>
              <FooterLink href="mailto:info@safesight.ai">
                <Email fontSize="small" /> info@safesight.ai
              </FooterLink>
              <FooterLink href="tel:+1234567890">
                <Phone fontSize="small" /> +1 (234) 567-890
              </FooterLink>
              <FooterLink href="#">
                <LocationOn fontSize="small" /> Vadodara, Gujarat, India
              </FooterLink>
            </StyledFooterSection>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StyledFooterSection>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Subscribe to our newsletter for updates and insights.
              </Typography>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {/* Add newsletter form here if needed */}
              </Box>
            </StyledFooterSection>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
            animation: `${fadeInUp} 0.6s ease-out 0.5s forwards`,
            opacity: 0,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SafeSight AI. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary"> Made by Dynamic Coders with &#9829; </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 