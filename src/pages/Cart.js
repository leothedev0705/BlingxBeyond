import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity),
    0
  );

  if (cartItems.length === 0) {
    return (
      <motion.div 
        className="empty-cart"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2>Your cart is empty</h2>
        <p>Discover our beautiful collection and add some items to your cart!</p>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <motion.div 
              key={`${item.id}-${item.color}`}
              className="cart-item"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-color">Color: {item.color}</p>
                <p className="item-price">{item.price}</p>
              </div>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.color, Math.max(1, item.quantity - 1))}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button 
                className="remove-item"
                onClick={() => removeFromCart(item.id, item.color)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{total > 999 ? 'Free' : '₹99'}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{(total + (total > 999 ? 0 : 99)).toLocaleString()}</span>
            </div>
          </div>
          <button className="checkout-button">
            Proceed to Checkout
          </button>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart; 