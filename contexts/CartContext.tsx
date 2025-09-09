import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { Product } from '@/types';
import { useLanguage } from './LanguageContext';

// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  farmer: string;
  location: string;
  category: string;
  quantity: number;
  unit: string;
}

// Cart context interface
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart storage key
const CART_STORAGE_KEY = '@agriconnect_cart';

// Cart provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { language } = useLanguage();

  // Load saved cart on app start
  useEffect(() => {
    loadSavedCart();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const loadSavedCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading saved cart:', error);
    }
  };

  const saveCart = async (cart: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        // Show success message
        Alert.alert(
          language === 'en' ? 'Added to Cart' : 'কার্টে যোগ করা হয়েছে',
          language === 'en' 
            ? `${product.name} quantity updated in cart!`
            : `${product.name} কার্টে আপডেট করা হয়েছে!`,
          [{ text: language === 'en' ? 'OK' : 'ঠিক আছে' }]
        );
        
        return updatedItems;
      } else {
        // Add new item to cart
        const newCartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          farmer: product.farmer,
          location: product.location || 'Local Farm',
          category: product.category,
          quantity: 1,
          unit: product.unit || 'per item',
        };
        
        // Show success message
        Alert.alert(
          language === 'en' ? 'Added to Cart' : 'কার্টে যোগ করা হয়েছে',
          language === 'en' 
            ? `${product.name} added to cart!`
            : `${product.name} কার্টে যোগ করা হয়েছে!`,
          [{ text: language === 'en' ? 'OK' : 'ঠিক আছে' }]
        );
        
        return [...prevItems, newCartItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const deliveryFee = 55; // ৳55 delivery fee
    return subtotal + deliveryFee;
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCartSubtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}