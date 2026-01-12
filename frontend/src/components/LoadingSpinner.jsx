import React from 'react';

/**
 * Loading Spinner Component
 * Displays an animated spinner with optional status message
 */
const LoadingSpinner = ({ message = 'Loading...', subMessage = '' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-dark-700 rounded-full"></div>
        {/* Spinning gradient ring */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-primary-500 border-r-primary-400 rounded-full animate-spin"></div>
        {/* Inner glow */}
        <div className="absolute top-2 left-2 w-16 h-16 bg-primary-500/10 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Status text */}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-gray-100">{message}</p>
        {subMessage && (
          <p className="mt-2 text-sm text-gray-400">{subMessage}</p>
        )}
      </div>

      {/* Progress indicator dots */}
      <div className="flex space-x-2 mt-4">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
