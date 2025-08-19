// src/App.jsx - THE CORRECT VERSION (NO ROUTER)

import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- Use these for routing logic
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { JupiterProvider } from '@jup-ag/react-hook';
import { useWallet } from '@solana/wallet-adapter-react';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import Tokenomics from './pages/Tokenomics';
import Roadmap from './pages/Roadmap';
// This component contains the parts of our app that need access to the wallet's state
const AppContent = () => {
      const walletAdapter = useWallet();

    const wallet = useMemo(() => {
        return {
            publicKey: walletAdapter.publicKey,
            signTransaction: walletAdapter.signTransaction,
            signAllTransactions: walletAdapter.signAllTransactions,
            sendTransaction: walletAdapter.sendTransaction,
        };
    }, [walletAdapter]);
    
    return (
        // JupiterProvider needs the wallet object to function correctly
        <JupiterProvider cluster="mainnet-beta" wallet={wallet}>
            <div className="flex flex-col h-screen bg-gray-100">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path='/aboutus' element={<AboutUs />} />
                        <Route path='/tokenomics' element={<Tokenomics />} />
                        <Route path='/roadmap' element={<Roadmap />} />
                    </Routes>
                </main>
            </div>
        </JupiterProvider>
    );
};

// This is the main App component that sets up all the providers
const App = () => {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    
    const wallets = useMemo(
        () => [ new PhantomWalletAdapter() ],
        [network]
    );

    return (
        // NO ROUTER HERE! It is now in main.jsx
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <AppContent />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;
