import { useState, useEffect } from 'react';
import { getProfile, saveProfile } from '../../services/profileService';
import ProfileForm from '../../components/common/ProfileForm';
import Toast from '../../components/common/Toast'; // Assuming you have a Toast component

function MyProfilePage({ onProfileUpdate }) {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  useEffect(() => {
    const currentProfile = getProfile();
    setProfile(currentProfile);
    setIsLoading(false);
    // If profile is empty, consider setting isEditing to true by default
    if (!currentProfile.name && !currentProfile.department) {
        // setIsEditing(true); // Optionally open form if profile is new/empty
    }
  }, []);
  const handleSaveProfile = (updatedProfile) => {
    saveProfile(updatedProfile);
    setProfile(updatedProfile);
    setIsEditing(false);
    setToastMessage('Profile updated successfully!');
    setToastType('success');
    
    // Notify the parent (DashboardPage) that the profile was updated
    if (onProfileUpdate) {
      onProfileUpdate();
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Loading profile...</div>;
  }

  if (!profile) {
    // This case should ideally not be hit if getProfile always returns an object
    return <div className="p-6 text-center text-red-500">Could not load profile.</div>;
  }
    // Fallback image if profilePicture is not set or is invalid
  const profileImageUrl = profile.profilePicture || 'https://placehold.co/150x150/3B526F/FFFFFF/png?text=User';


  return (
    <div className="p-4 md:p-6 bg-white  rounded-md">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      {isEditing ? (
        <ProfileForm
          initialProfile={profile}
          onSave={handleSaveProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">My Profile</h2>
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-[#3B526F] hover:bg-[#1E2A3A] text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#748AA6]"
            >
              Edit Profile
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
            <img
              src={profileImageUrl}
              alt={profile.name || 'User profile'}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#748AA6]/30 shadow-md"
              onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/150/3B526F/FFFFFF?Text=User'; }} // Fallback for broken image links
            />
            <div className="text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-700">{profile.name || 'Your Name'}</h3>
              <p className="text-md text-gray-600">{profile.department || 'Your Department'}</p>
              {profile.year && <p className="text-sm text-gray-500">Year: {profile.year}</p>}
            </div>
          </div>

          {profile.bio && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-1">Bio</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{profile.bio}</p>
            </div>
          )}

          {profile.skills && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-1">Skills</h4>
              {/* For now, just display as text. Later, this can be styled tags. */}
              <p className="text-gray-600">{profile.skills}</p>
            </div>
          )}

          {profile.projectAreas && (
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-1">Project Areas of Interest</h4>
              {/* For now, just display as text. Later, this can be styled tags. */}
              <p className="text-gray-600">{profile.projectAreas}</p>
            </div>
          )}
           {(!profile.bio && !profile.skills && !profile.projectAreas && !profile.name) && (
             <p className="text-gray-500 text-center py-5">Your profile is looking a bit empty. Click "Edit Profile" to add your details!</p>
           )}
        </div>
      )}
    </div>
  );
}

export default MyProfilePage;