import React, { useEffect, useState } from 'react';

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
  const types = {
    info: 'bg-white border-[#3B526F] text-gray-900',
    success: 'bg-white border-[#3B526F] text-gray-900',
    error: 'bg-white border-red-500 text-gray-900'
  };

  return (
    <div
      className={`fixed bottom-5 right-5 border-l-4 ${types[type]} py-3 px-4 rounded-md shadow-lg transition-all duration-300 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >      <div className="flex items-center space-x-3">
        <span className="button-text text-sm">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;