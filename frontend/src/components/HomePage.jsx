import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ModelViewer from '../components/ModelViewer';

/**
 * Prompt templates for quick start
 */
const PROMPT_TEMPLATES = [
  "A majestic dragon perched on a mountain peak",
  "A futuristic sports car with neon lights",
  "A medieval castle with tall towers",
  "A cute robot character with big eyes",
  "A realistic wooden treasure chest",
  "A fantasy sword with glowing runes",
  "A modern office chair",
  "A tropical island with palm trees"
];

/**
 * HomePage Component
 * Main interface for generating 3D models
 */
const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [format, setFormat] = useState('glb');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [modelUrl, setModelUrl] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('prompt2mesh_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }

    // Check for selected prompt from templates page
    const selectedPrompt = localStorage.getItem('selectedPrompt');
    if (selectedPrompt) {
      setPrompt(selectedPrompt);
      localStorage.removeItem('selectedPrompt'); // Clear after using
    }
  }, []);

  /**
   * Save prompt to history
   */
  const saveToHistory = (promptText) => {
    const newHistory = [
      { prompt: promptText, timestamp: Date.now() },
      ...history.filter(item => item.prompt !== promptText)
    ].slice(0, 5); // Keep last 5
    
    setHistory(newHistory);
    localStorage.setItem('prompt2mesh_history', JSON.stringify(newHistory));
  };

  /**
   * Save generated model to gallery
   */
  const saveToGallery = (modelData) => {
    const savedModels = localStorage.getItem('prompt2mesh_models');
    let models = [];
    if (savedModels) {
      try {
        models = JSON.parse(savedModels);
      } catch (e) {
        console.error('Failed to parse saved models:', e);
      }
    }

    const newModel = {
      id: Date.now().toString(),
      prompt: prompt,
      modelUrl: modelData.modelUrl,
      thumbnailUrl: modelData.thumbnailUrl,
      style: style,
      format: format,
      timestamp: Date.now()
    };

    const updatedModels = [newModel, ...models].slice(0, 10); // Keep last 10
    localStorage.setItem('prompt2mesh_models', JSON.stringify(updatedModels));
  };

  /**
   * Handle model generation
   */
  const handleGenerate = async () => {
    if (!prompt.trim()) {
        
        // Auto-save to gallery if enabled
        const autoSave = localStorage.getItem('autoSave') === 'true';
        if (autoSave || true) { // Always save for now
          saveToGallery({
            modelUrl: finalStatus.modelUrl,
            thumbnailUrl: finalStatus.thumbnailUrl
          });
        }
      setError('Please enter a prompt');
      return;
    }

    setError(null);
    setLoading(true);
    setModelUrl(null);
    setStatusMessage('Initializing generation...');

    try {
      // Step 1: Create task
      const result = await apiService.generateModel(prompt, style, format);
      setTaskId(result.taskId);
      setStatusMessage('Task created. Generating your 3D model...');
      saveToHistory(prompt);

      // Step 2: Poll for completion
      const finalStatus = await apiService.pollTaskStatus(
        result.taskId,
        (status) => {
          setStatusMessage(status.message);
        }
      );

      // Step 3: Display model
      if (finalStatus.modelUrl) {
        setModelUrl(finalStatus.modelUrl);
        setStatusMessage('');
      } else {
        throw new Error('No model URL received');
      }
    } catch (err) {
      setError(err.message);
      setStatusMessage('');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle download
   */
  const handleDownload = () => {
    if (modelUrl) {
      const link = document.createElement('a');
      link.href = modelUrl;
      link.download = `model_${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  /**
   * Reset and generate new model
   */
  const handleReset = () => {
    setPrompt('');
    setModelUrl(null);
    setError(null);
    setTaskId(null);
    setStatusMessage('');
  };

  /**
   * Use template prompt
   */
  const useTemplate = (template) => {
    setPrompt(template);
  };

  /**
   * Copy prompt to clipboard
   */
  const copyPrompt = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-16">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!modelUrl ? (
          // Generation Form
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-2">
                Create Your 3D Model
              </h1>
              <p className="text-gray-400 text-lg">
                Transform your ideas into stunning 3D models with AI
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Describe Your 3D Model
              </h2>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Enter your prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A futuristic robot with glowing blue eyes"
                  className="input-field h-32 resize-none"
                  disabled={loading}
                />
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Be specific for better results</span>
                  <span>{prompt.length} characters</span>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Style
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="select-field"
                    disabled={loading}
                  >
                    <option value="realistic">Realistic</option>
                    <option value="low-poly">Low-Poly</option>
                    <option value="stylized">Stylized</option>
                    <option value="sculpture">Sculpture</option>
                    <option value="pbr">PBR</option>
                  </select>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="select-field"
                    disabled={loading}
                  >
                    <option value="glb">GLB (Recommended)</option>
                    <option value="obj">OBJ</option>
                    <option value="fbx">FBX</option>
                    <option value="usdz">USDZ</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="btn-primary w-full text-lg"
              >
                {loading ? 'Generating...' : '🎨 Generate 3D Model'}
              </button>

              {/* Loading State */}
              {loading && (
                <div className="mt-8">
                  <LoadingSpinner
                    message={statusMessage}
                    subMessage="This may take 1-3 minutes"
                  />
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="mt-8">
                  <ErrorMessage
                    message={error}
                    onRetry={() => {
                      setError(null);
                      handleGenerate();
                    }}
                  />
                </div>
              )}
            </div>

            {/* Prompt Templates */}
            {!loading && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">
                  💡 Prompt Templates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PROMPT_TEMPLATES.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => useTemplate(template)}
                      className="text-left bg-dark-800 hover:bg-dark-700 border border-dark-600 rounded-lg p-3 transition-all text-sm text-gray-300"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 0 && !loading && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">
                  📜 Recent Prompts
                </h3>
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="bg-dark-800 border border-dark-600 rounded-lg p-3 flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-300 flex-1">
                        {item.prompt}
                      </span>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => useTemplate(item.prompt)}
                          className="text-primary-400 hover:text-primary-300 text-xs"
                        >
                          Use
                        </button>
                        <button
                          onClick={() => copyPrompt(item.prompt)}
                          className="text-gray-400 hover:text-gray-300 text-xs"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Model Viewer
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold mb-2">Your 3D Model is Ready!</h2>
              <p className="text-gray-400">"{prompt}"</p>
            </div>

            {/* 3D Viewer */}
            <div className="mb-6" style={{ height: '600px' }}>
              <ModelViewer
                modelUrl={modelUrl}
                onDownload={handleDownload}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDownload}
                className="btn-primary"
              >
                📥 Download Model
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                🔄 Generate Another
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
