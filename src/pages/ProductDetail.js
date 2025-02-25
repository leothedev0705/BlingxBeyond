import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // This would typically come from an API or props
  const product = {
    id: productId,
    name: "Crystal Dreams Bracelet",
    price: "₹2,999",
    description: "Handcrafted with genuine Swarovski crystals, this stunning piece combines timeless elegance with modern design. Each crystal is carefully selected and placed to ensure maximum brilliance.",
    longDescription: `
      Experience luxury redefined with our Crystal Dreams Bracelet. This exquisite piece features:
      
      • Premium Swarovski crystals
      • 18K gold-plated finish
      • Adjustable sizing
      • Tarnish-resistant coating
      • Signature gift packaging
      
      Perfect for both special occasions and everyday elegance, this bracelet adds a touch of sophistication to any outfit.
    `,
    colors: ["gold", "silver", "rose-gold"],
    images: [
      "/products/bracelet-1.jpg",
      "/products/bracelet-2.jpg",
      "/products/bracelet-3.jpg",
      "/products/bracelet-4.jpg"
    ],
    specifications: [
      { label: "Material", value: "18K Gold-Plated Brass" },
      { label: "Crystal Type", value: "Swarovski Crystal" },
      { label: "Length", value: "16-19cm (Adjustable)" },
      { label: "Closure", value: "Lobster Clasp" },
      { label: "Weight", value: "12g" }
    ],
    reviews: {
      average: 4.8,
      count: 42,
      featured: [
        {
          name: "Priya S.",
          rating: 5,
          comment: "Absolutely stunning! The crystals catch light beautifully."
        }
      ]
    }
  };

  return (
    <motion.div 
      className="product-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back
        </button>

        <div className="product-detail-grid">
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[activeImage]} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="price-rating">
              <h2>{product.price}</h2>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < Math.floor(product.reviews.average) ? 'filled' : ''}`}>★</span>
                ))}
                <span className="review-count">({product.reviews.count} reviews)</span>
              </div>
            </div>

            <p className="description">{product.description}</p>

            <div className="color-selection">
              <h3>Select Color</h3>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${color} ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="actions">
              <button className="add-to-cart">Add to Cart • {product.price}</button>
              <button className="add-to-wishlist">
                <i className="far fa-heart"></i>
              </button>
            </div>

            <div className="product-features">
              <div className="feature">
                <i className="fas fa-truck"></i>
                <span>Free Shipping</span>
              </div>
              <div className="feature">
                <i className="fas fa-undo"></i>
                <span>30-Day Returns</span>
              </div>
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details-tabs">
          <div className="tabs">
            <button className="tab active">Description</button>
            <button className="tab">Specifications</button>
            <button className="tab">Reviews</button>
          </div>

          <div className="tab-content">
            <div className="specifications">
              {product.specifications.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail; 