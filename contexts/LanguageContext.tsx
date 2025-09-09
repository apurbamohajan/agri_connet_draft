import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Language types
export type Language = 'en' | 'bn';

// Product translations mapping
export interface ProductTranslations {
  [productName: string]: {
    name: string;
    description: string;
  };
}

// Product translations data
export const productTranslations: {
  en: ProductTranslations;
  bn: ProductTranslations;
} = {
  en: {
    'Fresh Organic Tomatoes': {
      name: 'Tomatoes',
      description: 'High-quality agricultural product sourced directly from local farms, ensuring quality and nutritional value.'
    },
    'Sweet Corn': {
      name: 'Corn',
      description: 'Sweet and tender corn kernels, perfect for cooking and healthy eating.'
    },
    'Mixed Leafy Greens': {
      name: 'Leafy Greens',
      description: 'Mix of nutritious leafy vegetables, rich in vitamins and minerals.'
    },
    'Farm Fresh Carrots': {
      name: 'Carrots',
      description: 'Crisp and sweet carrots, harvested from farms.'
    },
    'Fresh Strawberries': {
      name: 'Strawberries',
      description: 'Juicy and sweet strawberries, packed with vitamins and antioxidants.'
    },
    'Organic Bell Peppers': {
      name: 'Bell Peppers',
      description: 'Colorful and crunchy bell peppers, grown without pesticides.'
    },
    'Fresh Avocados': {
      name: 'Avocados',
      description: 'Creamy and nutritious avocados, perfect for healthy meals.'
    },
    'Organic Broccoli': {
      name: 'Broccoli',
      description: 'Green broccoli, rich in nutrients and vitamins.'
    },
    'Fresh Blueberries': {
      name: 'Blueberries',
      description: 'Sweet and antioxidant-rich blueberries, perfect for healthy snacking.'
    },
    'Organic Spinach': {
      name: 'Spinach',
      description: 'Tender spinach leaves, packed with iron and vitamins.'
    },
    'Fresh Pineapples': {
      name: 'Pineapples',
      description: 'Sweet and tropical pineapples, rich in vitamins and enzymes.'
    },
    'Organic Cucumbers': {
      name: 'Cucumbers',
      description: 'Crisp and refreshing cucumbers, perfect for salads and healthy eating.'
    },
    'Quinoa': {
      name: 'Quinoa',
      description: 'Nutritious and protein-rich quinoa seeds, perfect for healthy cooking.'
    },
    'Brown Rice': {
      name: 'Rice',
      description: 'Whole grain rice, rich in fiber and nutrients.'
    },
    'Fresh Basil': {
      name: 'Basil',
      description: 'Aromatic basil leaves, perfect for cooking and garnishing.'
    },
    'Organic Rosemary': {
      name: 'Rosemary',
      description: 'Fragrant rosemary herbs, ideal for cooking and seasoning.'
    },
    'Fresh Milk': {
      name: 'Milk',
      description: 'Pure milk from healthy cows, rich in calcium and proteins.'
    },
    'Organic Cheese': {
      name: 'Cheese',
      description: 'Artisanal cheese, made from the finest milk with traditional methods.'
    }
  },
  bn: {
    'Fresh Organic Tomatoes': {
      name: 'টমেটো',
      description: 'স্থানীয় খামার থেকে সরাসরি তাজা ও উচ্চমানের কৃষি পণ্য, গুণমান ও পুষ্টিগুণ নিশ্চিত করে।'
    },
    'Sweet Corn': {
      name: 'ভুট্টা',
      description: 'মিষ্টি ও নরম ভুট্টার দানা, রান্না ও সুস্বাস্থ্যকর খাওয়ার জন্য নিখুঁত।'
    },
    'Mixed Leafy Greens': {
      name: 'পাতা শাক',
      description: 'ভিটামিন ও খনিজ পদার্থে ভরপুর, পুষ্টিকর পাতায় শাকের তাজা মিশ্রণ।'
    },
    'Farm Fresh Carrots': {
      name: 'গাজর',
      description: 'জৈব খামার থেকে তাজা কাটা কুমড়া ও মিষ্টি গাজর।'
    },
    'Fresh Strawberries': {
      name: 'স্ট্রবেরি',
      description: 'ভিটামিন ও অ্যান্টিঅক্সিডেন্ট ভরপুর রসালো ও মিষ্টি স্ট্রবেরি।'
    },
    'Organic Bell Peppers': {
      name: 'মরিচ',
      description: 'কীটনাশক ছাড়া জৈবিক পদ্ধতিতে বাড়ানো রঙিন ও কুমড়া মরিচ।'
    },
    'Fresh Avocados': {
      name: 'অ্যাভোকাডো',
      description: 'সুস্বাস্থ্যকর খাবারের জন্য নিখুঁত ক্রিমি ও পুষ্টিকর অ্যাভোকাডো।'
    },
    'Organic Broccoli': {
      name: 'ব্রকলি',
      description: 'পুষ্টি ও ভিটামিনে ভরপুর তাজা ও সবুজ ব্রকলি।'
    },
    'Fresh Blueberries': {
      name: 'ব্লুবেরি',
      description: 'সুস্বাস্থ্যকর নাস্তার জন্য নিখুঁত মিষ্টি ও অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ ব্লুবেরি।'
    },
    'Organic Spinach': {
      name: 'পালং শাক',
      description: 'আয়রন ও ভিটামিনে ভরপুর তাজা ও নরম পালং শাকের পাতা।'
    },
    'Fresh Pineapples': {
      name: 'আনারস',
      description: 'ভিটামিন ও এনজাইমে ভরপুর মিষ্টি ও ক্রান্তীয় আনারস।'
    },
    'Organic Cucumbers': {
      name: 'শসা',
      description: 'সালাদ ও সুস্বাস্থ্যকর খাবারের জন্য নিখুঁত কুমড়া ও সতেজ শসা।'
    },
    'Quinoa': {
      name: 'কিনোয়া',
      description: 'সুস্বাস্থ্যকর রান্নার জন্য নিখুঁত পুষ্টিকর ও প্রোটিন সমৃদ্ধ কিনোয়ার বীজ।'
    },
    'Brown Rice': {
      name: 'চাল',
      description: 'ফাইবার ও পুষ্টিতে ভরপুর সম্পূর্ণ শস্য ব্রাউন রাইস।'
    },
    'Fresh Basil': {
      name: 'তুলসী পাতা',
      description: 'রান্না ও সাজানোর জন্য নিখুঁত সুগন্ধি ও তাজা তুলসীর পাতা।'
    },
    'Organic Rosemary': {
      name: 'রোজমেরি',
      description: 'রান্না ও মসলার জন্য আদর্শ তাজা ও সুগন্ধি রোজমেরি ভেষজ।'
    },
    'Fresh Milk': {
      name: 'দুধ',
      description: 'ক্যালসিয়াম ও প্রোটিনে ভরপুর সুস্থ গায়ের শুদ্ধ ও তাজা দুধ।'
    },
    'Organic Cheese': {
      name: 'চিজ',
      description: 'নিখুঁত দুধ দিয়ে তৈরি শিল্পকলার জৈব চিজ, তৈরি হয়েছে ত্রাদিসিয়াল পদ্ধতিতে।'
    }
  }
};

