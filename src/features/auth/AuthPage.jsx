import { useState } from 'react';

function AuthPage({ onLoginSuccess }) {
  // For a real app, you'd have username/password fields
  // For simulation, we can just have a button
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulatedLogin = () => {
    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      onLoginSuccess();
      setIsLoading(false);
    }, 1000); // Simulate 1 second delay
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">        <h1 className="text-3xl font-bold text-[#3B526F] mb-6">Welcome to PeerConnect</h1>
        <p className="text-gray-600 mb-8">
          Connect with fellow students, share ideas, and build your network.
        </p>
        {/* Simulated Login Form */}
        <div className="space-y-4">          <div>
            <label
              htmlFor="mockUser"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username (mock)
            </label>
            <input
              type="text"
              id="mockUser"
              defaultValue="student@example.com"
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
              aria-label="Demo username"
              aria-readonly="true"
            />
          </div>
          <div>
            <label
              htmlFor="mockPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password (mock)
            </label>
            <input
              type="password"
              id="mockPassword"
              defaultValue="password"
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 sm:text-sm"
              aria-label="Demo password"
              aria-readonly="true"
            />
          </div>          <button
            onClick={handleSimulatedLogin}
            disabled={isLoading}
            className="w-full bg-[#3B526F] hover:bg-[#1E2A3A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#748AA6] focus:ring-opacity-50 disabled:opacity-50"
            aria-busy={isLoading ? "true" : "false"}
            aria-live="polite"
          >
            {isLoading ? 'Logging In...' : 'Login as Mock Student'}
          </button>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          This is a simulated login. No actual authentication is performed.
        </p>
      </div>
       <footer className="text-center mt-8 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} PeerConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AuthPage;