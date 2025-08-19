// src/main.jsx - THE CORRECT VERSION

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Router is here
import App from './App';
import './index.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* This is the one and only Router for the entire application */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

