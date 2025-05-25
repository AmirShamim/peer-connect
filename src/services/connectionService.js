const SENT_REQUESTS_KEY = 'peerConnectSentRequests';
const ACCEPTED_CONNECTIONS_KEY = 'peerConnectAcceptedConnections';

// here I am dealing with localStorage again... hope this doesn't break. I broke it few times already
export const getSentRequests = () => {
  try {
    const requests = localStorage.getItem(SENT_REQUESTS_KEY);
    return requests ? JSON.parse(requests) : []; // just returns a list of student IDs
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

// connections part - basically pretending everyone auto-accepts my requests lol
export const getAcceptedConnections = () => {
  try {
    // storing full student objects instead of just IDs because I'm lazy
    // probably should store IDs and fetch profiles but whatever, this works
    const connections = localStorage.getItem(ACCEPTED_CONNECTIONS_KEY);
    return connections ? JSON.parse(connections) : [];
  } catch (error) {
    console.error("Error getting accepted connections:", error);
    return [];
  }
};

export const addConnection = (student) => { // student object gets passed in here
  try {
    const connections = getAcceptedConnections();
    // make sure we don't add the same person twice (that would be awkward)
    if (!connections.find(conn => conn.id === student.id)) {
      connections.push(student);
      localStorage.setItem(ACCEPTED_CONNECTIONS_KEY, JSON.stringify(connections));
      return true; // yay it worked!
    }
    return false; // oops, already connected
  } catch (error) {
    console.error("Error adding connection:", error);
    return false;
  }
};

export const removeConnection = (studentId) => {
  try {
    // gotta remove them from both lists or things get weird
    let connections = getAcceptedConnections();
    connections = connections.filter(conn => conn.id !== studentId);
    localStorage.setItem(ACCEPTED_CONNECTIONS_KEY, JSON.stringify(connections));
    
    // also removing from sent requests so I can reconnect later if I want
    let sentRequests = getSentRequests();
    sentRequests = sentRequests.filter(id => id !== studentId);
    localStorage.setItem(SENT_REQUESTS_KEY, JSON.stringify(sentRequests));
  } catch (error) {
    console.error("Error removing connection:", error);
  }
};

// figuring out what state each connection is in
export const checkConnectionStatus = (studentId) => {
  const sent = getSentRequests().includes(studentId);
  const accepted = getAcceptedConnections().some(conn => conn.id === studentId);
  if (accepted) return 'connected';
  if (sent) return 'request_sent'; // not really using this much but whatever
  return 'not_connected';
};

// getting my own profile to compare skills
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

// turns comma-separated strings into arrays (this was annoying to get right)
const parseSkillsOrProjects = (skillsString) => {
  if (!skillsString) return [];
  // splitting by comma and cleaning up spaces and making everything lowercase
  return skillsString.split(',')
    .map(skill => skill.trim().toLowerCase())
    .filter(skill => skill.length > 0);
};

// counting how many skills I have in common with my connections
export const getSkillsMatched = () => {
  try {
    const connections = getAcceptedConnections();
    const userProfile = getUserProfile();
    const userSkills = parseSkillsOrProjects(userProfile.skills);
    
    if (userSkills.length === 0) return 0;
    
    // using a Set so I don't count the same skill twice
    const matchedSkills = new Set();
    
    connections.forEach(connection => {
      const connectionSkills = parseSkillsOrProjects(connection.skills);
      
      // checking if we have any skills in common
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

// same thing but for project areas instead of skills
export const getProjectTags = () => {
  try {
    const connections = getAcceptedConnections();
    const userProfile = getUserProfile();
    const userProjectAreas = parseSkillsOrProjects(userProfile.projectAreas);
    
    if (userProjectAreas.length === 0) return 0;
    
    // another Set to avoid duplicates
    const sharedProjectTags = new Set();
    
    connections.forEach(connection => {
      const connectionProjects = parseSkillsOrProjects(connection.projectAreas);
      
      // looking for shared project interests
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

// putting all the stats together for the dashboard
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