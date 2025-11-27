import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/ProductCard';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { productService } from '@/services/firebase';
import { Product } from '@/types';

const { width } = Dimensions.get('window');

export default function FarmerDashboard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();
  const { translations, language } = useLanguage();
  
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch farmer's products
  useEffect(() => {
    if (user?.uid) {
      fetchMyProducts();
    }
  }, [user]);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.uid) {
        setError('User not authenticated');
        return;
      }

      const products = await productService.getProductsByFarmer(user.uid);
      setMyProducts(products as Product[]);
    } catch (err: any) {
      console.error('Error fetching farmer products:', err);
      setError('Failed to load your products');
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product: Product) => {
    Alert.alert(
      'Product Options',
      `What would you like to do with ${product.name}?`,
      [
        { text: 'View Details', onPress: () => router.push(`/product/${product.id}`) },
        { text: 'Edit Product', onPress: () => Alert.alert('Edit', 'Edit functionality coming soon!') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderStatsCard = (title: string, value: string, icon: string, color: string) => (
    <View style={[styles.statsCard, { backgroundColor: colors.background }]}>
      <View style={[styles.statsIcon, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={24} color="white" />
      </View>
      <View style={styles.statsContent}>
        <ThemedText style={styles.statsValue}>{value}</ThemedText>
        <ThemedText style={styles.statsTitle}>{title}</ThemedText>
      </View>
    </View>
  );

  const renderMyProductsContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <ThemedText style={styles.loadingText}>Loading your products...</ThemedText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMyProducts}>
            <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    if (myProducts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="basket-outline" size={64} color="#ccc" />
          <ThemedText style={styles.emptyTitle}>No Products Listed</ThemedText>
          <ThemedText style={styles.emptyDescription}>
            You haven't listed any products yet. Start selling by adding your first product!
          </ThemedText>
          <TouchableOpacity 
            style={styles.addFirstProductButton}
            onPress={() => router.push('/add-product')}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <ThemedText style={styles.addFirstProductText}>Add Your First Product</ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.productsGrid}>
        {myProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onPress={handleProductPress}
            showAddToCart={false} // Farmers don't need add to cart on their own products
          />
        ))}
      </View>
    );
  };

  const totalRevenue = myProducts.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);
  const avgPrice = myProducts.length > 0 ? totalRevenue / myProducts.length : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Farmer Dashboard</ThemedText>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add-product')}
        >
          <Ionicons name="add" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <ThemedText style={styles.welcomeText}>
            Welcome back, {user?.name || 'Farmer'}! 👨‍🌾
          </ThemedText>
          <ThemedText style={styles.welcomeSubtext}>
            Manage your products and grow your business
          </ThemedText>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {renderStatsCard('Total Products', myProducts.length.toString(), 'basket', '#4CAF50')}
          {renderStatsCard('Avg. Price', `৳${avgPrice.toFixed(0)}`, 'cash', '#FF9800')}
          {renderStatsCard('Categories', new Set(myProducts.map(p => p.category)).size.toString(), 'grid', '#2196F3')}
          {renderStatsCard('Total Value', `৳${totalRevenue.toLocaleString()}`, 'trending-up', '#9C27B0')}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/add-product')}
            >
              <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
              <ThemedText style={styles.quickActionText}>Add Product</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Alert.alert('Orders', 'Order management coming soon!')}
            >
              <Ionicons name="list-outline" size={24} color="#FF9800" />
              <ThemedText style={styles.quickActionText}>View Orders</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Alert.alert('Analytics', 'Analytics coming soon!')}
            >
              <Ionicons name="analytics-outline" size={24} color="#2196F3" />
              <ThemedText style={styles.quickActionText}>Analytics</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={fetchMyProducts}
            >
              <Ionicons name="refresh-outline" size={24} color="#9C27B0" />
              <ThemedText style={styles.quickActionText}>Refresh</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>My Products ({myProducts.length})</ThemedText>
            <TouchableOpacity 
              style={styles.addProductButton}
              onPress={() => router.push('/add-product')}
            >
              <Ionicons name="add" size={16} color="#4CAF50" />
              <ThemedText style={styles.addProductText}>Add</ThemedText>
            </TouchableOpacity>
          </View>
          {renderMyProductsContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statsCard: {
    width: (width - 60) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsContent: {
    flex: 1,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statsTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E8F5E8',
  },
  addProductText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - 60) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  addFirstProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstProductText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});