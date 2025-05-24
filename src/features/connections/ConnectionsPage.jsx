import React, { useState, useEffect, useCallback } from "react";
import {
  getAcceptedConnections,
} from "../../services/connectionService";
import StudentCard from "../../components/common/StudentCard";
import Toast from "../../components/common/Toast";
import Button from "../../components/common/Button";

// Accept connectionCountTrigger prop and onTabChange callback
function ConnectionsPage({
  onConnectionsChange,
  connectionCountTrigger,
  onTabChange,
}) {  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

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

  const handleRemoveConnection = async (studentId) => {
    const student = connections.find(s => s.id === studentId);
    if (student) {
      try {
        // removeConnection is called within StudentCard, so we don't need to call it here
        // Just update the local state and notify parent
        setConnections(prev => prev.filter(conn => conn.id !== studentId));
        setToastMessage(`Removed ${student.name} from your connections.`);
        setToastType("success");
        // After successfully removing, notify DashboardPage to update its stats
        if (onConnectionsChange) {
          onConnectionsChange();
        }
      } catch (error) {
        setToastMessage("Failed to remove connection. Please try again.");
        setToastType("error");
      }
    }
  };

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
      <div className="bg-white p-6 rounded-lg shadow-md">        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="page-title text-2xl md:text-3xl text-gray-800">
            My Connections
          </h2>
          <span className="stats-label text-sm text-gray-500">
            {connections.length}{" "}
            {connections.length === 1 ? "Connection" : "Connections"}
          </span>
        </div>

        {connections.length === 0 ? (          <div className="text-center py-10">
            <p className="text-elegant text-gray-600 text-lg mb-4">
              You haven't made any connections yet.
            </p>{" "}            <Button className="cursor-pointer button-text"
              variant="primary"
              onClick={() => {
                if (onTabChange) {
                  onTabChange("Browse Students");
                }
              }}
            >
              Start Browsing Students
            </Button>
          </div>        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {connections.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                connectionStatus="connected"
                onConnect={null}
                onDisconnect={handleRemoveConnection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectionsPage;
