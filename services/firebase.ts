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