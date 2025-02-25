import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      quantity: quantity,
      image: product.image
    };

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      item => item.id === cartItem.id && item.color === cartItem.color
    );

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="product-modal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <button className="close-button" onClick={onClose}>×</button>
            <div className="modal-content">
              <div className="modal-image-section">
                <img src={product.image} alt={product.name} />
                {product.isNew && <span className="new-tag">New</span>}
                <div className="image-gallery">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="thumbnail">
                      <img src={product.image} alt={`View ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-info-section">
                <div className="modal-header">
                  <h2>{product.name}</h2>
                  <p className="modal-price">{product.price}</p>
                </div>
                
                <div className="modal-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star filled">★</span>
                  ))}
                  <span className="rating-count">(42 reviews)</span>
                </div>

                <p className="modal-description">{product.description}</p>
                
                {product.colors && (
                  <div className="modal-colors">
                    <h4>Select Color</h4>
                    <div className="color-options">
                      {product.colors.map(color => (
                        <button 
                          key={color}
                          className={`color-option ${color} ${selectedColor === color ? 'selected' : ''}`}
                          onClick={() => setSelectedColor(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="quantity-selector">
                  <h4>Quantity</h4>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to Cart - {product.price}
                  </button>
                  <button 
                    className="view-details"
                    onClick={() => {
                      onClose();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    View Full Details
                  </button>
                </div>

                <div className="product-details">
                  <div className="detail-item">
                    <i className="fas fa-truck"></i>
                    <span>Free shipping on orders above ₹999</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-undo"></i>
                    <span>30-day return policy</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>2-year warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal; 