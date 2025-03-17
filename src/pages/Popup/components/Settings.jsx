import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import AudioPlayer from './AudioPlayer';

/**
 * Settings component for managing user preferences
 * @returns {React.ReactElement} Settings component
 */
const Settings = ({ isOpen, setIsOpen }) => {
  const settingsRef = useRef(null);
  const [readingLevel, setReadingLevel] = useState('medium');
  const [currentFormat, setCurrentFormat] = useState("default");

  useEffect(() => {
    // Load saved settings on component mount
    chrome.storage.sync.get(["explanationFormat", "readingLevel"], (result) => {
      const savedFormat = result.explanationFormat || "default";
      const savedLevel = result.readingLevel || "medium";
      setCurrentFormat(savedFormat);
      setReadingLevel(savedLevel);
      document.documentElement.setAttribute("data-explanation-format", savedFormat);
      document.documentElement.setAttribute("data-reading-level", savedLevel);
    });
  }, []);

  /**
   * Updates both the explanation format and reading level attributes
   * @param {string} format - The selected format
   * @param {string} level - The selected reading level
   */
  const updateDisplaySettings = (format, level) => {
    const combinedFormat = `${format}-${level}`;
    document.documentElement.setAttribute("data-explanation-format", format);
    document.documentElement.setAttribute("data-reading-level", level);
    
    // Save both preferences to chrome storage
    chrome.storage.sync.set({ 
      explanationFormat: format,
      readingLevel: level 
    });
  };

  /**
   * Handles changes to the explanation format
   * @param {string} format - The selected format
   */
  const handleFormatChange = (format) => {
    setCurrentFormat(format);
    updateDisplaySettings(format, readingLevel);
  };

  /**
   * Handles changes to the reading level
   * @param {string} level - The selected reading level
   */
  const handleReadingLevelChange = (level) => {
    setReadingLevel(level);
    updateDisplaySettings(currentFormat, level);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Handle escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Handle keyboard navigation within settings menu
  const handleKeyDown = (e, buttonGroup, currentValue, setter) => {
    switch (e.key.toLowerCase()) {
      case 'arrowright':
      case 'd': {
        e.preventDefault();
        const currentIndex = buttonGroup.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % buttonGroup.length;
        setter(buttonGroup[nextIndex]);
        break;
      }
      case 'arrowleft':
      case 'a': {
        e.preventDefault();
        const currentIndex = buttonGroup.indexOf(currentValue);
        const prevIndex = (currentIndex - 1 + buttonGroup.length) % buttonGroup.length;
        setter(buttonGroup[prevIndex]);
        break;
      }
      case 'arrowdown':
      case 's': {
        e.preventDefault();
        const currentIndex = buttonGroup.indexOf(currentValue);
        const nextIndex = (currentIndex + 1) % buttonGroup.length;
        setter(buttonGroup[nextIndex]);
        break;
      }
      case 'arrowup':
      case 'w': {
        e.preventDefault();
        const currentIndex = buttonGroup.indexOf(currentValue);
        const prevIndex = (currentIndex - 1 + buttonGroup.length) % buttonGroup.length;
        setter(buttonGroup[prevIndex]);
        break;
      }
    }
  };

  const readingLevels = ['simple', 'medium', 'advanced'];
  const explanationFormats = ['default', 'girlypop', 'sports announcer'];

  return (
    <div className="settings-wrapper" ref={settingsRef}>
      <button 
        className="header-button settings-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faCog} />
      </button>

      {isOpen && (
        <div className="settings-menu">
          <AudioPlayer 
            pageType="settings"
            activeTab={null}
            isModalOpen={isOpen}
          />
          <h2>Settings</h2>
          
          <div className="settings-section" role="radiogroup" aria-label="Reading Level">
            <h3>Reading Level</h3>
            <p>Choose the complexity level for privacy policy summaries</p>
            <div className="button-group">
              {readingLevels.map((level) => (
                <button
                  key={level}
                  className={`setting-option ${readingLevel === level ? 'active' : ''}`}
                  aria-pressed={readingLevel === level}
                  onClick={() => handleReadingLevelChange(level)}
                  onKeyDown={(e) => handleKeyDown(e, readingLevels, readingLevel, setReadingLevel)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section" role="radiogroup" aria-label="Explanation Format">
            <h3>Explanation Format</h3>
            <p>Customize the theme and voice of your privacy policy summaries</p>
            <div className="button-group">
              {explanationFormats.map((format) => (
                <button
                  key={format}
                  className={`setting-option ${currentFormat === format ? 'active' : ''}`}
                  aria-pressed={currentFormat === format}
                  onClick={() => handleFormatChange(format)}
                  onKeyDown={(e) => handleKeyDown(e, explanationFormats, currentFormat, setCurrentFormat)}
                >
                  {format.charAt(0).toUpperCase() + format.slice(1)}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Settings;