// Translation interface
export interface Translations {
  // Common
  loading: string;
  error: string;
  cancel: string;
  ok: string;
  save: string;
  delete: string;
  edit: string;
  search: string;
  
  // Home Screen
  welcome: string;
  welcomeBack: string;
  searchPlaceholder: string;
  shopByCategory: string;
  quickActions: string;
  featuredProducts: string;
  viewAllProducts: string;
  recentOrders: string;
  whyChooseAgriConnect: string;
  freshOrganic: string;
  freshOrganicDesc: string;
  supportLocalFarmers: string;
  supportLocalFarmersDesc: string;
  fastDelivery: string;
  fastDeliveryDesc: string;
  
  // Product
  addToCart: string;
  productDetails: string;
  price: string;
  farmer: string;
  category: string;
  location: string;
  description: string;
  addedToCart: string;
  
  // Categories
  vegetables: string;
  fruits: string;
  grains: string;
  herbs: string;
  dairy: string;
  organic: string;
  
  // Quick Actions
  addProduct: string;
  myCart: string;
  myOrders: string;
  messages: string;
  
  // Auth
  signIn: string;
  signUp: string;
  email: string;
  password: string;
  name: string;
  logout: string;
  
  // Status
  delivered: string;
  pending: string;
  confirmed: string;
  shipped: string;
  cancelled: string;
  
