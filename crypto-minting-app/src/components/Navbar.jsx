import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useNavigate, Link } from 'react-router-dom';
import TajpeLogo from '../assets/images/TajpeLogo.webp';

const Navbar = () => {
  const { publicKey, connected } = useWallet();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ADMIN_PUBLIC_KEY = "33bcDwMoLjrmWSPfAsBuBsYHHQgK92KQocVYxMnN54rG";
  const isAdmin = connected && publicKey && publicKey.toString() === ADMIN_PUBLIC_KEY;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={TajpeLogo} alt="Tajpe Logo" className="w-10 h-10" />
            <h1 
              className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Tajpe
            </h1>
          </div>

          {/* --- CORRECTED DESKTOP NAVIGATION LINKS --- */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/aboutus" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">About</Link>   
            <Link to="/tokenomics" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Tokenomics</Link>   
            <Link to="/roadmap" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">Roadmap</Link>   
            <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors shadow-md border">
              Whitepaper
            </button>
          </nav>
          
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="hidden sm:block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Admin
              </button>
            )}

            {/* --- NEW, MORE AGGRESSIVE STYLING FOR WALLET BUTTON --- */}
            <div className="
                /* Target the button itself */
                [&>button]:!h-10
                [&>button]:!py-0
                [&>button]:!px-2.5 
                [&>button]:!text-sm 
                [&>button]:!min-w-0 
                
                /* Target the icon inside the button */
                [&_img]:!h-5 
                [&_img]:!w-5
                
                /* Target the text span inside the button */
                [&_span]:!ml-2
                [&_span]:!text-xs

                /* Restore original sizes on medium screens and up */
                md:[&>button]:!h-12 
                md:[&>button]:!px-4 
                md:[&>button]:!text-base
                md:[&_img]:!h-6 
                md:[&_img]:!w-6
                md:[&_span]:!ml-3
                md:[&_span]:!text-sm
            ">
                <WalletMultiButton />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link to="/aboutus" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">About</Link>   
            <Link to="/tokenomics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Tokenomics</Link>   
            <Link to="/roadmap" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Roadmap</Link>   
            <button className="w-full text-left bg-gray-100 text-indigo-600 px-3 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
              Whitepaper
            </button>
            {isAdmin && (
               <button
                  onClick={() => {
                    navigate('/admin');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left mt-2 bg-green-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Admin Page
                </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;