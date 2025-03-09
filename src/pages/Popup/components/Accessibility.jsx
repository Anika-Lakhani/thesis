import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair, faMoon, faSun, faDesktop, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { useAccessibility } from '../context/AccessibilityContext';
import AudioPlayer from './AudioPlayer';

const Accessibility = ({ isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { 
    fontSize, 
    setFontSize, 
    theme, 
    setTheme,
    useDyslexicFont,
    setUseDyslexicFont,
    autoPlayAudio,
    setAutoPlayAudio,
    playbackSpeed,
    setPlaybackSpeed
  } = useAccessibility();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

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
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={faWheelchair} />
      </button>

      {isOpen && (
        <div className="accessibility-menu">
          <AudioPlayer 
            pageType="accessibility"
            activeTab={null}
            isModalOpen={isOpen}
          />
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
                id="dyslexicFont"
                checked={useDyslexicFont}
                onChange={(e) => setUseDyslexicFont(e.target.checked)}
                aria-label="Use dyslexia-friendly font"
              />
              <span>Use dyslexia-friendly font</span>
            </label>
          </section>

          <section className="accessibility-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="autoPlayAudio"
                checked={autoPlayAudio}
                onChange={(e) => setAutoPlayAudio(e.target.checked)}
              />
              <span>Always automatically play auditory explanations</span>
            </label>
          </section>

          <section className="accessibility-section">
            <h3>Audio playback speed</h3>
            <div className="speed-options">
              <button
                className={`speed-option ${playbackSpeed === 'slow' ? 'active' : ''}`}
                onClick={() => setPlaybackSpeed('slow')}
              >
                slow
              </button>
              <button
                className={`speed-option ${playbackSpeed === 'regular' ? 'active' : ''}`}
                onClick={() => setPlaybackSpeed('regular')}
              >
                regular
              </button>
              <button
                className={`speed-option ${playbackSpeed === 'fast' ? 'active' : ''}`}
                onClick={() => setPlaybackSpeed('fast')}
              >
                fast
              </button>
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