  // Misc
  items: string;
  productsFound: string;
  noProductsFound: string;
  tryAgain: string;
  imageNotAvailable: string;
  currency: string; // Currency symbol
  
  // Cart
  cartEmpty: string;
  removeFromCart: string;
  proceedToCheckout: string;
  continueShopping: string;
  orderSummary: string;
  subtotal: string;
  deliveryFee: string;
  total: string;
  deliveryInformation: string;
  estimatedDelivery: string;
}

// English translations
const englishTranslations: Translations = {
  // Common
  loading: 'Loading...',
  error: 'Error',
  cancel: 'Cancel',
  ok: 'OK',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  search: 'Search',
  
  // Home Screen
  welcome: 'Welcome',
  welcomeBack: 'Welcome back',
  searchPlaceholder: 'Search for fresh produce...',
  shopByCategory: 'Shop by Category',
  quickActions: 'Quick Actions',
  featuredProducts: 'Featured Products',
  viewAllProducts: 'View All Products',
  recentOrders: 'Recent Orders',
  whyChooseAgriConnect: 'Why Choose AgriConnect?',
  freshOrganic: 'Fresh & Organic',
  freshOrganicDesc: 'Get the freshest produce directly from local farms, ensuring quality and nutritional value.',
  supportLocalFarmers: 'Support Local Farmers',
  supportLocalFarmersDesc: 'Connect directly with farmers in your area and support sustainable agriculture practices.',
  fastDelivery: 'Fast Delivery',
  fastDeliveryDesc: 'Enjoy quick and reliable delivery service that brings farm-fresh products to your door.',
  
  // Product
  addToCart: 'Add to Cart',
  productDetails: 'Product Details',
  price: 'Price',
  farmer: 'Farmer',
  category: 'Category',
  location: 'Location',
  description: 'Description',
  addedToCart: 'Added to cart successfully!',
  
  // Categories
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  grains: 'Grains',
  herbs: 'Herbs',
  dairy: 'Dairy',
  organic: 'Organic',
  
  // Quick Actions
  addProduct: 'Add Product',
  myCart: 'My Cart',
  myOrders: 'My Orders',
  messages: 'Messages',
  
  // Auth
  signIn: 'Sign In',
  signUp: 'Sign Up',
  email: 'Email',
  password: 'Password',
  name: 'Name',
  logout: 'Logout',
  
  // Status
  delivered: 'Delivered',
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  cancelled: 'Cancelled',
  
  // Misc
  items: 'items',
  productsFound: 'products found',
  noProductsFound: 'No products found',
  tryAgain: 'Try Again',
  imageNotAvailable: 'Image not available',
  currency: '৳', // Bangladeshi Taka symbol
  
  // Cart
  cartEmpty: 'Your cart is empty',
  removeFromCart: 'Remove from cart',
  proceedToCheckout: 'Proceed to Checkout',
  continueShopping: 'Continue Shopping',
  orderSummary: 'Order Summary',
  subtotal: 'Subtotal',
  deliveryFee: 'Delivery Fee',
  total: 'Total',
  deliveryInformation: 'Delivery Information',
  estimatedDelivery: 'Fresh products delivered directly from local farms. Estimated delivery: 2-3 business days.',
};

