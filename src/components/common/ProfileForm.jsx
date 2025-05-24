import { useState, useEffect } from 'react';

function ProfileForm({ initialProfile, onSave, onCancel }) {
  const [profile, setProfile] = useState({
    name: '',
    year: '',
    department: '',
    skills: '',
    projectAreas: '',
    bio: '',
    profilePicture: '', // Added field
    ...initialProfile,
  });

  useEffect(() => {
    // Ensure form is updated if initialProfile changes (e.g., after first load)
    setProfile(prev => ({ ...prev, ...initialProfile }));
  }, [initialProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
  };
  return (    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-md rounded-lg" aria-labelledby="profile-form-title">
      <h2 id="profile-form-title" className="page-title text-xl mb-4">Edit Your Profile</h2><div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={profile.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#748AA6] focus:border-[#3B526F] sm:text-sm"
          required
          aria-required="true"
        />
      </div>      <div>
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
        <input
          type="url"
          name="profilePicture"
          id="profilePicture"
          value={profile.profilePicture}
          onChange={handleChange}
          placeholder="https://example.com/image.png"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#748AA6] focus:border-[#3B526F] sm:text-sm"
          aria-describedby="profile-picture-hint"
        />
        <p id="profile-picture-hint" className="mt-1 text-xs text-gray-500">Enter a URL to your profile image</p>
      </div>      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year of Study</label>
        <input
          type="number"
          name="year"
          id="year"
          value={profile.year}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#748AA6] focus:border-[#3B526F] sm:text-sm"
          min="1"
          max="6"
          aria-describedby="year-hint"
        />
        <p id="year-hint" className="mt-1 text-xs text-gray-500">Enter a number between 1-6</p>
      </div>      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
        <input
          type="text"
          name="department"
          id="department"
          value={profile.department}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#748AA6] focus:border-[#3B526F] sm:text-sm"
          aria-required="true"
          required
        />
      </div>      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          id="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="e.g., React, Node.js, Python"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#748AA6] focus:border-[#3B526F] sm:text-sm"
          aria-describedby="skills-hint"
        /><p id="skills-hint" className="mt-1 text-xs text-gray-500">Enter your skills separated by commas (e.g., "JavaScript, React, CSS")</p>
      </div>      <div>
        <label htmlFor="projectAreas" className="block text-sm font-medium text-gray-700">Project Areas of Interest (comma-separated)</label>
        <input
          type="text"
          name="projectAreas"
          id="projectAreas"
          value={profile.projectAreas}
          onChange={handleChange}
          placeholder="e.g., Web Development, AI, Mobile Apps"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#748AA6] focus:border-[#3B526F] sm:text-sm"
          aria-describedby="projects-hint"
        />
        <p id="projects-hint" className="mt-1 text-xs text-gray-500">Enter project interests separated by commas (e.g., "Web Development, Machine Learning")</p>
      </div>      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Short Bio</label>
        <textarea
          name="bio"
          id="bio"
          rows="4"
          value={profile.bio}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#748AA6] focus:border-[#3B526F] sm:text-sm"
          aria-describedby="bio-hint"
        ></textarea>
        <p id="bio-hint" className="mt-1 text-xs text-gray-500">A brief description about yourself</p>
      </div>      <div className="flex justify-end space-x-3">        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="button-text px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#748AA6] transition-all duration-200"
            aria-label="Cancel profile editing"
          >
            Cancel
          </button>
        )}        <button
          type="submit"
          className="button-text px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-white bg-[#3B526F] hover:bg-[#1E2A3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#748AA6] transition-all duration-200"
          aria-label="Save profile changes"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;