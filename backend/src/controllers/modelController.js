import meshyService from '../services/meshyService.js';

/**
 * Model Controller
 * Handles HTTP requests for 3D model generation
 */

/**
 * Generate a new 3D model from text prompt
 * POST /api/generate
 * Body: { prompt, style, format }
 */
export const generateModel = async (req, res, next) => {
  try {
    const { prompt, style = 'realistic', format = 'glb' } = req.body;

    // Validation
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        error: 'Prompt is required',
        status: 400
      });
    }

    // Validate style
    const validStyles = ['realistic', 'low-poly', 'stylized', 'sculpture', 'pbr'];
    const artStyle = validStyles.includes(style) ? style : 'realistic';

    // Validate format
    const validFormats = ['glb', 'obj', 'fbx', 'usdz'];
    const outputFormat = validFormats.includes(format.toLowerCase()) ? format.toLowerCase() : 'glb';

    console.log(`Generating model - Prompt: "${prompt}", Style: ${artStyle}, Format: ${outputFormat}`);

    // Create task with Meshy API
    const result = await meshyService.createTextTo3DTask(prompt, artStyle, outputFormat);

    // Send response with task ID
    res.status(201).json({
      success: true,
      taskId: result.taskId,
      message: 'Model generation started',
      estimatedTime: '1-3 minutes'
    });

  } catch (error) {
    console.error('Generate model error:', error);
    next(error);
  }
};

/**
 * Check the status of a generation task
 * GET /api/status/:taskId
 */
export const getModelStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({
        error: 'Task ID is required',
        status: 400
      });
    }

    console.log(`Checking status for task: ${taskId}`);

    // Get task status from Meshy API
    const status = await meshyService.getTaskStatus(taskId);

    res.json(status);

  } catch (error) {
    console.error('Get model status error:', error);
    next(error);
  }
};

/**
 * Get model generation history
 * GET /api/history
 * (Optional feature - stores recent generations)
 */
export const getHistory = async (req, res) => {
  try {
    // This is a placeholder for future implementation
    // You could store history in a database or cache
    res.json({
      history: [],
      message: 'History feature coming soon'
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      error: 'Failed to fetch history'
    });
  }
};
