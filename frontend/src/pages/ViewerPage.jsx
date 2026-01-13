import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

/**
 * ViewerPage Component
 * Advanced 3D model viewer with controls
 */
const ViewerPage = () => {
  const [modelUrl, setModelUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const initialCameraPosition = useRef(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Check for model URL from gallery
    const savedUrl = localStorage.getItem('viewerModelUrl');
    if (savedUrl) {
      setModelUrl(savedUrl);
      localStorage.removeItem('viewerModelUrl'); // Clear after using
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    initialCameraPosition.current = camera.position.clone();
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 5);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Update wireframe
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = wireframe;
        }
      });
    }
  }, [wireframe]);

  // Load model
  const loadModel = async () => {
    if (!modelUrl.trim()) {
      setError('Please enter a model URL');
      return;
    }

    setLoading(true);
    setError(null);
    setModelLoaded(false);

    try {
      // Remove existing model
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
      }

      const fileExtension = modelUrl.split('.').pop().toLowerCase();
      let loader;

      if (fileExtension === 'glb' || fileExtension === 'gltf') {
        loader = new GLTFLoader();
        loader.load(
          modelUrl,
          (gltf) => {
            const model = gltf.scene;
            
            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Scale model to fit
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 4 / maxDim;
            model.scale.multiplyScalar(scale);

            modelRef.current = model;
            sceneRef.current.add(model);
            setModelLoaded(true);
            setLoading(false);
          },
          undefined,
          (err) => {
            setError('Failed to load GLB/GLTF model: ' + err.message);
            setLoading(false);
          }
        );
      } else if (fileExtension === 'obj') {
        loader = new OBJLoader();
        loader.load(
          modelUrl,
          (obj) => {
            // Center model
            const box = new THREE.Box3().setFromObject(obj);
            const center = box.getCenter(new THREE.Vector3());
            obj.position.sub(center);

            // Scale model
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 4 / maxDim;
            obj.scale.multiplyScalar(scale);

            modelRef.current = obj;
            sceneRef.current.add(obj);
            setModelLoaded(true);
            setLoading(false);
          },
          undefined,
          (err) => {
            setError('Failed to load OBJ model: ' + err.message);
            setLoading(false);
          }
        );
      } else {
        throw new Error('Unsupported file format. Use GLB, GLTF, or OBJ');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Reset camera
  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current && initialCameraPosition.current) {
      cameraRef.current.position.copy(initialCameraPosition.current);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Load last generated model from localStorage
  const loadLastModel = () => {
    const savedHistory = localStorage.getItem('prompt2mesh_models');
    if (savedHistory) {
      try {
        const models = JSON.parse(savedHistory);
        if (models.length > 0) {
          setModelUrl(models[0].modelUrl);
        }
      } catch (e) {
        console.error('Failed to load model history:', e);
      }
    }
  };

  return (
    <div className="min-h-screen animated-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-2">
            3D Model Viewer
          </h1>
          <p className="text-gray-400">
            View and interact with 3D models using advanced controls
          </p>
        </div>

        {/* Model URL Input */}
        <div className="mb-6 bg-dark-800 rounded-xl p-6 border border-dark-700">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Model URL (GLB, GLTF, or OBJ)
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={modelUrl}
              onChange={(e) => setModelUrl(e.target.value)}
              placeholder="https://example.com/model.glb"
              className="flex-1 px-4 py-3 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
            />
            <button
              onClick={loadModel}
              disabled={loading}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              {loading ? 'Loading...' : 'Load Model'}
            </button>
            <button
              onClick={loadLastModel}
              className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white font-medium rounded-lg transition-colors"
            >
              Load Last
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Viewer and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 3D Viewer */}
          <div className="lg:col-span-3">
            <div
              ref={containerRef}
              className="w-full h-[600px] bg-dark-900 rounded-xl border border-dark-700 overflow-hidden"
            />
          </div>

          {/* Controls Panel */}
          <div className="space-y-4">
            <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
              <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
              
              {/* Auto Rotate Toggle */}
              <div className="mb-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-300">Auto Rotate</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={autoRotate}
                      onChange={(e) => setAutoRotate(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                </label>
              </div>

              {/* Wireframe Toggle */}
              <div className="mb-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-300">Wireframe</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={wireframe}
                      onChange={(e) => setWireframe(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                </label>
              </div>

              {/* Reset Camera Button */}
              <button
                onClick={resetCamera}
                className="w-full px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors"
              >
                🔄 Reset Camera
              </button>
            </div>

            {/* Info Panel */}
            <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
              <h3 className="text-lg font-semibold text-white mb-4">Tips</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Left click + drag to rotate</li>
                <li>• Right click + drag to pan</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Double click to focus</li>
              </ul>
            </div>

            {/* Model Info */}
            {modelLoaded && (
              <div className="bg-primary-900/20 border border-primary-700/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary-400 mb-2">✅ Model Loaded</h3>
                <p className="text-sm text-gray-400">
                  Your 3D model has been successfully loaded and is ready to view.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
