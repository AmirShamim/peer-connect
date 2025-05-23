const PROFILE_KEY = 'peerConnectUserProfile';

export const getProfile = () => {
  try {
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : {
      name: '',
      year: '',
      department: '',
      skills: '',
      projectAreas: '',
      bio: '',
      profilePicture: '', // Added field
    };
  } catch (error) {
    console.error("Error getting profile:", error);
    return {
      name: '',
      year: '',
      department: '',
      skills: '',
      projectAreas: '',
      bio: '',
      profilePicture: '', // Added field
    };
  }
};

export const saveProfile = (profileData) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};

export const clearProfile = () => {
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch (error) {
    console.error("Error clearing profile:", error);
  }
};