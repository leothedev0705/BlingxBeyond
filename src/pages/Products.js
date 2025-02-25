import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ProductModal from '../components/ProductModal';
import './Products.css';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'bracelets', name: 'Bracelets' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'frames', name: 'Photo Frames' },
    { id: 'rings', name: 'Rings' }
  ];

  const products = [
    {
      id: 1,
      name: "Crystal Dreams Bracelet",
      category: "bracelets",
      price: "₹2,999",
      description: "Handcrafted with genuine Swarovski crystals",
      image: "/products/bracelet-1.jpg",
      isNew: true,
      colors: ["gold", "silver", "rose-gold"]
    },
    {
      id: 2,
      name: "Eternal Memories Frame",
      category: "frames",
      price: "₹4,999",
      description: "24K gold-plated frame with custom engraving",
      image: "/products/frame-1.jpg",
      isNew: false,
      colors: ["gold", "silver"]
    },
    // Add more products...
  ];

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  return (
    <motion.div 
      className="products-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="products-hero">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Our Collection
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Discover our handcrafted pieces, each telling a unique story
        </motion.p>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="categories-filter">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
            <div className="sort-filter">
              <select 
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="container">
          <motion.div 
            className="products-grid"
            layout
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.isNew && <span className="new-badge">New</span>}
                    <div className="product-overlay">
                      <Link 
                        to={`/customize/${product.id}`}
                        className="customize-btn"
                      >
                        Customize Now
                      </Link>
                      <button 
                        className="quick-view-btn"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-colors">
                      {product.colors.map(color => (
                        <span 
                          key={color}
                          className={`color-dot ${color}`}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="product-footer">
                      <span className="price">{product.price}</span>
                      <button className="add-to-cart">Add to Cart</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </motion.div>
  );
};

export default Products; 