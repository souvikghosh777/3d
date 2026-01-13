import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CursorLight from './components/CursorLight';
import FloatingModels from './components/FloatingModels';

// Pages
import ViewerPage from './pages/ViewerPage';
import GalleryPage from './pages/GalleryPage';
import TemplatesPage from './pages/TemplatesPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

import './index.css';

/**
 * Main App Component
 * Handles routing and global layout
 */
function App() {
  return (
    <Router>
      <div className="app">
        {/* Cursor Light Effect */}
        <CursorLight />
        
        {/* Floating 3D Background Models */}
        <FloatingModels />
        
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/viewer" element={<ViewerPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        
        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
