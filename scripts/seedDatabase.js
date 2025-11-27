// Firebase Database Seeding Script
// This script will populate your Firestore database with sample product data

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample products data
const sampleProducts = [
  {
    name: 'Fresh Organic Tomatoes',
    price: 550,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    category: 'Vegetables',
    farmer: 'সবুজ উপত্যকা খামার',
    rating: 4.5,
    unit: 'per kg',
    location: 'সিলেট',
    badge: 'Organic',
    description: 'Fresh and high-quality organic tomatoes sourced directly from local farmers.',
    farmerId: 'sample-farmer-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Sweet Corn',
    price: 385,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    category: 'Vegetables',
    farmer: 'রৌদ্রোজ্জ্বল খামার',
    rating: 4.8,
    unit: 'per dozen',
    location: 'রংপুর',
    badge: 'Fresh',
    description: 'Sweet and tender corn freshly harvested from sunny acres.',
    farmerId: 'sample-farmer-2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Mixed Leafy Greens',
    price: 770,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Vegetables',
    farmer: 'জৈব ফসল কোম্পানি',
    rating: 4.6,
    unit: 'per bundle',
    location: 'ময়মনসিংহ',
    badge: 'Organic',
    description: 'A nutritious mix of fresh leafy greens perfect for salads.',
    farmerId: 'sample-farmer-3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Farm Fresh Carrots',
    price: 330,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    category: 'Vegetables',
    farmer: 'ঐতিহ্য খামার',
    rating: 4.4,
    unit: 'per kg',
    location: 'দিনাজপুর',
    badge: 'Local',
    description: 'Crunchy and sweet carrots from heritage farms.',
    farmerId: 'sample-farmer-4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Fresh Strawberries',
    price: 990,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    category: 'Fruits',
    farmer: 'বেরি আনন্দ খামার',
    rating: 4.9,
    unit: 'per box',
    location: 'চট্টগ্রাম',
    badge: 'Premium',
    description: 'Juicy and sweet strawberries packed with flavor.',
    farmerId: 'sample-farmer-5',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Organic Bell Peppers',
    price: 605,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    category: 'Vegetables',
    farmer: 'রঙিন ফসল খামার',
    rating: 4.7,
    unit: 'per kg',
    location: 'বরিশাল',
    badge: 'Organic',
    description: 'Colorful and crispy bell peppers grown organically.',
    farmerId: 'sample-farmer-6',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Fresh Avocados',
    price: 880,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Fruits',
    farmer: 'ক্রান্তীয় বাগান',
    rating: 4.6,
    unit: 'per kg',
    location: 'স্যাধেট',
    badge: 'Fresh',
    description: 'Creamy and nutritious avocados from tropical groves.',
    farmerId: 'sample-farmer-7',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Organic Broccoli',
    price: 495,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
    category: 'Vegetables',
    farmer: 'সবুজ ক্ষেত কোম্পানি',
    rating: 4.5,
    unit: 'per kg',
    location: 'গাজীপুর',
    badge: 'Organic',
    description: 'Fresh and nutritious organic broccoli.',
    farmerId: 'sample-farmer-8',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to seed the database
async function seedDatabase() {
  try {
    console.log('Starting to seed database with sample products...');
    
    for (const product of sampleProducts) {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log('Added product:', product.name, 'with ID:', docRef.id);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeding function
seedDatabase();