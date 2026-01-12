import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * TemplatesPage Component
 * Predefined prompt templates for quick model generation
 */
const TemplatesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      category: 'vehicles',
      title: 'Modern Drone',
      description: 'A sleek, modern quadcopter drone with carbon fiber body',
      prompt: 'A modern quadcopter drone with carbon fiber body, 4 propellers, compact design, camera mount underneath, high tech appearance, realistic materials',
      icon: '🚁',
      tags: ['aerial', 'technology', 'modern']
    },
    {
      id: 2,
      category: 'vehicles',
      title: 'Racing Car',
      description: 'High-performance racing vehicle with aerodynamic design',
      prompt: 'A high-performance racing car with aerodynamic body, large rear spoiler, racing stripes, low profile, carbon fiber details, aggressive stance',
      icon: '🏎️',
      tags: ['speed', 'sports', 'luxury']
    },
    {
      id: 3,
      category: 'vehicles',
      title: 'Delivery Truck',
      description: 'Commercial delivery vehicle for logistics',
      prompt: 'A commercial delivery truck with box trailer, modern cab design, corporate livery, realistic proportions, detailed wheels and lights',
      icon: '🚚',
      tags: ['commercial', 'transport', 'logistics']
    },
    {
      id: 4,
      category: 'robots',
      title: 'Humanoid Robot',
      description: 'Advanced humanoid assistant robot',
      prompt: 'A friendly humanoid robot with smooth white chassis, blue LED lights, articulated joints, expressive display face, modern design, helper robot',
      icon: '🤖',
      tags: ['AI', 'assistant', 'futuristic']
    },
    {
      id: 5,
      category: 'robots',
      title: 'Industrial Robot Arm',
      description: 'Heavy-duty robotic arm for manufacturing',
      prompt: 'An industrial robot arm with multiple joints, heavy duty construction, yellow and black color scheme, precision gripper, mounted base',
      icon: '🦾',
      tags: ['industrial', 'manufacturing', 'automation']
    },
    {
      id: 6,
      category: 'robots',
      title: 'Cleaning Robot',
      description: 'Autonomous floor cleaning robot',
      prompt: 'A round autonomous cleaning robot with smooth dome top, sensors around the edge, compact design, modern aesthetic, white and gray colors',
      icon: '🧹',
      tags: ['household', 'automation', 'smart home']
    },
    {
      id: 7,
      category: 'farming',
      title: 'Agricultural Tractor',
      description: 'Modern farming tractor with large wheels',
      prompt: 'A modern agricultural tractor with large rear wheels, enclosed cab with windows, front loader attachment, green and yellow color scheme, realistic details',
      icon: '🚜',
      tags: ['agriculture', 'farming', 'machinery']
    },
    {
      id: 8,
      category: 'farming',
      title: 'Harvester Machine',
      description: 'Combine harvester for crop collection',
      prompt: 'A large combine harvester with rotating header, elevated cab, grain tank, tracked wheels, industrial yellow color, detailed mechanical parts',
      icon: '🌾',
      tags: ['harvest', 'agriculture', 'heavy machinery']
    },
    {
      id: 9,
      category: 'farming',
      title: 'Irrigation System',
      description: 'Center pivot irrigation equipment',
      prompt: 'A center pivot irrigation system with long wheeled arm, sprinkler heads, metal frame structure, automated movement system, agricultural equipment',
      icon: '💧',
      tags: ['irrigation', 'farming', 'water']
    },
    {
      id: 10,
      category: 'equipment',
      title: 'Excavator',
      description: 'Heavy construction excavator',
      prompt: 'A heavy duty excavator with long articulated arm, large bucket attachment, tracked base, yellow construction color, operator cab with windows',
      icon: '🏗️',
      tags: ['construction', 'heavy', 'digging']
    },
    {
      id: 11,
      category: 'equipment',
      title: 'Forklift',
      description: 'Warehouse forklift vehicle',
      prompt: 'An industrial forklift with front forks, compact body, operator seat, orange safety color, realistic proportions, warehouse vehicle',
      icon: '📦',
      tags: ['warehouse', 'logistics', 'lifting']
    },
    {
      id: 12,
      category: 'equipment',
      title: 'Generator',
      description: 'Portable power generator',
      prompt: 'A portable diesel generator with metal housing, control panel, exhaust pipe, wheels for mobility, industrial grade, realistic details',
      icon: '⚡',
      tags: ['power', 'portable', 'industrial']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', icon: '📋' },
    { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { id: 'robots', label: 'Robots', icon: '🤖' },
    { id: 'farming', label: 'Farming', icon: '🌾' },
    { id: 'equipment', label: 'Equipment', icon: '🔧' }
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const useTemplate = (template) => {
    // Store the selected template prompt in localStorage
    localStorage.setItem('selectedPrompt', template.prompt);
    // Navigate to home page where the prompt will be auto-filled
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-2">
            Prompt Templates
          </h1>
          <p className="text-gray-400">
            Choose from pre-designed prompts to quickly generate 3D models
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700 border border-dark-600'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-200 group"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{template.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {template.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">
                {template.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-dark-700 text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Prompt Preview */}
              <div className="bg-dark-900 rounded-lg p-3 mb-4">
                <p className="text-xs text-gray-400 line-clamp-3">
                  {template.prompt}
                </p>
              </div>

              {/* Use Button */}
              <button
                onClick={() => useTemplate(template)}
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Use This Template
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No templates found in this category</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-dark-800/50 border border-dark-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">💡 How to use templates</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• Click on any template card to view details</li>
            <li>• Click "Use This Template" to auto-fill the prompt on the home page</li>
            <li>• You can edit the prompt before generating to customize the result</li>
            <li>• Templates are designed to produce high-quality 3D models</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
