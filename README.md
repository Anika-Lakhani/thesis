// Content Script: Runs on every webpage
// - Scans DOM for privacy policy links using regex patterns
// - Sends found links to background script
// - Listens for analysis requests from background script

// Background Script: Runs in the background as a persistent service worker
// - Receives policy links from content script
// - Updates extension icon when policies found
// - Analyzes privacy policies using polipy
// - Sends analysis results back to content script
// - Handles storage of policy data
// - Manages policy text scraping

// Popup UI Component
// - Displays detected privacy policies
// - Manages analysis state (loading/error/results)
// - Triggers policy analysis
// - Shows analysis results

// Core Analysis Engine (src/utils/index.js)
// - Main class for policy analysis
// - Coordinates pattern matching
// - Generates readability scores
// - Produces final analysis summary

// Analysis Patterns (src/utils/jsPolipy/patterns.js)
// - Defines categories (data collection, sharing, etc.)
// - Contains regex patterns for each category
// - Assigns risk and importance levels

// Analysis Summarizer (src/utils/jsPolipy/summarizer.js)
// - Calculates overall risk level
// - Generates key findings
// - Creates recommendations

// Web Server (src/utils/webserver.js)
// - Serves the React app and handles API requests
// - Listens for requests from the React app
// - Communicates with the background script for policy data
// - Bundles separate scripts (popup, content, background)
// - Handles React/JSX compilation
// - Manages asset copying
// - Provides a development server for the React app

// Extension Manifest
// - Defines permissions
// - Specifies script entry points
// - Declares resources and icons