// Implementation for Navbar.jsx
import React from 'react';

function Navbar({ activeTab, onTabChange, onLogout }) {
  const TABS = {
    MY_PROFILE: 'My Profile',
    BROWSE_STUDENTS: 'Browse Students',
    MY_CONNECTIONS: 'My Connections',
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-[#3B526F]" style={{ fontFamily: "'Playfair Display', serif" }}>
            PeerConnect
          </h1>          <button
            onClick={onLogout}
            className="button-text text-gray-500 hover:text-gray-700 px-3 py-2 text-sm transition-colors duration-150"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
        <nav className="-mb-px" aria-label="Main navigation">
          <div className="flex space-x-8">
            {Object.values(TABS).map((tabName) => (
              <button
                key={tabName}                onClick={() => onTabChange(tabName)}                className={`nav-text ${
                  activeTab === tabName
                    ? 'border-[#3B526F] text-[#3B526F]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } py-4 px-1 border-b-2 text-sm transition-all duration-150`}
                aria-current={activeTab === tabName ? "page" : undefined}
              >
                {tabName}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;