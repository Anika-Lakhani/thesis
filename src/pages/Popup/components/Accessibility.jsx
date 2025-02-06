import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

const Accessibility = () => {
  const { theme, setTheme, fontSize, setFontSize } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const accessibilityRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accessibilityRef.current && !accessibilityRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="accessibility-container" ref={accessibilityRef}>
      <button 
        className="accessibility-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility options"
        tabIndex={0}
      >
        <i className="fas fa-wheelchair"></i>
      </button>

      {isOpen && (
        <div className="accessibility-menu" role="menu">
          <h2>Accessibility Options</h2>
          
          <div className="accessibility-section">
            <h3>Font Size</h3>
            <div className="button-group" role="radiogroup">
              <button 
                className={`setting-option ${fontSize === 'small' ? 'active' : ''}`}
                onClick={() => setFontSize('small')}
                style={{ fontSize: '14px' }}
              >
                Aa
              </button>
              <button 
                className={`setting-option ${fontSize === 'medium' ? 'active' : ''}`}
                onClick={() => setFontSize('medium')}
                style={{ fontSize: '16px' }}
              >
                Aa
              </button>
              <button 
                className={`setting-option ${fontSize === 'large' ? 'active' : ''}`}
                onClick={() => setFontSize('large')}
                style={{ fontSize: '18px' }}
              >
                Aa
              </button>
            </div>
          </div>

          <div className="accessibility-section">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Use dyslexia-friendly font</span>
            </label>
          </div>

          <div className="accessibility-section">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Always automatically play auditory explanations</span>
            </label>
          </div>

          <div className="accessibility-section">
            <h3>Audio playback speed</h3>
            <div className="button-group">
              <button className="setting-option">slow</button>
              <button className="setting-option active">regular</button>
              <button className="setting-option">fast</button>
            </div>
          </div>

          <div className="accessibility-section">
            <h3>Viewing mode</h3>
            <div className="button-group" role="radiogroup">
              <button 
                className={`setting-option ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
                tabIndex={0}
                role="radio"
                aria-checked={theme === 'dark'}
                aria-label="Dark mode"
              >
                <i className="fas fa-moon"></i>
              </button>
              <button 
                className={`setting-option ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
                tabIndex={0}
                role="radio"
                aria-checked={theme === 'light'}
                aria-label="Light mode"
              >
                <i className="fas fa-sun"></i>
              </button>
              <button 
                className={`setting-option ${theme === 'system' ? 'active' : ''}`}
                onClick={() => setTheme('system')}
                tabIndex={0}
                role="radio"
                aria-checked={theme === 'system'}
                aria-label="System mode"
              >
                <i className="fas fa-desktop"></i>
              </button>
            </div>
          </div>

          <div className="accessibility-section keyboard-tips">
            <h3>Keyboard Navigation Tips</h3>
            <p>Use the Tab key to navigate through interactive elements. Press Enter or Space to activate buttons and toggle checkboxes. Use arrow keys to adjust values where applicable.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessibility; 