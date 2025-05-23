import { useState, useEffect, useCallback } from 'react';
import MyProfilePage from '../profile/MyProfilePage';
import DiscoveryPage from '../discovery/DiscoveryPage';
import ConnectionsPage from '../connections/ConnectionsPage';
import { getAcceptedConnections } from '../../services/connectionService';

const TABS = {
  MY_PROFILE: 'My Profile',
  BROWSE_STUDENTS: 'Browse Students',
  MY_CONNECTIONS: 'My Connections',
};

function DashboardPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState(TABS.MY_PROFILE);
  const [connectionCount, setConnectionCount] = useState(0);
  // const [skillsMatchedCount, setSkillsMatchedCount] = useState(0); // Placeholder
  // const [projectTagsCount, setProjectTagsCount] = useState(0); // Placeholder

  const updateDashboardStats = useCallback(() => {
    const connections = getAcceptedConnections();
    setConnectionCount(connections.length);
    // Update other stats here if implemented
  }, []); // Empty dependency array as getAcceptedConnections doesn't depend on props/state here

  useEffect(() => {
    updateDashboardStats(); // Initial fetch of stats
  }, [updateDashboardStats]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    updateDashboardStats(); // Update stats when tab changes, ensuring freshness
  };

  const renderContent = () => {
    switch (activeTab) {
      case TABS.MY_PROFILE:
        return <MyProfilePage />;
      case TABS.BROWSE_STUDENTS:
        // DiscoveryPage can also modify connections, so it might need onConnectionsChange too
        return <DiscoveryPage onConnectionsChange={updateDashboardStats} />;
      case TABS.MY_CONNECTIONS:
        return <ConnectionsPage onConnectionsChange={updateDashboardStats} />;
      default:
        return <MyProfilePage />;
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">PeerConnect</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </div>
        <nav className="mt-5">
          <ul className="flex flex-wrap space-x-2 sm:space-x-4 border-b border-gray-300">
            {Object.values(TABS).map((tabName) => (
              <li key={tabName} className="mb-[-1px]"> {/* For border overlap */}
                <button
                  onClick={() => handleTabChange(tabName)}
                  className={`py-2 px-3 sm:px-4 text-base sm:text-lg font-medium focus:outline-none transition-colors duration-150
                    ${activeTab === tabName
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-400'
                    }`}
                >
                  {tabName}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between">
        {renderContent()}
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Dashboard Stats</h2>
          <div className="grid grid-cols-1 text-center md:text-left">
            <div className="p-4 bg-blue-50 rounded-md shadow-sm">
              <p className="text-3xl sm:text-4xl font-bold text-blue-600">{connectionCount}</p>
              <p className="text-sm text-blue-500 mt-1">Connections</p>
            </div>
            <div className="p-4 bg-green-50 rounded-md shadow-sm">
              <p className="text-3xl sm:text-4xl font-bold text-green-600">0</p> {/* Placeholder */}
              <p className="text-sm text-green-500 mt-1">Skills Matched</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-md shadow-sm">
              <p className="text-3xl sm:text-4xl font-bold text-yellow-600">0</p> {/* Placeholder */}
              <p className="text-sm text-yellow-500 mt-1">Project Tags</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center mt-12 py-6 border-t border-gray-200 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PeerConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DashboardPage;