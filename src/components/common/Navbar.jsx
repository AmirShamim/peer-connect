// Implementation for Navbar.jsx
import React from 'react';

function Navbar({ activeTab, onTabChange, onLogout }) {
  const TABS = {
    MY_PROFILE: 'My Profile',
    BROWSE_STUDENTS: 'Browse Students',
    MY_CONNECTIONS: 'My Connections',
  };
  
  return (
    <header className="mb-6 pb-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">PeerConnect</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
      <nav className="mt-5" aria-label="Main navigation">
        <ul className="flex flex-wrap space-x-2 sm:space-x-4 border-b border-gray-300">
          {Object.values(TABS).map((tabName) => (
            <li key={tabName} className="mb-[-1px]">
              <button
                onClick={() => onTabChange(tabName)}                className={`py-2 px-3 sm:px-4 text-base sm:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-150
                  ${activeTab === tabName
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-400'
                  }`}
                aria-current={activeTab === tabName ? "page" : undefined}
              >
                {tabName}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;