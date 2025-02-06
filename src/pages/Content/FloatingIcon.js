export function createFloatingIcon() {
  const icon = document.createElement('div');
  icon.className = 'privacy-policy-icon';
  
  // Create an iframe for the popup
  const popup = document.createElement('iframe');
  popup.className = 'privacy-policy-popup';
  popup.id = 'privacy-policy-popup';
  popup.src = chrome.runtime.getURL('popup.html');
  popup.style.display = 'none';
  
  // Add the icon and popup to the page
  document.body.appendChild(icon);
  document.body.appendChild(popup);

  // Handle hover events
  icon.addEventListener('mouseenter', () => {
    popup.style.display = 'block';
  });

  icon.addEventListener('mouseleave', (event) => {
    // Check if we're hovering over the popup
    const rect = popup.getBoundingClientRect();
    const isOverPopup = event.clientX >= rect.left && 
                       event.clientX <= rect.right &&
                       event.clientY >= rect.top && 
                       event.clientY <= rect.bottom;
    
    if (!isOverPopup) {
      popup.style.display = 'none';
    }
  });
} 