import express from 'express';
import { generateModel, getModelStatus, getHistory } from '../controllers/modelController.js';

const router = express.Router();

/**
 * POST /api/generate
 * Generate a new 3D model from text prompt
 * Body: { prompt: string, style?: string, format?: string }
 */
router.post('/generate', generateModel);

/**
 * GET /api/status/:taskId
 * Check the status of a model generation task
 * Params: taskId - The task ID to check
 */
router.get('/status/:taskId', getModelStatus);

/**
 * GET /api/history
 * Get recent generation history (optional feature)
 */
router.get('/history', getHistory);

export default router;
