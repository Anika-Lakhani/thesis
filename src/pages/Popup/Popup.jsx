import React, { useState, useEffect } from 'react';
import JsPolipy from '../../utils/jsPolipy';
import './Popup.css';
import RiskMeter from './components/RiskMeter';
import PolicyDetails from './components/PolicyDetails';

const Popup = () => {
  const [policyLinks, setPolicyLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('current');

  useEffect(() => {
    // Get current tab and policy links when popup opens
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabId = tabs[0].id;
      const result = await chrome.storage.local.get(`tab-${tabId}-policies`);
      setPolicyLinks(result[`tab-${tabId}-policies`] || []);
    });
  }, []);

  const handleAnalyze = async (text) => {
    try {
      const analyzer = new JsPolipy();
      const results = await analyzer.analyzePolicy(text);
      setAnalysis(results);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleScrape = async (url) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Get the policy text
      const policyText = await fetch(url).then(res => res.text());
      
      // Analyze the policy
      await handleAnalyze(policyText);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-container">
      <h2>Privacy Policy Analyzer</h2>
      
      <div className="tabs-container">
        <div className="tabs-header">
          <button 
            className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current
          </button>
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

        {/* Current Tab Content */}
        <div className={`tab-content ${activeTab === 'current' ? 'active' : ''}`}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Policy Links Section */}
          {policyLinks.length === 0 ? (
            <p>No privacy policies detected on this page.</p>
          ) : (
            <div className="policy-links">
              <h3>Detected Policies:</h3>
              <ul>
                {policyLinks.map((link, index) => (
                  <li key={index}>
                    <p>{link.text}</p>
                    <button 
                      onClick={() => handleScrape(link.url)}
                      disabled={loading}
                      className="analyze-button"
                    >
                      {loading ? 'Analyzing...' : 'Analyze Policy'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Analysis Results Section */}
          {analysis && analysis.success && (
            <div className="analysis-results">
              <h3>Analysis Results:</h3>
              <div className="risk-level">
                Risk Level: <span className={analysis.summary.riskLevel.toLowerCase()}>
                  {analysis.summary.riskLevel}
                </span>
              </div>
              <div className="readability">
                Readability: {analysis.readability.level}
              </div>
              
              {/* Key Findings */}
              <div className="findings">
                <h4>Key Findings:</h4>
                <ul>
                  {analysis.summary.keyFindings.map((finding, index) => (
                    <li key={index}>
                      {finding.category}: {finding.count} instances
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

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

              <button className="track-button">
                <i className="fas fa-bell"></i>
                Track This Policy
              </button>
            </>
          ) : (
            <p>Please analyze a privacy policy first.</p>
          )}
        </div>

        {/* Details Tab Content */}
        <div className={`tab-content ${activeTab === 'details' ? 'active' : ''}`}>
          {analysis && analysis.success ? (
            <PolicyDetails analysis={analysis.analysis} />
          ) : (
            <p>Please analyze a privacy policy first.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup; 