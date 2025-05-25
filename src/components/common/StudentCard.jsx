import React, { useState } from "react";
import { removeConnection } from "../../services/connectionService";

function StudentCard({ student, onConnect, onDisconnect, connectionStatus }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!student) {
    return null;
  }

  const handleConnectClick = async () => {
    if (connectionStatus === "not_connected" && onConnect && !isConnecting) {
      setIsConnecting(true);
      try {
        await onConnect(student);
      } catch (error) {
        console.error("Error connecting:", error);
      }
      setIsConnecting(false);
    } else if (connectionStatus === "connected") {
      setShowConfirmation(true);
    }
  };

  const handleConfirmDisconnect = async () => {
    if (onDisconnect) {
      setIsConnecting(true);
      try {
        await removeConnection(student.id);
        onDisconnect(student.id);
      } catch (error) {
        console.error("Error disconnecting:", error);
      }
      setIsConnecting(false);
    }
    setShowConfirmation(false);
  };

  const handleCancelDisconnect = () => {
    setShowConfirmation(false);
  };

  let buttonText = "Connect";
  let buttonStyle = "bg-[#3B526F] hover:bg-[#1E2A3A] text-white";
  let buttonDisabled = false;

  if (isConnecting) {
    buttonText = "Processing...";
    buttonStyle = "bg-[#748AA6] text-white cursor-wait";
    buttonDisabled = true;
  } else if (connectionStatus === "connected") {
    buttonText = "Connected";
    buttonStyle = "bg-gray-400 hover:bg-gray-600 text-black hover:text-white";
    buttonDisabled = false;
  } else if (connectionStatus === "request_sent") {
    buttonText = "Connected";
    buttonStyle = "bg-[#D9D9D9] text-gray-500 cursor-not-allowed";
    buttonDisabled = true;
  }

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <div className="aspect-w-1 aspect-h-1 bg-gray-100">
        <img
          src={
            student.profilePicture ||
            `https://i.pravatar.cc/150?u=${student.id}`
          }
          alt={student.name}
          className="w-full h-40 object-cover"
          // use a random avatar if no profile pic, fallback to pravatar if broken
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://i.pravatar.cc/150?u=${student.id}`;
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow space-y-3">          <div>
            <h3 className="card-title text-gray-900">{student.name}</h3>
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
                <span className="font-medium">Projects:</span>{" "}
                {student.projectAreas}
              </p>
            )}
          </div>
        </div>{" "}
        <div className="mt-4 pt-3 border-t border-gray-100">            <button
            onClick={handleConnectClick}
            disabled={buttonDisabled}
            className={`button-text w-full px-4 py-2 rounded-md cursor-pointer text-sm transition-colors duration-150 flex items-center justify-center ${buttonStyle}`}
            aria-label={`${buttonText} with ${student.name}`}
            aria-live="polite"
          >
            {isConnecting && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {buttonText}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="heading-modern text-lg text-gray-900 mb-2">
              Remove Connection
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to remove your connection with{" "}
              {student.name}? You can reconnect later if needed.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleConfirmDisconnect}
                className="button-text flex-1 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md text-sm transition-colors duration-150"
              >
                Remove
              </button>
              <button
                onClick={handleCancelDisconnect}
                className="button-text flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
