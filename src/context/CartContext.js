import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    updateCartCount(savedCart);
  }, []);

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.color === item.color
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = prevItems.map((i, index) => 
          index === existingItemIndex 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newItems = [...prevItems, item];
      }

      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartCount(newItems);
      return newItems;
    });
  };

  const removeFromCart = (itemId, color) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(
        item => !(item.id === itemId && item.color === color)
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartCount(newItems);
      return newItems;
    });
  };

  const updateQuantity = (itemId, color, quantity) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => 
        item.id === itemId && item.color === color
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartCount(newItems);
      return newItems;
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 