// Simple console log to verify the service worker loads
console.log('Background service worker initialized');

// Basic message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);
  return true;
});

// Keep service worker active by handling install and activate events
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'PRIVACY_POLICY_DETECTED') {
    handlePrivacyPolicyDetection(message.payload, sender.tab.id);
  } else if (message.type === 'SCRAPE_POLICY') {
    try {
      const response = await fetch(message.url);
      const text = await response.text();
      
      chrome.storage.local.set({
        [`policy-${message.url}`]: { text }
      });

      sendResponse({ success: true });
    } catch (error) {
      console.error('Error scraping policy:', error);
      sendResponse({ success: false, error: error.message });
    }
  } else if (message.type === "PRIVACY_POLICY_DEBUG") {
    console.log("Privacy Policy Detection Results:", message.payload);
    console.log("URL:", message.payload.url);
    console.log("Matches found:", message.payload.matches.length);
    message.payload.matches.forEach(match => {
      console.log("- Pattern:", match.pattern);
      console.log("  Matched Text:", match.matchedText);
      console.log("  Link URL:", match.href);
      console.log("---");
    });
  } else if (message.type === "DEBUG_LOG") {
    // Log to background script console
    console.log("[Privacy Policy Detector]", message.payload.message, message.payload);
  } else if (message.type === "OPEN_POPUP" || message.action === "openPopup") {
    // Handle popup opening
    try {
      await chrome.action.openPopup();
    } catch (error) {
      console.error("Error opening popup:", error);
    }
  }
  return true;
});

async function handlePrivacyPolicyDetection(policyLinks, tabId) {
  // Show icon to indicate privacy policy was found
  chrome.action.setIcon({
    tabId,
    path: {
      16: '/../../assets/icons/icon-16.png',
      48: '/../../assets/icons/icon-48.png',
      128: '/../../assets/icons/icon-128.png',
    },
  });

  // Store the links for this tab
  chrome.storage.local.set({
    [`tab-${tabId}-policies`]: policyLinks
  });
}
