import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * GalleryPage Component
 * Display previously generated 3D models from localStorage
 */
const GalleryPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();

  // Load models from localStorage
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = () => {
    const savedModels = localStorage.getItem('prompt2mesh_models');
    if (savedModels) {
      try {
        const parsedModels = JSON.parse(savedModels);
        setModels(parsedModels);
      } catch (e) {
        console.error('Failed to load models:', e);
      }
    }
  };

  const deleteModel = (modelId) => {
    const updatedModels = models.filter(m => m.id !== modelId);
    setModels(updatedModels);
    localStorage.setItem('prompt2mesh_models', JSON.stringify(updatedModels));
    if (selectedModel?.id === modelId) {
      setSelectedModel(null);
    }
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to delete all models?')) {
      setModels([]);
      setSelectedModel(null);
      localStorage.removeItem('prompt2mesh_models');
    }
  };

  const viewIn3D = (model) => {
    // Store model URL for viewer page
    localStorage.setItem('viewerModelUrl', model.modelUrl);
    navigate('/viewer');
  };

  const downloadModel = (model) => {
    const link = document.createElement('a');
    link.href = model.modelUrl;
    link.download = `model_${model.id}.${model.format || 'glb'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-2">
              Model Gallery
            </h1>
            <p className="text-gray-400">
              Your recently generated 3D models ({models.length}/10)
            </p>
          </div>
          {models.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              🗑️ Clear All
            </button>
          )}
        </div>

        {/* Empty State */}
        {models.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">
              No models yet
            </h3>
            <p className="text-gray-400 mb-6">
              Generate your first 3D model to see it here
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Start Creating
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model.id}
                className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-200 group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-dark-900 overflow-hidden">
                  {model.thumbnailUrl ? (
                    <img
                      src={model.thumbnailUrl}
                      alt={model.prompt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      🎨
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-dark-900/80 backdrop-blur-sm text-xs text-gray-300 rounded">
                      {model.format?.toUpperCase() || 'GLB'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Prompt */}
                  <p className="text-white font-medium mb-2 line-clamp-2">
                    {model.prompt}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-gray-400 mb-4">
                    {formatDate(model.timestamp)}
                  </p>

                  {/* Style Badge */}
                  {model.style && (
                    <div className="mb-4">
                      <span className="px-2 py-1 bg-primary-900/30 text-primary-400 text-xs rounded">
                        {model.style}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewIn3D(model)}
                      className="flex-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      👁️ View
                    </button>
                    <button
                      onClick={() => downloadModel(model)}
                      className="flex-1 px-3 py-2 bg-dark-700 hover:bg-dark-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      💾 Download
                    </button>
                    <button
                      onClick={() => deleteModel(model.id)}
                      className="px-3 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">📚 Gallery Info</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• Models are stored locally in your browser</li>
            <li>• Gallery keeps your last 10 generated models</li>
            <li>• Click "View" to open the model in the 3D viewer</li>
            <li>• Click "Download" to save the model file to your device</li>
            <li>• Clearing browser data will remove all saved models</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
