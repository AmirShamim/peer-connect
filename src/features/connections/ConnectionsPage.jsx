import React, { useState, useEffect, useCallback } from "react";
import {
  getAcceptedConnections,
  removeConnection,
} from "../../services/connectionService";
import StudentCard from "../../components/common/StudentCard";
import Toast from "../../components/common/Toast";
import Button from "../../components/common/Button";

// Accept connectionCountTrigger prop and onTabChange callback
function ConnectionsPage({ onConnectionsChange, connectionCountTrigger, onTabChange }) {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [removingConnectionId, setRemovingConnectionId] = useState(null);

  const loadConnections = useCallback(async () => {
    setIsLoading(true);
    try {
      const acceptedConns = await getAcceptedConnections();
      setConnections(acceptedConns);
      // Do NOT call onConnectionsChange here, as it might be triggered by the parent
      // and could cause a loop if this function itself triggers the parent.
    } catch (error) {
      setToastMessage("Failed to load connections. Please try again.");
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  }, []); // loadConnections itself doesn't need dependencies if it's just fetching.

  // useEffect to load connections when the component mounts or when connectionCountTrigger changes
  useEffect(() => {
    loadConnections();
  }, [loadConnections, connectionCountTrigger]); // Add connectionCountTrigger to dependencies

  const handleRemoveConnection = async (studentToRemove) => {
    setRemovingConnectionId(studentToRemove.id);
    try {
      await removeConnection(studentToRemove.id);
      setToastMessage(`Removed ${studentToRemove.name} from your connections.`);
      setToastType("success");
      // After successfully removing, notify DashboardPage to update its stats
      if (onConnectionsChange) {
        onConnectionsChange(); // This will update connectionCount in DashboardPage,
        // which in turn triggers the useEffect above to reload connections.
      }
    } catch (error) {
      setToastMessage("Failed to remove connection. Please try again.");
      setToastType("error");
    } finally {
      setRemovingConnectionId(null);
    }
  };

  // ... RemoveButton component and the rest of the JSX remains the same
  // ...existing code...
  const RemoveButton = ({ student }) => (
    <button
      onClick={() => handleRemoveConnection(student)}
      disabled={removingConnectionId === student.id}
      className={`
        absolute top-3 right-3 
        ${
          removingConnectionId === student.id
            ? "bg-gray-400"
            : "bg-red-500 hover:bg-red-700"
        } 
        text-white text-xs font-bold p-2 rounded-full 
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
        opacity-0 group-hover:opacity-100 transition-all duration-200
        disabled:cursor-not-allowed
      `}
      title="Remove Connection"
      aria-label={`Remove ${student.name} from connections`}
    >
      {removingConnectionId === student.id ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );

  if (isLoading && connections.length === 0) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-full">
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            My Connections
          </h2>
          <span className="text-sm text-gray-500">
            {connections.length}{" "}
            {connections.length === 1 ? "Connection" : "Connections"}
          </span>
        </div>

        {connections.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg mb-4">
              You haven't made any connections yet.
            </p>            <Button
              variant="primary"
              onClick={() => {
                if (onTabChange) {
                  onTabChange("Browse Students");
                }
              }}
            >
              Start Browsing Students
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {connections.map((student) => (
              <div key={student.id} className="relative group">
                <StudentCard
                  student={student}
                  connectionStatus="connected"
                  onConnect={null}
                />
                <RemoveButton student={student} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectionsPage;
