import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Collections.css';

const Collections = () => {
  const [activeCollection, setActiveCollection] = useState(null);

  const collections = [
    {
      id: 1,
      name: "Royal Elegance",
      description: "Inspired by royal heritage, featuring precious gems and intricate designs",
      image: "/images/products/product-1.jpg",
      items: 12,
      new: true,
      colors: ["gold", "ruby", "emerald"]
    },
    {
      id: 2,
      name: "Celestial Dreams",
      description: "Star-inspired pieces that capture the magic of the night sky",
      image: "/images/products/product-2.jpg",
      items: 8,
      colors: ["silver", "sapphire", "diamond"]
    },
    {
      id: 3,
      name: "Modern Minimalist",
      description: "Clean lines and contemporary designs for the modern aesthetic",
      image: "/collections/minimal.jpg",
      items: 15,
      colors: ["rose-gold", "black", "white"]
    },
    {
      id: 4,
      name: "Vintage Charm",
      description: "Timeless pieces inspired by classic jewelry designs",
      image: "/collections/vintage.jpg",
      items: 10,
      new: true,
      colors: ["antique-gold", "pearl", "ruby"]
    }
  ];

  return (
    <motion.div 
      className="collections-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="collections-hero">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Curated <span className="neon-text">Collections</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover our carefully curated collections, each telling a unique story of elegance and style
        </motion.p>
      </div>

      <div className="collections-grid">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            className={`collection-card ${activeCollection === collection.id ? 'active' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveCollection(collection.id)}
          >
            <div className="collection-image">
              <img src={collection.image} alt={collection.name} />
              {collection.new && <span className="new-badge">New Collection</span>}
              <div className="collection-overlay">
                <div className="collection-colors">
                  {collection.colors.map(color => (
                    <span key={color} className={`color-dot ${color}`} />
                  ))}
                </div>
                <Link to={`/collections/${collection.id}`} className="view-collection">
                  Explore Collection
                </Link>
              </div>
            </div>
            
            <div className="collection-info">
              <h2>{collection.name}</h2>
              <p>{collection.description}</p>
              <div className="collection-meta">
                <span className="items-count">{collection.items} Items</span>
                <motion.button 
                  className="preview-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Quick Preview
                </motion.button>
              </div>
            </div>

            {activeCollection === collection.id && (
              <motion.div 
                className="collection-preview"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="preview-grid">
                  {[1, 2, 3, 4].map((item) => (
                    <motion.div 
                      key={item}
                      className="preview-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={`/images/products/product-${item}.jpg`}
                        alt={`Preview ${item}`} 
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="featured-collection"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="featured-content">
          <h2>Limited Edition</h2>
          <h3>Summer Brilliance Collection</h3>
          <p>Exclusive pieces that capture the essence of summer luxury</p>
          <motion.button 
            className="shop-now-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Collections; 