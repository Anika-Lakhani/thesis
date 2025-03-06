// Force immediate logging when script loads
(() => {
  // Send a message to the background script for logging
  chrome.runtime.sendMessage({
    type: "DEBUG_LOG",
    payload: {
      message: "Content script loaded",
      url: window.location.href,
      extensionId: chrome.runtime.id
    }
  });
})();

console.log("[Privacy Policy Detector] Content script loaded:", window.location.href);

const PRIVACY_POLICY_PATTERNS = [
  /privacy\s*policy/i,
  /privacy\s*notice/i,
  /privacy\s*statement/i,
  /data\s*protection\s*policy/i,
  /information\s*privacy/i,
  /cookie\s*policy/i,
  /privacy\s*(?:and|&)\s*cookie/i,
  /user\s*privacy/i,
  /online\s*privacy/i,
  /data\s*collection/i,
  /terms\s*of\s*privacy/i,
  /website\s*privacy/i,
  /personal\s*data\s*protection/i,
  /user\s*information\s*(?:and|&)\s*privacy/i
];

function getSiteName() {
  // Try to get site name from meta tags first
  const metaTags = [
    document.querySelector('meta[property="og:site_name"]'),
    document.querySelector('meta[name="application-name"]'),
  ];
  
  for (const tag of metaTags) {
    if (tag && tag.content) {
      return tag.content;
    }
  }

  // Fall back to domain name
  const hostname = window.location.hostname;
  // Remove www. and .com/.org/etc, then capitalize first letter
  const siteName = hostname
    .replace(/^www\./i, '')
    .split('.')[0]
    .replace(/^[a-z]/, letter => letter.toUpperCase());

  return siteName;
}

function findPrivacyPolicy() {
  const links = document.getElementsByTagName("a");
  let hasPrivacyPolicy = false;
  let matchedPatterns = [];
  
  // Send debug info through message
  chrome.runtime.sendMessage({
    type: "DEBUG_LOG",
    payload: {
      message: "Scanning page",
      url: window.location.href,
      linkCount: links.length
    }
  });
  
  for (const link of links) {
    const text = (link.textContent || "").toLowerCase();
    
    PRIVACY_POLICY_PATTERNS.forEach(pattern => {
      if (pattern.test(text)) {
        matchedPatterns.push({
          pattern: pattern.toString(),
          matchedText: text,
          href: link.href
        });
        hasPrivacyPolicy = true;
      }
    });
  }

  // Send debug info through message
  chrome.runtime.sendMessage({
    type: "DEBUG_LOG",
    payload: {
      message: matchedPatterns.length > 0 ? "Matches found" : "No matches found",
      url: window.location.href,
      timestamp: new Date().toISOString(),
      matches: matchedPatterns
    }
  });

  if (hasPrivacyPolicy) {
    const siteName = getSiteName();
    return [{
      text: `${siteName} Privacy Policy`,
      url: window.location.href
    }];
  }

  return [];
}

// Initial scan for privacy policy
const policyLinks = findPrivacyPolicy();
if (policyLinks.length > 0) {
  chrome.runtime.sendMessage({
    type: 'PRIVACY_POLICY_DETECTED',
    payload: policyLinks
  });
}

// Listen for analysis requests from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    const text = document.body.innerText;
    sendResponse({ text });
  }
  return true;
});