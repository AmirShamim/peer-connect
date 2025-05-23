import React, { useEffect, useState } from 'react';

// Simple Toast component
// Props:
// - message: The message to display
// - type: 'success', 'error', 'info' (for styling)
// - duration: How long the toast stays visible (in ms)
// - onClose: Function to call when toast is closed (e.g., to clear the message state)
function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible || !message) {
    return null;
  }

  let bgColor = 'bg-blue-500'; // Default for info
  if (type === 'success') {
    bgColor = 'bg-green-500';
  } else if (type === 'error') {
    bgColor = 'bg-red-500';
  }
  return (
    <div
      className={`fixed bottom-5 right-5 ${bgColor} text-white py-3 px-6 rounded-lg shadow-lg transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="sr-only">{type} alert:</span>
      {message}
      <button
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="ml-4 text-xl font-semibold leading-none hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
}

export default Toast;