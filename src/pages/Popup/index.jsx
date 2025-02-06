import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup.jsx';
import './index.css';
import { AccessibilityProvider } from './context/AccessibilityContext';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <AccessibilityProvider>
    <Popup />
  </AccessibilityProvider>
);
