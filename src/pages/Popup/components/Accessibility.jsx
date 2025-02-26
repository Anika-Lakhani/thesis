import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair, faMoon, faSun, faDesktop, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { useAccessibility } from '../context/AccessibilityContext';

const Accessibility = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { 
    fontSize, 
    setFontSize, 
    theme, 
    setTheme,
    useDyslexicFont,
    setUseDyslexicFont 
  } = useAccessibility();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleDyslexicFontToggle = (event) => {
    console.log('Dyslexic font checkbox clicked:', event.target.checked);
    setUseDyslexicFont(event.target.checked);
  };

  return (
    <div className="accessibility-wrapper" ref={menuRef}>
      <button 
        className="header-button accessibility-button" 
        aria-label="Accessibility options"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
      >
        <FontAwesomeIcon icon={faWheelchair} />
      </button>

      {isMenuOpen && (
        <div className="accessibility-menu">
          <h2>Accessibility Options</h2>
          
          <section className="accessibility-section">
            <h3>Font Size</h3>
            <div className="font-size-controls">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  className={`font-size-button ${fontSize === size ? 'active' : ''}`}
                  onClick={() => setFontSize(size)}
                  style={{ fontSize: size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px' }}
                >
                  Aa
                </button>
              ))}
            </div>
          </section>

          <section className="accessibility-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={useDyslexicFont}
                onChange={(e) => {
                  console.log('Dyslexic font checkbox clicked:', e.target.checked);
                  setUseDyslexicFont(e.target.checked);
                }}
                aria-label="Use dyslexia-friendly font"
              />
              <span>Use dyslexia-friendly font</span>
            </label>
          </section>

          <section className="accessibility-section">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Always automatically play auditory explanations</span>
            </label>
          </section>

          <section className="accessibility-section">
            <h3>Audio playback speed</h3>
            <div className="playback-speed-controls">
              <button className={`speed-button`}>slow</button>
              <button className={`speed-button active`}>regular</button>
              <button className={`speed-button`}>fast</button>
            </div>
          </section>

          <section className="accessibility-section">
            <h3>Viewing mode</h3>
            <div className="view-mode-controls">
              <button 
                className={`view-mode-button ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark')}
                aria-label="Dark mode"
              >
                <FontAwesomeIcon icon={faMoon} />
              </button>
              <button 
                className={`view-mode-button ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light')}
                aria-label="Light mode"
              >
                <FontAwesomeIcon icon={faSun} />
              </button>
              <button 
                className={`view-mode-button ${theme === 'system' ? 'active' : ''}`}
                onClick={() => handleThemeChange('system')}
                aria-label="System mode"
              >
                <FontAwesomeIcon icon={faLaptop} />
              </button>
            </div>
          </section>

          <section className="accessibility-section keyboard-tips">
            <h3>Keyboard Navigation Tips</h3>
            <p>Use the Tab key to navigate through interactive elements. Press Enter or Space to activate buttons and toggle checkboxes. Use arrow keys to adjust values where applicable.</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Accessibility; 