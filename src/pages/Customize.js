import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Customize.css';

const Customize = () => {
  const { productId } = useParams();
  const [customization, setCustomization] = useState({
    color: 'gold',
    text: '',
    size: 'medium'
  });

  return (
    <div className="customize-page">
      <div className="customize-container">
        <div className="preview-section">
          <div className="product-preview">
            <img 
              src={`/products/${productId}.jpg`} 
              alt="Product Preview" 
              className="preview-image"
            />
            <h2>Product ID: {productId}</h2>
          </div>
        </div>

        <div className="customization-section">
          <h1>Customize Your Gift</h1>
          
          <div className="customization-option">
            <h3 className="option-title">Select Color</h3>
            <div className="color-options">
              {['gold', 'silver', 'rose-gold'].map(color => (
                <button
                  key={color}
                  className={`color-option ${customization.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCustomization({...customization, color})}
                />
              ))}
            </div>
          </div>

          <div className="customization-option">
            <h3 className="option-title">Add Your Message</h3>
            <input
              type="text"
              className="text-input"
              placeholder="Enter your personalized message"
              value={customization.text}
              onChange={(e) => setCustomization({...customization, text: e.target.value})}
            />
          </div>

          <button className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customize; 