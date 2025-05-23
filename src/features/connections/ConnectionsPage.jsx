import React, { useState, useEffect, useCallback } from 'react';
import { getAcceptedConnections, removeConnection } from '../../services/connectionService';
import StudentCard from '../../components/common/StudentCard';
import Toast from '../../components/common/Toast';

function ConnectionsPage({ onConnectionsChange }) {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const loadConnections = useCallback(() => {
    setIsLoading(true);
    // Simulate async loading if needed, though localStorage is sync
    setTimeout(() => {
      const acceptedConns = getAcceptedConnections();
      setConnections(acceptedConns);
      setIsLoading(false);
      if (onConnectionsChange) {
        onConnectionsChange(); // Notify parent about the potential change in connection count
      }
    }, 100); // Short delay
  }, [onConnectionsChange]);

  useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  const handleRemoveConnection = (studentToRemove) => {
    removeConnection(studentToRemove.id);
    setToastMessage(`Removed ${studentToRemove.name} from your connections.`);
    setToastType('success');
    loadConnections(); // Refresh the list and trigger onConnectionsChange
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <p className="text-gray-500 text-lg">Loading connections...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-full">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 border-b pb-3">
          My Connections
        </h2>
        {connections.length === 0 ? (
          <p className="text-gray-600 text-center py-10 text-lg">
            You haven't made any connections yet. Start browsing students!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {connections.map((student) => (
              <div key={student.id} className="relative group">
                {/* Pass a different onConnect or no onConnect for connections view */}
                <StudentCard student={student} onConnect={() => {
                  setToastMessage(`You are already connected with ${student.name}.`);
                  setToastType('info');
                }} />
                <button
                  onClick={() => handleRemoveConnection(student)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-700 text-white text-xs font-bold p-2 rounded-full focus:outline-none focus:shadow-outline opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  title="Remove Connection"
                  aria-label={`Remove ${student.name} from connections`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectionsPage;