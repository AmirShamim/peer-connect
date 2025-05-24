import React from 'react';

function StudentCard({ student, onConnect, connectionStatus }) {
  if (!student) {
    return null;
  }

  const handleConnectClick = () => {
    if (onConnect && connectionStatus === 'not_connected') {
      onConnect(student);
    }
  };

  let buttonText = 'Connect';
  let buttonStyle = 'bg-blue-500 hover:bg-blue-600 text-white';
  
  if (connectionStatus === 'connected') {
    buttonText = 'Connected';
    buttonStyle = 'bg-gray-100 text-gray-500 cursor-not-allowed';
  } else if (connectionStatus === 'request_sent') {
    buttonText = 'Connected';
    buttonStyle = 'bg-gray-100 text-gray-500 cursor-not-allowed';
  }

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="aspect-w-1 aspect-h-1 bg-gray-100">
        <img
          src={student.profilePicture || `https://i.pravatar.cc/150?u=${student.id}`}
          alt={student.name}
          className="w-full h-40 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src=`https://i.pravatar.cc/150?u=${student.id}`; }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow space-y-3">
          <div>
            <h3 className="font-medium text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">
              {student.department} · Year {student.year}
            </p>
          </div>
          <div className="space-y-2">
            {student.skills && (
              <p className="text-sm text-gray-600 line-clamp-2">
                <span className="font-medium">Skills:</span> {student.skills}
              </p>
            )}
            {student.projectAreas && (
              <p className="text-sm text-gray-600 line-clamp-2">
                <span className="font-medium">Projects:</span> {student.projectAreas}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={handleConnectClick}
            disabled={connectionStatus !== 'not_connected'}
            className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${buttonStyle}`}
            aria-label={`${buttonText} with ${student.name}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;