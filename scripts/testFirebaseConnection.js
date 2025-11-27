// Test Firebase Connection and Create Sample Product
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFFC9ONM0n3ifwrXNqjAjFiRLZ9PitZsM",
  authDomain: "agriconnect-b3449.firebaseapp.com",
  projectId: "agriconnect-b3449",
  storageBucket: "agriconnect-b3449.firebasestorage.app",
  messagingSenderId: "181753432657",
  appId: "1:181753432657:android:73f4fe115a1f871da50670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  try {
    console.log('Testing Firebase connection...');
    
    // Try to read existing products
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    console.log('Existing products count:', snapshot.size);
    
    // Try to add a test product
    const testProduct = {
      name: 'Test Product',
      price: 100,
      category: 'Test',
      farmer: 'Test Farmer',
      rating: 5.0,
      createdAt: new Date(),
      updatedAt: new Date(),
      farmerId: 'test-farmer-id'
    };
    
    const docRef = await addDoc(collection(db, 'products'), testProduct);
    console.log('Test product added with ID:', docRef.id);
    
    console.log('Firebase connection successful!');
    
  } catch (error) {
    console.error('Firebase connection failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
}

testConnection();