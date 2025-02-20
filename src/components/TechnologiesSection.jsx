import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Tooltip, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const slideUp = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(124, 58, 237, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const revealFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const revealText = keyframes`
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
`;

const glowText = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(37, 99, 235, 0.5); }
  50% { text-shadow: 0 0 40px rgba(124, 58, 237, 0.8); }
`;

const floatTitle = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatIn = keyframes`
  0% { transform: translateY(100px) scale(0.9); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const morphGradient = keyframes`
  0% {
    background-position: 0% 50%;
    border-radius: 30px 70px 70px 30px;
  }
  50% {
    background-position: 100% 50%;
    border-radius: 70px 30px 30px 70px;
  }
  100% {
    background-position: 0% 50%;
    border-radius: 30px 70px 70px 30px;
  }
`;

const rippleEffect = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.2);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
`;

const textShine = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const neonPulse = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #2563eb,
      0 0 82px #2563eb,
      0 0 92px #2563eb;
  }
  50% {
    text-shadow: 
      0 0 4px #fff,
      0 0 7px #fff,
      0 0 13px #fff,
      0 0 25px #2563eb,
      0 0 50px #2563eb,
      0 0 60px #2563eb;
  }
`;

const rotateGradient = keyframes`
  0% {
    background-position: 0% 0%;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  50% {
    background-position: 100% 100%;
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }
  100% {
    background-position: 0% 0%;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
`;

const floatWithGlow = keyframes`
  0%, 100% {
    transform: translateY(0);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
  }
  50% {
    transform: translateY(-10px);
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const YOLO_ICON = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2YxZjVmOSIgZD0iTTEyIDJMMyA5bDkgN2w5LTctOXoiLz48cGF0aCBmaWxsPSIjZjFmNWY5IiBkPSJNMyA5djZsOSA3IDktN1Y5bC05IDd6Ii8+PC9zdmc+`;

const KERAS_ICON = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHBhdGggZmlsbD0iI2Q0MDAzMCIgZD0iTTAgMGg0OHY0OEgweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMiAxMGgydjI4aC0yem00IDEybDEyLTE0aDNMMTkgMjJsMTIgMTZoLTNsLTEyLTE2eiIvPjwvc3ZnPg==`;

const PYTORCH_ICON = 'https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg';

const technologies = [
  {
    name: 'Python',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
    animation: float,
    delay: '0s',
    features: 'High-level programming language with emphasis on code readability and versatility'
  },
  {
    name: 'TensorFlow',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
    animation: spin,
    delay: '0.1s',
    features: 'Open-source machine learning framework with powerful tools for deep learning'
  },
  {
    name: 'Keras',
    icon: KERAS_ICON,
    animation: float,
    delay: '0.2s',
    features: 'High-level neural network library that runs on top of TensorFlow, focused on deep learning'
  },
  {
    name: 'OpenCV',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg',
    animation: pulse,
    delay: '0.3s',
    features: 'Computer vision library with real-time image processing and video analysis capabilities'
  },
  {
    name: 'MongoDB',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
    animation: float,
    delay: '0.4s',
    features: 'NoSQL database with high scalability and flexible document-based structure'
  },
  {
    name: 'Express',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
    animation: pulse,
    delay: '0.5s',
    features: 'Fast, unopinionated web framework for Node.js with robust routing and middleware'
  },
  {
    name: 'React',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
    animation: spin,
    delay: '0.6s',
    features: 'JavaScript library for building user interfaces with component-based architecture'
  },
  {
    name: 'Node.js',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
    animation: float,
    delay: '0.7s',
    features: `JavaScript runtime built on Chrome's V8 engine for server-side development`
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
    animation: pulse,
    delay: '0.8s',
    features: 'Utility-first CSS framework for rapid UI development with highly customizable components'
  },
  {
    name: 'Redux',
    icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
    animation: spin,
    delay: '0.9s',
    features: 'Predictable state container for JavaScript apps with centralized state management'
  },
  {
    name: 'YOLO',
    icon: YOLO_ICON,
    animation: float,
    delay: '1s',
    features: 'Real-time object detection system using deep learning with state-of-the-art accuracy'
  }
];

