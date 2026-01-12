import axios from 'axios';

const API_BASE_URL = 'https://api.aimlapi.com';
const API_KEY = process.env.AIML_API_KEY;

// Debug logging
console.log('🔑 API Configuration:');
console.log('- Base URL:', API_BASE_URL);
console.log('- API Key exists:', !!API_KEY);
console.log('- API Key length:', API_KEY?.length || 0);
console.log('- API Key (first 10 chars):', API_KEY?.substring(0, 10) + '...');

/**
 * AIML API Service
 * Implements text-to-3D via image generation + 3D conversion
 */
class MeshyService {
  /**
   * Generate an image from text prompt using Flux model
   * @param {string} prompt - The text prompt for image generation
   * @returns {Promise<string>} - URL of the generated image
   */
  async generateImageFromText(prompt) {
    try {
      console.log('Step 1: Generating image from prompt:', prompt);

      const response = await axios.post(
        `${API_BASE_URL}/images/generations`,
        {
          model: 'flux-pro/v1.1',
          prompt: prompt,
          image_size: 'square_hd',
          num_inference_steps: 25,
          guidance_scale: 3.5
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const imageUrl = response.data.images[0].url;
      console.log('Image generated successfully:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error.response?.data || error.message);
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Failed to generate image from text'
      };
    }
  }

  /**
   * Create a new text-to-3D generation task
   * @param {string} prompt - Text description of the 3D model
   * @param {string} artStyle - Style of the model (realistic, low-poly, stylized)
   * @param {string} outputFormat - Output format (glb, obj)
   * @returns {Promise<Object>} - Task creation response with model URL
   */
  async createTextTo3DTask(prompt, artStyle = 'realistic', outputFormat = 'glb') {
    try {
      console.log('Creating text-to-3D task:', { prompt, artStyle, outputFormat });

      // Step 1: Generate image from text
      const imageUrl = await this.generateImageFromText(prompt);

      // Step 2: Convert image to 3D using TripoSR
      console.log('Step 2: Converting image to 3D model...');
      const response = await axios.post(
        `${API_BASE_URL}/images/generations`,
        {
          model: 'triposr',
          image_url: imageUrl,
          output_format: outputFormat,
          do_remove_background: true,
          foreground_ratio: 0.9,
          mc_resolution: 256
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Extract 3D model URL from response
      const modelData = response.data;
      const modelUrl = modelData.model_mesh?.url || modelData.data?.[0]?.url;

      console.log('3D model generated successfully:', modelUrl);

      return {
        success: true,
        taskId: Date.now().toString(),
        status: 'COMPLETED',
        message: '3D model generated successfully',
        modelUrl: modelUrl,
        thumbnailUrl: imageUrl
      };
    } catch (error) {
      console.error('Error creating 3D generation task:', error.response?.data || error.message);
      throw {
        status: error.response?.status || 500,
        message: error.response?.data?.message || error.message || 'Failed to create 3D model'
      };
    }
  }

  /**
   * Check the status of a text-to-3D generation task
   * @param {string} taskId - The task ID to check
   * @returns {Promise<Object>} - Task status (always completed in this sync implementation)
   */
  async getTaskStatus(taskId) {
    try {
      console.log('Checking task status for:', taskId);

      // Since we generate synchronously, always return completed
      return {
        taskId: taskId,
        status: 'COMPLETED',
        progress: 100,
        message: '3D model is ready'
      };
    } catch (error) {
      console.error('Error checking task status:', error.message);
      throw {
        status: 500,
        message: 'Failed to check task status'
      };
    }
  }

  /**
   * Get user-friendly status message
   * @param {string} status - Task status
   * @returns {string} - User-friendly message
   */
  getStatusMessage(status) {
    const messages = {
      'PENDING': 'Your 3D model is queued for generation...',
      'IN_PROGRESS': 'Creating your 3D model...',
      'COMPLETED': 'Your 3D model is ready!',
      'SUCCEEDED': 'Your 3D model is ready!',
      'FAILED': 'Generation failed. Please try again.',
      'EXPIRED': 'Task expired. Please create a new generation request.'
    };
    return messages[status] || 'Processing...';
  }
}

export default new MeshyService();
