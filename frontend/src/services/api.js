import axios from 'axios';

const API_BASE_URL = '/api';

/**
 * API Service for communicating with backend
 */
class ApiService {
  /**
   * Generate a 3D model from text prompt
   * @param {string} prompt - Text description
   * @param {string} style - Art style (realistic, low-poly, stylized)
   * @param {string} format - Output format (glb, obj)
   * @returns {Promise<Object>} - Response with taskId
   */
  async generateModel(prompt, style = 'realistic', format = 'glb') {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate`, {
        prompt,
        style,
        format
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Check the status of a model generation task
   * @param {string} taskId - The task ID to check
   * @returns {Promise<Object>} - Task status information
   */
  async checkTaskStatus(taskId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/status/${taskId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Poll task status until completion
   * @param {string} taskId - The task ID to poll
   * @param {Function} onProgress - Callback for progress updates
   * @returns {Promise<Object>} - Final task result
   */
  async pollTaskStatus(taskId, onProgress = null) {
    const maxAttempts = 60; // 5 minutes with 5-second intervals
    let attempts = 0;

    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          attempts++;
          const status = await this.checkTaskStatus(taskId);

          // Call progress callback if provided
          if (onProgress) {
            onProgress(status);
          }

          // Check if task is complete
          if (status.status === 'SUCCEEDED') {
            resolve(status);
            return;
          }

          // Check if task failed
          if (status.status === 'FAILED') {
            reject(new Error(status.error || 'Model generation failed'));
            return;
          }

          // Check if max attempts reached
          if (attempts >= maxAttempts) {
            reject(new Error('Task timed out. Please try again.'));
            return;
          }

          // Continue polling
          setTimeout(poll, 5000); // Poll every 5 seconds
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  }

  /**
   * Handle API errors
   * @param {Error} error - Axios error object
   * @returns {Error} - Formatted error
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.error || error.response.data?.message || 'Server error';
      return new Error(message);
    } else if (error.request) {
      // Request made but no response
      return new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new ApiService();
