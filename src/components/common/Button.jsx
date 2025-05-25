// reusable button component - trying to keep things DRY
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
  const baseClasses = 'button-text rounded focus:outline-none focus:ring-1 transition-all duration-200 ease-in-out';
  
  const variantClasses = {
    primary: 'bg-[#3B526F] hover:bg-[#1E2A3A] text-white focus:ring-[#748AA6]',
    secondary: 'bg-gray-50 hover:bg-gray-100 text-gray-700 focus:ring-gray-200',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-200',
    outline: 'bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-200'
  };
  
  const sizeClasses = {
    small: 'py-1.5 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-2.5 px-5 text-lg'
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