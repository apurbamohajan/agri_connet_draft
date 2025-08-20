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
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Category, Product } from '@/types';

const { width } = Dimensions.get('window');

const mockCategories: Category[] = [
  { id: '1', name: 'Vegetables', icon: 'leaf-outline', itemCount: '500+ items', color: '#4CAF50' },
  { id: '2', name: 'Fruits', icon: 'nutrition-outline', itemCount: '300+ items', color: '#FF9800' },
  { id: '3', name: 'Grains', icon: 'restaurant-outline', itemCount: '150+ items', color: '#8D6E63' },
  { id: '4', name: 'Herbs', icon: 'flower-outline', itemCount: '80+ items', color: '#4CAF50' },
  { id: '5', name: 'Dairy', icon: 'water-outline', itemCount: '120+ items', color: '#2196F3' },
  { id: '6', name: 'Organic', icon: 'leaf-outline', itemCount: '400+ items', color: '#4CAF50' },
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
  const { logout, user } = useAuth();

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
          <TouchableOpacity style={styles.cartButton} onPress={() => logout()}>
            <View style={styles.cartIconContainer}>
              <Ionicons name="log-out-outline" size={24} color="#4CAF50" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Debug Info */}
        <View style={styles.debugSection}>
          <ThemedText style={styles.debugText}>
            User: {user ? `${user.name} (${user.role})` : 'Not logged in'}
          </ThemedText>
          <ThemedText style={styles.debugText}>
            UID: {user?.uid || 'None'}
          </ThemedText>
        </View>

        {/* Welcome Message */}
        {user && (
          <View style={styles.welcomeSection}>
            <ThemedText style={styles.welcomeText}>
              Welcome back, {user.name}! 👋
            </ThemedText>
            <View style={styles.roleBadge}>
              <Ionicons 
                name={user.role === 'farmer' ? 'leaf-outline' : 'cart-outline'} 
                size={16} 
                color="#4CAF50" 
              />
              <ThemedText style={styles.roleText}>
                {user.role === 'farmer' ? 'Farmer' : 'Buyer'}
              </ThemedText>
            </View>
          </View>
        )}

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

        {/* Why Choose AgriConnect Section */}
        <View style={styles.whyChooseSection}>
          <ThemedText style={styles.whyChooseTitle}>Why Choose AgriConnect?</ThemedText>
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="leaf-outline" size={24} color="#4CAF50" />
              </View>
              <ThemedText style={styles.featureTitle}>Fresh & Organic</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Get the freshest produce directly from local farms, ensuring quality and nutritional value.
              </ThemedText>
            </View>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="people-outline" size={24} color="#2196F3" />
              </View>
              <ThemedText style={styles.featureTitle}>Support Local Farmers</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Connect directly with farmers in your area and support sustainable agriculture practices.
              </ThemedText>
            </View>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="car-outline" size={24} color="#FF9800" />
              </View>
              <ThemedText style={styles.featureTitle}>Fast Delivery</ThemedText>
              <ThemedText style={styles.featureDescription}>
                Enjoy quick and reliable delivery service that brings farm-fresh products to your door.
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <View style={styles.footerLogo}>
                <Ionicons name="leaf" size={24} color="#4CAF50" />
                <ThemedText style={styles.footerLogoText}>AgriConnect</ThemedText>
              </View>
              <ThemedText style={styles.footerTagline}>
                Connecting farmers and buyers{'\n'}for a sustainable future in{'\n'}agriculture.
              </ThemedText>
            </View>
            <View style={styles.footerLinks}>
              <View style={styles.footerColumn}>
                <ThemedText style={styles.footerColumnTitle}>For Buyers</ThemedText>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Browse Products</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>How to Order</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Delivery Info</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Customer Support</ThemedText></TouchableOpacity>
              </View>
              <View style={styles.footerColumn}>
                <ThemedText style={styles.footerColumnTitle}>For Farmers</ThemedText>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Sell Your Products</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Farmer Dashboard</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Pricing Guide</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Success Stories</ThemedText></TouchableOpacity>
              </View>
              <View style={styles.footerColumn}>
                <ThemedText style={styles.footerColumnTitle}>Company</ThemedText>
                <TouchableOpacity><ThemedText style={styles.footerLink}>About Us</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Contact</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Privacy Policy</ThemedText></TouchableOpacity>
                <TouchableOpacity><ThemedText style={styles.footerLink}>Terms of Service</ThemedText></TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.footerDivider} />
          <View style={styles.footerCopyright}>
            <ThemedText style={styles.copyrightText}>© 2024 AgriConnect. All rights reserved.</ThemedText>
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
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 6,
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
  whyChooseSection: {
    backgroundColor: '#F0F8F0',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  whyChooseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    width: (width - 60) / 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  footer: {
    backgroundColor: '#1a1a1a',
    paddingTop: 40,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footerLeft: {
    flex: 1,
    marginRight: 40,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  footerTagline: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    flex: 2,
  },
  footerColumn: {
    flex: 1,
    marginLeft: 20,
  },
  footerColumnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  footerLink: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#333',
    marginHorizontal: 20,
  },
  footerCopyright: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
  },
  debugSection: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
});
