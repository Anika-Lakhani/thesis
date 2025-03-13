import React, { useState, useEffect } from 'react';
import JsPolipy from '../../utils/jsPolipy';
import './Popup.css';
import RiskMeter from './components/RiskMeter';
import PolicyDetails from './components/PolicyDetails';
import Accessibility from './components/Accessibility';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, 
  faWheelchair, 
  faTimes, 
  faMoon, 
  faSun, 
  faDesktop 
} from '@fortawesome/free-solid-svg-icons';
import Settings from './components/Settings';
import DefaultLogoDark from "../../assets/logos/regular-logo-dark.png";
import DefaultLogoLight from "../../assets/logos/regular-logo-light.png";
import GirlypopLogoDark from "../../assets/logos/girlypop-logo-dark.png";
import GirlypopLogoLight from "../../assets/logos/girlypop-logo-light.png";
import SportsAnnouncerLogoDark from "../../assets/logos/sportsannouncer-logo-dark.png";
import SportsAnnouncerLogoLight from "../../assets/logos/sportsannouncer-logo-light.png";
import AudioPlayer from './components/AudioPlayer';
import { getRiskExplanation } from './utils/riskLevelContent';

const Popup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(DefaultLogoLight);
  const [readingLevel, setReadingLevel] = useState('medium');

  useEffect(() => {
    // Automatically analyze when popup opens
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabId = tabs[0].id;
      setLoading(true);
      
      try {
        const response = await chrome.tabs.sendMessage(tabId, { action: "analyze" });
        if (response && response.text) {
          const analyzer = new JsPolipy();
          const results = await analyzer.analyzePolicy(response.text);
          setAnalysis(results);
        } else {
          setError('No privacy policy detected');
        }
      } catch (err) {
        setError('No privacy policy detected');
      } finally {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    // Load saved settings on mount
    chrome.storage.sync.get(["explanationFormat", "readingLevel"], (result) => {
      const savedFormat = result.explanationFormat || "default";
      const savedLevel = result.readingLevel || "medium";
      document.documentElement.setAttribute("data-explanation-format", savedFormat);
      document.documentElement.setAttribute("data-reading-level", savedLevel);
      setReadingLevel(savedLevel);
    });
  }, []);

  // Function to determine which logo to use
  const getLogoForThemeAndFormat = (theme, format) => {
    const logos = {
      default: {
        light: DefaultLogoLight,
        dark: DefaultLogoDark,
      },
      girlypop: {
        light: GirlypopLogoLight,
        dark: GirlypopLogoDark,
      },
      'sports announcer': {
        light: SportsAnnouncerLogoLight,
        dark: SportsAnnouncerLogoDark,
      },
    };

    return logos[format]?.[theme] || DefaultLogoLight;
  };

  // Update logo when theme or format changes
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const format = document.documentElement.getAttribute('data-explanation-format') || 'default';
    const newLogo = getLogoForThemeAndFormat(theme, format);
    setCurrentLogo(newLogo);
  }, []); // This will run once on mount

  // Add event listener for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'data-explanation-format') {
          const theme = document.documentElement.getAttribute('data-theme') || 'light';
          const format = document.documentElement.getAttribute('data-explanation-format') || 'default';
          const newLogo = getLogoForThemeAndFormat(theme, format);
          setCurrentLogo(newLogo);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-explanation-format']
    });

    return () => observer.disconnect();
  }, []);

  // Helper function to get current format and reading level
  const getCurrentSettings = () => {
    return {
      format: document.documentElement.getAttribute('data-explanation-format') || 'default',
      readingLevel: document.documentElement.getAttribute('data-reading-level') || 'medium'
    };
  };

  return (
    <AccessibilityProvider>
      <div className="popup-container">
        <h2>OwlGuard</h2>
        <img 
          src={currentLogo}
          alt="OwlGuard" 
          className="popup-logo-regular-dark"
        />
        <div className="popup-header-controls">
          <Settings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
          <Accessibility isOpen={isAccessibilityOpen} setIsOpen={setIsAccessibilityOpen} />
          <button 
            className="header-button close-button" 
            aria-label="Close popup"
            onClick={() => window.close()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="tabs-container">
          <div className="tabs-header">
            <button 
              className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button 
              className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>

          {loading ? (
            <div className="loading">Analyzing privacy policy...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="content">
              {/* Summary Tab Content */}
              <div className={`tab-content ${activeTab === 'summary' ? 'active' : ''}`}>
                {analysis && analysis.success ? (
                  <>
                    <AudioPlayer 
                      pageType="summary"
                      content={{
                        riskLevel: analysis.summary.riskLevel,
                        explanation: getRiskExplanation(
                          getCurrentSettings().format,
                          getCurrentSettings().readingLevel,
                          analysis.summary.riskLevel
                        )
                      }}
                      activeTab={activeTab}
                      isModalOpen={isSettingsOpen || isAccessibilityOpen}
                    />
                    <RiskMeter riskLevel={analysis.summary.riskLevel} />
                    <div className="risk-explanation">
                      {analysis && analysis.success && getRiskExplanation(
                        getCurrentSettings().format,
                        getCurrentSettings().readingLevel,
                        analysis.summary.riskLevel
                      )}
                    </div>
                  </>
                ) : null}
              </div>

              {/* Details Tab Content */}
              <div className={`tab-content ${activeTab === 'details' ? 'active' : ''}`}>
                {analysis && analysis.success ? (
                  <>
                    <AudioPlayer 
                      pageType="details"
                      content={{
                        details: (() => {
                          console.log("Full analysis object:", analysis);
                          if (!analysis?.analysis) {
                            console.log("No analysis found");
                            return "No detailed analysis available.";
                          }
                          try {
                            // Format each category and its findings into readable text
                            const categories = [
                              {
                                title: "Data collection",
                                data: analysis.analysis.dataCollection
                              },
                              {
                                title: "Third party sharing",
                                data: analysis.analysis.thirdPartySharing
                              },
                              {
                                title: "Data security",
                                data: analysis.analysis.dataSecurity
                              },
                              {
                                title: "User rights",
                                data: analysis.analysis.userRights
                              }
                            ];

                            return categories
                              .filter(cat => cat.data && Object.keys(cat.data).length > 0)
                              .map(cat => `${cat.title}: ${JSON.stringify(cat.data)}`)
                              .join(". ");
                          } catch (error) {
                            console.error("Error formatting details:", error);
                            return "Error formatting analysis details.";
                          }
                        })()
                      }}
                      activeTab={activeTab}
                      isModalOpen={isSettingsOpen || isAccessibilityOpen}
                    />
                    <PolicyDetails analysis={analysis.analysis} />
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </AccessibilityProvider>
  );
};

export default Popup; 