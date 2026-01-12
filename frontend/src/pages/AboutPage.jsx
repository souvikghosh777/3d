import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AboutPage Component
 * Information about the application
 */
const AboutPage = () => {
  const features = [
    {
      icon: '🎨',
      title: 'Text-to-3D Generation',
      description: 'Transform your text descriptions into detailed 3D models using AI'
    },
    {
      icon: '👁️',
      title: 'Interactive Viewer',
      description: 'View and interact with models using advanced 3D controls'
    },
    {
      icon: '📝',
      title: 'Prompt Templates',
      description: 'Quick-start templates for common 3D model categories'
    },
    {
      icon: '🖼️',
      title: 'Model Gallery',
      description: 'Keep track of your generated models in a visual gallery'
    },
    {
      icon: '⚙️',
      title: 'Customizable Settings',
      description: 'Personalize your experience with quality and format options'
    },
    {
      icon: '💾',
      title: 'Easy Export',
      description: 'Download models in GLB or OBJ formats'
    }
  ];

  const techStack = [
    { name: 'React.js', description: 'Frontend framework', icon: '⚛️' },
    { name: 'Three.js', description: '3D visualization', icon: '🎮' },
    { name: 'Tailwind CSS', description: 'Styling', icon: '🎨' },
    { name: 'Node.js', description: 'Backend runtime', icon: '🟢' },
    { name: 'Express', description: 'Web framework', icon: '🚂' },
    { name: 'AIML API', description: 'AI model generation', icon: '🤖' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-primary-500/30">
              🎯
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
            Prompt2Mesh
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            AI-Powered Text-to-3D Model Generator
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Turn your creative ideas into stunning 3D models with the power of artificial intelligence
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ✨ Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            🛠️ Built With
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-dark-800 border border-dark-700 rounded-xl p-4 text-center hover:border-primary-500/50 transition-all duration-200"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <p className="text-white font-medium text-sm mb-1">{tech.name}</p>
                <p className="text-gray-400 text-xs">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            🔄 How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                1️⃣
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Describe Your Model
              </h3>
              <p className="text-gray-400 text-sm">
                Enter a detailed text description of the 3D model you want to create
              </p>
            </div>
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                2️⃣
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                AI Processing
              </h3>
              <p className="text-gray-400 text-sm">
                Our AI generates an image and converts it to a 3D model
              </p>
            </div>
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-900/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                3️⃣
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                View & Download
              </h3>
              <p className="text-gray-400 text-sm">
                Interact with your model in the viewer and export it
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            💼 Use Cases
          </h2>
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-400 mb-3">
                  🎮 Game Development
                </h3>
                <p className="text-gray-400 text-sm">
                  Rapidly prototype 3D assets for games and virtual environments
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-400 mb-3">
                  🏗️ Architecture & Design
                </h3>
                <p className="text-gray-400 text-sm">
                  Create concept models for buildings, furniture, and products
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-400 mb-3">
                  📚 Education
                </h3>
                <p className="text-gray-400 text-sm">
                  Generate educational 3D models for teaching and learning
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-400 mb-3">
                  🎨 Creative Projects
                </h3>
                <p className="text-gray-400 text-sm">
                  Bring your artistic visions to life in three dimensions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary-900/30 to-primary-800/30 border border-primary-700/50 rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start generating amazing 3D models from text descriptions in seconds
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg shadow-primary-500/30 transition-colors"
            >
              🚀 Start Creating
            </Link>
            <Link
              to="/templates"
              className="px-8 py-4 bg-dark-700 hover:bg-dark-600 text-white font-semibold rounded-lg transition-colors"
            >
              📝 Browse Templates
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>Made with ❤️ using AI and modern web technologies</p>
          <p className="mt-2">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
