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

import owlPopup from "../../assets/owl_popup.png";

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

/**
 * Creates and displays the owl indicator when a privacy policy is detected
 */
const createOwlIndicator = () => {
  try {
    // Check if owl indicator already exists
    if (document.getElementById("owlguard-indicator")) {
      console.log("[Privacy Policy Detector] Owl indicator already exists");
      return;
    }

    console.log("[Privacy Policy Detector] Creating owl indicator");
    
    // Try to get the owl image URL
    const owlUrl = chrome.runtime.getURL("owl_popup.png");
    console.log("[Privacy Policy Detector] Owl image URL:", owlUrl);

    const owlDiv = document.createElement("div");
    owlDiv.id = "owlguard-indicator";
    owlDiv.style.cssText = `
      position: fixed !important;
      top: 20px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
      cursor: pointer !important;
      transition: transform 0.3s ease !important;
      width: 48px !important;
      height: 48px !important;
      background-color: transparent !important;
      pointer-events: auto !important;
      display: block !important;
    `;

    const owlImg = new Image();
    owlImg.onload = () => {
      console.log("[Privacy Policy Detector] Owl image loaded successfully");
    };
    owlImg.onerror = (e) => {
      console.error("[Privacy Policy Detector] Failed to load owl image:", e);
    };
    
    owlImg.src = owlUrl;
    owlImg.alt = "OwlGuard Privacy Policy Detected";
    owlImg.style.cssText = `
      width: 100% !important;
      height: 100% !important;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) !important;
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
    `;

    // Add hover effect
    owlDiv.addEventListener("mouseenter", () => {
      owlDiv.style.transform = "scale(1.1)";
    });

    owlDiv.addEventListener("mouseleave", () => {
      owlDiv.style.transform = "scale(1)";
    });

    // Open extension popup when clicked
    owlDiv.addEventListener("click", () => {
      console.log("[Privacy Policy Detector] Owl clicked");
      chrome.runtime.sendMessage({ action: "openPopup" });
    });

    owlDiv.appendChild(owlImg);
    document.body.appendChild(owlDiv);
    
    // Verify the owl was added
    const addedOwl = document.getElementById("owlguard-indicator");
    if (addedOwl) {
      console.log("[Privacy Policy Detector] Owl indicator successfully added to DOM");
    } else {
      console.error("[Privacy Policy Detector] Failed to find owl indicator after adding to DOM");
    }

  } catch (error) {
    console.error("[Privacy Policy Detector] Error creating owl indicator:", error);
  }
};

/**
 * Checks if the current page contains a privacy policy
 * @returns {boolean} True if a privacy policy is detected
 */
const detectPrivacyPolicy = () => {
  const pageContent = document.body.innerText + " " + document.title;
  return PRIVACY_POLICY_PATTERNS.some(pattern => pattern.test(pageContent));
};

// Function to check for privacy policy and show owl
const checkAndShowOwl = () => {
  console.log("[Privacy Policy Detector] Checking for privacy policy");
  if (detectPrivacyPolicy()) {
    console.log("[Privacy Policy Detector] Privacy policy detected");
    createOwlIndicator();
    // Notify background script
    chrome.runtime.sendMessage({
      type: 'PRIVACY_POLICY_DETECTED',
      payload: [{
        text: `${window.location.hostname} Privacy Policy`,
        url: window.location.href
      }]
    });
  }
};

// Run on page load
if (document.readyState === "complete") {
  checkAndShowOwl();
} else {
  window.addEventListener("load", checkAndShowOwl);
}

// Also run after a short delay to catch dynamically loaded content
setTimeout(checkAndShowOwl, 1500);

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyze") {
    const policyText = document.body.innerText;
    sendResponse({ text: policyText });
  }
  return true;
});