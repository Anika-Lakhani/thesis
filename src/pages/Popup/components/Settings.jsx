import React, { useState, useEffect, useRef } from 'react';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="settings-container" ref={settingsRef}>
      <button 
        className="settings-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-cog"></i>
      </button>

      {isOpen && (
        <div className="settings-menu">
          <h2>Settings</h2>
          
          <div className="settings-section">
            <h3>Reading Level</h3>
            <p>Choose the complexity level for privacy policy summaries</p>
            <div className="button-group">
              <button className="setting-option">Simple</button>
              <button className="setting-option active">Medium</button>
              <button className="setting-option">Advanced</button>
            </div>
          </div>

          <div className="settings-section">
            <h3>Explanation Format</h3>
            <p>Customize the theme and voice of your privacy policy summaries</p>
            <div className="button-group">
              <button className="setting-option active">Default</button>
              <button className="setting-option">Girlypop</button>
              <button className="setting-option">Surfer dude</button>
              <button className="setting-option">Sports announcer</button>
            </div>
          </div>

          <a href="#" className="preferences-link">
            Click here to update your usage preferences for the extension
          </a>
        </div>
      )}
    </div>
  );
};

export default Settings;
