import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = () => {
  const [policyLinks, setPolicyLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get current tab
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tabId = tabs[0].id;
      
      // Get stored policy links for this tab
      const result = await chrome.storage.local.get(`tab-${tabId}-policies`);
      setPolicyLinks(result[`tab-${tabId}-policies`] || []);
    });
  }, []);

  const handleScrape = async (url) => {
    setLoading(true);
    setError(null);

    try {
      await chrome.runtime.sendMessage({
        type: 'SCRAPE_POLICY',
        url
      });
      
      // Get scraped policy
      const result = await chrome.storage.local.get(`policy-${url}`);
      console.log('Scraped policy:', result[`policy-${url}`]);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-container">
      <h2>Privacy Policies Detected</h2>
      {policyLinks.length === 0 ? (
        <p>No privacy policies detected on this page.</p>
      ) : (
        <ul>
          {policyLinks.map((link, index) => (
            <li key={index}>
              <p>{link.text}</p>
              <button 
                onClick={() => handleScrape(link.url)}
                disabled={loading}
              >
                {loading ? 'Scraping...' : 'Scrape Policy'}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Popup; 