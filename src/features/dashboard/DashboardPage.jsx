// ...existing code...
import { useState, useEffect, useCallback } from "react"; // Ensure useCallback is imported
import { getAcceptedConnections } from "../../services/connectionService"; // Import service to get connections
import MyProfilePage from "../profile/MyProfilePage";
import DiscoveryPage from "../discovery/DiscoveryPage";
import ConnectionsPage from "../connections/ConnectionsPage";
// ...existing code...

const TABS = {
  MY_PROFILE: "My Profile",
  BROWSE_STUDENTS: "Browse Students",
  MY_CONNECTIONS: "My Connections",
};

function DashboardPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState(TABS.MY_PROFILE);
  const [connectionCount, setConnectionCount] = useState(0);

  // This function will be called by child components when connections change
  const updateDashboardStats = useCallback(async () => {
    try {
      const acceptedConns = await getAcceptedConnections();
      setConnectionCount(acceptedConns.length);
    } catch (error) {
      console.error("Failed to update dashboard stats:", error);
      setConnectionCount(0); // Fallback
    }
  }, []);

  // Load initial stats when the component mounts
  useEffect(() => {
    updateDashboardStats();
  }, [updateDashboardStats]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    return (
      <>
        <div
          style={{ display: activeTab === TABS.MY_PROFILE ? "block" : "none" }}
          className="w-full"
        >
          <MyProfilePage />
        </div>
        <div
          style={{
            display: activeTab === TABS.BROWSE_STUDENTS ? "block" : "none",
          }}
          className="w-full"
        >
          <DiscoveryPage
            onConnectionsChange={updateDashboardStats}
            connectionCountTrigger={connectionCount}
          />
        </div>
        <div
          style={{
            display: activeTab === TABS.MY_CONNECTIONS ? "block" : "none",
          }}
          className="w-full"
        >
          {/* Pass connectionCount as a trigger prop */}          <ConnectionsPage
            onConnectionsChange={updateDashboardStats}
            connectionCountTrigger={connectionCount}
            onTabChange={handleTabChange}
          />
        </div>
      </>
    );
  };

  // ... rest of DashboardPage component (return statement, etc.)
  // ...existing code...
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">
            PeerConnect
          </h1>
          <button
            onClick={onLogout}
            className="text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </div>
        <nav className="mt-5">
          <ul className="flex flex-wrap space-x-2 sm:space-x-4 border-b border-gray-300">
            {Object.values(TABS).map((tabName) => (
              <li key={tabName} className="mb-[-1px]">
                <button
                  onClick={() => handleTabChange(tabName)}
                  className={`py-2 px-3 sm:px-4 text-base sm:text-lg font-medium focus:outline-none transition-colors duration-150
                    ${
                      activeTab === tabName
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-400"
                    }`}
                >
                  {tabName}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mt-6 md:flex md:gap-6">
        <div className="flex-grow md:w-2/3 lg:w-3/4">{renderContent()}</div>
        <div className="w-full md:w-1/3 lg:w-1/4 mt-6 md:mt-0 md:sticky md:top-6 self-start">
          <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">
              Dashboard Stats
            </h2>
            <div className="space-y-4 text-center md:text-left">
              <div className="p-4 bg-blue-50 rounded-md shadow-sm">
                <p className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {connectionCount}
                </p>
                <p className="text-sm text-blue-500 mt-1">Connections</p>
              </div>
              <div className="p-4 bg-green-50 rounded-md shadow-sm">
                <p className="text-3xl sm:text-4xl font-bold text-green-600">
                  0
                </p>
                <p className="text-sm text-green-500 mt-1">Skills Matched</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-md shadow-sm">
                <p className="text-3xl sm:text-4xl font-bold text-yellow-600">
                  0
                </p>
                <p className="text-sm text-yellow-500 mt-1">Project Tags</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center mt-12 py-6 border-t border-gray-200 text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} PeerConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default DashboardPage;
