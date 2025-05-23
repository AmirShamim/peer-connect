import React from 'react';

// Props:
// - student: The student object
// - onConnect: Function to call when "Connect" is clicked
// - connectionStatus: 'connected', 'request_sent', 'not_connected' (or null/undefined)
function StudentCard({ student, onConnect, connectionStatus }) {
  if (!student) {
    return null;
  }

  const handleConnectClick = () => {
    if (onConnect && connectionStatus === 'not_connected') { // Only allow connect if not already connected/sent
      onConnect(student);
    }
  };

  let buttonText = 'Connect';
  let buttonDisabled = false;
  let buttonClasses = "w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors";

  if (connectionStatus === 'connected') {
    buttonText = 'Connected';
    buttonDisabled = true;
    buttonClasses = "w-full bg-gray-400 text-gray-700 py-2 px-3 rounded-md text-sm font-medium cursor-not-allowed";
  } else if (connectionStatus === 'request_sent') {
    // Assuming auto-acceptance, 'request_sent' might be treated same as 'connected' for UI
    // Or you could have a "Request Sent" state if you implement a pending phase
    buttonText = 'Connected'; // Or "Request Sent"
    buttonDisabled = true;
    buttonClasses = "w-full bg-blue-400 text-white py-2 px-3 rounded-md text-sm font-medium cursor-not-allowed"; // Example for "Request Sent"
  }


  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col h-full">
      <img
        src={student.profilePicture || `https://i.pravatar.cc/150?u=${student.id}`}
        alt={student.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-200"
        onError={(e) => { e.target.onerror = null; e.target.src=`https://i.pravatar.cc/150?u=${student.id}`; }}
      />
      <h3 className="text-xl font-semibold text-blue-600 text-center mb-1">{student.name}</h3>
      <p className="text-sm text-gray-500 text-center mb-2">
        {student.department} - Year {student.year}
      </p>
      <div className="text-xs text-gray-700 space-y-1 mb-3 flex-grow">
        <p><strong>Skills:</strong> {student.skills || 'Not specified'}</p>
        <p><strong>Projects:</strong> {student.projectAreas || 'Not specified'}</p>
      </div>      <button
        onClick={handleConnectClick}
        disabled={buttonDisabled}
        className={buttonClasses}
        aria-label={`${buttonText} with ${student.name}`}
        aria-disabled={buttonDisabled ? 'true' : undefined}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default StudentCard;