// Bangla translations
const banglaTranslations: Translations = {
  // Common
  loading: 'লোড হচ্ছে...',
  error: 'ত্রুটি',
  cancel: 'বাতিল',
  ok: 'ঠিক আছে',
  save: 'সংরক্ষণ',
  delete: 'মুছুন',
  edit: 'সম্পাদনা',
  search: 'খুঁজুন',
  
  // Home Screen
  welcome: 'স্বাগতম',
  welcomeBack: 'আবার স্বাগতম',
  searchPlaceholder: 'তাজা পণ্যের জন্য খুঁজুন...',
  shopByCategory: 'শ্রেণী অনুযায়ী কিনুন',
  quickActions: 'দ্রুত কার্যক্রম',
  featuredProducts: 'বৈশিষ্ট্যযুক্ত পণ্য',
  viewAllProducts: 'সব পণ্য দেখুন',
  recentOrders: 'সাম্প্রতিক অর্ডার',
  whyChooseAgriConnect: 'কেন AgriConnect বেছে নিবেন?',
  freshOrganic: 'তাজা ও জৈব',
  freshOrganicDesc: 'স্থানীয় খামার থেকে সরাসরি সবচেয়ে তাজা পণ্য পান, গুণমান এবং পুষ্টিগুণ নিশ্চিত করে।',
  supportLocalFarmers: 'স্থানীয় কৃষকদের সহায়তা করুন',
  supportLocalFarmersDesc: 'আপনার এলাকার কৃষকদের সাথে সরাসরি যোগাযোগ করুন এবং টেকসই কৃষি অনুশীলনে সহায়তা করুন।',
  fastDelivery: 'দ্রুত ডেলিভারি',
  fastDeliveryDesc: 'দ্রুত এবং নির্ভরযোগ্য ডেলিভারি সেবা উপভোগ করুন যা খামার-তাজা পণ্য আপনার দোরগোড়ায় পৌঁছে দেয়।',
  
  // Product
  addToCart: 'কার্টে যোগ করুন',
  productDetails: 'পণ্যের বিবরণ',
  price: 'মূল্য',
  farmer: 'কৃষক',
  category: 'শ্রেণী',
  location: 'অবস্থান',
  description: 'বর্ণনা',
  addedToCart: 'সফলভাবে কার্টে যোগ করা হয়েছে!',
  
  // Categories
  vegetables: 'সবজি',
  fruits: 'ফল',
  grains: 'শস্য',
  herbs: 'ভেষজ',
  dairy: 'দুগ্ধজাত',
  organic: 'জৈব',
  
  // Quick Actions
  addProduct: 'পণ্য যোগ করুন',
  myCart: 'আমার কার্ট',
  myOrders: 'আমার অর্ডার',
  messages: 'বার্তা',
  
  // Auth
  signIn: 'সাইন ইন',
  signUp: 'সাইন আপ',
  email: 'ইমেইল',
  password: 'পাসওয়ার্ড',
  name: 'নাম',
  logout: 'লগআউট',
  
  // Status
  delivered: 'সরবরাহ করা হয়েছে',
  pending: 'অপেক্ষমান',
  confirmed: 'নিশ্চিত',
  shipped: 'পাঠানো হয়েছে',
  cancelled: 'বাতিল',
  
  // Misc
  items: 'আইটেম',
  productsFound: 'পণ্য পাওয়া গেছে',
  noProductsFound: 'কোন পণ্য পাওয়া যায়নি',
  tryAgain: 'আবার চেষ্টা করুন',
  imageNotAvailable: 'ছবি উপলব্ধ নেই',
  currency: '৳', // Bangladeshi Taka symbol (same in both languages)
  
  // Cart
  cartEmpty: 'আপনার কার্ট খালি',
  removeFromCart: 'কার্ট থেকে সরান',
  proceedToCheckout: 'চেকআউটে এগিয়ে যান',
  continueShopping: 'কেনাকাটা চালিয়ে যান',
  orderSummary: 'অর্ডার সারসংক্ষেপ',
  subtotal: 'উপমোট',
  deliveryFee: 'ডেলিভারি ফি',
  total: 'মোট',
  deliveryInformation: 'ডেলিভারি তথ্য',
  estimatedDelivery: 'স্থানীয় খামার থেকে সরাসরি তাজা পণ্য সরবরাহ। আনুমানিক ডেলিভারি: ২-৩ কার্যদিবস।',
};

// Language context interface
interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  getProductName: (originalName: string) => string;
  getProductDescription: (originalName: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language storage key
const LANGUAGE_STORAGE_KEY = '@agriconnect_language';

// Language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved language on app start
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    try {
      setLanguageState(newLanguage);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'bn' : 'en';
    setLanguage(newLanguage);
  };

  const getTranslations = (): Translations => {
    return language === 'bn' ? banglaTranslations : englishTranslations;
  };

  const getProductName = (originalName: string): string => {
    const productTranslation = productTranslations[language][originalName];
    return productTranslation ? productTranslation.name : originalName;
  };

  const getProductDescription = (originalName: string): string => {
    const productTranslation = productTranslations[language][originalName];
    return productTranslation ? productTranslation.description : 'Fresh and high-quality agricultural product sourced directly from local farmers.';
  };

  const value: LanguageContextType = {
    language,
    translations: getTranslations(),
    setLanguage,
    toggleLanguage,
    getProductName,
    getProductDescription,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}