import React, { useState, useEffect } from 'react';
import './App.css';

// Load and sort all images to ensure the 0-79 sequence is perfectly ordered
const imageModules = import.meta.glob('./images/images/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
const loadedImageUrls = Object.entries(imageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB)) // Sort alphabetically by filename
  .map(([, url]) => url);

function App() {
  const [images] = useState(loadedImageUrls);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Preload images to avoid flickering during the animation sequence
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Cinematic Animation Loop (Adjusted speed)
  useEffect(() => {
    if (images.length === 0) return;
    
    // Decreased interval to speed up by ~30%
    const interval = setInterval(() => {
      setCurrentFrame((prevIndex) => (prevIndex + 1) % images.length);
    }, 90); 

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="app-container">
      {/* Premium Sports Header */}
      <nav className="top-nav">
        <div className="nav-logo">
          <span className="logo-light">SPORT</span>
          <span className="logo-bold">MOOD</span>
        </div>
        <ul className="nav-links">
          <li><a href="#men">MEN</a></li>
          <li><a href="#women">WOMEN</a></li>
          <li><a href="#new">NEW RELEASES</a></li>
          <li><a href="#tech">TECHNOLOGY</a></li>
        </ul>
        <div className="nav-actions">
           <button className="icon-btn search-btn" aria-label="Search">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
           </button>
           <button className="icon-btn cart-btn" aria-label="Cart">
             <span>CART</span>
             <span className="cart-badge">0</span>
           </button>
        </div>
      </nav>

      {/* Hero Section with Image Sequence Animation */}
      <header className="hero-section">
        <div className="sequence-container">
          {images.length > 0 ? (
            <img 
              src={images[currentFrame]} 
              className="sequence-image"
              alt="Cinematic sneaker animation" 
            />
          ) : (
            <div className="loading-state">LOADING SEQUENCE...</div>
          )}
        </div>

        <div className="hero-content">
          <h2 className="hero-tagline">NEW COLLECTION</h2>
          <h1 className="hero-title">DEFY GRAVITY</h1>
          <p className="hero-subtitle">Ultra-lightweight performance engineering. Experience the moment of weightlessness.</p>
          <div className="hero-cta-group">
            <button className="cta-button primary">SHOP MEN</button>
            <button className="cta-button secondary">SHOP WOMEN</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
