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

  // Apply theme changes
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      let effectiveTheme = theme;
      
      if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      // Set data-theme attribute instead of individual CSS variables
      root.setAttribute('data-theme', effectiveTheme);
    };

    applyTheme();
    chrome.storage.sync.set({ theme });

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(applyTheme);

    return () => mediaQuery.removeListener(applyTheme);
  }, [theme]);

  // Apply font size changes to the popup
  useEffect(() => {
    const fontSizes = {
      small: {
        base: '14px',
        h2: '20px',
        h3: '16px',
        p: '14px'
      },
      medium: {
        base: '16px',
        h2: '24px',
        h3: '18px',
        p: '16px'
      },
      large: {
        base: '18px',
        h2: '28px',
        h3: '20px',
        p: '18px'
      }
    };

    const root = document.documentElement;
    const sizes = fontSizes[fontSize];
    
    root.style.setProperty('--font-size-base', sizes.base);
    root.style.setProperty('--font-size-h2', sizes.h2);
    root.style.setProperty('--font-size-h3', sizes.h3);
    root.style.setProperty('--font-size-p', sizes.p);
    
    // Save to storage
    chrome.storage.sync.set({ fontSize });
  }, [fontSize]);

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
    setTheme,
    fontSize,
    setFontSize,
    getFontSizeValue,
    getTheme,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};