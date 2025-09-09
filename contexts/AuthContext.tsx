import { auth } from '@/config/firebase';
import { authService, userService } from '@/services/firebase';
import { User as UserType } from '@/types';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Extended user interface with Firebase user
interface AppUser extends UserType {
  uid: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserType>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Setting up auth state listener');
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      console.log('AuthContext: Auth state changed', { firebaseUser: !!firebaseUser });
      
      if (firebaseUser) {
        try {
          console.log('AuthContext: Fetching user profile for', firebaseUser.uid);
          // Get user profile from Firestore
          const userProfile = await userService.getUserProfile(firebaseUser.uid);
          if (userProfile) {
            console.log('AuthContext: User profile fetched successfully', userProfile);
            setUser({
              ...userProfile,
              uid: firebaseUser.uid,
            });
          } else {
            console.log('AuthContext: No user profile found');
          }
        } catch (error) {
          console.error('AuthContext: Error fetching user profile:', error);
        }
      } else {
        console.log('AuthContext: No firebase user, setting user to null');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Signing in user', email);
      await authService.login(email, password);
      console.log('AuthContext: Sign in successful, waiting for auth state change');
      // User will be set automatically by onAuthStateChanged
    } catch (error: any) {
      console.error('AuthContext: Sign in error', error);
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserType>) => {
    try {
      console.log('AuthContext: Signing up user', email, userData);
      await authService.register(email, password, userData);
      console.log('AuthContext: Sign up successful, waiting for auth state change');
      // User will be set automatically by onAuthStateChanged
    } catch (error: any) {
      console.error('AuthContext: Sign up error', error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 