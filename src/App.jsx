import React, { useState} from "react";
import {  Routes, Route} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ToastProvider } from "./contexts/ToastContext";
import Footer from "./components/Footer";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TechnologiesSection from './components/TechnologiesSection';
import AboutUsSection from './components/AboutUsSection';
import './styles/globals.css';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2563eb",
      light: "#3b82f6",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#7c3aed",
      light: "#8b5cf6",
      dark: "#6d28d9",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
    },
    gradient: {
      primary: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      secondary: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 800,
      fontSize: "3.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
      color: "#f1f5f9",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: 500,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          border: `1px solid rgba(255,255,255,0.1)`,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@keyframes cursorFloat': {
          '0%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        body: {
          transition: "background-color 0.3s ease",
          "& button, & a, & [role='button'], & [tabindex='0']": {
            cursor: "pointer"
          }
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          '&.welcome-text': {
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          }
        }
      }
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const AppContent = ({ setIsSignInModalOpen, setIsForgotPasswordModalOpen, setIsRegisterModalOpen }) => {  
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative", isolation: "isolate" }}>
      <Header
        onSignInClick={() => {
          setIsSignInModalOpen(true);
          setIsForgotPasswordModalOpen(false);
          setIsRegisterModalOpen(false);
        }}
        onForgotPasswordClick={() => {
          setIsSignInModalOpen(false);
          setIsForgotPasswordModalOpen(true);
          setIsRegisterModalOpen(false);
        }}
        onRegisterClick={() => {
          setIsSignInModalOpen(false);
          setIsForgotPasswordModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", marginBottom: "0" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={
              <ResetPasswordPage
                isOpen={true} // Modal is always open for reset-password route
                onClose={() => console.log("Reset Password Modal Closed")}
                onSignInOpen={() => setIsSignInModalOpen(true)}
              />
            } />
        </Routes>
      </Box>
      <TechnologiesSection />
      <AboutUsSection />
      <Footer />
    </Box>
  );
};

function MainApp() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); // State for Sign-In modal visibility
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [resetToken, setResetToken] = useState(null); // State to store the reset token

  const handleOpenResetPasswordModal = (token) => {
    console.log("Opening reset password modal with token:", token);
    setResetToken(token);
    setIsResetPasswordModalOpen(true);
  };

  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <CssBaseline />
          {/* <Router> */}
            <AppContent 
              handleOpenResetPasswordModal={handleOpenResetPasswordModal}
              setIsSignInModalOpen={setIsSignInModalOpen}
              setIsForgotPasswordModalOpen={setIsForgotPasswordModalOpen}
              setIsRegisterModalOpen={setIsRegisterModalOpen}
            />
            {/* Modals */}
            {isSignInModalOpen && (
              <SignInPage
                isOpen={isSignInModalOpen}
                onClose={() => setIsSignInModalOpen(false)}
                onRegisterClick={() => {
                  setIsSignInModalOpen(false);
                  setIsRegisterModalOpen(true);
                }}
                onForgotPasswordClick={() => {
                  setIsSignInModalOpen(false);
                  setIsForgotPasswordModalOpen(true);
                }}
              />
            )}
            {isForgotPasswordModalOpen && (
              <ForgotPasswordPage
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
                onSignInClick={() => {
                  setIsForgotPasswordModalOpen(false);
                  setIsSignInModalOpen(true);
                }}
              />
            )}
            {isRegisterModalOpen && (
              <RegisterPage
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                onSignInClick={() => {
                  setIsRegisterModalOpen(false);
                  setIsSignInModalOpen(true);
                }}
              />
            )}
            {isResetPasswordModalOpen && (
              <ResetPasswordPage
                isOpen={isResetPasswordModalOpen}
                onClose={() => setIsResetPasswordModalOpen(false)}
                onSignInOpen={() => setIsSignInModalOpen(true)}
                token={resetToken}
              />
            )}
          </ToastProvider >
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default MainApp;