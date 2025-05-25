// OK so I'm trying to import all the React stuff I need here
import { useState, useEffect, useCallback } from "react"; // had to add useCallback because I kept forgetting it exists lol
import { getDashboardStats } from "../../services/connectionService"; // this gets the numbers for the sidebar stats
import MyProfilePage from "../profile/MyProfilePage";
import DiscoveryPage from "../discovery/DiscoveryPage";
import ConnectionsPage from "../connections/ConnectionsPage";
// I think that's all the imports I need... hopefully

const TABS = {
  MY_PROFILE: "My Profile",
  BROWSE_STUDENTS: "Browse Students",
  MY_CONNECTIONS: "My Connections",
};

function DashboardPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState(TABS.MY_PROFILE);
  const [dashboardStats, setDashboardStats] = useState({
    connections: 0,
    skillsMatched: 0,
    projectTags: 0,
  });
  // this callback gets called whenever a child component changes connections
  // took me forever to figure out why the stats weren't updating before I added this
  const updateDashboardStats = useCallback(async () => {
    try {
      const stats = getDashboardStats();
      setDashboardStats(stats);
    } catch (error) {
      console.error("Failed to update dashboard stats:", error);
      setDashboardStats({
        connections: 0,
        skillsMatched: 0,
        projectTags: 0,
      }); // just in case something breaks, reset to zeros
    }
  }, []);

  // runs once when the page loads to get initial numbers
  useEffect(() => {
    updateDashboardStats();
  }, [updateDashboardStats]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    return (
      <>
        {" "}
        <div
          style={{ display: activeTab === TABS.MY_PROFILE ? "block" : "none" }}
          className="w-full"
        >
          <MyProfilePage onProfileUpdate={updateDashboardStats} />
        </div>
        <div
          style={{
            display: activeTab === TABS.BROWSE_STUDENTS ? "block" : "none",
          }}
          className="w-full"
        >
          {" "}
          <DiscoveryPage
            onConnectionsChange={updateDashboardStats}
            connectionCountTrigger={dashboardStats.connections}
          />
        </div>
        <div
          style={{
            display: activeTab === TABS.MY_CONNECTIONS ? "block" : "none",
          }}
          className="w-full"
        >
          {" "}
          {/* Pass connectionCount as a trigger prop */}{" "}
          <ConnectionsPage
            onConnectionsChange={updateDashboardStats}
            connectionCountTrigger={dashboardStats.connections}
            onTabChange={handleTabChange}
          />
        </div>
      </>
    );
  };
  // alright here's where I actually render everything... fingers crossed it works
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-6 pb-4 border-b border-gray-200">
        {" "}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {" "}
          <h1 className="page-title text-3xl sm:text-4xl">PeerConnect</h1>
          <button
            onClick={onLogout}
            className="text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </div>
        <nav className="mt-5">
          <ul className="flex flex-wrap flex-col items-center sm:flex-row space-x-2 sm:space-x-4 border-b border-gray-300">
            {Object.values(TABS).map((tabName) => (
              <li key={tabName} className="mb-[-1px]">
                <button
                  onClick={() => handleTabChange(tabName)}
                  className={`nav-text py-2 px-3 sm:px-4 text-base sm:text-lg focus:outline-none transition-all duration-200 cursor-pointer
                    ${
                      activeTab === tabName
                        ? "border-b-2 border-[#3B526F] text-[#3B526F]"
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
            {" "}
            <h2 className="section-title text-xl sm:text-2xl mb-4 text-gray-700">
              Dashboard Stats
            </h2>
            <div className="space-y-4 text-center md:text-left">
              {" "}
              <div className="p-4 bg-[#D9D9D9]/30 rounded-md shadow-sm">
                <p className="stats-number text-3xl sm:text-4xl text-[#3B526F]">
                  {dashboardStats.connections}
                </p>
                <p className="stats-label text-sm text-[#3B526F] mt-1">
                  Connections
                </p>
              </div>
              <div className="p-4 bg-[#748AA6]/20 rounded-md shadow-sm">
                <p className="stats-number text-3xl sm:text-4xl text-[#3B526F]">
                  {dashboardStats.skillsMatched}
                </p>
                <p className="stats-label text-sm text-[#3B526F] mt-1">
                  Skills Matched
                </p>
              </div>{" "}
              <div className="p-4 bg-[#D9D9D9]/30 rounded-md shadow-sm">
                <p className="stats-number text-3xl sm:text-4xl text-[#3B526F]">
                  {dashboardStats.projectTags}
                </p>
                <p className="stats-label text-sm text-[#3B526F] mt-1">
                  Shared Project Areas
                </p>
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
