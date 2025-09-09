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
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
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

// Function to get translated category name
const getTranslatedCategoryName = (categoryName: string, translations: any, language: string) => {
  switch (categoryName.toLowerCase()) {
    case 'vegetables': return translations.vegetables;
    case 'fruits': return translations.fruits;
    case 'grains': return translations.grains;
    case 'herbs': return translations.herbs;
    case 'dairy': return translations.dairy;
    case 'organic': return translations.organic;
    default: return categoryName;
  }
};

// Function to get translated item count
const getTranslatedItemCount = (itemCount: string, language: string) => {
  if (language === 'bn') {
    return itemCount.replace('items', 'আইটেম').replace('+', '+');
  }
  return itemCount;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 550, // ৳550 per kg (was $4.99)
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    category: 'Vegetables',
    farmer: 'সবুজ উপত্যকা খামার', // Green Valley Farm in Bangla
    rating: 4.5,
    unit: 'per kg',
    location: 'সিলেট',
    badge: 'Organic',
  },
  {
    id: '2',
    name: 'Sweet Corn',
    price: 385, // ৳385 per dozen (was $3.50)
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    category: 'Vegetables',
    farmer: 'রৌদ্রোজ্জ্বল খামার', // Sunny Acres in Bangla
    rating: 4.8,
    unit: 'per dozen',
    location: 'রংপুর',
    badge: 'Fresh',
  },
  {
    id: '3',
    name: 'Mixed Leafy Greens',
    price: 770, // ৳770 per bundle (was $6.99)
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Vegetables',
    farmer: 'জৈব ফসল কোম্পানি', // Organic Harvest Co. in Bangla
    rating: 4.6,
    unit: 'per bundle',
    location: 'ময়মনসিংহ',
    badge: 'Organic',
  },
  {
    id: '4',
    name: 'Farm Fresh Carrots',
    price: 330, // ৳330 per kg (was $2.99)
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    category: 'Vegetables',
    farmer: 'ঐতিহ্য খামার', // Heritage Farm in Bangla
    rating: 4.4,
    unit: 'per kg',
    location: 'দিনাজপুর',
    badge: 'Local',
  },
  {
    id: '5',
    name: 'Fresh Strawberries',
    price: 990, // ৳990 per box (was $8.99)
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    category: 'Fruits',
    farmer: 'বেরি আনন্দ খামার', // Berry Bliss Farm in Bangla
    rating: 4.9,
    unit: 'per box',
    location: 'চট্টগ্রাম',
    badge: 'Premium',
  },
  {
    id: '6',
    name: 'Organic Bell Peppers',
    price: 605, // ৳605 per kg (was $5.49)
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    category: 'Vegetables',
    farmer: 'রঙিন ফসল খামার', // Colorful Harvest in Bangla
    rating: 4.7,
    unit: 'per kg',
    location: 'বরিশাল',
    badge: 'Organic',
  },
  {
    id: '7',
    name: 'Fresh Avocados',
    price: 880, // ৳880 per kg (was $7.99)
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Fruits',
    farmer: 'ক্রান্তীয় বাগান', // Tropical Grove in Bangla
    rating: 4.6,
    unit: 'per kg',
    location: 'স্যাধেট',
    badge: 'Fresh',
  },
  {
    id: '8',
    name: 'Organic Broccoli',
    price: 495, // ৳495 per kg (was $4.49)
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
    category: 'Vegetables',
    farmer: 'সবুজ ক্ষেত কোম্পানি', // Green Fields Co. in Bangla
    rating: 4.5,
    unit: 'per kg',
    location: 'গাজীপুর',
    badge: 'Organic',
  },
  {
    id: '9',
    name: 'Fresh Blueberries',
    price: 1100, // ৳1100 per box (was $9.99)
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
    category: 'Fruits',
    farmer: 'নীল বেরি পাহাড়', // Blueberry Hill in Bangla
    rating: 4.8,
    unit: 'per box',
    location: 'রানীশংকৈল',
    badge: 'Premium',
  },
  {
    id: '10',
    name: 'Organic Spinach',
    price: 440, // ৳440 per bundle (was $3.99)
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    category: 'Vegetables',
    farmer: 'পাতা শাক খামার', // Leafy Greens Farm in Bangla
    rating: 4.4,
    unit: 'per bundle',
    location: 'কুমিল্লা',
    badge: 'Organic',
  },
  {
    id: '11',
    name: 'Fresh Pineapples',
    price: 715, // ৳715 per piece (was $6.49)
    image: 'https://images.unsplash.com/photo-1550258987-190a62d4fa70?w=400',
    category: 'Fruits',
    farmer: 'ক্রান্তীয় স্বর্গ', // Tropical Paradise in Bangla
    rating: 4.7,
    unit: 'per piece',
    location: 'খুলনা',
    badge: 'Fresh',
  },
  {
    id: '12',
    name: 'Organic Cucumbers',
    price: 365, // ৳365 per kg (was $3.29)
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400',
    category: 'Vegetables',
    farmer: 'সতেজ উপত্যকা খামার', // Crisp Valley Farm in Bangla
    rating: 4.3,
    unit: 'per kg',
    location: 'যশোর',
    badge: 'Organic',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const { logout, user } = useAuth();
  const { language, toggleLanguage, translations } = useLanguage();
  const { addToCart, getCartItemCount } = useCart();

  const handleCategoryPress = (category: Category) => {
    // Navigation is now handled by the CategoryCard component
    console.log('Category selected:', category.name);
  };

  const handleProductPress = (product: Product) => {
    Alert.alert('Product Selected', `You selected ${product.name} - $${product.price}`);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'View cart':
        router.push('/cart');
        break;
      default:
        Alert.alert('Quick Action', `You selected: ${action}`);
        break;
    }
  };

  const renderCategoryItem = (category: Category) => {
    const translatedCategory = {
      ...category,
      name: getTranslatedCategoryName(category.name, translations, language),
      itemCount: getTranslatedItemCount(category.itemCount || '', language)
    };
    
    return (
      <CategoryCard
        key={category.id}
        {...translatedCategory}
        onPress={handleCategoryPress}
      />
    );
  };

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

  const renderCartQuickAction = () => {
    const cartCount = getCartItemCount();
    return (
      <TouchableOpacity
        style={[styles.quickAction, { backgroundColor: colors.background }]}
        onPress={() => handleQuickAction('View cart')}
      >
        <View style={[styles.quickActionIcon, { backgroundColor: '#4CAF50' }]}>
          <Ionicons name="cart-outline" size={24} color="white" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <ThemedText style={styles.cartBadgeText}>
                {cartCount > 99 ? '99+' : cartCount.toString()}
              </ThemedText>
            </View>
          )}
        </View>
        <ThemedText style={styles.quickActionText}>{translations.myCart}</ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={28} color="#4CAF50" />
            <ThemedText style={styles.logoText}>AgriConnect</ThemedText>
          </View>
          <View style={styles.headerButtons}>
            {/* Language Toggle Button */}
            <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
              <View style={styles.languageIconContainer}>
                <Ionicons name="language-outline" size={20} color="#4CAF50" />
                <ThemedText style={styles.languageText}>{language === 'en' ? 'বাং' : 'EN'}</ThemedText>
              </View>
            </TouchableOpacity>
            
            {/* Logout Button */}
            <TouchableOpacity style={styles.cartButton} onPress={() => logout()}>
              <View style={styles.cartIconContainer}>
                <Ionicons name="log-out-outline" size={24} color="#4CAF50" />
              </View>
            </TouchableOpacity>
          </View>
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
              {translations.welcomeBack}, {user.name}! 👋
            </ThemedText>
            <View style={styles.roleBadge}>
              <Ionicons 
                name={user.role === 'farmer' ? 'leaf-outline' : 'cart-outline'} 
                size={16} 
                color="#4CAF50" 
              />
              <ThemedText style={styles.roleText}>
                {user.role === 'farmer' ? (language === 'en' ? 'Farmer' : 'কৃষক') : (language === 'en' ? 'Buyer' : 'ক্রেতা')}
              </ThemedText>
            </View>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={translations.searchPlaceholder}
            onSearch={(query) => {
              Alert.alert(translations.search, `${language === 'en' ? 'Searching for' : 'খুঁজছেন'}: ${query}`);
            }}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{translations.shopByCategory}</ThemedText>
          <View style={styles.categoriesContainer}>
            {mockCategories.map(renderCategoryItem)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{translations.quickActions}</ThemedText>
          <View style={styles.quickActionsContainer}>
            {renderQuickAction('add-circle-outline', translations.addProduct, 'Add new product')}
            {renderCartQuickAction()}
            {renderQuickAction('list-outline', translations.myOrders, 'View orders')}
            {renderQuickAction('chatbubbles-outline', translations.messages, 'View messages')}
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>{translations.featuredProducts}</ThemedText>
            <TouchableOpacity style={styles.viewAllButton}>
              <ThemedText style={styles.viewAllText}>{translations.viewAllProducts}</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {mockProducts.map(renderProductItem)}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{translations.recentOrders}</ThemedText>
          <View style={[styles.recentOrderCard, { backgroundColor: colors.background }]}>
            <View style={styles.recentOrderHeader}>
              <Ionicons name="time-outline" size={20} color={colors.icon} />
              <ThemedText style={styles.recentOrderTitle}>Order #12345</ThemedText>
              <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
                <ThemedText style={styles.statusText}>{translations.delivered}</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.recentOrderItems}>Fresh Tomatoes, Organic Rice</ThemedText>
            <ThemedText style={styles.recentOrderDate}>{language === 'en' ? 'Delivered on Dec 15, 2024' : '১৫ ডিসেম্বর, ২০২৪ এ পৌছে দেওয়া হয়েছে'}</ThemedText>
          </View>
        </View>

        {/* Why Choose AgriConnect Section */}
        <View style={styles.whyChooseSection}>
          <ThemedText style={styles.whyChooseTitle}>{translations.whyChooseAgriConnect}</ThemedText>
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="leaf-outline" size={32} color="#4CAF50" />
              </View>
              <ThemedText style={styles.featureTitle}>{translations.freshOrganic}</ThemedText>
              <ThemedText style={styles.featureDescription}>
                {translations.freshOrganicDesc}
              </ThemedText>
            </View>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="people-outline" size={32} color="#2196F3" />
              </View>
              <ThemedText style={styles.featureTitle}>{translations.supportLocalFarmers}</ThemedText>
              <ThemedText style={styles.featureDescription}>
                {translations.supportLocalFarmersDesc}
              </ThemedText>
            </View>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="car-outline" size={32} color="#FF9800" />
              </View>
              <ThemedText style={styles.featureTitle}>{translations.fastDelivery}</ThemedText>
              <ThemedText style={styles.featureDescription}>
                {translations.fastDeliveryDesc}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/* Logo and Tagline Section */}
          <View style={styles.footerLogoSection}>
            <View style={styles.footerLogo}>
              <Ionicons name="leaf" size={28} color="#4CAF50" />
              <ThemedText style={styles.footerLogoText}>AgriConnect</ThemedText>
            </View>
            <ThemedText style={styles.footerTagline}>
              Connecting farmers and buyers for a sustainable future in agriculture.
            </ThemedText>
          </View>

          {/* Links Section - Stacked vertically for mobile */}
          <View style={styles.footerLinksContainer}>
            {/* For Buyers */}
            <View style={styles.footerLinkSection}>
              <ThemedText style={styles.footerColumnTitle}>For Buyers</ThemedText>
              <View style={styles.footerLinksRow}>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Browse Products</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>How to Order</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.footerLinksRow}>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Delivery Info</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Customer Support</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* For Farmers */}
            <View style={styles.footerLinkSection}>
              <ThemedText style={styles.footerColumnTitle}>For Farmers</ThemedText>
              <View style={styles.footerLinksRow}>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Sell Your Products</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Farmer Dashboard</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.footerLinksRow}>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Pricing Guide</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Success Stories</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Company */}
            <View style={styles.footerLinkSection}>
              <ThemedText style={styles.footerColumnTitle}>Company</ThemedText>
              <View style={styles.footerLinksRow}>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>About Us</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Contact</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={styles.footerLinksRow}>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Privacy Policy</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerLinkItem}>
                  <ThemedText style={styles.footerLink}>Terms of Service</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Copyright Section */}
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    marginRight: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  languageIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
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
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  productsContainer: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
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
    paddingVertical: 48,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  whyChooseTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
  },
  featuresContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  featureIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#1a1a1a',
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  footerLogoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  footerTagline: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  footerLinksContainer: {
    marginBottom: 24,
  },
  footerLinkSection: {
    marginBottom: 24,
  },
  footerColumnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  footerLinksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  footerLinkItem: {
    flex: 1,
    paddingHorizontal: 8,
  },
  footerLink: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    paddingVertical: 8,
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
