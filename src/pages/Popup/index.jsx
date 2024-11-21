import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup.jsx';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Popup />);
