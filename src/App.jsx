import { useState, useEffect } from "react";
import DashboardPage from "./features/dashboard/DashboardPage";
import AuthPage from "./features/auth/AuthPage"; // You'll create this
import "./index.css";

// Simple check for a "logged in" status in localStorage
const checkAuthStatus = () => {
  return localStorage.getItem("isPeerConnectAuthenticated") === "true";
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthStatus());

  const handleLogin = () => {
    localStorage.setItem("isPeerConnectAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isPeerConnectAuthenticated");
    // Potentially clear other user-specific data from localStorage here
    // e.g., clearProfile() from profileService
    setIsAuthenticated(false);
  };

  // You might want to pass handleLogout to DashboardPage so it can have a logout button
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {isAuthenticated ? (
        <DashboardPage onLogout={handleLogout} />
      ) : (
        <AuthPage onLoginSuccess={handleLogin} />
      )}
    </div>
  );
}

export default App;
