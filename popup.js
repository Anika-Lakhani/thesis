document.addEventListener('DOMContentLoaded', function() {
  // Remove current tab handling
  document.getElementById('current').remove();
  document.getElementById('currentTab').remove();

  // Make summary tab visible by default
  document.getElementById('summary').style.display = 'block';
  document.getElementById('summaryTab').classList.add('active');

  // Automatically detect and analyze privacy policy when popup opens
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    detectPrivacyPolicy(currentTab.url).then(policyText => {
      if (policyText) {
        analyzePrivacyPolicy(policyText);
      } else {
        displayError('No privacy policy found on this page');
      }
    });
  });

  // Keep existing tab click handlers for Summary/Details
  document.getElementById('summaryTab').addEventListener('click', () => switchTab('summary'));
  document.getElementById('detailsTab').addEventListener('click', () => switchTab('details'));
});

function switchTab(tabName) {
  // Update tab visibility
  document.getElementById('summary').style.display = tabName === 'summary' ? 'block' : 'none';
  document.getElementById('details').style.display = tabName === 'details' ? 'block' : 'none';

  // Update active tab styling
  document.getElementById('summaryTab').classList.toggle('active', tabName === 'summary');
  document.getElementById('detailsTab').classList.toggle('active', tabName === 'details');
} 