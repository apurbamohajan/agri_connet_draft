import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) {
      console.log('AuthWrapper: Still loading...');
      return;
    }

    const inAuthGroup = segments[0] === '(tabs)';
    const onLoginPage = segments[0] === 'login';

    console.log('AuthWrapper: User state changed', { user: !!user, inAuthGroup, onLoginPage, segments });

    if (!user && inAuthGroup) {
      console.log('AuthWrapper: Redirecting to login (not authenticated)');
      // Redirect to login if user is not authenticated and trying to access protected routes
      router.replace('/login');
    } else if (user && onLoginPage) {
      console.log('AuthWrapper: User authenticated on login page, letting login screen handle navigation');
      // Only redirect if user is on login page, let the login screen handle its own navigation
      // This prevents conflicts with the success modal
      return;
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return <>{children}</>;
} 