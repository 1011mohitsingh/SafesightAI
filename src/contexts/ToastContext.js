import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ToastStyles.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const showToast = (message) => {
    toast.success(message, {
    className: 'toast-message',
    bodyClassName: 'toast-message',
    position: "top-right",
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer className="toast-container" />
    </ToastContext.Provider>
  );
};