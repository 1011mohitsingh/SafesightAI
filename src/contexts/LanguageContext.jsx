import React, { createContext, useContext, useState } from 'react';

const translations = {
  english: {
    welcome: "Welcome to SafeSight AI",
    description: "Revolutionizing public safety with cutting-edge AI-powered detection systems. Your safety, our priority.",
    home: "Home",
    ourservices: "Our Services",
    technology: "Technology",
    pricing: "Pricing",
    aboutUs: "About Us",
    signin: "SignIn",
    
  },
  hindi: {
    welcome: "सेफसाइट एआई में आपका स्वागत है",
    description: "अत्याधुनिक एआई-संचालित डिटेक्शन सिस्टम के साथ सार्वजनिक सुरक्षा को संशोधित करना। आपकी सुरक्षा, हमारी प्राथमिकता",
    home: "होम",
    ourservices: "हमारी सेवाएं",
    technology: "प्रौद्योगिकी",
    pricing: "मूल्य निर्धारण",
    aboutUs: "हमारे बारे में",
    signin: "साइन इन",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');

  const value = {
    language,
    setLanguage,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 