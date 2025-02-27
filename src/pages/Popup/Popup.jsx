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

const Popup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [currentLogo, setCurrentLogo] = useState(DefaultLogoLight);

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
    // Load saved format on mount
    chrome.storage.sync.get(["explanationFormat"], (result) => {
      const savedFormat = result.explanationFormat || "default";
      document.documentElement.setAttribute("data-explanation-format", savedFormat);
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
          <Settings />
          <Accessibility />
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
                    <RiskMeter riskLevel={analysis.summary.riskLevel} />
                    <div className="risk-explanation">
                      {analysis.summary.riskLevel === 'High' && (
                        document.documentElement.getAttribute('data-explanation-format') === 'girlypop' ? (
                          "Babe, YOU'RE DONE 🚩 This website is a total snitch, collecting ALL your data and sharing it with, like, everyone. I think you should def check out the Details tab if you wanna know more, or just dump this website's ass."
                        ) : document.documentElement.getAttribute('data-explanation-format') === 'sports announcer' ? (
                          "It's looking like a rough game tonight! I'm not really seeing a lot of clean plays out there. The ref is calling a LOT of aggressive data collection fouls, the defense is DOWN and they're sharing data left and right! Head over to the Details tab for the play-by-play!"
                        ) : (
                          "This privacy policy contains multiple concerning elements that could impact your privacy. We've detected a high number of data collection practices and potential sharing with third parties. Consider reviewing the Details tab for specific concerns."
                        )
                      )}
                      {analysis.summary.riskLevel === 'Medium' && (
                        document.documentElement.getAttribute('data-explanation-format') === 'girlypop' ? (
                          "This privacy policy is pretty mid. I'm a girl's girl, so I just wanted to warn you even though they're not like, toxic or anything. Still j check the Details tab if you wanna learn more."
                        ) : document.documentElement.getAttribute('data-explanation-format') === 'sports announcer' ? (
                          "The game is looking pretty even tonight! We're watching some standard moves we'd expect to see, but keep your eyes on the field! Check out the Details tab for the full strategic breakdown."
                        ) : (
                          "This privacy policy has some standard data collection practices, but it also includes elements that warrant attention. While not unusually invasive, we recommend reviewing the specific data handling practices in the Details tab."
                        )
                      )}
                      {analysis.summary.riskLevel === 'Low' && (
                        document.documentElement.getAttribute('data-explanation-format') === 'girlypop' ? (
                          "This privacy policy is BUTTERY SOFT and SO chic. When it comes to my data and privacy, I just love a respectful king. Still worth a quick peek at the Details tab though... just in case."
                        ) : document.documentElement.getAttribute('data-explanation-format') === 'sports announcer' ? (
                          "TOUCHDOWN, PRIVACY FANS! This policy is showing EXCELLENT form with privacy-friendly practices! A STELLAR performance in data protection! MVP performance right here.Take a quick timeout to review the Details tab for the full winning strategy!"
                        ) : (
                          "This privacy policy appears to follow privacy-friendly practices. It has clear terms and limited data collection. As always, we recommend reviewing the specific details to ensure they align with your privacy preferences."
                        )
                      )}
                    </div>
                  </>
                ) : null}
              </div>

              {/* Details Tab Content */}
              <div className={`tab-content ${activeTab === 'details' ? 'active' : ''}`}>
                {analysis && analysis.success ? (
                  <PolicyDetails analysis={analysis.analysis} />
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