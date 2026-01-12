import React from 'react';

/**
 * Error Message Component
 * Displays error messages with optional retry functionality
 */
const ErrorMessage = ({ message, onRetry = null }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6">
        {/* Error icon */}
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          {/* Error message */}
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-300">
              {message || 'An unexpected error occurred. Please try again.'}
            </p>
          </div>
        </div>

        {/* Retry button */}
        {onRetry && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={onRetry}
              className="btn-secondary text-sm"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
