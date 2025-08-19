// src/components/JupSwap.jsx
import React, { useEffect } from 'react';

const JupSwap = ({ show, onClose }) => {
  useEffect(() => {
    if (!show) return;

    // Prevent loading Jupiter Terminal multiple times
    if (document.getElementById('jupiter-terminal-script')) return;

    const script = document.createElement('script');
    script.src = 'https://terminal.jup.ag/main-v2.js';
    script.id = 'jupiter-terminal-script';
    script.async = true;
    script.onload = () => {
      window.Jupiter.init({
        displayMode: 'integrated',
        integratedTargetId: 'jupiter-terminal',
        endpoint: 'https://api.mainnet-beta.solana.com',
        defaultExplorer: 'solana',
        strictTokenList: true,
        // defaultInputMint: 'So11111111111111111111111111111111111111112', // SOL
        defaultOutputMint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // Replace this with TAJPE Token Mint
        allowedInputMints: [
        'So11111111111111111111111111111111111111112', // SOL
        'Es9vMFrzaCERbAdxZqMDKHePq62jD3RyfrKuTZs4icmo'  // USDT
        ],
        containerStyles: {
          borderRadius: '16px',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '420px',
          height: '600px',
        },
      });
    };
    document.body.appendChild(script);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="jupiter-terminal" />
      </div>
    </div>
  );
};

export default JupSwap;
