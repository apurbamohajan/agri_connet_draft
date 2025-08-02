import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Category, Product } from '@/types';

const { width } = Dimensions.get('window');

const mockCategories: Category[] = [
  { id: '1', name: 'Vegetables', icon: 'leaf-outline', color: '#4CAF50', itemCount: '500+ items' },
  { id: '2', name: 'Fruits', icon: 'nutrition', color: '#E91E63', itemCount: '300+ items' },
  { id: '3', name: 'Grains', icon: 'nutrition-outline', color: '#FF9800', itemCount: '150+ items' },
  { id: '4', name: 'Herbs', icon: 'flower-outline', color: '#8BC34A', itemCount: '80+ items' },
  { id: '5', name: 'Dairy', icon: 'water-outline', color: '#2196F3', itemCount: '120+ items' },
  { id: '6', name: 'Organic', icon: 'leaf', color: '#4CAF50', itemCount: '400+ items' },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    category: 'Vegetables',
    farmer: 'Green Valley Farm',
    rating: 4.5,
    unit: 'per kg',
    location: 'California',
    badge: 'Organic',
  },
  {
    id: '2',
    name: 'Sweet Corn',
    price: 3.5,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    category: 'Vegetables',
    farmer: 'Sunny Acres',
    rating: 4.8,
    unit: 'per dozen',
    location: 'Iowa',
    badge: 'Fresh',
  },
  {
    id: '3',
    name: 'Mixed Leafy Greens',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Vegetables',
    farmer: 'Organic Harvest Co.',
    rating: 4.6,
    unit: 'per bundle',
    location: 'Oregon',
    badge: 'Organic',
  },
  {
    id: '4',
    name: 'Farm Fresh Carrots',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    category: 'Vegetables',
    farmer: 'Heritage Farm',
    rating: 4.4,
    unit: 'per kg',
    location: 'Vermont',
    badge: 'Local',
  },
  {
    id: '5',
    name: 'Fresh Strawberries',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    category: 'Fruits',
    farmer: 'Berry Bliss Farm',
    rating: 4.9,
    unit: 'per box',
    location: 'Florida',
    badge: 'Premium',
  },
  {
    id: '6',
    name: 'Organic Bell Peppers',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    category: 'Vegetables',
    farmer: 'Colorful Harvest',
    rating: 4.7,
    unit: 'per kg',
    location: 'Texas',
    badge: 'Organic',
  },
  {
    id: '7',
    name: 'Fresh Avocados',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Fruits',
    farmer: 'Tropical Grove',
    rating: 4.6,
    unit: 'per kg',
    location: 'California',
    badge: 'Fresh',
  },
  {
    id: '8',
    name: 'Organic Broccoli',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
    category: 'Vegetables',
    farmer: 'Green Fields Co.',
    rating: 4.5,
    unit: 'per kg',
    location: 'Washington',
    badge: 'Organic',
  },
  {
    id: '9',
    name: 'Fresh Blueberries',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
    category: 'Fruits',
    farmer: 'Blueberry Hill',
    rating: 4.8,
    unit: 'per box',
    location: 'Maine',
    badge: 'Premium',
  },
  {
    id: '10',
    name: 'Organic Spinach',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    category: 'Vegetables',
    farmer: 'Leafy Greens Farm',
    rating: 4.4,
    unit: 'per bundle',
    location: 'Arizona',
    badge: 'Organic',
  },
  {
    id: '11',
    name: 'Fresh Pineapples',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1550258987-190a62d4fa70?w=400',
    category: 'Fruits',
    farmer: 'Tropical Paradise',
    rating: 4.7,
    unit: 'per piece',
    location: 'Hawaii',
    badge: 'Fresh',
  },
  {
    id: '12',
    name: 'Organic Cucumbers',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400',
    category: 'Vegetables',
    farmer: 'Crisp Valley Farm',
    rating: 4.3,
    unit: 'per kg',
    location: 'Georgia',
    badge: 'Organic',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<Array<{ id: string; quantity: number }>>([]);

  const handleCategoryPress = (category: Category) => {
    Alert.alert('Category Selected', `You selected ${category.name}`);
  };

  const handleProductPress = (product: Product) => {
    Alert.alert('Product Selected', `You selected ${product.name} - $${product.price}`);
  };

  const handleQuickAction = (action: string) => {
    Alert.alert('Quick Action', `You selected: ${action}`);
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { id: product.id, quantity: 1 }];
      }
    });
    Alert.alert('Added to Cart', `${product.name} added to cart!`);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderCategoryItem = (category: Category) => (
    <CategoryCard
      key={category.id}
      {...category}
      onPress={handleCategoryPress}
    />
  );

  const renderProductItem = (product: Product) => (
    <ProductCard
      key={product.id}
      {...product}
      onPress={handleProductPress}
      showAddToCart={true}
      onAddToCart={addToCart}
    />
  );

  const renderQuickAction = (icon: keyof typeof Ionicons.glyphMap, title: string, action: string) => (
    <TouchableOpacity
      style={[styles.quickAction, { backgroundColor: colors.background }]}
      onPress={() => handleQuickAction(action)}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: '#4CAF50' }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <ThemedText style={styles.quickActionText}>{title}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={28} color="#4CAF50" />
            <ThemedText style={styles.logoText}>AgriConnect</ThemedText>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart-outline" size={24} color="#4CAF50" />
              {getCartItemCount() > 0 && (
                <View style={styles.cartBadge}>
                  <ThemedText style={styles.cartBadgeText}>
                    {getCartItemCount() > 99 ? '99+' : getCartItemCount()}
                  </ThemedText>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for fresh produce..."
            onSearch={(query) => {
              Alert.alert('Search', `Searching for: ${query}`);
            }}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Shop by Category</ThemedText>
          <View style={styles.categoriesContainer}>
            {mockCategories.map(renderCategoryItem)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionsContainer}>
            {renderQuickAction('add-circle-outline', 'Add Product', 'Add new product')}
            {renderQuickAction('cart-outline', 'My Cart', 'View cart')}
            {renderQuickAction('list-outline', 'My Orders', 'View orders')}
            {renderQuickAction('chatbubbles-outline', 'Messages', 'View messages')}
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Featured Products</ThemedText>
            <TouchableOpacity style={styles.viewAllButton}>
              <ThemedText style={styles.viewAllText}>View All Products</ThemedText>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
            {mockProducts.map(renderProductItem)}
          </ScrollView>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recent Orders</ThemedText>
          <View style={[styles.recentOrderCard, { backgroundColor: colors.background }]}>
            <View style={styles.recentOrderHeader}>
              <Ionicons name="time-outline" size={20} color={colors.icon} />
              <ThemedText style={styles.recentOrderTitle}>Order #12345</ThemedText>
              <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
                <ThemedText style={styles.statusText}>Delivered</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.recentOrderItems}>Fresh Tomatoes, Organic Rice</ThemedText>
            <ThemedText style={styles.recentOrderDate}>Delivered on Dec 15, 2024</ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 8,
  },
  cartButton: {
    padding: 8,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E91E63',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  searchSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  productsContainer: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  recentOrderCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentOrderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentOrderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  recentOrderItems: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  recentOrderDate: {
    fontSize: 12,
    opacity: 0.7,
    color: '#999',
  },
});
