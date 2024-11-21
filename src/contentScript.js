// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyze") {
        // Get all text from the page
        const text = document.body.innerText;
        sendResponse({ text });
    }
    return true; // Required for async response
}); 