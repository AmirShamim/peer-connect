// Implementation for Button.jsx
import React from 'react';

function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  fullWidth = false,
  className = '',
  ariaLabel
}) {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 transition duration-150 ease-in-out';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
  };
  
  const sizeClasses = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
    return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      aria-label={ariaLabel || null}
      aria-disabled={disabled ? 'true' : undefined}
      role={type === 'button' ? 'button' : undefined}
    >
      {children}
    </button>
  );
}

export default Button;