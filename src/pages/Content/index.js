const PRIVACY_POLICY_PATTERNS = [
  /privacy\s*policy/i,
  /privacy/i,
  /privacy\s*notice/i,
  /privacy\s*statement/i,
];

function findPrivacyPolicyLinks() {
  const links = document.getElementsByTagName('a');
  const policyLinks = [];

  for (const link of links) {
    const text = link.textContent.toLowerCase();
    const href = link.href;
    
    if (PRIVACY_POLICY_PATTERNS.some(pattern => pattern.test(text))) {
      policyLinks.push({
        text: link.textContent,
        url: href
      });
    }
  }

  return policyLinks;
}

// Initial scan for privacy policies
const policyLinks = findPrivacyPolicyLinks();
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