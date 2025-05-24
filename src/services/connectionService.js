const SENT_REQUESTS_KEY = 'peerConnectSentRequests';
const ACCEPTED_CONNECTIONS_KEY = 'peerConnectAcceptedConnections';

// --- Sent Requests (Optional, if you want to track them separately) ---
export const getSentRequests = () => {
  try {
    const requests = localStorage.getItem(SENT_REQUESTS_KEY);
    return requests ? JSON.parse(requests) : []; // Returns an array of student IDs
  } catch (error) {
    console.error("Error getting sent requests:", error);
    return [];
  }
};

export const addSentRequest = (studentId) => {
  try {
    const requests = getSentRequests();
    if (!requests.includes(studentId)) {
      requests.push(studentId);
      localStorage.setItem(SENT_REQUESTS_KEY, JSON.stringify(requests));
    }
  } catch (error) {
    console.error("Error adding sent request:", error);
  }
};

// --- Accepted Connections (Simulating auto-acceptance) ---
export const getAcceptedConnections = () => {
  try {
    // For this simulation, connections will be an array of student *objects*
    // In a real app, you'd likely store IDs and fetch full profiles.
    const connections = localStorage.getItem(ACCEPTED_CONNECTIONS_KEY);
    return connections ? JSON.parse(connections) : [];
  } catch (error) {
    console.error("Error getting accepted connections:", error);
    return [];
  }
};

export const addConnection = (student) => { // student is the full student object
  try {
    const connections = getAcceptedConnections();
    // Check if student is already a connection by ID
    if (!connections.find(conn => conn.id === student.id)) {
      connections.push(student);
      localStorage.setItem(ACCEPTED_CONNECTIONS_KEY, JSON.stringify(connections));
      return true; // Indicate success
    }
    return false; // Already connected
  } catch (error) {
    console.error("Error adding connection:", error);
    return false;
  }
};

export const removeConnection = (studentId) => {
  try {
    // Remove from accepted connections
    let connections = getAcceptedConnections();
    connections = connections.filter(conn => conn.id !== studentId);
    localStorage.setItem(ACCEPTED_CONNECTIONS_KEY, JSON.stringify(connections));
    
    // Also remove from sent requests to allow reconnection
    let sentRequests = getSentRequests();
    sentRequests = sentRequests.filter(id => id !== studentId);
    localStorage.setItem(SENT_REQUESTS_KEY, JSON.stringify(sentRequests));
  } catch (error) {
    console.error("Error removing connection:", error);
  }
};

// Helper to check if a connection request was already sent or if they are connected
export const checkConnectionStatus = (studentId) => {
  const sent = getSentRequests().includes(studentId);
  const accepted = getAcceptedConnections().some(conn => conn.id === studentId);
  if (accepted) return 'connected';
  if (sent) return 'request_sent'; // If you distinguish between sent and accepted
  return 'not_connected';
};