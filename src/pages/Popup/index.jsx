import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup.jsx';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Popup />);
