import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('small');

  // Load saved settings on mount
  useEffect(() => {
    chrome.storage.sync.get(['theme', 'fontSize'], (result) => {
      if (result.theme) setTheme(result.theme);
      if (result.fontSize) setFontSize(result.fontSize);
    });
  }, []);

  // Save settings whenever they change
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    chrome.storage.sync.set({ theme: newTheme });
  };

  const updateFontSize = (newSize) => {
    setFontSize(newSize);
    chrome.storage.sync.set({ fontSize: newSize });
  };

  const getFontSizeValue = () => {
    switch (fontSize) {
      case 'large': return '1.4rem';
      case 'medium': return '1.2rem';
      case 'small': return '1rem';
      default: return '1rem';
    }
  };

  const getTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  const value = {
    theme,
    setTheme: updateTheme,
    fontSize,
    setFontSize: updateFontSize,
    getFontSizeValue,
    getTheme,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);