const FrameworkSection = ({ isVisible }) => {
  const categories = [
    {
      title: "Deep Learning Frameworks",
      description: "TensorFlow and Keras are the backbone of model creation and training, providing scalable AI solutions.",
      icon: "🧠",
      gradient: "linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)",
      technologies: [
        {
          name: 'TensorFlow',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg',
          description: 'Open-source machine learning platform',
          animation: spin
        },
        {
          name: 'Keras',
          icon: KERAS_ICON,
          description: 'High-level neural networks API',
          animation: float
        }
      ]
    },
    {
      title: "Full Stack Development",
      description: "Modern web development stack for building robust and scalable applications.",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
      technologies: [
        {
          name: 'React',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
          description: 'Frontend UI Framework',
          animation: spin
        },
        {
          name: 'Node.js',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
          description: 'Backend Runtime Environment',
          animation: float
        },
        {
          name: 'Express',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
          description: 'Web Application Framework',
          animation: pulse
        },
        {
          name: 'MongoDB',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
          description: 'NoSQL Database',
          animation: float
        }
      ]
    },  
    {
      title: "Computer Vision",
      description: "Advanced image processing, object detection, and deep learning capabilities.",
      icon: "👁️",
      gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
      technologies: [
        {
          name: 'OpenCV',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg',
          description: 'Computer Vision Library for real-time image and video processing',
          animation: pulse
        },
        {
          name: 'PyTorch',
          icon: PYTORCH_ICON,
          description: 'Deep learning framework with strong GPU acceleration and dynamic computational graphs',
          animation: float
        },
        {
          name: 'YOLO',
          icon: YOLO_ICON,
          description: 'Real-time Object Detection with state-of-the-art accuracy',
          animation: float
        }
      ]
    },
    {
      title: "Development Tools",
      description: "Essential tools for efficient development and styling.",
      icon: "🛠️",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
      technologies: [
        {
          name: 'Python',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
          description: 'Core Programming Language',
          animation: float
        },
        {
          name: 'Redux',
          icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg',
          description: 'State Management',
          animation: spin
        },
        {
          name: 'Tailwind CSS',
          icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
          description: 'Utility-first CSS Framework',
          animation: pulse
        }
      ]
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {categories.map((category, index) => (
        <Box
          key={category.title}
          sx={{
            mb: 8,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`,
          }}
        >
          {/* Category Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              mb: 4,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -10,
                width: '100%',
                height: '2px',
                background: category.gradient,
                opacity: 0.3,
              }
            }}
          >
            <Box
              sx={{
                fontSize: '3rem',
                animation: `${floatWithGlow} 3s ease-in-out infinite`,
                filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.5))',
              }}
            >
              {category.icon}
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  background: category.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                {category.title}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1.1rem',
                  maxWidth: '800px',
                  lineHeight: 1.6,
                }}
              >
                {category.description}
              </Typography>
            </Box>
          </Box>

          {/* Technologies Grid with enhanced hover animations */}
          <Grid container spacing={3}>
            {category.technologies.map((tech, techIndex) => (
              <Grid item xs={12} sm={6} key={tech.name}>
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(15, 23, 42, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                    
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -100,
                      left: -100,
                      right: -100,
                      bottom: -100,
                      background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
                      opacity: 0,
                      transition: 'all 0.6s ease',
                      transform: 'scale(0.5)',
                    },
                    
                    // Hover effects
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: 'rgba(15, 23, 42, 0.4)',
                      borderColor: 'rgba(56, 189, 248, 0.3)',
                      boxShadow: `
                        0 10px 40px -10px rgba(0, 0, 0, 0.5),
                        0 0 20px rgba(56, 189, 248, 0.2)
                      `,
                      
                      '&::before': {
                        opacity: 1,
                      },
                      
                      '&::after': {
                        opacity: 1,
                        transform: 'scale(1)',
                      },
                      
                      '& .tech-icon': {
                        transform: 'scale(1.1) translateY(-5px)',
                        filter: 'drop-shadow(0 10px 20px rgba(56, 189, 248, 0.3))',
                      },
                      
                      '& .tech-name': {
                        background: 'linear-gradient(to right, #38BDF8, #818CF8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transform: 'translateY(-2px)',
                      },
                      
                      '& .tech-description': {
                        color: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                      }
                    }
                  }}
                >
                  <Box
                    className="tech-icon"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      mb: 3,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <Box
                      component="img"
                      src={tech.icon}
                      alt={tech.name}
                      sx={{
                        width: 48,
                        height: 48,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                      }}
                    />
                    <Typography
                      variant="h5"
                      className="tech-name"
                      sx={{
                        fontWeight: 700,
                        color: 'white',
                        transition: 'all 0.4s ease',
                        position: 'relative',
                      }}
                    >
                      {tech.name}
                    </Typography>
                  </Box>
                  <Typography
                    className="tech-description"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      transition: 'all 0.4s ease',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {tech.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

const cursorGlow = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;

const TechnologiesSection = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const gridRef = useRef(null);
  const frameworkRef = useRef(null);
  const [isFrameworkVisible, setIsFrameworkVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const itemId = entry.target.getAttribute('data-tech-id');
          setVisibleItems(prev => new Set([...prev, itemId]));
          
          entry.target.style.animation = `${fadeInUp} 0.6s ease-out ${entry.target.dataset.index * 0.1}s forwards`;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const gridItems = document.querySelectorAll('[data-tech-id]');
    gridItems.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frameworkObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFrameworkVisible(true);
          entry.target.style.animation = `${floatIn} 0.8s ease-out forwards`;
          frameworkObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (frameworkRef.current) {
      frameworkObserver.observe(frameworkRef.current);
    }

    return () => frameworkObserver.disconnect();
  }, []);

  return (
    <Box
      id="technology-section"
      sx={{
        py: { xs: 10, md: 15 },
        pb: { xs: 2, md: 4 },
        background: 'linear-gradient(180deg, #0A1929 0%, #132F4C 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)
          `,
          filter: 'blur(80px)',
          animation: `${pulse} 15s ease-in-out infinite`,
        }
      }}
    >
      {/* Enhanced background animations */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.4) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.4) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.2) 0%, transparent 50%)
          `,
          filter: 'blur(60px)',
          animation: `${morphGradient} 20s ease-in-out infinite`,
        }}
      />

      <Container maxWidth="lg">
        {/* Enhanced title section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 12,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
              animation: `${pulse} 10s ease-in-out infinite`,
              zIndex: -1,
            }
          }}
        >
          <Typography
            variant="h2"
            sx={{
              position: 'relative',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              '& .main-title': {
                display: 'block',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                background: 'linear-gradient(to right, #38BDF8, #6366F1, #38BDF8)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `${textShine} 3s linear infinite`,
                mb: 2,
                textTransform: 'none',
              },
              '& .subtitle': {
                display: 'block',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
              }
            }}
          >
            <span className="subtitle">Empowered by</span>
            <span className="main-title">Advanced Technologies</span>
          </Typography>
        </Box>

        {/* Framework section with enhanced animations */}
        <Box 
          ref={frameworkRef}
          sx={{
            position: 'relative',
            zIndex: 1,
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(isFrameworkVisible && {
              opacity: 1,
              transform: 'translateY(0)',
            }),
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent)',
              animation: `${shimmer} 2s linear infinite`,
            }
          }}
        >
          <FrameworkSection isVisible={isFrameworkVisible} />
        </Box>
      </Container>
    </Box>
  );
};

export default TechnologiesSection; 