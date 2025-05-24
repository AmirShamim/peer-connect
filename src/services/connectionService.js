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

// Get user's profile for skills matching
const getUserProfile = () => {
  try {
    const profile = localStorage.getItem('peerConnectUserProfile');
    const parsedProfile = profile ? JSON.parse(profile) : { skills: '', projectAreas: '' };
    console.log('User profile loaded:', parsedProfile);
    return parsedProfile;
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { skills: '', projectAreas: '' };
  }
};

// Helper function to parse comma-separated skills/project areas
const parseSkillsOrProjects = (skillsString) => {
  if (!skillsString) return [];
  // Split by comma and ensure all parts are properly trimmed and lowercased
  return skillsString.split(',')
    .map(skill => skill.trim().toLowerCase())
    .filter(skill => skill.length > 0);
};

// Calculate skills matched with connections
export const getSkillsMatched = () => {
  try {
    const connections = getAcceptedConnections();
    const userProfile = getUserProfile();
    const userSkills = parseSkillsOrProjects(userProfile.skills);
    
    if (userSkills.length === 0) return 0;
    
    // Use a Set to track unique matched skills
    const matchedSkills = new Set();
    
    connections.forEach(connection => {
      const connectionSkills = parseSkillsOrProjects(connection.skills);
      
      // Find matching skills between user and this connection
      connectionSkills.forEach(skill => {
        if (userSkills.includes(skill)) {
          matchedSkills.add(skill);
        }
      });
    });
    
    return matchedSkills.size;
  } catch (error) {
    console.error("Error calculating skills matched:", error);
    return 0;
  }
};

// Calculate shared project tags with connections
export const getProjectTags = () => {
  try {
    const connections = getAcceptedConnections();
    const userProfile = getUserProfile();
    const userProjectAreas = parseSkillsOrProjects(userProfile.projectAreas);
    
    if (userProjectAreas.length === 0) return 0;
    
    // Use a Set to track unique shared project areas
    const sharedProjectTags = new Set();
    
    connections.forEach(connection => {
      const connectionProjects = parseSkillsOrProjects(connection.projectAreas);
      
      // Find matching project areas between user and this connection
      connectionProjects.forEach(project => {
        if (userProjectAreas.includes(project)) {
          sharedProjectTags.add(project);
        }
      });
    });
    
    return sharedProjectTags.size;
  } catch (error) {
    console.error("Error calculating project tags:", error);
    return 0;
  }
};

// Get dashboard stats (consolidates all stats)
export const getDashboardStats = () => {
  try {
    const connections = getAcceptedConnections();
    const skillsMatched = getSkillsMatched();
    const projectTags = getProjectTags();
    
    return {
      connections: connections.length,
      skillsMatched,
      projectTags
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    return {
      connections: 0,
      skillsMatched: 0,
      projectTags: 0
    };
  }
};