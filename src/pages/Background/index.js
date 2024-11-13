import { get_policy } from 'polipy';

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PRIVACY_POLICY_DETECTED') {
    handlePrivacyPolicyDetection(message.payload, sender.tab.id);
  }
});

async function handlePrivacyPolicyDetection(policyLinks, tabId) {
  // Show icon to indicate privacy policy was found
  chrome.action.setIcon({
    tabId,
    path: {
      16: 'icon-16.png',
      48: 'icon-48.png',
      128: 'icon-128.png',
    },
  });

  // Store the links for this tab
  chrome.storage.local.set({
    [`tab-${tabId}-policies`]: policyLinks
  });
}

// Handle scraping request from popup
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'SCRAPE_POLICY') {
    try {
      const policy = await get_policy(message.url, {
        screenshot: false,
        timeout: 30,
        extractors: ['text']
      });
      
      // Store the scraped policy
      chrome.storage.local.set({
        [`policy-${message.url}`]: policy.to_dict()
      });

      sendResponse({ success: true });
    } catch (error) {
      console.error('Error scraping policy:', error);
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Required for async response
}); 