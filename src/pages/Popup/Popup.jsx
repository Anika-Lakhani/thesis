import React, { useState, useEffect } from 'react';
import JsPolipy from '../../utils/jsPolipy';
import './Popup.css';

const Popup = () => {
  const [policyLinks, setPolicyLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

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
      // Send message to background script to scrape policy
      chrome.runtime.sendMessage(
        { type: 'SCRAPE_POLICY', url },
        async (response) => {
          if (response.success) {
            const result = await chrome.storage.local.get(`policy-${url}`);
            const policyData = result[`policy-${url}`];
            await handleAnalyze(policyData.text);
          } else {
            setError(response.error || 'Failed to scrape policy');
          }
        }
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-container">
      <h2>Privacy Policy Analyzer</h2>
      
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
  );
};

export default Popup;
