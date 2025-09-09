import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    if (loading) return; // Wait for auth state loading to finish

    const inTabsGroup = segments[0] === '(tabs)';
    const onLoginPage = segments[0] === 'login';

    console.log('AuthWrapper:', { user: !!user, inTabsGroup, onLoginPage, segments });

    if (!user && inTabsGroup) {
      // Not logged in, but trying to access tabs → send to login
      router.replace('/login');
    } else if (user && onLoginPage) {
      // Logged in but still on login page → send to home
      router.replace('/(tabs)');
    }
  }, [user, loading, segments, router]);

  if (loading) {
    // Show loading spinner while auth state initializes
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // Auth state loaded, render child content
  return <>{children}</>;
}
