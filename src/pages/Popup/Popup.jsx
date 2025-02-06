import React, { useState, useEffect } from 'react';
import JsPolipy from '../../utils/jsPolipy';
import './Popup.css';
import RiskMeter from './components/RiskMeter';
import PolicyDetails from './components/PolicyDetails';
import Settings from './components/Settings';
import Accessibility from './components/Accessibility';
import { useAccessibility } from './context/AccessibilityContext';

const Popup = () => {
  const { getFontSizeValue, getTheme } = useAccessibility();
  const [activeTab, setActiveTab] = useState('summary');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const analyzeCurrentPage = async () => {
      setLoading(true);
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const response = await chrome.tabs.sendMessage(tab.id, { action: "analyze" });
        
        if (response && response.text) {
          // Process the text through your analysis engine
          const analysisResult = {
            success: true,
            summary: {
              riskLevel: 'Medium',
              explanation: 'Standard privacy practices detected'
            },
            analysis: {
              dataCollection: {
                importance: 'high',
                findings: [
                  { match: 'collect personal information', pattern: 'collect.*personal.*information' }
                ]
              },
              dataSecurity: {
                importance: 'medium',
                findings: [
                  { match: 'encrypt data', pattern: 'encrypt.*data' }
                ]
              },
              // Add other categories as needed
            }
          };
          
          setAnalysis(analysisResult);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    analyzeCurrentPage();
  }, []);

  const handleClose = () => {
    window.close();
  };

  return (
    <div className={`popup-container ${getTheme()}`} style={{ fontSize: getFontSizeValue() }}>
      <div className="header">
        <h2>Privacy Policy Analyzer</h2>
        <div className="header-controls">
          <Accessibility />
          <Settings />
          <button className="close-button" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
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
          <div className="error">Unable to analyze privacy policy. Please try again.</div>
        ) : (
          <>
            {/* Summary Tab Content */}
            <div className={`tab-content ${activeTab === 'summary' ? 'active' : ''}`}>
              {analysis && analysis.success && (
                <>
                  <RiskMeter riskLevel={analysis.summary.riskLevel} />
                  <div className="risk-explanation">
                    {analysis.summary.riskLevel === 'High' && (
                      "This privacy policy contains multiple concerning elements that could impact your privacy. We've detected a high number of data collection practices and potential sharing with third parties. Consider reviewing the Details tab for specific concerns."
                    )}
                    {analysis.summary.riskLevel === 'Medium' && (
                      "This privacy policy has some standard data collection practices, but also includes elements that warrant attention. While not unusually invasive, we recommend reviewing the specific data handling practices in the Details tab."
                    )}
                    {analysis.summary.riskLevel === 'Low' && (
                      "This privacy policy appears to follow privacy-friendly practices. It has clear terms and limited data collection. As always, we recommend reviewing the specific details to ensure they align with your privacy preferences."
                    )}
                  </div>
                  <button className="track-button">
                    <i className="fas fa-bell"></i>
                    Track This Policy
                  </button>
                </>
              )}
            </div>

            {/* Details Tab Content */}
            <div className={`tab-content ${activeTab === 'details' ? 'active' : ''}`}>
              {analysis && analysis.success && (
                <PolicyDetails analysis={analysis.analysis} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup; 