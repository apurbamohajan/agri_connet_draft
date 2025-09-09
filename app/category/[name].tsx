import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

const { width } = Dimensions.get('window');

// Same mock products from the home screen with Taka prices
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Tomatoes',
    price: 550,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400',
    category: 'Vegetables',
    farmer: 'সবুজ উপত্যকা খামার',
    rating: 4.5,
    unit: 'per kg',
    location: 'সিলেট',
    badge: 'Organic',
  },
  {
    id: '2',
    name: 'Sweet Corn',
    price: 385,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    category: 'Vegetables',
    farmer: 'রৌদ্রোজ্জ্বল খামার',
    rating: 4.8,
    unit: 'per dozen',
    location: 'রংপুর',
    badge: 'Fresh',
  },
  {
    id: '3',
    name: 'Mixed Leafy Greens',
    price: 770,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'Vegetables',
    farmer: 'জৈব ফসল কোম্পানি',
    rating: 4.6,
    unit: 'per bundle',
    location: 'ময়মনসিংহ',
    badge: 'Organic',
  },
  {
    id: '4',
    name: 'Farm Fresh Carrots',
    price: 330,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    category: 'Vegetables',
    farmer: 'ঐতিহ্য খামার',
    rating: 4.4,
    unit: 'per kg',
    location: 'দিনাজপুর',
    badge: 'Local',
  },
  {
    id: '5',
    name: 'Fresh Strawberries',
    price: 990,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
    category: 'Fruits',
    farmer: 'বেরি আনন্দ খামার',
    rating: 4.9,
    unit: 'per box',
    location: 'চট্টগ্রাম',
    badge: 'Premium',
  },
  {
    id: '6',
    name: 'Organic Bell Peppers',
    price: 605,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    category: 'Vegetables',
    farmer: 'রঙিন ফসল খামার',
    rating: 4.7,
    unit: 'per kg',
    location: 'বরিশাল',
    badge: 'Organic',
  },
  {
    id: '7',
    name: 'Fresh Avocados',
    price: 880,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'Fruits',
    farmer: 'ক্রান্তীয় বাগান',
    rating: 4.6,
    unit: 'per kg',
    location: 'স্যাধেট',
    badge: 'Fresh',
  },
  {
    id: '8',
    name: 'Organic Broccoli',
    price: 495,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400',
    category: 'Vegetables',
    farmer: 'সবুজ ক্ষেত কোম্পানি',
    rating: 4.5,
    unit: 'per kg',
    location: 'গাজীপুর',
    badge: 'Organic',
  },
  {
    id: '9',
    name: 'Fresh Blueberries',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
    category: 'Fruits',
    farmer: 'নীল বেরি পাহাড়',
    rating: 4.8,
    unit: 'per box',
    location: 'রানীশংকৈল',
    badge: 'Premium',
  },
  {
    id: '10',
    name: 'Organic Spinach',
    price: 440,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
    category: 'Vegetables',
    farmer: 'পাতা শাক খামার',
    rating: 4.4,
    unit: 'per bundle',
    location: 'কুমিল্লা',
    badge: 'Organic',
  },
  {
    id: '11',
    name: 'Fresh Pineapples',
    price: 715,
    image: 'https://images.unsplash.com/photo-1550258987-190a62d4fa70?w=400',
    category: 'Fruits',
    farmer: 'ক্রান্তীয় স্বর্গ',
    rating: 4.7,
    unit: 'per piece',
    location: 'খুলনা',
    badge: 'Fresh',
  },
  {
    id: '12',
    name: 'Organic Cucumbers',
    price: 365,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400',
    category: 'Vegetables',
    farmer: 'সতেজ উপত্যকা খামার',
    rating: 4.3,
    unit: 'per kg',
    location: 'যশোর',
    badge: 'Organic',
  },
  {
    id: '13',
    name: 'Quinoa',
    price: 1430, // ৳1430 per kg (was $12.99)
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8c3?w=400',
    category: 'Grains',
    farmer: 'Ancient Grains Co.',
    rating: 4.6,
    unit: 'per kg',
    location: 'Peru',
    badge: 'Organic',
  },
  {
    id: '14',
    name: 'Brown Rice',
    price: 935, // ৳935 per kg (was $8.49)
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8c3?w=400',
    category: 'Grains',
    farmer: 'Rice Fields Farm',
    rating: 4.4,
    unit: 'per kg',
    location: 'Arkansas',
    badge: 'Organic',
  },
  {
    id: '15',
    name: 'Fresh Basil',
    price: 330, // ৳330 per bunch (was $2.99)
    image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400',
    category: 'Herbs',
    farmer: 'Herb Garden Co.',
    rating: 4.7,
    unit: 'per bunch',
    location: 'Mediterranean',
    badge: 'Fresh',
  },
  {
    id: '16',
    name: 'Organic Rosemary',
    price: 385, // ৳385 per bunch (was $3.49)
    image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400',
    category: 'Herbs',
    farmer: 'Aromatic Gardens',
    rating: 4.5,
    unit: 'per bunch',
    location: 'California',
    badge: 'Organic',
  },
  {
    id: '17',
    name: 'Fresh Milk',
    price: 660, // ৳660 per liter (was $5.99)
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
    category: 'Dairy',
    farmer: 'Happy Cow Dairy',
    rating: 4.8,
    unit: 'per liter',
    location: 'Wisconsin',
    badge: 'Fresh',
  },
  {
    id: '18',
    name: 'Organic Cheese',
    price: 1100, // ৳1100 per 250g (was $9.99)
    image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=400',
    category: 'Dairy',
    farmer: 'Artisan Cheese Co.',
    rating: 4.9,
    unit: 'per 250g',
    location: 'Vermont',
    badge: 'Organic',
  },
];

