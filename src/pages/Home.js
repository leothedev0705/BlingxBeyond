import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Luxury Gifts <br /> 
            <span className="neon-text">Reimagined</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover our collection of handcrafted treasures
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/products" className="neon-button">
              Explore Collection
            </Link>
          </motion.div>
        </div>
        <div className="hero-background">
          <div className="neon-grid"></div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section featured-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Featured Collection</h2>
            <div className="neon-line"></div>
          </motion.div>
          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="featured-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="featured-image">
                  <img src={product.image} alt={product.name} />
                  <div className="featured-overlay">
                    <Link to={`/products/${product.id}`} className="quick-view">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="featured-details">
                  <h3>{product.name}</h3>
                  <p className="featured-description">{product.description}</p>
                  <div className="featured-footer">
                    <span className="price">{product.price}</span>
                    <Link to={`/products/${product.id}`} className="neon-link">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Shop by Category</h2>
            <div className="neon-line"></div>
          </motion.div>
          
          <div className="categories-carousel">
            <div className="categories-track" style={{ transform: `translateX(-${activeCategory * 100}%)` }}>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className={`category-slide ${index === activeCategory ? 'active' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="category-content">
                    <div 
                      className="category-image"
                      style={{ borderColor: category.color }}
                    >
                      <img src={category.image} alt={category.name} />
                      <div className="category-overlay" style={{ background: `linear-gradient(45deg, ${category.color}, transparent)` }}/>
                    </div>
                    <h3 style={{ color: category.color }}>{category.name}</h3>
                    <p>{category.description}</p>
                    <Link to={`/products?category=${category.name.toLowerCase()}`} className="category-link">
                      Explore Collection
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="carousel-controls">
              {categories.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === activeCategory ? 'active' : ''}`}
                  onClick={() => setActiveCategory(index)}
                  style={{ backgroundColor: index === activeCategory ? categories[index].color : 'var(--text-secondary)' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Customer Stories</h2>
            <div className="neon-line"></div>
          </motion.div>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="review-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <img src={review.avatar} alt={review.name} />
                    </div>
                    <div>
                      <h4>{review.name}</h4>
                      <p className="review-date">{review.date}</p>
                    </div>
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < review.rating ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="review-product">
                  <img src={review.productImage} alt={review.productName} />
                  <span>{review.productName}</span>
                </div>
                <p className="review-content">{review.content}</p>
                {review.images && (
                  <div className="review-images">
                    {review.images.map((image, i) => (
                      <img key={i} src={image} alt={`Review ${i + 1}`} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section newsletter-section">
        <div className="container">
          <motion.div 
            className="newsletter-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Stay Connected</h2>
            <p>Subscribe for exclusive offers and updates</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="neon-input"
              />
              <button type="submit" className="neon-button">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Data
const featuredProducts = [
  {
    id: 1,
    name: "Crystal Dreams Bracelet",
    description: "Handcrafted with Swarovski crystals",
    price: "₹3,499",
    image: "/products/featured-1.jpg"
  },
  {
    id: 2,
    name: "Golden Memories Frame",
    description: "24K gold-plated photo frame",
    price: "₹4,999",
    image: "/products/featured-2.jpg"
  },
  {
    id: 3,
    name: "Personalized Necklace",
    description: "Custom engraved sterling silver",
    price: "₹2,999",
    image: "/products/featured-3.jpg"
  },
  {
    id: 4,
    name: "Love Letter Pendant",
    description: "Rose gold with hidden message",
    price: "₹3,299",
    image: "/products/featured-4.jpg"
  }
];

const categories = [
  {
    id: 1,
    name: "Bracelets",
    description: "Handcrafted elegance for your wrist",
    image: "/categories/bracelets.jpg",
    color: "var(--neon-purple)"
  },
  {
    id: 2,
    name: "Glass Globes",
    description: "Magical memories captured in glass",
    image: "/categories/globes.jpg",
    color: "var(--neon-blue)"
  },
  {
    id: 3,
    name: "Chains",
    description: "Timeless classics reimagined",
    image: "/categories/chains.jpg",
    color: "var(--neon-gold)"
  },
  {
    id: 4,
    name: "Pendants",
    description: "Unique stories worn close to heart",
    image: "/categories/pendants.jpg",
    color: "var(--neon-pink)"
  },
  {
    id: 5,
    name: "Photo Frames",
    description: "Frame your precious moments",
    image: "/categories/frames.jpg",
    color: "var(--neon-purple)"
  },
  {
    id: 6,
    name: "Rings",
    description: "Symbols of eternal bonds",
    image: "/categories/rings.jpg",
    color: "var(--neon-blue)"
  }
];

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/avatars/priya.jpg",
    date: "March 15, 2024",
    rating: 5,
    productName: "Crystal Dreams Bracelet",
    productImage: "/products/featured-1.jpg",
    content: "Absolutely stunning! The craftsmanship is exceptional, and the crystals catch light beautifully. I've received countless compliments. This piece has become my go-to accessory for both special occasions and everyday wear.",
    images: ["/reviews/review1-1.jpg", "/reviews/review1-2.jpg"]
  },
  {
    id: 2,
    name: "Rahul Kapoor",
    avatar: "/avatars/rahul.jpg",
    date: "March 12, 2024",
    rating: 5,
    productName: "Golden Memories Frame",
    productImage: "/products/featured-2.jpg",
    content: "Gifted this to my parents on their anniversary. The personalization options were perfect, and the quality is outstanding. The gold plating adds such an elegant touch. Worth every penny!",
    images: ["/reviews/review2.jpg"]
  },
  {
    id: 3,
    name: "Ananya Patel",
    avatar: "/avatars/ananya.jpg",
    date: "March 10, 2024",
    rating: 5,
    productName: "Love Letter Pendant",
    productImage: "/products/featured-4.jpg",
    content: "The hidden message feature is so unique! I had my wedding vows engraved, and it's such a special piece to wear. The rose gold finish is gorgeous, and the customer service was exceptional.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    avatar: "/avatars/vikram.jpg",
    date: "March 8, 2024",
    rating: 4,
    productName: "Personalized Necklace",
    productImage: "/products/featured-3.jpg",
    content: "Beautiful design and excellent quality. The engraving came out perfectly. Shipping was quick and the packaging was very premium. Would definitely recommend!",
    images: ["/reviews/review4.jpg"]
  }
];

export default Home; 