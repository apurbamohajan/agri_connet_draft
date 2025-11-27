import { auth, db } from '@/config/firebase';
import { User as UserType } from '@/types';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';

// 🔐 Authentication Services
export const authService = {
  // Register new user
  async register(email: string, password: string, userData: Partial<UserType>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: userData.name,
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        name: userData.name,
        email: user.email,
        role: userData.role || 'buyer',
        phone: userData.phone || '',
        address: userData.address || '',
        createdAt: new Date(),
      });

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Login user
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Logout user
  async logout() {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },
};

// 📊 User Data Services
export const userService = {
  // Get user profile from Firestore
  async getUserProfile(userId: string): Promise<UserType | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as UserType;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserType>) {
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

// 🛍️ Product Services
export const productService = {
  // Add new product
  async addProduct(productData: any, farmerId: string) {
    try {
      const productRef = await addDoc(collection(db, 'products'), {
        ...productData,
        farmerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return productRef.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Get all products
  async getAllProducts() {
    try {
      const q = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Add sample products (for development)
  async addSampleProducts() {
    try {
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
        },
        {
          name: 'Fresh Blueberries',
          price: 1100,
          image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
          category: 'Fruits',
          farmer: 'নীল বেরি পাহাড়',
          rating: 4.8,
          unit: 'per box',
          location: 'রানীশংকৈল',
          badge: 'Premium',
          description: 'Sweet and antioxidant-rich blueberries.',
        },
        {
          name: 'Organic Spinach',
          price: 440,
          image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
          category: 'Vegetables',
          farmer: 'পাতা শাক খামার',
          rating: 4.4,
          unit: 'per bundle',
          location: 'কুমিল্লা',
          badge: 'Organic',
          description: 'Iron-rich organic spinach perfect for healthy meals.',
        },
        {
          name: 'Fresh Pineapples',
          price: 715,
          image: 'https://images.unsplash.com/photo-1550258987-190a62d4fa70?w=400',
          category: 'Fruits',
          farmer: 'ক্রান্তীয় স্বর্গ',
          rating: 4.7,
          unit: 'per piece',
          location: 'খুলনা',
          badge: 'Fresh',
          description: 'Sweet and juicy pineapples from tropical paradise.',
        },
        {
          name: 'Organic Cucumbers',
          price: 365,
          image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400',
          category: 'Vegetables',
          farmer: 'সতেজ উপত্যকা খামার',
          rating: 4.3,
          unit: 'per kg',
          location: 'যশোর',
          badge: 'Organic',
          description: 'Crisp and refreshing organic cucumbers.',
        },
      ];

      const addPromises = sampleProducts.map(product => 
        addDoc(collection(db, 'products'), {
          ...product,
          farmerId: 'sample-farmer-id',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );

      await Promise.all(addPromises);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Get products by category
  async getProductsByCategory(category: string) {
    try {
      const q = query(
        collection(db, 'products'),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Get featured products
  async getFeaturedProducts(limitCount: number = 10) {
    try {
      const q = query(
        collection(db, 'products'),
        orderBy('rating', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Get products by farmer
  async getProductsByFarmer(farmerId: string) {
    try {
      const q = query(
        collection(db, 'products'),
        where('farmerId', '==', farmerId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

// 🛒 Cart Services
export const cartService = {
  // Add item to cart
  async addToCart(userId: string, productId: string, quantity: number, price: number) {
    try {
      await addDoc(collection(db, 'carts'), {
        userId,
        productId,
        quantity,
        price,
        createdAt: new Date(),
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Get user's cart
  async getUserCart(userId: string) {
    try {
      const q = query(
        collection(db, 'carts'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}; 