export default function CategoryPage() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const { translations, language, getProductName } = useLanguage();
  const { addToCart } = useCart();

  // Get category name from params and decode it
  const categoryName = typeof params.name === 'string' ? 
    decodeURIComponent(params.name) : 'Category';

  // Filter products by category
  const categoryProducts = mockProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );

  // Further filter by search query if any
  const filteredProducts = searchQuery 
    ? categoryProducts.filter(product =>
        getProductName(product.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryProducts;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vegetables': return 'leaf-outline';
      case 'fruits': return 'nutrition-outline';
      case 'grains': return 'restaurant-outline';
      case 'herbs': return 'flower-outline';
      case 'dairy': return 'water-outline';
      case 'organic': return 'leaf-outline';
      default: return 'apps-outline';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vegetables': return '#4CAF50';
      case 'fruits': return '#FF9800';
      case 'grains': return '#8D6E63';
      case 'herbs': return '#4CAF50';
      case 'dairy': return '#2196F3';
      case 'organic': return '#4CAF50';
      default: return '#666';
    }
  };

  const renderProductItem = (product: Product) => (
    <ProductCard
      key={product.id}
      {...product}
      onPress={() => {
        // This will be handled by the ProductCard component's internal navigation
      }}
      showAddToCart={true}
      onAddToCart={addToCart}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <View style={[styles.categoryIconContainer, { backgroundColor: getCategoryColor(categoryName) }]}>
            <Ionicons 
              name={getCategoryIcon(categoryName) as any} 
              size={20} 
              color="white" 
            />
          </View>
          <ThemedText style={styles.headerTitle}>{categoryName}</ThemedText>
        </View>
        
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Search ${categoryName.toLowerCase()}...`}
          onSearch={(query) => {
            console.log('Searching:', query);
          }}
        />
      </View>

      {/* Products Count */}
      <View style={styles.countSection}>
        <ThemedText style={styles.countText}>
          {filteredProducts.length} {filteredProducts.length === 1 ? (language === 'en' ? 'product' : 'পণ্য') : (language === 'en' ? 'products' : 'পণ্য')} {language === 'en' ? 'found' : 'পাওয়া গেছে'}
        </ThemedText>
      </View>

      {/* Products Grid */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {filteredProducts.length > 0 ? (
          <View style={styles.productsGrid}>
            {filteredProducts.map(renderProductItem)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="basket-outline" size={64} color="#ccc" />
            <ThemedText style={styles.emptyStateTitle}>{translations.noProductsFound}</ThemedText>
            <ThemedText style={styles.emptyStateDescription}>
              {searchQuery 
                ? `${language === 'en' ? 'No products match' : 'কোন পণ্য মিলছে না'} "${searchQuery}" ${language === 'en' ? 'in' : 'এ'} ${categoryName}`
                : `${language === 'en' ? 'No products available in' : 'কোন পণ্য নেই'} ${categoryName} ${language === 'en' ? 'category' : 'শ্রেণীতে'}`
              }
            </ThemedText>
          </View>
        )}
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  countSection: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});