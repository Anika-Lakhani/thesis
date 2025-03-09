import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('regular');
  const [useDyslexicFont, setUseDyslexicFont] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('regular');
  const [theme, setTheme] = useState('system');

  // Load saved settings on mount
  useEffect(() => {
    chrome.storage.sync.get(
      ['fontSize', 'useDyslexicFont', 'theme', 'autoPlayAudio', 'playbackSpeed'],
      (result) => {
        if (result.fontSize) setFontSize(result.fontSize);
        if (result.useDyslexicFont !== undefined) setUseDyslexicFont(result.useDyslexicFont);
        if (result.theme) setTheme(result.theme);
        if (result.autoPlayAudio !== undefined) setAutoPlayAudio(result.autoPlayAudio);
        if (result.playbackSpeed) setPlaybackSpeed(result.playbackSpeed);
      }
    );
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
      regular: {
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
    const selectedSize = fontSizes[fontSize] || fontSizes.regular;
    
    root.style.setProperty('--font-size-base', selectedSize.base);
    root.style.setProperty('--font-size-h2', selectedSize.h2);
    root.style.setProperty('--font-size-h3', selectedSize.h3);
    root.style.setProperty('--font-size-p', selectedSize.p);
    
    // Save to storage
    chrome.storage.sync.set({ fontSize });
  }, [fontSize]);

  // Apply font changes
  useEffect(() => {
    console.log('Font preference changed:', useDyslexicFont);
    const root = document.documentElement;
    if (useDyslexicFont) {
      root.setAttribute('data-dyslexic-font', 'true');
    } else {
      root.removeAttribute('data-dyslexic-font');
    }
    chrome.storage.sync.set({ useDyslexicFont });
  }, [useDyslexicFont]);

  // Save settings whenever they change
  useEffect(() => {
    chrome.storage.sync.set({
      fontSize,
      useDyslexicFont,
      theme,
      autoPlayAudio,
      playbackSpeed
    });
  }, [fontSize, useDyslexicFont, theme, autoPlayAudio, playbackSpeed]);

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

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        useDyslexicFont,
        setUseDyslexicFont,
        theme,
        setTheme,
        autoPlayAudio,
        setAutoPlayAudio,
        playbackSpeed,
        setPlaybackSpeed,
        getFontSizeValue,
        getTheme,
      }}
    >
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