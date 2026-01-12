import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * SettingsPage Component
 * Application settings and preferences
 */
const SettingsPage = () => {
  // Load settings from localStorage
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );
  const [quality, setQuality] = useState(
    localStorage.getItem('modelQuality') || 'high'
  );
  const [exportFormat, setExportFormat] = useState(
    localStorage.getItem('exportFormat') || 'glb'
  );
  const [autoSave, setAutoSave] = useState(
    localStorage.getItem('autoSave') === 'true'
  );
  const [autoRotate, setAutoRotate] = useState(
    localStorage.getItem('defaultAutoRotate') === 'true'
  );

  // Apply theme
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save settings
  const saveSetting = (key, value) => {
    localStorage.setItem(key, value);
    toast.success('Setting saved successfully!');
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    saveSetting('modelQuality', newQuality);
  };

  const handleFormatChange = (newFormat) => {
    setExportFormat(newFormat);
    saveSetting('exportFormat', newFormat);
  };

  const handleAutoSaveChange = (enabled) => {
    setAutoSave(enabled);
    saveSetting('autoSave', enabled.toString());
  };

  const handleAutoRotateChange = (enabled) => {
    setAutoRotate(enabled);
    saveSetting('defaultAutoRotate', enabled.toString());
  };

  const resetSettings = () => {
    if (window.confirm('Reset all settings to default?')) {
      setTheme('dark');
      setQuality('high');
      setExportFormat('glb');
      setAutoSave(false);
      setAutoRotate(false);
      
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('modelQuality', 'high');
      localStorage.setItem('exportFormat', 'glb');
      localStorage.setItem('autoSave', 'false');
      localStorage.setItem('defaultAutoRotate', 'false');
      
      toast.success('Settings reset to default!');
    }
  };

  const clearCache = () => {
    if (window.confirm('Clear all cached data? This will remove saved models and history.')) {
      localStorage.removeItem('prompt2mesh_models');
      localStorage.removeItem('prompt2mesh_history');
      toast.success('Cache cleared successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-400">
            Customize your 3D generation experience
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🎨</span>
              Appearance
            </h2>
            
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Theme</p>
                  <p className="text-sm text-gray-400">Choose your preferred color scheme</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                  >
                    🌙 Dark
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      theme === 'light'
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                    }`}
                  >
                    ☀️ Light
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Generation Settings */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Generation Settings
            </h2>
            
            <div className="space-y-6">
              {/* Model Quality */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Default Model Quality
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleQualityChange('fast')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      quality === 'fast'
                        ? 'border-primary-500 bg-primary-900/20'
                        : 'border-dark-600 bg-dark-900 hover:border-dark-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">⚡</div>
                    <p className="text-white font-medium">Fast</p>
                    <p className="text-xs text-gray-400">Lower quality, faster generation</p>
                  </button>
                  <button
                    onClick={() => handleQualityChange('high')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      quality === 'high'
                        ? 'border-primary-500 bg-primary-900/20'
                        : 'border-dark-600 bg-dark-900 hover:border-dark-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">💎</div>
                    <p className="text-white font-medium">High</p>
                    <p className="text-xs text-gray-400">Best quality, slower generation</p>
                  </button>
                </div>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Default Export Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleFormatChange('glb')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      exportFormat === 'glb'
                        ? 'border-primary-500 bg-primary-900/20'
                        : 'border-dark-600 bg-dark-900 hover:border-dark-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">📦</div>
                    <p className="text-white font-medium">GLB</p>
                    <p className="text-xs text-gray-400">Recommended for web</p>
                  </button>
                  <button
                    onClick={() => handleFormatChange('obj')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      exportFormat === 'obj'
                        ? 'border-primary-500 bg-primary-900/20'
                        : 'border-dark-600 bg-dark-900 hover:border-dark-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">🔷</div>
                    <p className="text-white font-medium">OBJ</p>
                    <p className="text-xs text-gray-400">Universal format</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Viewer Settings */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">👁️</span>
              Viewer Settings
            </h2>
            
            <div className="space-y-4">
              {/* Auto-rotate */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Auto-rotate by Default</p>
                  <p className="text-sm text-gray-400">Automatically rotate models in viewer</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={(e) => handleAutoRotateChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Storage Settings */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">💾</span>
              Storage
            </h2>
            
            <div className="space-y-4">
              {/* Auto-save */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Auto-save Models</p>
                  <p className="text-sm text-gray-400">Automatically save generated models to gallery</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => handleAutoSaveChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              {/* Clear Cache Button */}
              <div className="pt-4 border-t border-dark-700">
                <button
                  onClick={clearCache}
                  className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white font-medium rounded-lg transition-colors"
                >
                  🗑️ Clear Cache & Saved Data
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  This will remove all saved models and prompt history
                </p>
              </div>
            </div>
          </div>

          {/* Reset Settings */}
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">🔄</span>
              Reset
            </h2>
            
            <p className="text-gray-400 mb-4">
              Reset all settings to their default values
            </p>
            
            <button
              onClick={resetSettings}
              className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white font-medium rounded-lg transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">ℹ️ About Settings</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• All settings are saved locally in your browser</li>
            <li>• Settings persist across sessions</li>
            <li>• Clearing browser data will reset all settings</li>
            <li>• Changes take effect immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
