import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * FloatingModels Component
 * Displays animated 3D models (drones, cars, etc.) floating in the background using Three.js
 */
const FloatingModels = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const modelsRef = useRef([]);

  useEffect(() => {
    console.log('FloatingModels component mounted');
    if (!containerRef.current) {
      console.log('Container ref not ready');
      return;
    }

    console.log('Initializing Three.js scene with floating models...');
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create drone model
    const createDrone = () => {
      const drone = new THREE.Group();
      
      // Body
      const bodyGeometry = new THREE.BoxGeometry(1.2, 0.3, 1.2);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3b82f6,
        shininess: 100,
        emissive: 0x1e40af,
        emissiveIntensity: 0.2
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      drone.add(body);

      // Arms and propellers
      const armPositions = [
        [0.8, 0, 0.8], [-0.8, 0, 0.8], 
        [0.8, 0, -0.8], [-0.8, 0, -0.8]
      ];
      
      armPositions.forEach(pos => {
        const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2);
        const armMaterial = new THREE.MeshPhongMaterial({ color: 0x1f2937 });
        const arm = new THREE.Mesh(armGeometry, armMaterial);
        arm.rotation.x = Math.PI / 2;
        arm.rotation.z = Math.PI / 4;
        arm.position.set(pos[0] * 0.5, pos[1], pos[2] * 0.5);
        drone.add(arm);

        // Propeller
        const propellerGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05);
        const propellerMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.7
        });
        const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
        propeller.position.set(pos[0], pos[1] + 0.3, pos[2]);
        drone.add(propeller);
      });

      return drone;
    };

    // Create car model
    const createCar = () => {
      const car = new THREE.Group();
      
      // Car body
      const bodyGeometry = new THREE.BoxGeometry(2, 0.6, 1);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xef4444,
        shininess: 100
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.3;
      car.add(body);

      // Car top
      const topGeometry = new THREE.BoxGeometry(1.2, 0.5, 0.9);
      const topMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xdc2626,
        shininess: 100
      });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.set(0, 0.85, 0);
      car.add(top);

      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2);
      const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x1f2937 });
      const wheelPositions = [
        [0.7, 0, 0.6], [-0.7, 0, 0.6],
        [0.7, 0, -0.6], [-0.7, 0, -0.6]
      ];

      wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos[0], pos[1], pos[2]);
        car.add(wheel);
      });

      return car;
    };

    // Create satellite model
    const createSatellite = () => {
      const satellite = new THREE.Group();
      
      // Main body
      const bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf59e0b,
        metalness: 0.8
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      satellite.add(body);

      // Solar panels
      const panelGeometry = new THREE.BoxGeometry(2.5, 0.05, 0.8);
      const panelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3b82f6,
        emissive: 0x1e40af,
        emissiveIntensity: 0.3
      });
      const panel1 = new THREE.Mesh(panelGeometry, panelMaterial);
      panel1.position.set(0, 0, 0);
      satellite.add(panel1);

      return satellite;
    };

    // Create spaceship model
    const createSpaceship = () => {
      const ship = new THREE.Group();
      
      // Main cone body
      const bodyGeometry = new THREE.ConeGeometry(0.5, 2, 6);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b5cf6,
        shininess: 100
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.rotation.x = -Math.PI / 2;
      ship.add(body);

      // Wings
      const wingGeometry = new THREE.BoxGeometry(2, 0.1, 0.6);
      const wingMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7c3aed 
      });
      const wing = new THREE.Mesh(wingGeometry, wingMaterial);
      wing.position.y = -0.5;
      ship.add(wing);

      return ship;
    };

    // Create helicopter model
    const createHelicopter = () => {
      const heli = new THREE.Group();
      
      // Body
      const bodyGeometry = new THREE.SphereGeometry(0.6, 16, 16);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x10b981,
        shininess: 100
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.scale.set(1.5, 1, 1);
      heli.add(body);

      // Tail
      const tailGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2);
      const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x059669 });
      const tail = new THREE.Mesh(tailGeometry, tailMaterial);
      tail.rotation.z = Math.PI / 2;
      tail.position.set(-1.2, 0, 0);
      heli.add(tail);

      // Main rotor
      const rotorGeometry = new THREE.BoxGeometry(3, 0.05, 0.3);
      const rotorMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1f2937,
        transparent: true,
        opacity: 0.6
      });
      const rotor = new THREE.Mesh(rotorGeometry, rotorMaterial);
      rotor.position.y = 0.8;
      heli.add(rotor);

      return heli;
    };

    // Create robot model
    const createRobot = () => {
      const robot = new THREE.Group();
      
      // Head
      const headGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x6366f1,
        metalness: 0.8
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1;
      robot.add(head);

      // Eyes
      const eyeGeometry = new THREE.SphereGeometry(0.1);
      const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.8
      });
      const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
      eye1.position.set(-0.15, 1.1, 0.3);
      robot.add(eye1);
      const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
      eye2.position.set(0.15, 1.1, 0.3);
      robot.add(eye2);

      // Body
      const bodyGeometry = new THREE.BoxGeometry(0.8, 1, 0.5);
      const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4f46e5 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.2;
      robot.add(body);

      return robot;
    };

    // Model configurations (brought much closer and larger)
    const modelConfigs = [
      { create: createDrone, position: [-6, 3, -2], scale: 1.2, rotation: [0, 0, 0] },
      { create: createCar, position: [5, -2, -3], scale: 1.0, rotation: [0, Math.PI / 4, 0] },
      { create: createSatellite, position: [-4, -2, -4], scale: 1.1, rotation: [0, 0, 0] },
      { create: createSpaceship, position: [6, 3, -2.5], scale: 1.3, rotation: [0, -Math.PI / 3, 0] },
      { create: createHelicopter, position: [0, 4, -3], scale: 1.1, rotation: [0, Math.PI / 2, 0] },
      { create: createRobot, position: [-6, -3, -3.5], scale: 1.0, rotation: [0, Math.PI / 6, 0] },
      { create: createDrone, position: [4, -3, -2], scale: 0.9, rotation: [0, Math.PI, 0] },
      { create: createCar, position: [-2, 2, -4], scale: 1.1, rotation: [0, -Math.PI / 4, 0] },
    ];

    // Create and position models
    modelConfigs.forEach((config, index) => {
      const model = config.create();
      model.position.set(...config.position);
      model.scale.setScalar(config.scale);
      model.rotation.set(...config.rotation);
      scene.add(model);
      
      modelsRef.current.push({
        mesh: model,
        baseY: config.position[1],
        speed: 0.0005 + Math.random() * 0.001,
        rotationSpeed: 0.001 + Math.random() * 0.002,
        floatOffset: Math.random() * Math.PI * 2
      });
    });

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Animate each model
      modelsRef.current.forEach((item, index) => {
        // Float up and down
        item.mesh.position.y = item.baseY + Math.sin(Date.now() * item.speed + item.floatOffset) * 0.5;
        
        // Rotate
        item.mesh.rotation.y += item.rotationSpeed;
        item.mesh.rotation.x += item.rotationSpeed * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      modelsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
};

export default FloatingModels;
