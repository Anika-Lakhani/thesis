import React, { useState, useEffect } from 'react';
import JsPolipy from '../../utils/jsPolipy';
import './Popup.css';
import RiskMeter from './components/RiskMeter';
import PolicyDetails from './components/PolicyDetails';

const Popup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    // Automatically analyze when popup opens
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabId = tabs[0].id;
      setLoading(true);
      
      try {
        // Send message to content script to get the page text
        const response = await chrome.tabs.sendMessage(tabId, { action: "analyze" });
        if (response && response.text) {
          const analyzer = new JsPolipy();
          const results = await analyzer.analyzePolicy(response.text);
          setAnalysis(results);
        } else {
          setError('No content found to analyze');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="popup-container">
      <h2>Privacy Policy Analyzer</h2>
      
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

        {loading && <div className="loading">Analyzing privacy policy...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Summary Tab Content */}
        <div className={`tab-content ${activeTab === 'summary' ? 'active' : ''}`}>
          {analysis && analysis.success ? (
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
    </div>
  );
};

export default Popup; 