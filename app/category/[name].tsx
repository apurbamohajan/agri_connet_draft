import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
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
import { productService } from '@/services/firebase';

const { width } = Dimensions.get('window');

export default function CategoryPage() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { translations, language, getProductName } = useLanguage();
  const { addToCart } = useCart();

  // Get category name from params and decode it
  const categoryName = typeof params.name === 'string' ? 
    decodeURIComponent(params.name) : 'Category';

  // Fetch products by category
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products from Firebase
        const fetchedProducts = await productService.getProductsByCategory(categoryName);
        setProducts(fetchedProducts as Product[]);
      } catch (err: any) {
        console.error('Error fetching category products:', err);
        setError('Failed to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  // Function to refresh products
  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await productService.getProductsByCategory(categoryName);
      setProducts(fetchedProducts as Product[]);
    } catch (err: any) {
      console.error('Error refreshing products:', err);
      setError('Failed to refresh products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter products by search query if any
  const filteredProducts = searchQuery 
    ? products.filter(product =>
        getProductName(product.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

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

  const renderProductsContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <ThemedText style={styles.loadingText}>{translations.loading}</ThemedText>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#FF6B6B" />
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={refreshProducts}>
            <ThemedText style={styles.retryButtonText}>{translations.tryAgain}</ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredProducts.length === 0) {
      return (
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
      );
    }

    return (
      <View style={styles.productsGrid}>
        {filteredProducts.map(renderProductItem)}
      </View>
    );
  };

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
        {renderProductsContent()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
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
});